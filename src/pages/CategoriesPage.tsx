
import React from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const CategoriesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground mb-8">Browse our products by category</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/products?category=${category.slug}`} key={category.id} className="block">
              <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.productCount} Products</p>
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
