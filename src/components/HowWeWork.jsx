import { useEffect, useRef } from "react"

const steps = [
  { number: "01", title: "Share Your Design",  desc: "Send us your artwork, logo, or idea. Our team helps you finalize the perfect design." },
  { number: "02", title: "We Prepare & Print", desc: "Your order goes into production using premium materials and precision printing equipment." },
  { number: "03", title: "Quality Check",      desc: "Every item is inspected before packing to make sure it meets our standards." },
  { number: "04", title: "Delivered to You",   desc: "Packed securely and shipped directly to your doorstep — on time, every time." },
]

// ── Replace these two src values with your Supabase video URLs ────────────────
const VIDEOS = [
  {
    src:     "https://mzkizexagitatacuwwxj.supabase.co/storage/v1/object/public/products/products/20260312_204214.mp4",
    caption: "Our Printing Process",
  },
  {
    src:     "https://mzkizexagitatacuwwxj.supabase.co/storage/v1/object/public/products/products/your-video-2.mp4",
    caption: "Quality & Packaging",
  },
]

// Individual video component — uses ref to force play on mount
function ReelVideo({ src, caption }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {})           // catch any autoplay policy error silently
  }, [src])

  return (
    <div
      className="relative rounded-[1.8rem] overflow-hidden bg-zinc-800 flex-shrink-0"
      style={{ aspectRatio: "9/16", height: "100%", maxHeight: "480px", width: "auto" }}>
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white text-[11px] font-medium px-3 leading-tight">
        {caption}
      </p>
    </div>
  )
}

export default function HowWeWork() {
  return (
    <section className="py-12 md:py-20 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="mb-14 max-w-xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-3">
            Behind the Scenes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            How We Bring Your<br />
            <span className="text-zinc-400">Ideas to Life</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            From design to delivery — here's a look at our printing process and the craftsmanship that goes into every order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-zinc-600 group-hover:border-white group-hover:bg-white group-hover:text-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-400 transition-all duration-300 flex-shrink-0">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-700 mt-3 min-h-[32px]" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two phone-shaped reels — 9:16 ratio, height drives width */}
          <div
            className="flex gap-4 md:gap-6 justify-center items-center"
            style={{ height: "480px" }}>
            {VIDEOS.map((v, i) => (
              <ReelVideo key={i} src={v.src} caption={v.caption} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}