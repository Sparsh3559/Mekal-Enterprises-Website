import GiftingPage from "./GiftingPage"

const config = {
  tag:         "corporate-gift",
  badge:       "Corporate Solutions",
  title:       "Corporate Gifting\nfor Every Occasion",
  subtitle:    "Build lasting impressions with premium branded merchandise. From onboarding kits to festive hampers — crafted for teams of all sizes. Single quantity accepted.",
  heroImage:   "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400",
  overlayFrom: "rgba(6,89,153,0.92)",
  overlayTo:   "rgba(6,89,153,0.55)",
  accentColor: "#5fc7f4",

  occasions: [
    {
      label: "Employee Onboarding",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
    },
    {
      label: "Festive Gifting",
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800",
    },
    {
      label: "Client Appreciation",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800",
    },
    {
      label: "Awards & Recognition",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800",
    },
    {
      label: "Team Events",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    },
  ],

  perks: [
    { value: "1+",    label: "Minimum Order" },
    { value: "5–7",   label: "Days Delivery" },
    { value: "100+",  label: "Product Types" },
    { value: "24hr",  label: "Quote Response" },
  ],

  ctaHeading: "Need a bulk order?",
  ctaSubtext: "Share your requirements and get a custom quote within 2 hours. Pan India delivery.",
}

export default function CorporateGiftings() {
  return <GiftingPage config={config} />
}