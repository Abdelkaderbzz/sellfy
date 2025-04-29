
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@/types";
import { toast } from "sonner";

export interface CartItem {
  productId: number;
  variantId?: number;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => void;
  removeItem: (productId: number, variantId?: number) => void;
  updateQuantity: (productId: number, quantity: number, variantId?: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  const findItemIndex = (productId: number, variantId?: number) => {
    return items.findIndex(
      (item) => item.productId === productId && item.variantId === variantId
    );
  };
  
  const addItem = (product: Product, quantity: number, variant?: ProductVariant) => {
    setItems((prevItems) => {
      const existingIndex = findItemIndex(product.id, variant?.id);
      
      if (existingIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        toast.success(`Updated quantity of ${product.name} in your cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${product.name} to your cart`);
        return [
          ...prevItems,
          {
            productId: product.id,
            variantId: variant?.id,
            product,
            variant,
            quantity,
          },
        ];
      }
    });
  };
  
  const removeItem = (productId: number, variantId?: number) => {
    setItems((prevItems) => {
      const existingIndex = findItemIndex(productId, variantId);
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const removedItem = updatedItems[existingIndex];
        updatedItems.splice(existingIndex, 1);
        toast.success(`Removed ${removedItem.product.name} from your cart`);
        return updatedItems;
      }
      return prevItems;
    });
  };
  
  const updateQuantity = (productId: number, quantity: number, variantId?: number) => {
    setItems((prevItems) => {
      const existingIndex = findItemIndex(productId, variantId);
      
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        if (quantity <= 0) {
          updatedItems.splice(existingIndex, 1);
          toast.success(`Removed ${prevItems[existingIndex].product.name} from your cart`);
        } else {
          updatedItems[existingIndex].quantity = quantity;
          toast.success(`Updated quantity of ${prevItems[existingIndex].product.name}`);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + price * item.quantity;
  }, 0);
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
