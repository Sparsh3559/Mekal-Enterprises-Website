import GiftingPage from "./GiftingPage"

const config = {
  tag:         "womens-gift",
  badge:       "Women's Special",
  title:       "Thoughtful Gifts\nfor Every Woman",
  subtitle:    "Curated gifts that celebrate and appreciate the women in your life and workplace. Premium quality, personalised touch. Order as low as 1 piece.",
  heroImage:   "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1400",
  overlayFrom: "rgba(180,60,100,0.85)",
  overlayTo:   "rgba(100,30,80,0.5)",
  accentColor: "#f472b6",

  occasions: [
    {
      label: "Women's Day",
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800",
    },
    {
      label: "Birthday",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=800",
    },
    {
      label: "Baby Shower",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
    },
    {
      label: "Farewell",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800",
    },
    {
      label: "Appreciation",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800",
    },
  ],

  perks: [
    { value: "1+",   label: "Minimum Order" },
    { value: "5–7",  label: "Days Delivery" },
    { value: "100%", label: "Customisable" },
    { value: "2hr",  label: "Quote Response" },
  ],

  ctaHeading: "Planning a bulk order?",
  ctaSubtext: "Whether it's 10 pieces or 1000 — we handle it all. Share your requirements on WhatsApp.",
}

export default function WomensGifting() {
  return <GiftingPage config={config} />
}