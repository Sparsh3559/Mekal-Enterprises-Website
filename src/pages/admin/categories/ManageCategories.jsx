import { useState, useEffect, useRef } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Trash2, Plus, Loader2, Pencil, Check, X,
  ChevronDown, ChevronUp, Tag, FolderOpen, Package
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Link } from "react-router-dom"
import { nameToSlug } from "@/lib/slugutils"

export default function ManageCategories() {
  const [categories,    setCategories]    = useState([])  // Categories table
  const [subcategories, setSubcategories] = useState([])  // Subcategories table
  const [items,         setItems]         = useState([])  // Items table
  const [loading,       setLoading]       = useState(true)
  const [expanded,      setExpanded]      = useState({})

  // Add forms
  const [newCat,          setNewCat]          = useState("")
  const [newSub,          setNewSub]          = useState("")
  const [newItem,         setNewItem]         = useState("")
  const [selectedCat,     setSelectedCat]     = useState("")
  const [selectedSubcat,  setSelectedSubcat]  = useState("")
  const [addingCat,       setAddingCat]       = useState(false)
  const [addingSub,       setAddingSub]       = useState(false)
  const [addingItem,      setAddingItem]      = useState(false)

  // Edit / delete
  const [editingId,   setEditingId]   = useState(null)
  const [editTable,   setEditTable]   = useState(null) // "Categories" | "Subcategories" | "Items"
  const [editName,    setEditName]    = useState("")
  const [savingEdit,  setSavingEdit]  = useState(false)
  const [deletingKey, setDeletingKey] = useState(null)

  const editRef = useRef()

  // ── Fetch all 3 tables ────────────────────────────────────────────────────
  async function fetchAll() {
    const [catsRes, subsRes, itemsRes] = await Promise.all([
      supabase.from("Categories").select("*").order("name"),
      supabase.from("Subcategories").select("*").order("name"),
      supabase.from("Items").select("*").order("name"),
    ])
    if (catsRes.data)  setCategories(catsRes.data)
    if (subsRes.data)  setSubcategories(subsRes.data)
    if (itemsRes.data) setItems(itemsRes.data)
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  // Realtime on all 3 tables
  useEffect(() => {
    const ch = supabase.channel("manage-cats-v4")
      .on("postgres_changes", { event: "*", schema: "public", table: "Categories" },    fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "Subcategories" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "Items" },         fetchAll)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  useEffect(() => {
    if (editingId && editRef.current) editRef.current.focus()
  }, [editingId])

  // ── Helpers ───────────────────────────────────────────────────────────────
  const subsForCat   = (catId)  => subcategories.filter(s => s.category_id    === catId)
  const itemsForSub  = (subId)  => items.filter(i => i.subcategory_id === subId)
  const toggleExpand = (key)    => setExpanded(p => ({ ...p, [key]: !p[key] }))
  const onKey        = (e, fn)  => e.key === "Enter" && fn()

  // ── Add Category ──────────────────────────────────────────────────────────
  async function addCategory() {
    if (!newCat.trim()) return
    setAddingCat(true)
    const { error } = await supabase.from("Categories").insert({ name: newCat.trim() })
    if (error) alert(error.message)
    else setNewCat("")
    setAddingCat(false)
  }

  // ── Add Subcategory ───────────────────────────────────────────────────────
  async function addSubcategory() {
    if (!newSub.trim() || !selectedCat) return
    setAddingSub(true)
    const { error } = await supabase.from("Subcategories").insert({
      name: newSub.trim(),
      category_id: Number(selectedCat),
    })
    if (error) alert(error.message)
    else { setNewSub(""); setExpanded(p => ({ ...p, [`cat-${selectedCat}`]: true })) }
    setAddingSub(false)
  }

  // ── Add Item ──────────────────────────────────────────────────────────────
  async function addItem() {
    if (!newItem.trim() || !selectedSubcat) return
    setAddingItem(true)
    const { error } = await supabase.from("Items").insert({
      name: newItem.trim(),
      subcategory_id: Number(selectedSubcat),
    })
    if (error) alert(error.message)
    else { setNewItem(""); setExpanded(p => ({ ...p, [`sub-${selectedSubcat}`]: true })) }
    setAddingItem(false)
  }

  // ── Rename ────────────────────────────────────────────────────────────────
  function startEdit(id, name, table) {
    setEditingId(id); setEditName(name); setEditTable(table)
  }
  async function saveEdit() {
    if (!editName.trim()) return
    setSavingEdit(true)
    const { error } = await supabase.from(editTable).update({ name: editName.trim() }).eq("id", editingId)
    if (error) alert(error.message)
    else { setEditingId(null); setEditTable(null) }
    setSavingEdit(false)
  }
  function cancelEdit() { setEditingId(null); setEditTable(null); setEditName("") }

  // ── Delete ────────────────────────────────────────────────────────────────
  async function deleteRow(id, name, table, key) {
    const msg = table === "Categories"
      ? `Delete category "${name}"? All subcategories and items inside will also be deleted.`
      : table === "Subcategories"
      ? `Delete subcategory "${name}"? All items inside will also be deleted.`
      : `Delete item "${name}"?`
    if (!confirm(msg)) return
    setDeletingKey(key)
    const { error } = await supabase.from(table).delete().eq("id", id)
    if (error) alert(error.message)
    setDeletingKey(null)
  }

  // ── Item chip ─────────────────────────────────────────────────────────────
  function ItemChip({ item }) {
    const isEditing = editingId === item.id && editTable === "Items"
    const key = `item-${item.id}`
    if (isEditing) return (
      <div className="flex items-center gap-1 bg-background border rounded-full px-3 py-1">
        <input ref={editRef} value={editName} onChange={e => setEditName(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit() }}
          className="text-sm outline-none w-36 bg-transparent" />
        <button onClick={saveEdit} className="text-green-600">
          {savingEdit ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        </button>
        <button onClick={cancelEdit} className="text-muted-foreground"><X size={12} /></button>
      </div>
    )
    return (
      <div className="group flex items-center gap-1 bg-background border px-3 py-1 rounded-full text-sm hover:border-primary/50 transition-colors">
        <Link to={`/product/${nameToSlug(item.name)}`} className="hover:text-[#065999] transition-colors">
          {item.name}
        </Link>
        <button onClick={() => startEdit(item.id, item.name, "Items")}
          className="ml-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil size={10} />
        </button>
        <button onClick={() => deleteRow(item.id, item.name, "Items", key)}
          disabled={deletingKey === key}
          className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
          {deletingKey === key ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
        </button>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {categories.length} categories · {subcategories.length} subcategories · {items.length} items
        </p>
      </div>

      {/* ── How it works hint ── */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 text-sm text-blue-800">
        <p className="font-semibold mb-1">How the navbar is structured:</p>
        <p>
          <span className="font-bold">Category</span> → appears as a top tab (e.g. "Custom Apparel") &nbsp;·&nbsp;
          <span className="font-bold">Subcategory</span> → appears as a bold heading in the dropdown (e.g. "Polo T-Shirts") &nbsp;·&nbsp;
          <span className="font-bold">Item</span> → appears as a product link below each heading (e.g. "Polo Matty 240 GSM")
        </p>
      </div>

      {/* ── Add Forms ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">

        {/* Add Category */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-violet-100 rounded-lg"><FolderOpen size={15} className="text-violet-600" /></div>
            <h2 className="font-semibold text-sm">Add Category</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Appears as a top-level tab in the navbar</p>
          <div className="flex gap-2">
            <Input placeholder="e.g. Custom Apparel" value={newCat}
              onChange={e => setNewCat(e.target.value)} onKeyDown={e => onKey(e, addCategory)} />
            <Button onClick={addCategory} disabled={addingCat || !newCat.trim()} size="sm" className="flex-shrink-0">
              {addingCat ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            </Button>
          </div>
        </Card>

        {/* Add Subcategory */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-blue-100 rounded-lg"><Tag size={15} className="text-blue-600" /></div>
            <h2 className="font-semibold text-sm">Add Subcategory</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Appears as a bold section heading inside the dropdown</p>
          <div className="space-y-2">
            <select className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              value={selectedCat} onChange={e => setSelectedCat(e.target.value)}>
              <option value="">Select category…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="flex gap-2">
              <Input placeholder="e.g. Polo T-Shirts" value={newSub}
                onChange={e => setNewSub(e.target.value)} onKeyDown={e => onKey(e, addSubcategory)} />
              <Button onClick={addSubcategory} disabled={addingSub || !newSub.trim() || !selectedCat} size="sm" className="flex-shrink-0">
                {addingSub ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Add Item */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-green-100 rounded-lg"><Package size={15} className="text-green-600" /></div>
            <h2 className="font-semibold text-sm">Add Item</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Appears as a product link — name must match exactly in Products</p>
          <div className="space-y-2">
            <select className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              value={selectedSubcat} onChange={e => setSelectedSubcat(e.target.value)}>
              <option value="">Select subcategory…</option>
              {subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <div className="flex gap-2">
              <Input placeholder="e.g. Polo Matty 240 GSM" value={newItem}
                onChange={e => setNewItem(e.target.value)} onKeyDown={e => onKey(e, addItem)} />
              <Button onClick={addItem} disabled={addingItem || !newItem.trim() || !selectedSubcat} size="sm" className="flex-shrink-0">
                {addingItem ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Tree View ── */}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 size={15} className="animate-spin" /> Loading…
        </div>
      ) : categories.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          No categories yet. Add your first one above.
        </Card>
      ) : (
        <div className="space-y-3">
          {categories.map(cat => {
            const subs     = subsForCat(cat.id)
            const catKey   = `cat-${cat.id}`
            const catOpen  = expanded[catKey] ?? true
            const editingCat = editingId === cat.id && editTable === "Categories"

            return (
              <Card key={cat.id} className="overflow-hidden">

                {/* ── Category row ── */}
                <div className="flex items-center gap-3 px-5 py-4 bg-zinc-50/80">
                  <button onClick={() => toggleExpand(catKey)}
                    className="text-muted-foreground hover:text-foreground flex-shrink-0">
                    {catOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {editingCat ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input ref={editRef} value={editName} onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit() }}
                        className="h-8 text-sm font-semibold max-w-xs" />
                      <button onClick={saveEdit} disabled={savingEdit} className="text-green-600">
                        {savingEdit ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                      </button>
                      <button onClick={cancelEdit} className="text-muted-foreground"><X size={15} /></button>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <Link to={`/category/${cat.id}`}
                        className="font-bold text-zinc-900 hover:text-[#065999] transition-colors">
                        {cat.name}
                      </Link>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 bg-violet-50 rounded-full">
                        Category · {subs.length} subcategories
                      </span>
                    </div>
                  )}

                  {!editingCat && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        onClick={() => startEdit(cat.id, cat.name, "Categories")}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"
                        disabled={deletingKey === `cat-del-${cat.id}`}
                        onClick={() => deleteRow(cat.id, cat.name, "Categories", `cat-del-${cat.id}`)}>
                        {deletingKey === `cat-del-${cat.id}`
                          ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </Button>
                    </div>
                  )}
                </div>

                {/* ── Subcategories ── */}
                {catOpen && subs.length > 0 && (
                  <div className="divide-y">
                    {subs.map(sub => {
                      const subItems  = itemsForSub(sub.id)
                      const subKey    = `sub-${sub.id}`
                      const subOpen   = expanded[subKey] ?? true
                      const editingSub = editingId === sub.id && editTable === "Subcategories"

                      return (
                        <div key={sub.id} className="px-5 py-3">

                          {/* Subcategory row */}
                          <div className="flex items-center gap-2 mb-3">
                            <button onClick={() => toggleExpand(subKey)}
                              className="text-zinc-300 hover:text-zinc-600 flex-shrink-0">
                              {subOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>

                            {editingSub ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Input ref={editRef} value={editName} onChange={e => setEditName(e.target.value)}
                                  onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit() }}
                                  className="h-7 text-sm max-w-xs" />
                                <button onClick={saveEdit} className="text-green-600">
                                  {savingEdit ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                                </button>
                                <button onClick={cancelEdit} className="text-muted-foreground"><X size={13} /></button>
                              </div>
                            ) : (
                              <div className="flex-1 flex items-center gap-2">
                                <Link to={`/category/${sub.id}`}
                                  className="text-sm font-semibold text-zinc-700 hover:text-[#065999] transition-colors">
                                  {sub.name}
                                </Link>
                                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-blue-50 rounded-full">
                                  Subcategory · {subItems.length} items
                                </span>
                              </div>
                            )}

                            {!editingSub && (
                              <div className="flex items-center gap-0.5">
                                <Button variant="ghost" size="icon" className="h-7 w-7"
                                  onClick={() => startEdit(sub.id, sub.name, "Subcategories")}>
                                  <Pencil size={12} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
                                  disabled={deletingKey === `sub-del-${sub.id}`}
                                  onClick={() => deleteRow(sub.id, sub.name, "Subcategories", `sub-del-${sub.id}`)}>
                                  {deletingKey === `sub-del-${sub.id}`
                                    ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Items as chips */}
                          {subOpen && (
                            <div className="ml-5 flex flex-wrap gap-2">
                              {subItems.length > 0
                                ? subItems.map(item => <ItemChip key={item.id} item={item} />)
                                : <span className="text-xs text-zinc-400 italic">No items yet</span>}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {catOpen && subs.length === 0 && (
                  <div className="px-5 py-3 text-xs text-zinc-400 italic">
                    No subcategories yet — add one from the form above
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}