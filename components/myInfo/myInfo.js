"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MyInfoSection() {
    return (
        <section className="space-y-4">
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

            <div className="pt-2 bg-blue-400 rounded-lg hover:bg-blue-600">
                <Button className="w-full">Update</Button>
            </div>
        </section>
    );
}
