"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual Supabase/Auth logic
      // const { error } = await supabase.auth.signInWithPassword({ email, password });

      // Simulating login for structure demonstration
      if (email === "admin@stakscents.com" && password === "admin") {
        document.cookie = "admin_session=true; path=/";
        toast.success("Welcome back, Admin!");
        router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F8F4E3]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-[#332515]/10">
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-3xl font-bold text-[#332515]">
            Admin Access
          </h1>
          <p className="text-[#332515]/60 mt-2">Please log in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#332515] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#332515]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#332515]/20"
              placeholder="admin@stakscents.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#332515] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#332515]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#332515]/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#332515] text-[#F8F4E3] py-2 rounded-md hover:bg-[#A0522D] transition-colors flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
