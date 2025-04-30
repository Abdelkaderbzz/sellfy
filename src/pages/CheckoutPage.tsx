
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shipping");
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  // Simulate shipping cost
  const shippingCost = 5.99;
  const tax = subtotal * 0.07; // 7% sales tax
  const total = subtotal + shippingCost + tax;

  // If cart is empty, redirect to cart page
  if (items.length === 0 && !orderComplete) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            You need to add products to your cart before proceeding to checkout.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("review");
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  // Order completed view
  if (orderComplete) {
    return (
      <Layout>
        <div className="container max-w-3xl py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl mb-8">Thank you for your purchase.</p>
          <div className="bg-card rounded-lg border p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">Order Details</h2>
            <div className="mb-4">
              <p className="text-muted-foreground">Order number: #ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="text-muted-foreground">A confirmation email has been sent to {formData.email}</p>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="font-medium">Shipping Information:</p>
              <p>
                {formData.firstName} {formData.lastName}
              </p>
              <p>{formData.address}</p>
              <p>
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <p>{formData.country}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="shipping">1. Shipping</TabsTrigger>
                <TabsTrigger value="payment" disabled={activeTab === "shipping"}>
                  2. Payment
                </TabsTrigger>
                <TabsTrigger value="review" disabled={activeTab === "shipping" || activeTab === "payment"}>
                  3. Review
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="shipping">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleShippingSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State / Province</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select 
                            value={formData.country}
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-lg font-medium mb-2">Shipping Method</div>
                        <div className="rounded-md border p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="standard" 
                                name="shippingMethod" 
                                defaultChecked
                              />
                              <Label htmlFor="standard" className="cursor-pointer">
                                <div>Standard Shipping</div>
                                <div className="text-sm text-muted-foreground">3-5 business days</div>
                              </Label>
                            </div>
                            <div>$5.99</div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="express" 
                                name="shippingMethod"
                              />
                              <Label htmlFor="express" className="cursor-pointer">
                                <div>Express Shipping</div>
                                <div className="text-sm text-muted-foreground">1-2 business days</div>
                              </Label>
                            </div>
                            <div>$14.99</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link to="/cart">
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                        </Link>
                      </Button>
                      <Button type="submit">Continue to Payment</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details</CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePaymentSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="text-lg font-medium mb-2">Billing Address</div>
                        <div className="flex items-center space-x-2 mb-4">
                          <input 
                            type="checkbox" 
                            id="sameAsShipping" 
                            name="sameAsShipping" 
                            defaultChecked
                          />
                          <Label htmlFor="sameAsShipping">
                            Same as shipping address
                          </Label>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="text-sm">
                          <p className="font-medium">Payment Security</p>
                          <p className="text-muted-foreground">
                            Your payment information is encrypted and secure. We never store your full
                            card details.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => setActiveTab("shipping")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
                      </Button>
                      <Button type="submit">Continue to Review</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="review">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                    <CardDescription>Review your order before placing it</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Shipping Information</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.email}</p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.country}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Payment Information</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                        <p>{formData.cardName}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {items.map((item) => {
                          const { product, variant, quantity } = item;
                          const price = variant ? variant.price : product.price;
                          const displayName = variant
                            ? `${product.name} - ${variant.name}`
                            : product.name;

                          return (
                            <div
                              key={`${product.id}-${variant?.id || "default"}`}
                              className="flex justify-between text-sm"
                            >
                              <div className="flex-1">
                                <span className="font-medium">{displayName}</span>
                                <span className="text-muted-foreground ml-2">
                                  x{quantity}
                                </span>
                              </div>
                              <div>${(price * quantity).toFixed(2)}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab("payment")}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payment
                        </Button>
                        <Button
                          onClick={handlePlaceOrder}
                          disabled={processing}
                        >
                          {processing ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="max-h-60 overflow-auto mb-4">
                {items.map((item) => {
                  const { product, variant, quantity } = item;
                  const price = variant ? variant.price : product.price;
                  const displayName = variant
                    ? `${product.name} - ${variant.name}`
                    : product.name;

                  return (
                    <div
                      key={`${product.id}-${variant?.id || "default"}`}
                      className="flex items-start py-2 border-b last:border-b-0"
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="text-sm truncate">{displayName}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(price * quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {activeTab === "shipping"
                      ? "Calculated at next step"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>
                    {activeTab === "shipping"
                      ? "Calculated at next step"
                      : `$${tax.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      ${activeTab === "shipping"
                        ? subtotal.toFixed(2)
                        : total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-xs text-muted-foreground">
                <p className="mb-1">Need help? Contact our support team.</p>
                <p>
                  <span className="font-medium">Email:</span> support@sellfy.com
                </p>
                <p>
                  <span className="font-medium">Phone:</span> +1 (800) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
