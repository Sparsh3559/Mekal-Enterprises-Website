import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import WhatsAppButton from "../components/WhatsAppButton"
import Footer from "../components/Footer"
import Trustbar from "../components/Trustbar"
import Promosection from "../components/Promosection"
import HowWeWork from "../components/HowWeWork"
import Testimonials from "../components/Testimonials"
import SideStrips from "../components/SideStrips"
import { supabase } from "@/lib/supabase"
import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react"

const FALLBACK_IMAGES = {
  "Custom Apparel":                      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800",
  "Drinkware":                           "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800",
  "Visiting Cards & ID Cards":           "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800",
  "Stationery, Letterheads & Notebooks": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800",
  "Labels, Stickers & Carry Bags":       "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=800",
}
const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800"

export default function Home() {
  const [services,   setServices]   = useState([])
  const [loadingSvc, setLoadingSvc] = useState(true)
  const [current,    setCurrent]    = useState(0)

  useEffect(() => {
    async function fetchServices() {
      const { data: cats } = await supabase.from("Categories").select("id, name").order("name")
      if (!cats?.length) { setLoadingSvc(false); return }

      const enriched = await Promise.all(cats.map(async (cat) => {
        const { data: subs } = await supabase.from("Subcategories").select("id").eq("category_id", cat.id).limit(3)
        let image = null
        if (subs?.length) {
          const { data: items } = await supabase.from("Items").select("name").in("subcategory_id", subs.map(s => s.id)).limit(5)
          if (items?.length) {
            const { data: products } = await supabase.from("Products").select("image_url")
              .in("name", items.map(i => i.name)).not("image_url", "is", null).eq("is_active", true).limit(1)
            image = products?.[0]?.image_url || null
          }
        }
        return {
          id:    cat.id,
          title: cat.name,
          image: image || FALLBACK_IMAGES[cat.name] || DEFAULT_FALLBACK,
          path:  `/category/${cat.id}`,
        }
      }))

      setServices(enriched)
      setLoadingSvc(false)
    }
    fetchServices()
  }, [])

  const total = services.length
  const prev  = () => setCurrent(c => (c - 1 + total) % total)
  const next  = () => setCurrent(c => (c + 1) % total)

  useEffect(() => {
    if (total < 2) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [current, total])

  return (
    <>
      <SideStrips />
      <Navbar />
      <Hero />
      <Trustbar />

      {/* ── Services Section ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-2">What We Offer</p>
              <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">Our Services</h2>
              <p className="text-zinc-500 mt-2 text-sm max-w-md hidden md:block">
                High-quality custom printing solutions tailored for individuals, brands, and businesses.
              </p>
            </div>
            {total > 1 && (
              <div className="hidden md:flex items-center gap-3">
                <button onClick={prev}
                  className="w-11 h-11 rounded-full border-2 border-zinc-200 flex items-center justify-center hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next}
                  className="w-11 h-11 rounded-full border-2 border-zinc-200 flex items-center justify-center hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {loadingSvc ? (
            <div className="flex items-center justify-center h-48 md:h-96">
              <Loader2 size={28} className="animate-spin text-zinc-300" />
            </div>
          ) : services.length === 0 ? (
            <div className="flex items-center justify-center text-sm text-zinc-400 h-40">
              No categories yet — add them from the admin panel.
            </div>
          ) : (
            <>
              {/* ── Mobile: Simple grid of cards ── */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {services.map(service => (
                  <Link key={service.id} to={service.path}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
                    <img src={service.image} alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white text-sm font-bold leading-tight">{service.title}</h3>
                      <p className="text-white/60 text-xs mt-0.5">Explore →</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ── Desktop: Original 3D carousel ── */}
              <div className="hidden md:block">
                <div
                  className="relative flex items-center justify-center w-full select-none"
                  style={{ height: "440px" }}
                >
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const service    = services[(current + offset + total) % total]
                    const isCenter   = offset === 0
                    const isAdjacent = Math.abs(offset) === 1
                    const isFar      = Math.abs(offset) === 2
                    const cw = 480; const aw = 240; const fw = 160; const gap = 16
                    const translateX =
                      offset === 0  ? 0 :
                      offset === -1 ? -(cw / 2 + aw / 2 + gap) :
                      offset ===  1 ?  (cw / 2 + aw / 2 + gap) :
                      offset === -2 ? -(cw / 2 + aw + fw / 2 + gap * 2) :
                                       (cw / 2 + aw + fw / 2 + gap * 2)
                    return (
                      <div
                        key={service.id + "-" + offset}
                        onClick={() => { if (offset < 0) prev(); else if (offset > 0) next() }}
                        className="absolute rounded-2xl overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          width:     isCenter ? cw : isAdjacent ? aw : fw,
                          height:    isCenter ? 440 : isAdjacent ? 360 : 280,
                          opacity:   isFar ? 0.4 : isAdjacent ? 0.75 : 1,
                          cursor:    isCenter ? "default" : "pointer",
                          zIndex:    isCenter ? 10 : isAdjacent ? 5 : 1,
                          transform: `translateX(${translateX}px)`,
                        }}>
                        <img src={service.image} alt={service.title} draggable={false}
                          className="w-full h-full object-cover" />
                        {isCenter && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                              <div>
                                <p className="text-white/50 text-xs uppercase tracking-widest mb-1 font-medium">
                                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                </p>
                                <h3 className="text-white text-2xl font-bold">{service.title}</h3>
                              </div>
                              <Link to={service.path}
                                onClick={e => e.stopPropagation()}
                                className="flex-shrink-0 ml-4 bg-white text-zinc-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-900 hover:text-white transition-colors">
                                Explore →
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-center gap-2 mt-10">
                  {services.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === current ? "w-8 h-2 bg-zinc-900" : "w-2 h-2 bg-zinc-300 hover:bg-zinc-500"
                      }`} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Promo Sections ── */}
      <Promosection
        tag="Women's Day Special"
        heading="Women's Day Gifts for Your Employees"
        description="Thoughtfully curated gifts that show you value your women workforce. Premium hampers, personalized gifts, and elegant accessories. Order as low as single quantity."
        ctaText="View Range"
        ctaPath="/womens-gifting"
        heroImage="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200"
        bgColor="bg-rose-50"
        tiles={[
          { label: "Premium Gift Hampers",               image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800", path: "/womens-gifting" },
          { label: "Budget-Friendly Options Under ₹500", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800", path: "/womens-gifting" },
          { label: "Personalised Gifts for Your Team",   image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800", path: "/womens-gifting" },
          { label: "Premium Handbags",                   image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800", path: "/womens-gifting" },
        ]}
      />

      <Promosection
        tag="Corporate Solutions"
        heading="Corporate Gifting for Every Occasion"
        description="Build lasting impressions with premium branded merchandise. From onboarding kits to festive hampers — crafted for teams of all sizes."
        ctaText="Explore Corporate Gifts"
        ctaPath="/corporate-giftings"
        heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200"
        bgColor="bg-blue-50"
        tiles={[
          { label: "Branded Merchandise",   image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800", path: "/corporate-giftings" },
          { label: "Office Stationery Kits", image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800", path: "/stationery" },
          { label: "Custom Drinkware",      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800", path: "/drinkware" },
          { label: "Festive Hampers",       image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800", path: "/corporate-giftings" },
        ]}
      />

      <HowWeWork />
      <Testimonials />
      <WhatsAppButton />
      <Footer />
    </>
  )
}