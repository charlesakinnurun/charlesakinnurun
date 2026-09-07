import { ArrowUpRight, Github } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const projects = [
  {
    title: "Flight Booking Drivers & Premium Lounge Modelling Framework",
    subtitle: "British Airways",
    description: "Engineered a machine learning pipeline achieving 85% accuracy in predicting customer booking behaviour and developed a scalable demand forecasting framework supporting capacity planning across 1,500+ premium lounge departures at Heathrow Terminal 3.",
    image: "/flight.jpg",
    tags: ["Python", "Pandas", "Numpy", "Seaborn", "Matplotlib", "Scikit-learn"],
    link: "https://github.com/charlesakinnurun/british-airways-data-science",
    github: "https://github.com/charlesakinnurun/british-airways-data-science"
  },
  {
    title: "Coffee Futures Options Pricing & Quantitative Modeling",
    subtitle: "Citi",
    description: "Developed a quantitative pricing framework for coffee futures options by integrating Cost of Carry, Black-Scholes, and Monte Carlo simulation models to value commodity derivatives and analyze pricing under real-world market conditions.",
    image: "/coffee.jpg",
    tags: ["Quantitative Finance", "Black-Scholes", "Risk-Management", "Financial Modelling"],
    link: "https://github.com/charlesakinnurun/citi-mqa",
    github: "https://github.com/charlesakinnurun/citi-mqa"
  },
  {
    title: "Customer Attrition Analysis",
    subtitle: "Lloyds Banking Group",
    description: "Built an end-to-end machine learning pipeline to predict customer churn by engineering customer-level features, optimizing ensemble models, and using SHAP to deliver interpretable insights into the key drivers of customer attrition.",
    image: "/customer.jpg",
    tags: ["Python", "Scikit-learn", "Pandas", "Seaborn" ,"Matplotlib"],
    link: "https://github.com/charlesakinnurun/lloyds-bank-data-science-and-analytics",
    github: "https://github.com/charlesakinnurun/lloyds-bank-data-science-and-analytics"
  },
  {
    title: "Build your first AI productivity app",
    subtitle: "AWS & UDACITY",
    description: "Completed the AWS AI & ML Scholars project to design and ship a first AI productivity application using generative AI tools.",
    image: "/aws-ai-productivity-app.webp",
    tags: ["AWS", "Generative AI", "Udacity", "AI Productivity"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785913542198/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785913542198/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    title: "Analyze Data using AI with PartyRock",
    subtitle: "AWS & UDACITY",
    description: "Completed the AWS AI & ML Scholars project on analyzing data with AI in Amazon PartyRock, turning prompts and datasets into an interactive app.",
    image: "/aws-partyrock-analyze-data.webp",
    tags: ["AWS", "Data Analysis", "Generative AI", "PartyRock"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
]

export default function Projects() {
  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
           My Projects
          </h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="group flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative h-56 w-full shrink-0 md:h-auto md:min-h-[320px] md:w-2/5">
                <Image 
                 src={project.image}
                 alt={project.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              
              <div className="md:w-[90%] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-lg text-zinc-400">{project.subtitle}</p>
                    </div>
                    <Link 
                      href={project.link} target="_blank"
                      className="text-white hover:text-purple-400 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                      <span className="sr-only">View Project</span>
                    </Link>
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

                <div className="flex justify-between items-center">
                  <Link 
                    href={project.link}
                    className="inline-flex items-center text-white hover:text-purple-400 transition-colors duration-300"
                  >
                    View Project
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Link>
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
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

