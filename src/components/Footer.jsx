import { Link } from "react-router-dom"
import { Phone, Mail, Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react"

// ── Inline SVG wave — no image file needed ────────────────────────────────────
function Wave({ flip = false }) {
  return (
    <svg
      viewBox="0 0 80 120"
      className="h-20 md:h-24 w-auto opacity-70"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M40 5 C55 20, 70 35, 55 55 C40 75, 20 80, 30 100 C38 115, 50 118, 40 118"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M55 10 C68 28, 75 48, 60 65 C45 82, 28 85, 38 105 C44 118, 56 120, 50 120"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M25 8 C38 25, 48 42, 35 60 C22 78, 10 82, 20 100 C27 113, 38 116, 30 118"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
    </svg>
  )
}

export default function Footer() {
  const allProducts = [
    { label: "Custom Apparel",                       to: "/apparels" },
    { label: "Custom Drinkware",                     to: "/drinkware" },
    { label: "Stationery, Letterheads & Notebooks",  to: "/stationery" },
    { label: "Stamps and Ink",                       to: "/stationery" },
    { label: "Signs, Posters & Marketing Materials", to: "/" },
    { label: "Corporate Gifts",                      to: "/corporate-giftings" },
    { label: "Custom Package Water Bottle",          to: "/drinkware" },
    { label: "Custom Bags",                          to: "/labels-stickers" },
    { label: "Labels & Stickers",                    to: "/labels-stickers" },
    { label: "Visiting Cards & ID Cards",            to: "/visiting-cards" },
  ]

  const customerSupport = [
    { label: "Help Desk",                to: "/help" },
    { label: "Privacy Policy",           to: "/privacy-policy" },
    { label: "Return & Shipping Policy", to: "/shipping-policy" },
    { label: "Terms & Conditions",       to: "/terms" },
    { label: "Payment",                  to: "/payment" },
    { label: "Contact Us",               to: "/contact" },
    { label: "FAQs",                     to: "/faqs" },
  ]

  const companyInfo = [
    { label: "About Us",          to: "/about" },
    { label: "Working with Mekal",to: "/about" },
    { label: "Mekal Blog",        to: "/" },
    { label: "Privacy Policy",    to: "/privacy-policy" },
  ]

  const socials = [
    { icon: <Instagram size={16} />, href: "#", label: "Instagram"   },
    { icon: <Facebook  size={16} />, href: "#", label: "Facebook"    },
    { icon: <Twitter   size={16} />, href: "#", label: "X / Twitter" },
    { icon: <Youtube   size={16} />, href: "#", label: "YouTube"     },
    { icon: <Linkedin  size={16} />, href: "#", label: "LinkedIn"    },
  ]

  return (
    <footer style={{ backgroundColor: "#5fc7f4" }} className="text-white relative">

      {/* ── Wave divider ── */}
      <div className="w-full overflow-hidden leading-none -mt-1">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
          className="w-full h-10 md:h-16" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* ── Logo + waves + contact ── */}
      <div className="text-center py-8 border-b border-white/20 px-4">

        {/* Logo flanked by decorative waves */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
          <Wave />
          <img
            src="/mekal_logo.png"
            alt="Mekal Enterprises"
            className="h-24 md:h-28 lg:h-32 w-auto object-contain"
          />
          <Wave flip />
        </div>

        <p className="text-sm md:text-base text-white font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
          We are the best Gifting Solutions Company in India.&nbsp;
          We have a wide range of products for any budget provided to us.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/80">
          <a href="tel:+919131387559"
            className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} className="flex-shrink-0" />
            +91 9131387559
          </a>
          <span className="hidden sm:block text-white/30">•</span>
          <a href="mailto:mekal.enterprises@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} className="flex-shrink-0" />
            mekal.enterprises@gmail.com
          </a>
        </div>
      </div>

      {/* ── Three-column links + socials ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* All Products */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              All Products
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              {allProducts.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              {customerSupport.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info + Socials */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Company Info
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75 mb-8">
              {companyInfo.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/20 text-center text-xs text-white/50 py-4 px-4">
        © {new Date().getFullYear()} Mekal Enterprises. All rights reserved.
      </div>

    </footer>
  )
}