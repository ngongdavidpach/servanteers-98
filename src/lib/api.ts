
import { supabase } from "@/integrations/supabase/client";
import { Product, Order, OrderItem, OrderWithItems } from "./database.types";

// Product functions
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");
  
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
  
  return data;
}

// Order functions
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
  
  return data || [];
}

export async function getOrderWithItems(orderId: string): Promise<OrderWithItems | null> {
  // First get the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();
  
  if (orderError) {
    console.error(`Error fetching order ${orderId}:`, orderError);
    throw orderError;
  }
  
  if (!order) return null;
  
  // Then get the order items with products
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("order_id", orderId);
  
  if (itemsError) {
    console.error(`Error fetching order items for order ${orderId}:`, itemsError);
    throw itemsError;
  }
  
  return {
    ...order,
    items: orderItems as (OrderItem & { product: Product })[]
  };
}

export async function createOrder(
  userId: string, 
  items: { productId: string; quantity: number; price: number }[]
): Promise<Order> {
  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Start a transaction
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ user_id: userId, total, status: "pending" })
    .select()
    .single();
  
  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }
  
  // Insert order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price
  }));
  
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);
  
  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw itemsError;
  }
  
  return order;
}
