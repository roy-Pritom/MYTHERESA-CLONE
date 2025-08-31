"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        selectedColor: product.colors[0],
        selectedSize: product.sizes?.[0],
      },
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    // Quick view functionality would go here
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="group relative bg-white overflow-hidden transition-all duration-500 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-black text-white text-xs px-2 py-1">New</Badge>}
            {product.isSale && (
              <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                {product.originalPrice &&
                  `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white shadow-lg"
              onClick={handleQuickView}
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div
              className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          )}

          {/* Quick Add Button */}
          <div
            className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{product.brand}</div>
          <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-gray-900">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Colors */}
          <div className="flex gap-1 pt-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    color.toLowerCase() === "multi"
                      ? "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)"
                      : color.toLowerCase() === "nude"
                        ? "#f5deb3"
                        : color.toLowerCase() === "beige/ebony"
                          ? "#f5f5dc"
                          : color.toLowerCase(),
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 ml-1 self-center">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div className="text-xs text-gray-500">
              Sizes: {product.sizes.slice(0, 3).join(", ")}
              {product.sizes.length > 3 && ` +${product.sizes.length - 3} more`}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
