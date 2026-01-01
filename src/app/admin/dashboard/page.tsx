"use client";

import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "R 45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      label: "Orders",
      value: "+573",
      change: "+201 since last hour",
      icon: ShoppingBag,
    },
    {
      label: "Products",
      value: "12",
      change: "+2 new products",
      icon: Package,
    },
    {
      label: "Active Now",
      value: "+573",
      change: "+201 since last hour",
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
        {stats.map((stat) => {
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
          <p className="text-muted-foreground">
            You made 265 sales this month.
          </p>
          {/* Placeholder for Chart or List */}
          <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md mt-4">
            <span className="text-muted-foreground text-sm">
              Chart Placeholder
            </span>
          </div>
        </div>
        <div className="col-span-3 bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm">Order #{1000 + i}</p>
                  <p className="text-xs text-muted-foreground">
                    customer{i}@example.com
                  </p>
                </div>
                <div className="text-sm font-bold">
                  R {(Math.random() * 500).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
