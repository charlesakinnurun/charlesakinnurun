import { ArrowUpRight } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/ProjectCard"
import { featuredProjects } from "@/data/projects"

export default function RecentProjects() {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Featured Projects
        </h2>

        <div className="space-y-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id ?? project.title}
              project={project}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Projects
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
