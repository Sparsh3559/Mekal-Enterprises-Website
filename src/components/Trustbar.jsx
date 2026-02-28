import { Shirt, Headphones, LayoutGrid, Clock, ShoppingBag } from "lucide-react"

const features = [
  {
    icon: Shirt,
    title: "Personalisable Products",
    desc: "All products can be customised with your logo or name",
  },
  {
    icon: Headphones,
    title: "Exceptional Support",
    desc: "Best in industry support for our customers",
  },
  {
    icon: LayoutGrid,
    title: "Wide Portfolio",
    desc: "100+ types of products giving you ample of choice",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We respect our commitment and fulfil all your orders on time",
  },
  {
    icon: ShoppingBag,
    title: "Single Order",
    desc: "Purchase just one item before committing to bulk order",
  },
]

export default function TrustBar() {
  return (
    <section className="bg-zinc-50 border-y py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center">
                <f.icon size={24} strokeWidth={1.5} className="text-zinc-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{f.title}</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}