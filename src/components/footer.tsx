import Link from "next/link"
import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Raghav Sharma</h2>
            <p className="text-muted-foreground">Full Stack Developer</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:raghu250407@gmail.com" className="text-muted-foreground hover:text-foreground">
                raghu250407@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+917042019181" className="text-muted-foreground hover:text-foreground">
                +91 7042019181
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Raghav Sharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
