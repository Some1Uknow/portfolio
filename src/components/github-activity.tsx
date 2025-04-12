import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GitHubCalendar from "react-github-calendar";

export function GithubActivity() {
  return (
    <main className="flex justify-center items-center">
      
      <GitHubCalendar
        username="some1uknow"
        blockSize={10}
        blockMargin={5}
        colorScheme="light"
      />
    </main>
  );
}
