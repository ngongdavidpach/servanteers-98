
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProduct, getOrders, getOrderWithItems, createOrder } from "@/lib/api";
import { toast } from "sonner";

// Products hooks
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });
}

// Orders hooks
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderWithItems(id as string),
    enabled: !!id,
  });
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: {
      userId: string;
      items: { productId: string; quantity: number; price: number }[];
    }) => createOrder(params.userId, params.items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    },
  });
}
