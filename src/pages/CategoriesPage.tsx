
import React from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

// Create an array of placeholder images for the categories
const categoryImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop"
];

// Generate a slug from a category name
const generateSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');

const CategoriesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground mb-8">Browse our products by category</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              to={`/products?category=${generateSlug(category.name)}`} 
              key={index} 
              className="block"
            >
              <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={categoryImages[index % categoryImages.length]} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.subcategories.length} Products</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Button variant="ghost" className="w-full justify-between group">
                    Browse Products
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
