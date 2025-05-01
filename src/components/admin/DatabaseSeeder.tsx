
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedProducts, checkProductsExist } from '@/utils/seedDatabase';
import { toast } from 'sonner';

const DatabaseSeeder: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasProducts, setHasProducts] = useState<boolean | null>(null);

  const checkProducts = async () => {
    const exists = await checkProductsExist();
    setHasProducts(exists);
    return exists;
  };

  const handleSeedDatabase = async () => {
    try {
      setIsSeeding(true);
      
      // Check if products already exist
      const exists = await checkProducts();
      
      if (exists) {
        toast.info("Products already exist in the database.");
        return;
      }
      
      const result = await seedProducts();
      
      if (result.success) {
        toast.success("Database seeded successfully!");
        setHasProducts(true);
      } else {
        toast.error("Failed to seed database. Check console for details.");
      }
    } catch (error) {
      console.error("Error in seed process:", error);
      toast.error("An error occurred while seeding the database.");
    } finally {
      setIsSeeding(false);
    }
  };

  React.useEffect(() => {
    checkProducts();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-2">Database Management</h2>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          {hasProducts === null && "Checking database status..."}
          {hasProducts === true && "Products already exist in the database."}
          {hasProducts === false && "No products found in the database."}
        </p>
        <Button 
          onClick={handleSeedDatabase} 
          disabled={isSeeding || hasProducts === true}
          className="w-full sm:w-auto"
        >
          {isSeeding ? "Seeding Database..." : "Seed Database with Demo Data"}
        </Button>
      </div>
    </div>
  );
};

export default DatabaseSeeder;
