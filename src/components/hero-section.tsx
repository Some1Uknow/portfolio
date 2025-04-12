import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="container py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Raghav Sharma</h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground">Full Stack Developer</h2>
          <p className="text-muted-foreground max-w-md">
            Subash Nagar, New Delhi, IN
            <br />
            raghu250407@gmail.com • +91 7042019181
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <Button asChild>
              <Link href="/resume.pdf" target="_blank">
                Resume
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">Blog</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-2 rounded-full border border-primary/40"></div>
            <div className="absolute inset-4 rounded-full overflow-hidden bg-muted">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Raghav Sharma"
                width={300}
                height={300}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
