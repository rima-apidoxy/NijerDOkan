import React from 'react'
import {
    Card,

} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CancelledOrderDetails from '@/components/cancelledOrdersDetails/cancelledOrdersDetails'
import MyOrderDetails from '@/components/MyOrderDetails/MyOrderDetails'
import CompletedOrdersDetails from '@/components/completedOrdersDetails/completedOrdersDetails'
export default function MyOrders() {
    return (

        <div className="flex justify-between flex-col gap-6">
            <Tabs defaultValue="active">
                <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                    <Card>
                        <MyOrderDetails></MyOrderDetails>
                    </Card>
                </TabsContent>
                <TabsContent value="cancelled">
                    <Card>
                        <CancelledOrderDetails></CancelledOrderDetails>
                    </Card>
                </TabsContent>
                <TabsContent value="completed">
                    <Card>
                        <CompletedOrdersDetails></CompletedOrdersDetails>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}


