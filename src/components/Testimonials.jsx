import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Marketing Manager, TechCorp",
    avatar: "RS",
    rating: 5,
    text: "Mekal delivered 200 custom polo shirts for our company event in just 5 days. The quality was exceptional — stitching, print clarity, fabric feel — all top notch. Will definitely order again.",
    product: "Custom Polo T-Shirts",
  },
  {
    name: "Priya Mehta",
    role: "Founder, Bloom Café",
    avatar: "PM",
    rating: 5,
    text: "Ordered branded mugs and bottles for our café merchandise. Every single piece looked exactly like the design mockup. The magic mugs were a huge hit with our customers!",
    product: "Ceramic Mugs & Bottles",
  },
  {
    name: "Arjun Nair",
    role: "HR Head, InnovateTech",
    avatar: "AN",
    rating: 5,
    text: "We placed a bulk order for employee onboarding kits — t-shirts, water bottles, ID card holders, and tote bags. Everything arrived on time, well-packaged, and perfectly printed.",
    product: "Corporate Gifting Kit",
  },
  {
    name: "Sneha Patel",
    role: "Event Coordinator",
    avatar: "SP",
    rating: 5,
    text: "The customized caps and jerseys for our sports day were a massive hit. Quick turnaround, great pricing, and the team was super responsive throughout the process.",
    product: "Sports Apparel",
  },
  {
    name: "Vikram Joshi",
    role: "Owner, The Merch Store",
    avatar: "VJ",
    rating: 5,
    text: "I run a merchandise store and Mekal has been my go-to for over a year. Consistent quality, no color bleeding, and they handle single orders without any fuss.",
    product: "Custom Merchandise",
  },
  {
    name: "Divya Krishnan",
    role: "Brand Manager",
    avatar: "DK",
    rating: 5,
    text: "Ordered premium stainless steel bottles with our company logo for a client gifting campaign. The engraving and print were flawless. Clients loved them!",
    product: "Premium Steel Bottles",
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const total = testimonials.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 4500)
    return () => clearInterval(t)
  }, [paused, total])

  const visible = [0, 1, 2].map(offset => ({
    ...testimonials[(current + offset) % total],
    key: (current + offset) % total,
  }))

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "#5fc7f4" }}>
            Customer Stories
          </p>
          <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: "#065999" }}>
            What Our Clients Say
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Trusted by startups, corporates and creators across India.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-semibold text-zinc-900 ml-1">5.0</span>
            <span className="text-sm text-zinc-400">· 200+ reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          {visible.map((t, i) => (
            <div key={t.key}
              className={`bg-white rounded-2xl p-6 border flex flex-col transition-all duration-500 ${
                i === 1
                  ? "shadow-lg scale-[1.02]"
                  : "border-zinc-100 shadow-sm"
              }`}
              style={i === 1 ? { borderColor: "#5fc7f4" } : {}}>
              <Quote size={22} className="mb-4 flex-shrink-0" style={{ color: "#5fc7f4" }} />
              <p className="text-sm text-zinc-600 leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="mb-4">
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(95,199,244,0.15)", color: "#065999" }}>
                  {t.product}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#065999" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role}</p>
                  </div>
                </div>
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:           i === current ? "2rem" : "0.5rem",
                height:          "0.5rem",
                backgroundColor: i === current ? "#065999" : "#5fc7f4",
                opacity:         i === current ? 1 : 0.4,
              }} />
          ))}
        </div>

      </div>
    </section>
  )
}