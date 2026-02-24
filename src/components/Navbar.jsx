"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">

      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* Mobile Hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              ☰
            </Button>
          </SheetTrigger>

          {/* MOBILE DRAWER */}
          <SheetContent side="left" className="w-80">
            <div className="space-y-4 mt-6">
              <h2 className="text-xl font-bold">Categories</h2>

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Apparel
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Drinkware
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Marketing
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* LOGO */}
        <div className="text-xl font-bold">PRINT HUB</div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <Input placeholder="Search products..." />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button variant="ghost">Support</Button>
          <Button>Login</Button>
        </div>
      </div>

      {/* ===== CATEGORIES BAR (DESKTOP) ===== */}
      <div className="hidden md:flex justify-center border-t bg-white">

        <NavigationMenu>
          <NavigationMenuList>

            {/* APPAREL */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Apparel</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-4 p-6 w-[400px]">
                  <NavigationMenuLink>T-Shirts</NavigationMenuLink>
                  <NavigationMenuLink>Hoodies</NavigationMenuLink>
                  <NavigationMenuLink>Caps</NavigationMenuLink>
                  <NavigationMenuLink>Jackets</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* DRINKWARE */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Drinkware</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-4 p-6 w-[400px]">
                  <NavigationMenuLink>Mugs</NavigationMenuLink>
                  <NavigationMenuLink>Bottles</NavigationMenuLink>
                  <NavigationMenuLink>Tumblers</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* MARKETING */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-4 p-6 w-[400px]">
                  <NavigationMenuLink>Visiting Cards</NavigationMenuLink>
                  <NavigationMenuLink>Banners</NavigationMenuLink>
                  <NavigationMenuLink>Flyers</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  )
}