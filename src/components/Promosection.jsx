import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

/**
 * PromoSection — reusable split promo with stepped category tiles
 *
 * Props:
 *  - tag: string           e.g. "Women's Day"
 *  - heading: string
 *  - description: string
 *  - ctaText: string
 *  - ctaPath: string
 *  - heroImage: string     URL for the large right image
 *  - tiles: Array<{ label, image, path }>   4 items
 *  - bgColor: string       Tailwind bg class for the top split, default "bg-amber-50"
 */
export default function PromoSection({
  tag,
  heading,
  description,
  ctaText = "View Range",
  ctaPath = "/",
  heroImage,
  tiles = [],
  bgColor = "bg-amber-50",
}) {
  return (
    <section className="overflow-hidden">

      {/* ── Top split: text left / image right ── */}
      <div className={`${bgColor} grid grid-cols-1 md:grid-cols-2`}>

        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-14">
          {tag && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              {tag}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-zinc-600 text-sm leading-relaxed mb-8 max-w-sm">
            {description}
          </p>
          <Link
            to={ctaPath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:gap-3 transition-all duration-200"
          >
            {ctaText}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Right — hero image */}
        <div className="relative h-72 md:h-auto overflow-hidden">
          <img
            src={heroImage}
            alt={heading}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Stepped tiles ── */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {tiles.map((tile, i) => (
          <Link
            to={tile.path}
            key={i}
            className="group relative overflow-hidden border-r border-zinc-100 last:border-r-0"
            style={{
              // stepped heights — each tile taller than the previous
              height: `${220 + i * 30}px`,
            }}
          >
            {/* BG image */}
            <img
              src={tile.image}
              alt={tile.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-xs uppercase tracking-[0.15em] font-semibold leading-snug">
                {tile.label}
              </p>
            </div>

            {/* Step indicator */}
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{i + 1}</span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}