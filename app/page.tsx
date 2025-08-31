import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, RotateCcw, Shield, Award } from "lucide-react"
import data from "@/data/products.json"

export default function HomePage() {
  const featuredProducts = data.products.slice(0, 8)
  const newArrivals = data.products.filter((p) => p.isNew).slice(0, 4)
  const saleProducts = data.products.filter((p) => p.isSale).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=1200&fit=crop"
          alt="New Season Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wide">NEW SEASON</h1>
            <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
              Discover the latest luxury fashion from the world's most coveted designers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                Shop Women
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 bg-transparent"
              >
                Shop Men
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bar */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 mb-3 text-gray-700" />
              <h3 className="font-medium mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $500</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-8 w-8 mb-3 text-gray-700" />
              <h3 className="font-medium mb-1">Free Returns</h3>
              <p className="text-sm text-gray-600">Within 30 days</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-3 text-gray-700" />
              <h3 className="font-medium mb-1">Authenticity</h3>
              <p className="text-sm text-gray-600">100% guaranteed</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 mb-3 text-gray-700" />
              <h3 className="font-medium mb-1">Personal Shopping</h3>
              <p className="text-sm text-gray-600">Expert styling advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200&fit=crop"
                alt="The Edit"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="bg-black text-white mb-4">The Edit</Badge>
                <h2 className="text-4xl font-light mb-4 tracking-wide">Spring Essentials</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Discover our curated selection of must-have pieces for the new season. From statement accessories to
                  timeless classics, find everything you need to refresh your wardrobe.
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Explore The Edit
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 tracking-wide">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="relative h-80 overflow-hidden rounded-lg group cursor-pointer">
                  <Image
                    src={`https://images.unsplash.com/photo-${category.id === "women" ? "1469334031218-e382a71b716b" : category.id === "men" ? "1507003211169-0a1dd7228f2d" : category.id === "kids" ? "1503454537195-1dcabb73ffb9" : "1586023492125-27b2c045efd7"}?w=400&h=600&fit=crop`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-light tracking-wide">{category.name}</h3>
                      <p className="text-sm opacity-90 mt-1">Explore Collection</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-light tracking-wide">New Arrivals</h2>
              <p className="text-gray-600 mt-2 text-lg">The latest from your favorite designers</p>
            </div>
            <Link href="/category/new">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 tracking-wide">Featured Designers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {data.brands.slice(0, 8).map((brand) => (
              <Link key={brand} href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-medium text-sm tracking-wide">{brand}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white text-lg px-6 py-2 mb-6">Sale</Badge>
              <h2 className="text-4xl font-light tracking-wide">Up to 50% Off</h2>
              <p className="text-gray-600 mt-2 text-lg">Limited time offers on selected items</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/sale">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                  Shop All Sale
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6 tracking-wide">Stay in the Know</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Be the first to discover new arrivals, exclusive collections, and receive personalized styling advice from
              our fashion experts.
            </p>
            <div className="flex max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 text-black rounded-l-md border-0 focus:ring-2 focus:ring-white"
              />
              <Button className="rounded-l-none bg-white text-black hover:bg-gray-100 px-8">Subscribe</Button>
            </div>
            <p className="text-sm text-gray-400">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
