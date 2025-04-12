import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export function EducationSection() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        <Card className="max-w-2xl mx-auto border border-primary/10">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Dronacharya College of Engineering</CardTitle>
              <p className="text-muted-foreground">Gurugram, Haryana, IN</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="font-medium">B.E in Computer Science</p>
              <p className="text-muted-foreground">October 2022 - Present</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
