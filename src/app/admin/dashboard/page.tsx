"use client";

import { useState, useEffect } from "react";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const statCards = [
    {
      label: "Total Revenue",
      value: `R ${stats?.revenue?.toFixed(2) || "0.00"}`,
      change: "Lifetime revenue",
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders || "0",
      change: "All time orders",
      icon: ShoppingBag,
    },
    {
      label: "Products",
      value: stats?.totalProducts || "0",
      change: "Active products",
      icon: Package,
    },
    {
      label: "Pending Orders",
      value: stats?.pendingOrders || "0",
      change: "Needs attention",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-cormorant font-bold text-[#332515]">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your store's performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 bg-card rounded-lg border border-border shadow-sm"
            >
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium tracking-tight text-muted-foreground">
                  {stat.label}
                </p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-cormorant text-[#332515]">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
          <p className="text-muted-foreground mb-4">
            Summary of recent transactions.
          </p>
          <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-sm text-muted-foreground">
              Sales Chart Coming Soon
            </p>
          </div>
        </div>
        <div className="col-span-3 bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {stats?.recentOrders?.map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm">
                    Order #{order.id.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.customer_email}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">R {order.total}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
            {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
              <p className="text-sm text-muted-foreground">No recent orders.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
