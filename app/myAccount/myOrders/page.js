'use client'
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
import CompletedOrdersDetails from '@/components/completedOrdersDetails/completedOrdersDetails'
import MyOrderDetails from '@/components/myOrderDetails/myOrderDetails'
import { useTranslation } from 'react-i18next'
export default function MyOrders() {

    const { t } = useTranslation();

    return (

        <div className="flex justify-between flex-col gap-6">
            <Tabs defaultValue="active">
                <TabsList>
                    <TabsTrigger value="active">{t('active')}</TabsTrigger>
                    <TabsTrigger value="cancelled">{t('cancelled')}</TabsTrigger>
                    <TabsTrigger value="completed">{t('completed')}</TabsTrigger>
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


