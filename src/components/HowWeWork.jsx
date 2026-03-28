const steps = [
  { number: "01", title: "Share Your Design",  desc: "Send us your artwork, logo, or idea. Our team helps you finalise the perfect design." },
  { number: "02", title: "We Prepare & Print", desc: "Your order goes into production using premium materials and precision printing equipment." },
  { number: "03", title: "Quality Check",      desc: "Every item is inspected before packing to make sure it meets our standards." },
  { number: "04", title: "Delivered to You",   desc: "Packed securely and shipped directly to your doorstep — on time, every time." },
]

const mediaItems = [
  { type: "image", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",  caption: "Design Consultation", span: "col-span-2 row-span-2" },
  { type: "image", src: "https://images.unsplash.com/photo-1581093588401-22d4a6d18a44?q=80&w=800", caption: "Screen Printing",    span: "col-span-1 row-span-1" },
  { type: "image", src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800", caption: "Embroidery Work",    span: "col-span-1 row-span-1" },
  { type: "image", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800",    caption: "Quality Inspection", span: "col-span-1 row-span-1" },
  { type: "image", src: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800", caption: "Final Packaging",   span: "col-span-1 row-span-1" },
]

export default function HowWeWork() {
  return (
    <section style={{ backgroundColor: "#065999" }} className="py-14 md:py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#5fc7f4" }}>
            Behind the Scenes
          </p>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            How We Bring Your<br />
            <span style={{ color: "#5fc7f4" }}>Ideas to Life</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            From design to delivery — here's a look at our printing process and the craftsmanship that goes into every order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0"
                    style={{
                      border: "1px solid rgba(95,199,244,0.4)",
                      color: "#5fc7f4",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#5fc7f4"; e.currentTarget.style.color = "#065999" }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#5fc7f4" }}>
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-3 min-h-[32px]"
                      style={{ backgroundColor: "rgba(95,199,244,0.2)" }} />
                  )}
                </div>
                <div className="pb-2 pt-1">
                  <h3 className="text-base font-semibold mb-1 text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2-col grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {mediaItems.map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                <img src={item.src} alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(6,89,153,0.8) 0%, transparent 60%)" }}>
                  <p className="text-white text-xs font-medium px-3 py-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: mosaic */}
          <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-3 h-[480px]">
            {mediaItems.map((item, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden group ${item.span}`}>
                <img src={item.src} alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(6,89,153,0.85) 0%, transparent 60%)" }}>
                  <p className="text-white text-xs font-medium px-3 py-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}