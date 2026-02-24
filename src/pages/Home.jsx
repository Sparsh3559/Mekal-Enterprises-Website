import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import WhatsAppButton from "../components/WhatsAppButton"
import ServiceCard from "../components/ServiceCard"
import { services } from "../data/services"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* SERVICES SECTION */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* SECTION HEADER */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
              Our Services
            </h2>

            <p className="text-zinc-600 mt-3 max-w-2xl mx-auto">
              High-quality custom printing solutions tailored for
              individuals, brands, and businesses.
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                image={service.image}
                path={service.path}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <WhatsAppButton />

      <Footer />
    </>
  )
}