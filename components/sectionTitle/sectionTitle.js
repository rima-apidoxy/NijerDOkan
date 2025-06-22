import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

export default function SectionTitle({ title }) {
    return (
        <div className="flex items-center justify-between mb-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 border-b-3 border-b-blue-600">
                {title}
            </h2>
            <Button variant="link" className="text-black font-semibold text-md">
                View All <ChevronRight className="text-blue-500" />
            </Button>
        </div>
    )
}
