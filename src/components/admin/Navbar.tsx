"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Admin Panel
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/admin/orders"
                className="text-gray-600 hover:text-gray-900"
              >
                Orders
              </Link>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
} 