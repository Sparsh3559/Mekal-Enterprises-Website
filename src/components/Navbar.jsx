import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
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

export default function Navbar() {
  const [open, setOpen]                       = useState(false)
  const [expandedMobile, setExpandedMobile]   = useState({})
  const [expandedSection, setExpandedSection] = useState({})
  const [mobileSearch, setMobileSearch]       = useState(false)

  const [navTree,   setNavTree]   = useState([])
  const [navLoaded, setNavLoaded] = useState(false)

  const [query,     setQuery]     = useState("")
  const [results,   setResults]   = useState([])
  const [searching, setSearching] = useState(false)
  const [showDrop,  setShowDrop]  = useState(false)
  const searchRef                 = useRef(null)
  const mobileSearchRef           = useRef(null)
  const debounceRef               = useRef(null)
  const navigate                  = useNavigate()

  async function fetchNavTree() {
    const [catsRes, subsRes, itemsRes] = await Promise.all([
      supabase.from("Categories").select("id, name").order("name"),
      supabase.from("Subcategories").select("id, name, category_id").order("name"),
      supabase.from("Items").select("id, name, subcategory_id").order("name"),
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
        .from("Products")
        .select("id, name, image_url")
        .ilike("name", `%${query.trim()}%`)
        .eq("is_active", true)
        .limit(8)
      setResults(data || [])
      setShowDrop(true)
      setSearching(false)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false)
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        if (mobileSearch && !query) setMobileSearch(false)
      }
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

  const toggleMobile  = (id) => setExpandedMobile(p  => ({ ...p, [id]: !p[id] }))
  const toggleSection = (id) => setExpandedSection(p => ({ ...p, [id]: !p[id] }))

  const SearchDropdown = () => (
    showDrop ? (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50">
        {results.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-zinc-400">
            No results for "<span className="font-medium text-zinc-600">{query}</span>"
          </div>
        ) : (
          <>
            <div className="px-3 py-2 border-b bg-zinc-50">
              <p className="text-xs text-zinc-400 font-medium">{results.length} result{results.length !== 1 ? "s" : ""}</p>
            </div>
            <ul>
              {results.map(product => (
                <li key={product.id}>
                  <button onClick={() => handleResultClick(product.name)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                      {product.image_url
                        ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-zinc-200" />}
                    </div>
                    <span className="text-sm text-zinc-800 flex-1 leading-snug">
                      {product.name.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
                        part.toLowerCase() === query.toLowerCase()
                          ? <mark key={i} className="bg-yellow-100 text-zinc-900 rounded px-0.5">{part}</mark>
                          : part
                      )}
                    </span>
                    <ChevronRight size={14} className="text-zinc-300 flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    ) : null
  )

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: "#5fc7f4" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 md:px-6 h-16">

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-2 md:hidden">
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
                          <button onClick={() => toggleMobile(cat.id)}
                            className="px-3 py-3 text-zinc-400">
                            {catOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        )}
                      </div>
                      {catOpen && cat.subcategories.length > 0 && (
                        <div className="ml-4 border-l-2 border-zinc-100 pl-3 mb-2 space-y-1">
                          {cat.subcategories.map(sub => {
                            const subOpen = expandedSection[sub.id] ?? false
                            return (
                              <div key={sub.id}>
                                <div className="flex items-center">
                                  <span className="flex-1 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    {sub.name}
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
                                    {item.name}
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

                {/* Mobile footer links */}
                <div className="pt-4 mt-4 border-t space-y-1">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-green-700 rounded-xl hover:bg-green-50">
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo — centered on mobile */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <img src="/mekal_logo.png" alt="Mekal Enterprises" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop search */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#065999]/60 pointer-events-none" />
            <Input value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => results.length > 0 && setShowDrop(true)}
              placeholder="Search products..."
              className="pl-9 pr-9 bg-white/30 border-white/40 text-[#065999] placeholder:text-[#065999]/50 focus:bg-white focus:text-zinc-900 focus:placeholder:text-zinc-400 transition-colors font-medium" />
            {query && (
              <button onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#065999]/60 hover:text-[#065999] transition-colors">
                {searching ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
              </button>
            )}
          </div>
          <SearchDropdown />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search icon */}
          <button onClick={() => setMobileSearch(s => !s)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 text-[#065999] transition-colors">
            <Search size={20} />
          </button>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#065999] hover:bg-black/10 px-3 py-2 rounded-xl transition-colors">
            Support
          </a>
        </div>
      </div>

      {/* ── Mobile search bar (slides in) ── */}
      {mobileSearch && (
        <div ref={mobileSearchRef} className="md:hidden px-3 pb-3 relative">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-full pl-9 pr-10 py-3 bg-white rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none shadow-md"
            />
            {query ? (
              <button onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                {searching ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
              </button>
            ) : (
              <button onClick={() => setMobileSearch(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <X size={14} />
              </button>
            )}
          </div>
          {showDrop && results.length > 0 && (
            <div className="absolute left-3 right-3 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50 max-h-72 overflow-y-auto">
              <ul>
                {results.map(product => (
                  <li key={product.id}>
                    <button onClick={() => handleResultClick(product.name)}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-zinc-50 transition-colors text-left border-b last:border-b-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                        {product.image_url
                          ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-zinc-200" />}
                      </div>
                      <span className="text-sm text-zinc-800 flex-1 leading-snug text-left">{product.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Desktop categories bar ── */}
      <div className="hidden md:flex justify-center border-t border-[#065999]/20" style={{ backgroundColor: "#5fc7f4" }}>
        <NavigationMenu className="max-w-full">
          <NavigationMenuList className="flex-wrap justify-center">
            {!navLoaded && (
              <div className="flex items-center gap-2 px-4 py-2 text-[#065999]/60 text-sm">
                <Loader2 size={13} className="animate-spin" />
              </div>
            )}
            {navTree.map(cat => (
              <NavigationMenuItem key={cat.id}>
                <NavigationMenuTrigger className="text-sm font-semibold text-[#065999] bg-transparent hover:bg-black/10 data-[state=open]:bg-black/10">
                  <Link to={`/category/${cat.id}`} className="hover:underline underline-offset-2"
                    onClick={e => e.stopPropagation()}>
                    {cat.name}
                  </Link>
                </NavigationMenuTrigger>
                {cat.subcategories.length > 0 && (
                  <NavigationMenuContent>
                    <div className="p-6 w-[860px]">
                      <Link to={`/category/${cat.id}`}
                        className="block text-xs font-semibold text-[#065999] hover:underline mb-4 pb-3 border-b">
                        View all {cat.name} →
                      </Link>
                      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                        {cat.subcategories.map(sub => (
                          <div key={sub.id}>
                            <Link to={`/category/${cat.id}`}
                              className="block text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-[#065999] mb-3 border-b pb-1.5 transition-colors">
                              {sub.name}
                            </Link>
                            {sub.items.length > 0 && (
                              <ul className="space-y-1.5">
                                {sub.items.map(item => (
                                  <li key={item.id}>
                                    <Link to={`/product/${nameToSlug(item.name)}`}
                                      className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-snug">
                                      {item.name}
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