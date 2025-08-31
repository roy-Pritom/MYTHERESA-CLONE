"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Heart, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import data from "@/data/products.json"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = data.products.find((p) => p.id === params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = data.products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert("Please select a size")
      return
    }
    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        selectedSize,
        selectedColor,
      },
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-black text-white">New</Badge>}
              {product.isSale && <Badge className="absolute top-4 right-4 bg-red-600 text-white">Sale</Badge>}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/4] overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
              <h1 className="text-3xl font-light mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.isSale && (
                  <Badge className="bg-red-600 text-white">
                    {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? "border-black scale-110" : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase() === "multi" ? "#ccc" : color.toLowerCase(),
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-medium mb-3">Size: {selectedSize}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.inStock ? "Add to Bag" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Free shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <ul className="mt-4">
                  <li>Brand: {product.brand}</li>
                  <li>Category: {product.category}</li>
                  {product.sizes && <li>Available sizes: {product.sizes.join(", ")}</li>}
                  <li>Available colors: {product.colors.join(", ")}</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none">
                <h3>Shipping</h3>
                <p>Free standard shipping on orders over $500. Express shipping available.</p>
                <h3>Returns</h3>
                <p>Free returns within 30 days of purchase. Items must be in original condition.</p>
              </div>
            </TabsContent>
            <TabsContent value="care" className="mt-6">
              <div className="prose max-w-none">
                <p>Please follow the care instructions on the product label.</p>
                <p>For luxury items, we recommend professional cleaning when needed.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
