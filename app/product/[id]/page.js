import ProductDetail from '@/components/productDetail/productDetail'
import React from 'react'

export default function ProductDetailPage({params}) {
    return (
        <>
            <ProductDetail params={params}></ProductDetail>
        </>
    )
}
