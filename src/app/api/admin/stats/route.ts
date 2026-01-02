import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // 1. Total Revenue (Sum of paid orders)
    // Note: Use a simple fetch and reduce for MVP. For scale, use RPC or specific query.
    const { data: paidOrders, error: revenueError } = await supabase
      .from("orders")
      .select("total")
      .eq("status", "paid");

    if (revenueError) throw revenueError;

    const totalRevenue =
      paidOrders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) ||
      0;

    // 2. Total Orders Count
    const { count: ordersCount, error: ordersError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (ordersError) throw ordersError;

    // 3. Pending Orders Count (Replace "Active Now" with something useful)
    const { count: pendingCount, error: pendingError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (pendingError) throw pendingError;

    // 4. Products Count
    const { count: productsCount, error: productsError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (productsError) throw productsError;

    // 5. Recent Orders
    const { data: recentOrders, error: recentError } = await supabase
      .from("orders")
      .select("id, created_at, customer_email, total, status")
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentError) throw recentError;

    return NextResponse.json({
      revenue: totalRevenue,
      totalOrders: ordersCount || 0,
      pendingOrders: pendingCount || 0,
      totalProducts: productsCount || 0,
      recentOrders: recentOrders || [],
    });
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
