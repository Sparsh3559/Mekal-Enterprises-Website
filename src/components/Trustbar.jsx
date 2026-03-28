import { Shirt, Headphones, LayoutGrid, Clock, ShoppingBag } from "lucide-react"

const features = [
  { icon: Shirt,       title: "Personalisable Products", desc: "All products can be customised with your logo or name" },
  { icon: Headphones,  title: "Exceptional Support",     desc: "Best in industry support for our customers" },
  { icon: LayoutGrid,  title: "Wide Portfolio",          desc: "100+ types of products giving you ample choice" },
  { icon: Clock,       title: "On-Time Delivery",        desc: "We respect our commitment and fulfil all your orders on time" },
  { icon: ShoppingBag, title: "Single Order",            desc: "Purchase just one item before committing to bulk order" },
]

export default function Trustbar() {
  return (
    <section className="bg-white border-b border-zinc-100 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          {features.map(f => (
            <div key={f.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(95,199,244,0.15)" }}>
                <f.icon size={22} strokeWidth={1.75} style={{ color: "#065999" }} />
              </div>
              <div>
                <p className="text-xs md:text-sm font-700 text-zinc-900 font-bold leading-snug">{f.title}</p>
                <p className="text-[11px] md:text-xs text-zinc-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}