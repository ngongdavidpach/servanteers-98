
import { useProducts } from "@/hooks/use-database";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-wallet-darkGray/60">Browse available products</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading products...</div>
        </div>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Error loading products. Please try again.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {products?.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center">
                <p className="text-wallet-darkGray/60">No products available</p>
              </CardContent>
            </Card>
          ) : (
            products?.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wallet-darkGray/60 text-sm line-clamp-2 mb-2">
                    {product.description || "No description available"}
                  </p>
                  <p className="text-wallet-blue font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.stock > 0 ? (
                    <p className="text-green-600 text-xs mt-1">In Stock: {product.stock}</p>
                  ) : (
                    <p className="text-red-600 text-xs mt-1">Out of Stock</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Products;
