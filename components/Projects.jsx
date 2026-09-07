import { ArrowUpRight, Github } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const projects = [
  {
    title: "Build your first AI productivity app",
    subtitle: "AWS AI & ML Scholars · Udacity",
    description: "Completed the AWS AI & ML Scholars project to design and ship a first AI productivity application using generative AI tools.",
    image: "/aws-ai-productivity-app.webp",
    tags: ["AWS", "Generative AI", "Udacity", "AI Productivity"],
  },
  {
    title: "Analyze Data using AI with PartyRock",
    subtitle: "AWS AI & ML Scholars · Udacity",
    description: "Completed the AWS AI & ML Scholars project on analyzing data with AI in Amazon PartyRock, turning prompts and datasets into an interactive app.",
    image: "/aws-partyrock-analyze-data.webp",
    tags: ["AWS", "PartyRock", "Data Analysis", "Generative AI"],
  }
]

export default function RecentProjects() {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Recent Projects   
        </h2>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="group flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="md:w-2/5 relative min-h-[220px]">
                <Image 
                 src={project.image}
                 alt={project.title}
                 className="object-cover w-full h-full"
                 width={800}
                 height={600}
                />
              </div>
              
              <div className="md:w-[90%] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-lg text-zinc-400">{project.subtitle}</p>
                    </div>
                    {project.link && (
                      <Link 
                        href={project.link} target="_blank"
                        className="text-white hover:text-purple-400 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <ArrowUpRight className="w-6 h-6" />
                        <span className="sr-only">View Project</span>
                      </Link>
                    )}
                  </div>
                  
                  <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 text-xs text-purple-300 bg-purple-900/30 rounded-full transition-colors duration-300 hover:bg-purple-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.link || project.github) && (
                  <div className="flex justify-between items-center">
                    {project.link && (
                      <Link 
                        href={project.link}
                        className="inline-flex items-center text-white hover:text-purple-400 transition-colors duration-300"
                      >
                        View Project
                        <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Link>
                    )}
                    {project.github && (
                      <Link 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-black hover:text-purple-900 transition-colors duration-300"
                      >
                        <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white">
                          <Github className="w-4 h-4" />
                          <span className="sr-only">GitHub Repo</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

