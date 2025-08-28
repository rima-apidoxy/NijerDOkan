"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, ArrowRight, Shield } from "lucide-react";
import ChangPassword from "@/components/change-password/ChangPassword";

export default function AccountSettings() {


  return (
    <div className="py-10 space-y-10">
      {/* My Info Section */}
      <section className="space-y-4 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold">My Info</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" defaultValue="Rima Akter" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" placeholder="Enter your gender" defaultValue="Female" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="rima@example.com"
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              defaultValue="+880 1234 567890"
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">Update Info</Button>
      </section>

      {/* Change Password Section */}
      <ChangPassword></ChangPassword>
    </div>
  );
}
