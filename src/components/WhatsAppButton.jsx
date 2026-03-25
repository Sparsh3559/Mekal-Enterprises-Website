import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phone = "9131387559"

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      className="
        fixed bottom-6 right-6
        w-14 h-14
        rounded-full
        bg-[#25D366]
        text-white
        flex items-center justify-center
        shadow-lg
        hover:scale-105 hover:shadow-xl
        transition-all duration-200
        z-50
      "
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}