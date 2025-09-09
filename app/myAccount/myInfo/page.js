"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, ArrowRight, Shield } from "lucide-react";
import ChangPassword from "@/components/change-password/ChangPassword";
import { useAuth } from "@/app/authContext/useAuth";

export default function AccountSettings() {
  const { sessionUser } = useAuth()
  console.log(sessionUser)
  return (
    <div className="py-10 space-y-10">
      {/* My Info Section */}
      <section className="space-y-4 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold">My Info</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" defaultValue={`${sessionUser?.name}`} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" placeholder="Enter your gender" defaultValue={`${sessionUser?.gender}`} />
        </div>
        {
          sessionUser?.email ?  <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={`${sessionUser?.email}`}
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div> :
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              defaultValue={`${sessionUser?.phone}`}
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>
        }

        


        <Button className="w-full bg-blue-600 hover:bg-blue-700">Update Info</Button>
      </section>

      {/* Change Password Section */}
      <ChangPassword></ChangPassword>
    </div>
  );
}
