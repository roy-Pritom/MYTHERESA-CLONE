import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-wide">Customer Care</h3>
            <div className="space-y-3">
              <Link href="/contact" className="block hover:text-gray-300 transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/shipping" className="block hover:text-gray-300 transition-colors text-sm">
                Shipping & Delivery
              </Link>
              <Link href="/returns" className="block hover:text-gray-300 transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="block hover:text-gray-300 transition-colors text-sm">
                Size Guide
              </Link>
              <Link href="/care-guide" className="block hover:text-gray-300 transition-colors text-sm">
                Care Instructions
              </Link>
              <Link href="/faq" className="block hover:text-gray-300 transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-wide">Services</h3>
            <div className="space-y-3">
              <Link href="/personal-shopping" className="block hover:text-gray-300 transition-colors text-sm">
                Personal Shopping
              </Link>
              <Link href="/styling-advice" className="block hover:text-gray-300 transition-colors text-sm">
                Styling Advice
              </Link>
              <Link href="/alterations" className="block hover:text-gray-300 transition-colors text-sm">
                Alterations
              </Link>
              <Link href="/gift-cards" className="block hover:text-gray-300 transition-colors text-sm">
                Gift Cards
              </Link>
              <Link href="/vip-program" className="block hover:text-gray-300 transition-colors text-sm">
                VIP Program
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-wide">Company</h3>
            <div className="space-y-3">
              <Link href="/about" className="block hover:text-gray-300 transition-colors text-sm">
                About Mytheresa
              </Link>
              <Link href="/careers" className="block hover:text-gray-300 transition-colors text-sm">
                Careers
              </Link>
              <Link href="/press" className="block hover:text-gray-300 transition-colors text-sm">
                Press
              </Link>
              <Link href="/sustainability" className="block hover:text-gray-300 transition-colors text-sm">
                Sustainability
              </Link>
              <Link href="/investors" className="block hover:text-gray-300 transition-colors text-sm">
                Investor Relations
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-wide">Legal</h3>
            <div className="space-y-3">
              <Link href="/privacy" className="block hover:text-gray-300 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-gray-300 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block hover:text-gray-300 transition-colors text-sm">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="block hover:text-gray-300 transition-colors text-sm">
                Accessibility
              </Link>
              <Link href="/imprint" className="block hover:text-gray-300 transition-colors text-sm">
                Imprint
              </Link>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-wide">Stay Connected</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Subscribe to receive exclusive offers, styling tips, and be the first to know about new arrivals.
            </p>
            <div className="flex mb-6">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-r-none focus:border-white"
              />
              <Button className="rounded-l-none bg-white text-black hover:bg-gray-100">Subscribe</Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4" />
                <span>customercare@mytheresa.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4" />
                <span>New York, London, Milan</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Mytheresa. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <span>Secure payments powered by</span>
            <div className="flex gap-2">
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">VISA</div>
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">MC</div>
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">AMEX</div>
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
