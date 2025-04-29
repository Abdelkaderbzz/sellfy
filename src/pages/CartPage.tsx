
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trash,
  ShoppingCart,
  ShoppingBag,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground opacity-50 mb-4" />
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (
    productId: number,
    currentQuantity: number,
    change: number,
    variantId?: number
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(productId, newQuantity, variantId);
    } else if (newQuantity === 0) {
      removeItem(productId, variantId);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearCart}>
              <Trash className="h-4 w-4 mr-2" /> Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card">
              {items.map((item) => {
                const { product, variant, quantity } = item;
                const price = variant ? variant.price : product.price;
                const originalPrice = product.originalPrice;
                const displayName = variant
                  ? `${product.name} - ${variant.name}`
                  : product.name;
                const inStock = variant
                  ? variant.stock > 0
                  : product.stock > 0;
                const stockLevel = variant ? variant.stock : product.stock;
                const lowStock = stockLevel > 0 && stockLevel <= 5;

                return (
                  <div
                    key={`${product.id}-${variant?.id || "default"}`}
                    className="flex items-start p-4 border-b last:border-b-0"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/product/${product.id}`} className="font-medium hover:text-primary">
                            {displayName}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {product.brand}
                          </p>
                          {variant && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Variant: {variant.name}
                            </p>
                          )}
                          {!inStock ? (
                            <p className="mt-1 text-sm text-red-600">Out of Stock</p>
                          ) : lowStock ? (
                            <p className="mt-1 text-sm text-amber-600">
                              Only {stockLevel} left
                            </p>
                          ) : null}
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {originalPrice && (
                              <span className="text-sm line-through text-muted-foreground">
                                ${originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="font-medium">
                              ${price.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeItem(product.id, variant?.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-3 py-1 border-r text-lg"
                            onClick={() =>
                              handleQuantityChange(product.id, quantity, -1, variant?.id)
                            }
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{quantity}</span>
                          <button
                            className="px-3 py-1 border-l text-lg"
                            onClick={() =>
                              handleQuantityChange(product.id, quantity, 1, variant?.id)
                            }
                            disabled={quantity >= 10 || quantity >= stockLevel}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-4 text-sm">
                          <span className="text-muted-foreground">Subtotal:</span>{" "}
                          <span className="font-medium">
                            ${(price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                size="lg"
                asChild
              >
                <Link to="/checkout">
                  <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                </Link>
              </Button>
              
              <div className="mt-4 text-xs text-muted-foreground text-center">
                <p className="mb-2">We accept:</p>
                <div className="flex justify-center space-x-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">Visa</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">MasterCard</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">PayPal</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Apple Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
