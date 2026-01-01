import { supabase } from "./supabase";

export async function isAuthenticated(request: Request) {
  // Check for admin session cookie or supabase token
  // For now using a simple cookie check as per the mock login
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader?.includes("admin_session=true")) {
    return true;
  }
  return false;
}

export async function getCurrentUser() {
  // Placeholder for getting supabase user
  return null;
}
