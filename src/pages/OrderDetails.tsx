
import { useParams, Link } from "react-router-dom";
import { useOrder } from "@/hooks/use-database";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-indigo-100 text-indigo-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id);

  return (
    <AppLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-wallet-darkGray/60">
              Order #{id?.substring(0, 8)}
            </p>
          </div>
          {order && (
            <Badge variant="outline" className={
              order.status ? statusColors[order.status] : ""
            }>
              {order.status || "Unknown"}
            </Badge>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading order details...</div>
        </div>
      ) : error ? (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <p className="text-red-600">Error loading order details. Please try again.</p>
        </div>
      ) : !order ? (
        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
          <p className="text-yellow-600">Order not found</p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-3">Order Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-wallet-darkGray/60">Date</p>
                <p className="font-medium">
                  {order.created_at 
                    ? format(new Date(order.created_at), "PPP")
                    : "N/A"
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-wallet-darkGray/60">Total</p>
                <p className="font-medium text-wallet-blue">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-lg font-medium p-4 border-b">Products in Order</h2>
            
            {order.items.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-wallet-darkGray/60">No products in this order</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.product?.name || "Unknown Product"}
                        <p className="text-xs text-wallet-darkGray/60 mt-1">
                          {item.product?.description?.substring(0, 60) || "No description"}
                          {item.product?.description && item.product.description.length > 60 ? "..." : ""}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold text-wallet-blue">
                      ${order.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default OrderDetails;
