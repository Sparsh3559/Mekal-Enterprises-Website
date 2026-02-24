import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"

export default function MugPrinting() {
  const number = "919999999999"

  const openWhatsApp = () => {
    const msg =
      "Hello, I want details about Mug Printing service."
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
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1400"
          alt="Mug Printing"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Title */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Mug Printing
          </h1>
          <p className="text-white/80 mt-2">
            Personalized mugs for gifts, branding & events
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-lg text-zinc-700 leading-relaxed mb-8">
          High-quality custom mug printing for gifts, corporate
          branding, promotional merchandise, and special events.
          Create memorable products with durable, vibrant prints.
        </p>

        {/* FEATURES */}
        <ul className="grid gap-3 text-zinc-800 mb-10">
          <li>✔ Photo mugs & personalized gifts</li>
          <li>✔ Bulk corporate orders</li>
          <li>✔ Durable, fade-resistant printing</li>
          <li>✔ Fast delivery</li>
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