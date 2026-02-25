import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function HeroSlider() {
  const [slides, setSlides] = useState([])
  const [index, setIndex] = useState(0)

  // 🔥 Fetch banners from Supabase
  useEffect(() => {
    fetchBanners()
  }, [])

  async function fetchBanners() {
    const { data, error } = await supabase
      .from("Banners")
      .select("*")
      .order("id")

    if (error) {
      console.error(error)
      return
    }

    setSlides(data)
  }

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length)

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    )

  // Auto-play
  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [slides])

  if (slides.length === 0)
    return <div className="h-[80vh] flex items-center justify-center">Loading...</div>

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image from DB */}
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2 max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              {slide.title}
            </h1>

            <p className="text-lg text-white/80 mb-6">
              {slide.subtitle}
            </p>

            <Button size="lg" className="rounded-full px-8">
              {slide.button_text}
            </Button>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition"
      >
        <ChevronRight />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-8 left-[8%] flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === index
                ? "w-10 bg-white"
                : "w-4 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  )
}