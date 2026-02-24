import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"

export default function BannerPrinting() {
  const number = "919999999999"

  const openWhatsApp = () => {
    const msg =
      "Hello, I want details about Banner & Poster Printing services."
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[55vh]">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400"
          alt="Banner Printing"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Title */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Banner & Poster Printing
          </h1>
          <p className="text-white/80 mt-2">
            Large format printing for events, promotions & branding
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-lg text-zinc-700 leading-relaxed mb-8">
          High-impact large format printing for events, promotions,
          storefronts, exhibitions, and outdoor advertising.
          Designed to grab attention and deliver your message clearly.
        </p>

        {/* FEATURES */}
        <ul className="grid gap-3 text-zinc-800 mb-10">
          <li>✔ Flex banners & vinyl prints</li>
          <li>✔ Indoor & outdoor posters</li>
          <li>✔ Weather-resistant materials</li>
          <li>✔ Custom sizes available</li>
        </ul>

        {/* CTA */}
        <Button
          size="lg"
          className="rounded-full bg-green-500 hover:bg-green-600"
          onClick={openWhatsApp}
        >
          Get Quote on WhatsApp
        </Button>
      </section>

      <Footer />
    </>
  )
}