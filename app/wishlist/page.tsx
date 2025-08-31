"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import data from "@/data/products.json"

export default function WishlistPage() {
  // Mock wishlist data - in a real app this would come from user state/database
  const [wishlistItems] = useState(data.products.slice(0, 3))

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-light mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite items to your wishlist</p>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2 tracking-wide">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-light mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.products.slice(3, 7).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
