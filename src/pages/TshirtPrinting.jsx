import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"

export default function TShirtPage() {
  const whatsappNumber = "919999999999"

  const message =
    "Hello, I want details about T-Shirt Printing service."

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`
    window.open(url, "_blank")
  }

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[55vh]">
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400"
          alt="T-Shirt Printing"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Title */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold">
            T-Shirt Printing
          </h1>
          <p className="text-white/80 mt-2">
            Custom apparel for brands, events & teams
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-lg text-zinc-700 leading-relaxed mb-8">
          We provide premium quality custom T-shirt printing for
          events, brands, corporate teams, and personal use.
          Choose from various fabrics, colors, and printing methods
          including DTF, screen printing, and sublimation.
        </p>

        {/* FEATURES */}
        <ul className="grid gap-3 text-zinc-800 mb-10">
          <li>✔ Bulk orders available</li>
          <li>✔ Fast turnaround time</li>
          <li>✔ High-quality prints</li>
          <li>✔ Custom designs supported</li>
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