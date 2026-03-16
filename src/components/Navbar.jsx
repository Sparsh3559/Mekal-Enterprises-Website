import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ChevronDown, ChevronRight, Search, X, Loader2, Menu } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { nameToSlug } from "@/lib/slugutils"

// ── Badge — purely inline, zero layout impact when absent ────────────────────
const BADGE_STYLES = {
  "New":         "bg-blue-500 text-white",
  "Hot":         "bg-red-500 text-white",
  "Popular":     "bg-purple-500 text-white",
  "Offer":       "bg-green-500 text-white",
  "Best Seller": "bg-amber-500 text-white",
  "Trending":    "bg-pink-500 text-white",
}

function Badge({ label }) {
  if (!label) return null
  const style = BADGE_STYLES[label] || "bg-zinc-500 text-white"
  return (
    <span className={`inline-block align-middle text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ml-1 leading-none flex-shrink-0 ${style}`}>
      {label}
    </span>
  )
}

// ── Split category name at & for clean line breaks ────────────────────────────
function CatLabel({ name }) {
  if (!name.includes("&")) return <span>{name}</span>
  const [before, ...rest] = name.split("&")
  return (
    <span className="text-center leading-tight">
      {before.trim()}&nbsp;&amp;<wbr />{rest.join("&").trim()}
    </span>
  )
}

