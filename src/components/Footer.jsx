import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const whatsappNumber = "919999999999" // replace

  return (
    <footer className="bg-zinc-950 text-zinc-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">
            PrintCraft
          </h3>

          <p className="text-sm leading-relaxed text-zinc-400">
            Premium custom printing solutions for businesses,
            events, and personal needs.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Services
          </h4>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">T-Shirt Printing</li>
            <li className="hover:text-white cursor-pointer">Mug Printing</li>
            <li className="hover:text-white cursor-pointer">Corporate Printing</li>
            <li className="hover:text-white cursor-pointer">Banner & Poster</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Contact
          </h4>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 99999 99999
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> info@printcraft.com
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={16} /> Indore, India
            </p>
          </div>

          <Button
            className="mt-5 w-full rounded-full bg-green-500 hover:bg-green-600"
            onClick={() =>
              window.open(`https://wa.me/${whatsappNumber}`, "_blank")
            }
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-zinc-800 text-center text-xs text-zinc-500 py-6">
        © {new Date().getFullYear()} PrintCraft. All rights reserved.
      </div>
    </footer>
  )
}