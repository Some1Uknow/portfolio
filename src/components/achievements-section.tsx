import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

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
    title: "Top 50 Project Ideas – NES Innovation Awards 2024",
    description: "Out of 800+ submissions",
  },
]

export function AchievementsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="border border-primary/10">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  {achievement.description && <p className="text-muted-foreground">{achievement.description}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
