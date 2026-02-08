"use client";

import { useState, useEffect } from "react";
import { Eye, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shared/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { Badge } from "@/components/shared/ui/badge";
import { toast } from "sonner";

// Mock data

interface Order {
  id: string;
  customer_email: string; // Updated from customer to match DB
  total: number;
  status: string;
  created_at: string;
  // items: number; // DB doesn't have items count yet in base table, we might need to join or just omit for now
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT", // Using PUT/PATCH for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (res.ok) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-cormorant font-bold text-foreground">
            Orders
          </h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.customer_email}</TableCell>
                <TableCell>
                  {(order as any).order_items?.length || 0} items
                </TableCell>
                <TableCell>R {order.total}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(val) => handleStatusChange(order.id, val)}
                  >
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center text-yellow-600">
                          <Clock className="w-3 h-3 mr-2" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="paid">
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-3 h-3 mr-2" />
                          Paid
                        </div>
                      </SelectItem>
                      <SelectItem value="shipped">
                        <div className="flex items-center text-blue-600">
                          <Clock className="w-3 h-3 mr-2" />
                          Shipped
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center text-gray-600">
                          <CheckCircle className="w-3 h-3 mr-2" />
                          Completed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewOrder(order)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on:{" "}
              {selectedOrder &&
                new Date(selectedOrder.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded text-sm">
                  <h3 className="font-bold mb-2">Customer</h3>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedOrder.customer_name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedOrder.customer_email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedOrder.shipping_details?.phone || "N/A"}
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded text-sm">
                  <h3 className="font-bold mb-2">Shipping</h3>
                  <p>{selectedOrder.shipping_details?.address}</p>
                  <p>
                    {selectedOrder.shipping_details?.city},{" "}
                    {selectedOrder.shipping_details?.province}
                  </p>
                  <p>{selectedOrder.shipping_details?.postalCode}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Items</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedOrder.order_items || []).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            R {item.price}
                          </TableCell>
                          <TableCell className="text-right">
                            R {(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!selectedOrder.order_items ||
                        selectedOrder.order_items.length === 0) && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground"
                          >
                            No items found
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          R {selectedOrder.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
