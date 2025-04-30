
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Star, ShoppingBag, Settings, Mail } from "lucide-react";

const AboutUsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-muted-foreground mb-8">Learn more about our story and mission</p>
          
          <div className="relative overflow-hidden rounded-lg aspect-[21/9] mb-10">
            <img 
              src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80" 
              alt="About Us Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  Delivering Quality Since 2015
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-md">
                  We've been on a mission to provide exceptional products and 
                  service to our customers around the world.
                </p>
              </div>
            </div>
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2015, our e-commerce platform started with a simple idea: make shopping easier, 
              faster, and more enjoyable for everyone. What began as a small operation has grown into a 
              trusted online destination for thousands of customers across the globe.
            </p>
            <p>
              Our team is dedicated to curating high-quality products across multiple categories, from fashion 
              and electronics to home goods and beyond. We believe in the power of e-commerce to connect people 
              with the products they love while providing an exceptional shopping experience from click to delivery.
            </p>
          </section>
          
          <Separator className="my-8" />
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Quality</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    We carefully select only the best products for our customers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Customer First</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Your satisfaction is our top priority in everything we do.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2">Innovation</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    We continually evolve to improve your shopping experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <Separator className="my-8" />
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615242896!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1644481095782!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, height: "200px" }} 
                    loading="lazy"
                    title="Map"
                  ></iframe>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Us</h4>
                        <p className="text-sm text-muted-foreground">support@ecommerceprime.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Settings className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Support</h4>
                        <p className="text-sm text-muted-foreground">Available 24/7 for all inquiries</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
