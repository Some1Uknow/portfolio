'use client'
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";

export function GithubActivity() {
  const { theme } = useTheme();

  return (
    <main className="flex justify-center items-center p-3">
      <GitHubCalendar
        username="some1uknow"
        blockSize={10}
        blockMargin={5}
        colorScheme={theme === "dark" ? "dark" : "light"}
      />
    </main>
  );
}
