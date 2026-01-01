"use client";

import { useState, useEffect } from "react";
import { Eye, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-cormorant font-bold text-[#332515]">
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
                <TableCell>-</TableCell>
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
                    onClick={() => toast.info(`View details for ${order.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
