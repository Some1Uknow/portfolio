"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Blockchain Document Verification System",
    excerpt: "Learn how we built SmartDoc, a blockchain-based system for document verification that won SIH 2024.",
    date: "April 2, 2025",
    readTime: "8 min read",
    slug: "blockchain-document-verification",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Power of Next.js App Router",
    excerpt: "Exploring the benefits and features of Next.js App Router for modern web applications.",
    date: "March 15, 2025",
    readTime: "5 min read",
    slug: "nextjs-app-router",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Integrating AI with Web Applications",
    excerpt: "A comprehensive guide to integrating AI capabilities into your web applications.",
    date: "February 28, 2025",
    readTime: "10 min read",
    slug: "ai-web-integration",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function BlogCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute top-1/2 left-2 right-2 z-10 -translate-y-1/2 pointer-events-none">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {blogPosts.map((post) => (
          <div key={post.id} className="min-w-full">
            <Card className="border-0 shadow-none h-full">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-3 pt-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button asChild variant="ghost" size="sm" className="px-0">
                  <Link href={`/blog/${post.slug}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1 mt-2">
        {blogPosts.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
