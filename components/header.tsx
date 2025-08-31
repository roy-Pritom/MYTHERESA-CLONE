"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, ShoppingBag, Menu, X, Heart, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import data from "@/data/products.json"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const MegaMenu = ({ category }: { category: any }) => (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Categories */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">{category.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {category.subcategories.map((sub: any) => (
                <div key={sub.id}>
                  <Link
                    href={`/category/${category.id}/${sub.id}`}
                    className="block font-medium text-gray-900 hover:text-gray-600 mb-2"
                  >
                    {sub.name}
                  </Link>
                  <div className="space-y-1">
                    <Link
                      href={`/category/${category.id}/${sub.id}?filter=new`}
                      className="block text-sm text-gray-600 hover:text-gray-900"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href={`/category/${category.id}/${sub.id}?filter=sale`}
                      className="block text-sm text-gray-600 hover:text-gray-900"
                    >
                      Sale
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Featured Brands</h3>
            <div className="space-y-2">
              {data.brands.slice(0, 8).map((brand) => (
                <Link
                  key={brand}
                  href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* Editorial */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Editorial</h3>
            <div className="space-y-4">
              {data.editorialContent.map((content) => (
                <Link key={content.id} href={content.link} className="block group">
                  <div className="relative h-32 mb-2 overflow-hidden rounded-lg">
                    <Image
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-600">{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b"}`}
    >
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 p-0">
              <Globe className="h-4 w-4 mr-1" />
              United States
            </Button>
          </div>
          <div>Free shipping on orders over $500 | Free returns within 30 days</div>
          <div className="flex items-center space-x-4">
            <Link href="/customer-care" className="text-xs hover:text-gray-300">
              Customer Care
            </Link>
            <Link href="/size-guide" className="text-xs hover:text-gray-300">
              Size Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col space-y-4 mt-8">
                {data.categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <Link href={`/category/${category.id}`} className="font-semibold text-lg block">
                      {category.name}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${category.id}/${sub.id}`}
                          className="block text-gray-600 hover:text-black"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wider">
            MYTHERESA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {data.categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveMenu(category.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={`/category/${category.id}`}
                  className="font-medium hover:text-gray-600 transition-colors flex items-center"
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
                {activeMenu === category.id && <MegaMenu category={category} />}
              </div>
            ))}
            <Link href="/sale" className="font-medium text-red-600 hover:text-red-700 transition-colors">
              Sale
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search designers, products..."
                    className="w-80 border-gray-300 focus:border-black"
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Shopping Bag */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-black">
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
