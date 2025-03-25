
import { useOrders } from "@/hooks/use-database";
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
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-indigo-100 text-indigo-800",
  cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const { data: orders, isLoading, error } = useOrders();

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <p className="text-wallet-darkGray/60">View and manage your orders</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading orders...</div>
        </div>
      ) : error ? (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <p className="text-red-600">Error loading orders. Please try again.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow animate-fade-in">
          {orders?.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-wallet-darkGray/60 mb-4">You haven't placed any orders yet</p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {order.created_at 
                        ? format(new Date(order.created_at), "MMM d, yyyy")
                        : "N/A"
                      }
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        order.status ? statusColors[order.status] : ""
                      }>
                        {order.status || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Orders;
