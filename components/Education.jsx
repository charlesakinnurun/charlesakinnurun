import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const portfolioItems = [
  {
    name: "Bachelor of Computer Science",
    description: "Lagos State University of Education",
    //year: "2023-2027",  
    icon: "/lasued_icon.jpg",
    url: "https://lasued.edu.ng/web/"
  },
    {
    name: "Future AWS AI Programmer",
    description: "Udacity",
    //year: "2023-2027",  
    icon: "/udacity_logo.jpg",
    url: "https://www.udacity.com/"
  },
    {
    name: "AWS AI/ML Practictioner Challenge",
    description: "Udacity",
    //year: "2023-2027",  
    icon: "/udacity_logo.jpg",
    url: "https://www.udacity.com/"
  },
    {
    name: "Aspire Leaders Program",
    description: "Aspire Institute",
    //year: "2023-2027",  
    icon: "/aspire_leaders_program_logo.jpg",
    url: "https://www.aspireleaders.org/"
  },
  {
    name: "Secondary School Certificate Examination",
    description: "Penny International College",
    //year: "2016-2022",  
    //icon: "/penny-international-college.jpg",
    icon: "/penny_icon.png",
    url: "https://www.pennyinernationalcollege.com/"
  },
 
]

export default function PortfolioCards() {
  return (
    <div className="w-full max-w-[60rem] mx-auto space-y-4 p-4">
      <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
     Education
        </h2>
      {portfolioItems.map((item) => (
        <Link 
          key={item.name}
          href={item.url}
          className="block transition-transform hover:scale-[1.02]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className="p-6 bg-transparent hover:bg-[#242424] border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={item.icon}
                  alt={`${item.description} logo`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </div>
            <span className="text-zinc-500">{item.year}</span>
          </Card>
        </Link>
      ))}
    </div>
  )
}
