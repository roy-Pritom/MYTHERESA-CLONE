"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import { Filter, Grid, List, ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import data from "@/data/products.json"

interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, subcategory] = params.slug
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [showSale, setShowSale] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categoryData = data.categories.find((c) => c.id === category)
  if (!categoryData) {
    notFound()
  }

  const subcategoryData = subcategory ? categoryData.subcategories.find((s) => s.id === subcategory) : null

  const filteredProducts = useMemo(() => {
    const products = data.products.filter((p) => {
      if (p.category !== category) return false
      if (subcategory && p.subcategory !== subcategory) return false
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
      if (selectedColors.length > 0 && !p.colors.some((c) => selectedColors.includes(c))) return false
      if (selectedSizes.length > 0 && p.sizes && !p.sizes.some((s) => selectedSizes.includes(s))) return false
      if (showSale && !p.isSale) return false
      if (showNew && !p.isNew) return false
      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "brand":
        products.sort((a, b) => a.brand.localeCompare(b.brand))
        break
    }

    return products
  }, [category, subcategory, priceRange, selectedBrands, selectedColors, selectedSizes, showSale, showNew, sortBy])

  const brands = [...new Set(data.products.filter((p) => p.category === category).map((p) => p.brand))]
  const colors = [...new Set(data.products.filter((p) => p.category === category).flatMap((p) => p.colors))]
  const sizes = [...new Set(data.products.filter((p) => p.category === category && p.sizes).flatMap((p) => p.sizes!))]

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={50} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                if (selectedColors.includes(color)) {
                  setSelectedColors(selectedColors.filter((c) => c !== color))
                } else {
                  setSelectedColors([...selectedColors, color])
                }
              }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color) ? "border-black scale-110" : "border-gray-300"
              }`}
              style={{
                backgroundColor: color.toLowerCase() === "multi" ? "#ccc" : color.toLowerCase(),
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {sizes.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Sizes</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter((s) => s !== size))
                    } else {
                      setSelectedSizes([...selectedSizes, size])
                    }
                  }}
                  className={`py-1 px-2 text-sm border rounded transition-colors ${
                    selectedSizes.includes(size)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="sale" checked={showSale} onCheckedChange={setShowSale} />
          <label htmlFor="sale" className="text-sm">
            Sale Items
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="new" checked={showNew} onCheckedChange={setShowNew} />
          <label htmlFor="new" className="text-sm">
            New Arrivals
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>{categoryData.name}</span>
          {subcategoryData && (
            <>
              <span className="mx-2">/</span>
              <span>{subcategoryData.name}</span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">{subcategoryData ? subcategoryData.name : categoryData.name}</h1>
          <p className="text-gray-600">{filteredProducts.length} items</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-semibold mb-4">Filters</h2>
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="mt-6">
                      <h2 className="font-semibold mb-4">Filters</h2>
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Mode */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="brand">Brand A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setPriceRange([0, 5000])
                    setSelectedBrands([])
                    setSelectedColors([])
                    setSelectedSizes([])
                    setShowSale(false)
                    setShowNew(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
