import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function ServiceCard({ title, image, path }) {
  return (
    <Link to={path} className="group block">
      <Card className="
        overflow-hidden
        border
        bg-white
        transition-all duration-300
        hover:shadow-md
      ">

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="
              w-full h-56 object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* CONTENT */}
        <CardContent className="p-6 flex items-center justify-between">

          <h3 className="text-lg font-medium text-gray-900">
            {title}
          </h3>

          <ArrowRight
            size={18}
            className="
              text-gray-400
              transition-all duration-300
              group-hover:text-black
              group-hover:translate-x-1
            "
          />

        </CardContent>

      </Card>
    </Link>
  )
}