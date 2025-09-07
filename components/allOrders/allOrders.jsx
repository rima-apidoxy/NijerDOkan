'use client'
import React, { useEffect, useState } from 'react'
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
import CompletedOrdersDetails from '@/components/completedOrdersDetails/completedOrdersDetails'
import MyOrderDetails from '@/components/myOrderDetails/myOrderDetails'
import { useTranslation } from 'react-i18next'

export default function AllOrders() {
    const { t } = useTranslation()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            const accessToken = localStorage.getItem("accessToken");

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to fetch orders")
                setOrders(data.data || [])
            } catch (err) {
                console.error("Error fetching orders:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    // Filter orders based on orderStatus
    const activeOrders = orders.filter(o => !['cancelled', 'delivered'].includes(o.orderStatus))
    const cancelledOrders = orders.filter(o => o.orderStatus === 'cancelled')
    const completedOrders = orders.filter(o => o.orderStatus === 'delivered')

    console.log(activeOrders)

    return (
        <div className="flex justify-between flex-col gap-6">
            <Tabs defaultValue="orders">
                <TabsList>
                    <TabsTrigger value="orders">{t('orders')}</TabsTrigger>
                    {/* <TabsTrigger value="cancelled">{t('cancelled')}</TabsTrigger>
                    <TabsTrigger value="completed">{t('completed')}</TabsTrigger> */}
                </TabsList>

                <TabsContent value="orders">
                    <Card>
                        <MyOrderDetails orders={activeOrders} loading={loading} />
                    </Card>
                </TabsContent>

                {/* <TabsContent value="cancelled">
                    <Card>
                        <CancelledOrderDetails orders={cancelledOrders} loading={loading} />
                    </Card>
                </TabsContent>

                <TabsContent value="completed">
                    <Card>
                        <CompletedOrdersDetails orders={completedOrders} loading={loading} />
                    </Card>
                </TabsContent> */}
            </Tabs>
        </div>
    )
}
