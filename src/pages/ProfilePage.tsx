
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  User, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  UserCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [accountData, setAccountData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567"
  });

  const mockOrders = [
    {
      id: "ORD-123456",
      date: "2023-04-15",
      total: 149.97,
      status: "Delivered",
      items: 3
    },
    {
      id: "ORD-123455",
      date: "2023-03-22",
      total: 57.99,
      status: "Delivered",
      items: 1
    },
    {
      id: "ORD-123454",
      date: "2023-02-10",
      total: 224.95,
      status: "Returned",
      items: 2
    }
  ];

  const mockAddresses = [
    {
      id: 1,
      name: "Home",
      default: true,
      address: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    {
      id: 2,
      name: "Office",
      default: false,
      address: "456 Work Avenue",
      city: "Business City",
      state: "NY",
      zipCode: "67890",
      country: "USA"
    }
  ];

  const mockPaymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4242",
      default: true,
      expiry: "06/25"
    },
    {
      id: 2,
      type: "Credit Card",
      name: "Mastercard ending in 5555",
      default: false,
      expiry: "09/24"
    },
    {
      id: 3,
      type: "PayPal",
      name: "john.doe@example.com",
      default: false,
      expiry: null
    }
  ];

  const mockWishlist = [
    {
      id: 1,
      name: "Professional Camera",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account information updated successfully!");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "processing":
        return "text-amber-600 bg-amber-100";
      case "cancelled":
      case "returned":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Layout showScrollArea>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="md:col-span-1 h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-medium">John Doe</h2>
                <p className="text-sm text-muted-foreground">Member since April 2023</p>
              </div>

              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#account">
                    <User className="mr-2 h-4 w-4" />
                    Account Info
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#addresses">
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#payment">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="#settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
                  <Link to="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-8 grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" id="account">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your account details</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAccountUpdate}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={accountData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={accountData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={accountData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={accountData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit">Save Changes</Button>
                      </CardFooter>
                    </form>
                  </Card>

                  {/* Password Update */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Password</CardTitle>
                      <CardDescription>Change your password</CardDescription>
                    </CardHeader>
                    <form onSubmit={handlePasswordUpdate}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit">Update Password</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" id="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your recent orders and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                          When you place an order, it will appear here
                        </p>
                        <Button asChild>
                          <Link to="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {mockOrders.map((order) => (
                          <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <h3 className="font-medium">{order.id}</h3>
                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </div>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <div className="flex justify-between">
                                <span>Date</span>
                                <span>{order.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Items</span>
                                <span>{order.items}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" id="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Products you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockWishlist.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-lg mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-4">
                          Save items you like to your wishlist
                        </p>
                        <Button asChild>
                          <Link to="/products">Browse Products</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {mockWishlist.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border bg-card overflow-hidden"
                          >
                            <div className="aspect-square relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                              >
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium mb-1">{item.name}</h3>
                              <p className="font-bold">${item.price.toFixed(2)}</p>
                              <div className="mt-4 grid grid-cols-2 gap-2">
                                <Button size="sm" className="w-full">
                                  Add to Cart
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" id="addresses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Shipping Addresses</CardTitle>
                      <CardDescription>Manage your saved addresses</CardDescription>
                    </div>
                    <Button size="sm">
                      Add New Address
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mockAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`rounded-lg border p-4 ${
                            address.default ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{address.name}</h3>
                            {address.default && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                            <p>{address.country}</p>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            {!address.default && (
                              <Button variant="outline" size="sm">Set as Default</Button>
                            )}
                            {!address.default && (
                              <Button variant="outline" size="sm" className="text-red-500">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payment" id="payment">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your saved payment methods</CardDescription>
                    </div>
                    <Button size="sm">
                      Add New Payment Method
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mockPaymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`rounded-lg border p-4 ${
                            method.default ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{method.name}</h3>
                            {method.default && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{method.type}</p>
                            {method.expiry && <p>Expires: {method.expiry}</p>}
                          </div>
                          <div className="mt-4 flex space-x-2">
                            {!method.default && (
                              <Button variant="outline" size="sm">Set as Default</Button>
                            )}
                            {!method.default && (
                              <Button variant="outline" size="sm" className="text-red-500">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" id="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="orderUpdates" className="flex items-center space-x-2">
                            <span>Order updates</span>
                          </Label>
                          <Input
                            type="checkbox"
                            id="orderUpdates"
                            className="w-4 h-4"
                            defaultChecked
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="promotions" className="flex items-center space-x-2">
                            <span>Promotions and sales</span>
                          </Label>
                          <Input
                            type="checkbox"
                            id="promotions"
                            className="w-4 h-4"
                            defaultChecked
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newProducts" className="flex items-center space-x-2">
                            <span>New product arrivals</span>
                          </Label>
                          <Input
                            type="checkbox"
                            id="newProducts"
                            className="w-4 h-4"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                      <div className="space-y-4">
                        <div>
                          <Button 
                            variant="destructive" 
                            className="bg-red-100 hover:bg-red-200 text-red-500"
                          >
                            Delete My Account
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            This will permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