export default function Navbar() {
  const [open,             setOpen]             = useState(false)
  const [expandedMobile,   setExpandedMobile]   = useState({})
  const [expandedSection,  setExpandedSection]  = useState({})
  const [mobileSearch,     setMobileSearch]     = useState(false)
  const [navTree,          setNavTree]          = useState([])
  const [navLoaded,        setNavLoaded]        = useState(false)
  const [query,            setQuery]            = useState("")
  const [results,          setResults]          = useState([])
  const [searching,        setSearching]        = useState(false)
  const [showDrop,         setShowDrop]         = useState(false)
  const searchRef      = useRef(null)
  const mobileSearchRef = useRef(null)
  const debounceRef    = useRef(null)
  const navigate       = useNavigate()

  async function fetchNavTree() {
    const [catsRes, subsRes, itemsRes] = await Promise.all([
      supabase.from("Categories").select("id, name").order("name"),
      supabase.from("Subcategories").select("id, name, category_id, badge").order("name"),
      supabase.from("Items").select("id, name, subcategory_id, badge").order("name"),
    ])
    const cats  = catsRes.data  || []
    const subs  = subsRes.data  || []
    const items = itemsRes.data || []
    const tree  = cats.map(cat => ({
      ...cat,
      subcategories: subs
        .filter(s => s.category_id === cat.id)
        .map(sub => ({ ...sub, items: items.filter(i => i.subcategory_id === sub.id) })),
    }))
    setNavTree(tree)
    setNavLoaded(true)
  }

  useEffect(() => {
    fetchNavTree()
    const ch = supabase.channel("navbar-3tables")
      .on("postgres_changes", { event: "*", schema: "public", table: "Categories" },    fetchNavTree)
      .on("postgres_changes", { event: "*", schema: "public", table: "Subcategories" }, fetchNavTree)
      .on("postgres_changes", { event: "*", schema: "public", table: "Items" },         fetchNavTree)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowDrop(false); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      const { data } = await supabase
        .from("Products").select("id, name, image_url")
        .ilike("name", `%${query.trim()}%`).eq("is_active", true).limit(8)
      setResults(data || [])
      setShowDrop(true)
      setSearching(false)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false)
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target))
        if (mobileSearch && !query) setMobileSearch(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [mobileSearch, query])

  function clearSearch() { setQuery(""); setResults([]); setShowDrop(false) }
  function handleResultClick(name) { navigate(`/product/${nameToSlug(name)}`); clearSearch(); setMobileSearch(false) }
  function handleSearchKeyDown(e) {
    if (e.key === "Enter" && results.length > 0) handleResultClick(results[0].name)
    if (e.key === "Escape") clearSearch()
  }
  const toggleMobile  = id => setExpandedMobile(p  => ({ ...p, [id]: !p[id] }))
  const toggleSection = id => setExpandedSection(p => ({ ...p, [id]: !p[id] }))

  const DropdownResults = ({ isMobile = false }) => (
    showDrop && results.length > 0 ? (
      <div className={`absolute ${isMobile ? "left-0 right-0 top-full mt-1 max-h-72 overflow-y-auto" : "top-full left-0 right-0 mt-2"} bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50`}>
        <ul>
          {results.map(product => (
            <li key={product.id}>
              <button onClick={() => handleResultClick(product.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50 transition-colors text-left border-b last:border-b-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                  {product.image_url
                    ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-zinc-200" />}
                </div>
                <span className="text-sm text-zinc-800 flex-1 leading-snug">{product.name}</span>
                <ChevronRight size={13} className="text-zinc-300 flex-shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : showDrop && query ? (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-zinc-100 z-50 px-4 py-5 text-sm text-center text-zinc-400">
        No results for "<span className="font-medium text-zinc-600">{query}</span>"
      </div>
    ) : null
  )

  return (
    <header className="sticky top-0 z-50 border-b shadow-sm" style={{ backgroundColor: "#5fc7f4" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">

        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 text-[#065999] transition-colors">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto p-0">
              <div className="sticky top-0 bg-white border-b px-4 py-4 z-10">
                <h2 className="text-base font-bold text-zinc-900">Menu</h2>
              </div>
              <div className="px-3 py-4 space-y-1">
                {!navLoaded && (
                  <div className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-400">
                    <Loader2 size={14} className="animate-spin" /> Loading…
                  </div>
                )}
                {navTree.map(cat => {
                  const catOpen = expandedMobile[cat.id]
                  return (
                    <div key={cat.id} className="rounded-xl overflow-hidden">
                      <div className="flex items-center">
                        <Link to={`/category/${cat.id}`} onClick={() => setOpen(false)}
                          className="flex-1 px-3 py-3 text-sm font-semibold text-zinc-900">
                          {cat.name}
                        </Link>
                        {cat.subcategories.length > 0 && (
                          <button onClick={() => toggleMobile(cat.id)} className="px-3 py-3 text-zinc-400">
                            {catOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        )}
                      </div>
                      {catOpen && (
                        <div className="ml-4 border-l-2 border-zinc-100 pl-3 mb-2 space-y-1">
                          {cat.subcategories.map(sub => {
                            const subOpen = expandedSection[sub.id] ?? false
                            return (
                              <div key={sub.id}>
                                <div className="flex items-center">
                                  <span className="flex-1 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center">
                                    {sub.name}
                                    <Badge label={sub.badge} />
                                  </span>
                                  {sub.items.length > 0 && (
                                    <button onClick={() => toggleSection(sub.id)} className="px-2 py-1.5 text-zinc-400">
                                      {subOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                    </button>
                                  )}
                                </div>
                                {subOpen && sub.items.map(item => (
                                  <Link key={item.id} to={`/product/${nameToSlug(item.name)}`}
                                    onClick={() => setOpen(false)}
                                    className="block px-2 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors">
                                    {item.name}<Badge label={item.badge} />
                                  </Link>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
                <div className="pt-4 mt-4 border-t">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-green-700 rounded-xl hover:bg-green-50">
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-shrink-0">
          <img src="/mekal_logo.png" alt="Mekal Enterprises" className="h-9 md:h-11 w-auto object-contain" />
        </Link>

        {/* Desktop search */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg mx-6 relative">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#065999]/60 pointer-events-none" />
            <Input value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => results.length > 0 && setShowDrop(true)}
              placeholder="Search products..."
              className="pl-9 pr-9 bg-white/30 border-white/40 text-[#065999] placeholder:text-[#065999]/50 focus:bg-white focus:text-zinc-900 focus:placeholder:text-zinc-400 transition-colors font-medium text-sm h-9" />
            {query && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#065999]/60 hover:text-[#065999]">
                {searching ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
              </button>
            )}
          </div>
          <DropdownResults />
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <button onClick={() => setMobileSearch(s => !s)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 text-[#065999]">
            <Search size={20} />
          </button>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#065999] hover:bg-black/10 px-3 py-2 rounded-xl transition-colors whitespace-nowrap">
            💬 Support
          </a>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearch && (
        <div ref={mobileSearchRef} className="md:hidden px-3 pb-3 relative">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-full pl-9 pr-10 py-3 bg-white rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none shadow-md" />
            <button onClick={query ? clearSearch : () => setMobileSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {searching ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
            </button>
          </div>
          <DropdownResults isMobile />
        </div>
      )}

      {/* ── Desktop categories bar — SINGLE LINE ── */}
      <div className="hidden md:block border-t border-[#065999]/20" style={{ backgroundColor: "#5fc7f4" }}>
        <NavigationMenu className="max-w-full mx-auto">
          {/* nowrap = single line; overflow-x-auto = scroll if somehow still too wide */}
          <NavigationMenuList className="flex flex-nowrap justify-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2">
            {!navLoaded && (
              <div className="flex items-center px-4 py-1.5 text-[#065999]/60 text-xs">
                <Loader2 size={12} className="animate-spin" />
              </div>
            )}
            {navTree.map(cat => (
              <NavigationMenuItem key={cat.id} className="flex-shrink-0">
                {/* Compact trigger — smaller padding + font */}
                <NavigationMenuTrigger
                  className="text-[11.5px] font-semibold text-[#065999] bg-transparent hover:bg-black/10 data-[state=open]:bg-black/10 px-2.5 py-1.5 h-auto text-center leading-tight max-w-[130px]">
                  <Link to={`/category/${cat.id}`} onClick={e => e.stopPropagation()}
                    className="hover:underline underline-offset-2">
                    <CatLabel name={cat.name} />
                  </Link>
                </NavigationMenuTrigger>

                {cat.subcategories.length > 0 && (
                  <NavigationMenuContent>
                    <div className="p-5 w-[820px]">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b">
                        <Link to={`/category/${cat.id}`}
                          className="text-xs font-bold text-[#065999] hover:underline">
                          View all {cat.name} →
                        </Link>
                        <span className="text-[10px] text-zinc-400">
                          {cat.subcategories.reduce((n, s) => n + s.items.length, 0)} products
                        </span>
                      </div>

                      {/* Grid of subcategories */}
                      <div className="grid grid-cols-4 gap-x-7 gap-y-5">
                        {cat.subcategories.map(sub => (
                          <div key={sub.id}>
                            {/* Subcategory heading + badge */}
                            <Link to={`/category/${cat.id}`}
                              className="block text-[10px] font-bold uppercase tracking-widest text-zinc-800 hover:text-[#065999] mb-2.5 border-b pb-1.5 transition-colors">
                              {sub.name}<Badge label={sub.badge} />
                            </Link>

                            {sub.items.length > 0 && (
                              <ul className="space-y-1">
                                {sub.items.map(item => (
                                  <li key={item.id}>
                                    <Link to={`/product/${nameToSlug(item.name)}`}
                                      className="block text-[12px] text-zinc-500 hover:text-zinc-900 transition-colors leading-snug hover:underline underline-offset-2">
                                      {item.name}<Badge label={item.badge} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

    </header>
  )
}