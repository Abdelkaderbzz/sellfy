
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  CheckCircle,
  ArrowLeft,
  Star,
  StarHalf,
  Truck,
  ShoppingBag,
  Shield
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/mockData";
import { Product, ProductVariant } from "@/types";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Fetch product data
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default variant if exists
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0]);
        }
        
        // Find related products (same category)
        const related = products
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.category === foundProduct.category || p.subcategory === foundProduct.subcategory)
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };
  
  const handleBuyNow = () => {
    if (!product) return;
    
    toast.success(`Proceeding to checkout with ${product.name}`);
  };
  
  const handleAddToWishlist = () => {
    if (!product) return;
    
    toast.success(`Added ${product.name} to wishlist`);
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    
    return stars;
  };

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-medium mb-4">Product not found</h2>
          <p className="mb-6 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const actualPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - actualPrice) / originalPrice) * 100) : 0;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0;
  const stockLevel = selectedVariant ? selectedVariant.stock : product.stock;
  const lowStock = stockLevel > 0 && stockLevel <= 5;

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/products?category=${product.category}`}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {product.subcategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/products?category=${product.category}&subcategory=${product.subcategory}`}>{product.subcategory}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2 text-sm text-muted-foreground">
              {product.brand}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRating(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center mb-4">
              {originalPrice && (
                <span className="line-through text-muted-foreground mr-3">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className={`text-2xl font-bold ${product.onSale ? "text-red-600" : ""}`}>
                ${actualPrice.toFixed(2)}
              </span>
              {discountPercentage > 0 && (
                <span className="ml-3 bg-red-100 text-red-800 px-2 py-0.5 text-xs font-medium rounded">
                  Save {discountPercentage}%
                </span>
              )}
            </div>
            
            <div className="border-t border-b py-4 mb-6">
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Options:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        className={`px-4 py-2 border rounded-md text-sm
                          ${selectedVariant?.id === variant.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={variant.stock === 0}
                        onClick={() => handleVariantChange(variant)}
                      >
                        {variant.name}
                        {variant.stock === 0 && " (Out of Stock)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Availability */}
              <div className="mb-4">
                {inStock ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>
                      In Stock
                      {lowStock && ` (Only ${stockLevel} left)`}
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600">Out of Stock</div>
                )}
              </div>
              
              {/* SKU */}
              <div className="text-sm text-muted-foreground">
                SKU: {product.sku}
              </div>
            </div>
            
            {/* Add to Cart Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-1 border-r text-lg"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button
                      className="px-3 py-1 border-l text-lg"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  className="flex-1 mr-2"
                  size="lg"
                  disabled={!inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <Button
                variant="secondary"
                className="w-full"
                size="lg"
                disabled={!inStock}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-muted-foreground">2-4 business days</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Free Returns</p>
                  <p className="text-muted-foreground">30-day returns</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-muted-foreground">SSL Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for details, specifications, reviews */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent border-gray-200 pb-0">
            <TabsTrigger 
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-4"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-4"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-4"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                ultricies ultrices, nisl nunc tincidunt nisl, eget aliquet nisl nunc eget nisl.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                ultricies ultrices, nisl nunc tincidunt nisl, eget aliquet nisl nunc eget nisl.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.tags.map((tag, index) => (
                  <li key={index} className="capitalize">{tag}</li>
                ))}
                <li>High-quality materials for durability</li>
                <li>Easy to use interface with intuitive controls</li>
                <li>Energy efficient design for cost savings</li>
                <li>Compact and lightweight for easy portability</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">General</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Brand</td>
                      <td className="py-2 font-medium">{product.brand}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Model</td>
                      <td className="py-2 font-medium">{product.sku}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Warranty</td>
                      <td className="py-2 font-medium">1 Year</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Color</td>
                      <td className="py-2 font-medium">
                        {selectedVariant?.name || "Multiple Options"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Category</td>
                      <td className="py-2 font-medium">{product.category}</td>
                    </tr>
                    {product.subcategory && (
                      <tr className="border-b">
                        <td className="py-2 text-muted-foreground">Subcategory</td>
                        <td className="py-2 font-medium">{product.subcategory}</td>
                      </tr>
                    )}
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Weight</td>
                      <td className="py-2 font-medium">0.5 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Dimensions</td>
                      <td className="py-2 font-medium">10 × 5 × 3 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {renderRating(product.rating)}
                </div>
                <span>
                  Based on {product.reviewCount} reviews
                </span>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <p className="text-center text-muted-foreground mb-4">Be the first to leave a review for this product!</p>
              <div className="flex justify-center">
                <Button variant="outline">Write a Review</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
