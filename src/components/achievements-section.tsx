'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

type Achievement = {
  id: number
  title: string
  description?: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Smart India Hackathon (SIH) 2024 Winner",
    description: "1st Position as Team Leader",
  },
  {
    id: 2,
    title: "IDE Bootcamp 2025 Finalist",
    description: "Out of 10000 participants",
  },
  {
    id: 3,
    title: "Top 50 Project Ideas – NES Innovation Awards 2024",
    description: "Out of 800+ submissions",
  },
]

export function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    // <section className="py-20 bg-secondary/50">
    //   <div className="container">
        <Card className="max-w-4xl mx-auto border border-primary/10">
          <CardHeader>
            <h2 className="text-3xl font-bold">Achievements</h2>
          </CardHeader>
          <CardContent className="relative overflow-hidden">
            <div className="flex justify-between absolute top-1/2 left-2 right-2 z-10 -translate-y-1/2 pointer-events-none">
              <button
                className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8 flex items-center justify-center"
                onClick={prevSlide}
              >
                <span className="sr-only">Previous</span>
                &#8249;
              </button>
              <button
                className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8 flex items-center justify-center"
                onClick={nextSlide}
              >
                <span className="sr-only">Next</span>
                &#8250;
              </button>
            </div>

            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {achievements.map((achievement) => (
                <div key={achievement.id} className="min-w-full">
                  <Card className="border-0 shadow-none overflow-hidden">
                    <CardHeader className="flex flex-row items-center gap-1">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{achievement.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {achievement.description && (
                        <p className="text-muted-foreground">{achievement.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-1 mt-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
    //   </div>
    // </section>
  )
}
