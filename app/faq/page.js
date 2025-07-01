
import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    const faqs = [
        {
            question: "How can I place an order?",
            answer: "You can easily place an order by browsing our products, adding them to your cart, and completing the checkout process."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept bKash Payment method and cash on delivery."
        },
        {
            question: "Can I track my order?",
            answer: "Yes! Once your order ships, you’ll receive a tracking number via email."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days of delivery for most items in new condition."
        },
    ]

    return (
        <div className="w-11/12 max-w-3xl mx-auto my-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
