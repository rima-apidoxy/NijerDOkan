
import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactUsPage() {
    return (
        <div className="w-11/12 max-w-2xl mx-auto my-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input type="text" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input type="email" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <Textarea rows={5} placeholder="Your message here..." />
                        </div>
                        <Button type="submit" className="bg-blue-600 text-white">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
