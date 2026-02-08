"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui/table";
import { Badge } from "@/components/shared/ui/badge";

export default function AdminResellersPage() {
  const [resellers, setResellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResellers() {
      try {
        const res = await fetch("/api/resellers");
        if (res.ok) {
          const data = await res.json();
          setResellers(data);
        }
      } catch (error) {
        console.error("Failed to fetch resellers", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResellers();
  }, []);

  if (loading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cormorant font-bold text-[#332515]">
          Reseller Applications
        </h1>
        <p className="text-muted-foreground">
          Manage reseller requests and applications.
        </p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resellers.map((reseller) => (
              <TableRow key={reseller.id}>
                <TableCell>
                  {new Date(reseller.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">
                  {reseller.first_name} {reseller.last_name}
                </TableCell>
                <TableCell>
                  <div>{reseller.business_name || "N/A"}</div>
                  <div className="text-xs text-muted-foreground">
                    {reseller.business_type}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 text-sm">
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                      {reseller.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                      {reseller.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      reseller.status === "approved"
                        ? "default"
                        : reseller.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {reseller.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {resellers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
