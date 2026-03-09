import { useState, useEffect, useRef } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { supabase } from "@/lib/supabase"
import { Plus, Loader2, CheckCircle, Upload, X, Image } from "lucide-react"

export default function AddProduct() {
  const [categories, setCategories] = useState([])
  const [parents,    setParents]    = useState([])
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState("")

  // Image state
  const [imageFile,    setImageFile]    = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading,    setUploading]    = useState(false)
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    name: "", description: "", category_id: "",
    price: "", tag: "", whatsapp_message: "",
  })

  useEffect(() => {
    supabase.from("Categories").select("*").order("name").then(({ data }) => {
      if (data) {
        setParents(data.filter((c) => !c.parent_id))
        setCategories(data)
      }
    })
  }, [])

  const subsOf = (pid) => categories.filter((c) => c.parent_id === pid)
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  // Handle image file selection
  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5MB."); return }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError("")
  }

  function removeImage() {
    setImageFile(null)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  // Upload image to Supabase Storage, return public URL
  async function uploadImage(file) {
    const ext      = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path     = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(path, file, { cacheControl: "3600", upsert: false })

    if (uploadError) throw new Error(uploadError.message)

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(path)

    return data.publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(""); setSuccess(false)

    if (!form.name.trim())  { setError("Product name is required."); setLoading(false); return }
    if (!form.category_id)  { setError("Please select a category."); setLoading(false); return }
    if (!imageFile)         { setError("Please upload a product image."); setLoading(false); return }

    try {
      // Upload image first
      setUploading(true)
      const imageUrl = await uploadImage(imageFile)
      setUploading(false)

      const whatsapp_message = form.whatsapp_message.trim() ||
        `Hello, I'm interested in ${form.name}. Please share details and pricing.`

      const { error: err } = await supabase.from("Products").insert([{
        name:              form.name.trim(),
        description:       form.description.trim() || null,
        category_id:       Number(form.category_id),
        image_url:         imageUrl,
        price:             form.price ? Number(form.price) : null,
        tag:               form.tag || null,
        whatsapp_message,
        is_active:         true,
        is_featured:       false,
      }])

      if (err) throw new Error(err.message)

      setSuccess(true)
      setForm({ name: "", description: "", category_id: "", price: "", tag: "", whatsapp_message: "" })
      removeImage()
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  const field = (label, key, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>
      <input
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        {...props}
      />
    </div>
  )

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-zinc-900 mb-1">Add Product</h1>
        <p className="text-sm text-zinc-500 mb-8">Add a new product to the catalog.</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {field("Product Name *", "name", { placeholder: "e.g. Polo Matty 240 GSM" })}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Category *</label>
            <select
              value={form.category_id}
              onChange={(e) => set("category_id", e.target.value)}
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
            >
              <option value="">Select a category...</option>
              {parents.map((parent) => (
                <optgroup key={parent.id} label={parent.name}>
                  <option value={parent.id}>{parent.name} (general)</option>
                  {subsOf(parent.id).map((sub) => (
                    <option key={sub.id} value={sub.id}>↳ {sub.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of the product..."
              rows={3}
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Product Image *</label>

            {imagePreview ? (
              <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50">
                <img src={imagePreview} alt="Preview"
                  className="w-full h-56 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <X size={14} className="text-zinc-500" />
                </button>
                <div className="px-4 py-2 text-xs text-zinc-400 bg-white border-t border-zinc-100">
                  {imageFile?.name} · {(imageFile?.size / 1024).toFixed(0)} KB
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Image size={18} className="text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-500">Click to upload image</p>
                <p className="text-xs text-zinc-400">JPG, PNG, WEBP · Max 5MB</p>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {field("Price (₹)", "price", { type: "number", placeholder: "e.g. 299 (optional)" })}

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Tag</label>
            <select
              value={form.tag}
              onChange={(e) => set("tag", e.target.value)}
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
            >
              <option value="">No tag</option>
              {["Best Seller", "Popular", "Premium", "Corporate", "New"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {field("Custom WhatsApp Message", "whatsapp_message", {
            placeholder: "Leave blank to auto-generate from product name"
          })}

          {error   && <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
          {success && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">
              <CheckCircle size={15} /> Product added successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            {loading
              ? <><Loader2 size={15} className="animate-spin" /> {uploading ? "Uploading image..." : "Saving..."}</>
              : <><Plus size={15} /> Add Product</>
            }
          </button>

        </form>
      </div>
    </AdminLayout>
  )
}