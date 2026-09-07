'use client'

import { useState } from 'react'
import Image from "next/image"

export default function ToolsGrid() {
  const [hoveredTool, setHoveredTool] = useState(null)

  const tools = [
    {
      name: "Python",
      description: "Programming Language",
      icon: "/python-logo.svg"
    },
    {
      name: "R",
      description: "Programming Language",
      icon: "/R.svg"
    },
    {
      name: "AWS",
      description: "Cloud Computing",
      icon: "/aws-logo.svg"
    },
    {
      name: "Hugging Face",
      description: "NLP & Transformers",
      icon: "/huggingface-icon.svg"
    },
    {
      name: "Pandas",
      description: "Python Library",
      icon: "/pandas.svg"
    },
    {
      name: "Numpy",
      description: "Python Library",
      icon: "/numpy.svg"
    },

    {
      name: "PyTorch",
      description: "Python Library",
      icon: "/pytorch.svg"
    },
    {
      name: "Tensorflow",
      description: "Python Library",
      icon: "/tensorflow.svg"
    },
    {
      name: "Seaborn",
      description: "Python Library",
      icon: "/seaborn-1.svg"
    },
    {
      name: "Matplotlib",
      description: "Python Library",
      icon: "matplotlib-1.svg"
    },
    {
      name: "Sckit-learn",
      description: "Python Library",
      icon: "/scikit-learn.svg"
    },
    {
      name: "Streamlit",
      description: "Deployment",
      icon: "/Streamlit.svg"
    },
    {
      name: "Postman",
      description: "API Testing",
      icon: "https://cdn.worldvectorlogo.com/logos/postman.svg"
    },
    {
      name: "MySQL",
      description: "Database",
      icon: "/MySQL.svg"
    },
    {
      name: "PostgresSQL",
      description: "Database",
      icon: "/PostgresSQL.svg"
    },
  ]

  return (
    <div className="bg-transparent mt-5 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
           My Tech Stack
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`flex items-start gap-4 p-4 border border-zinc-800 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                hoveredTool === tool.name ? 'bg-white bg-opacity-5' : 'bg-transparent'
              }`}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="bg-white rounded-2xl p-3 w-[60px] h-[60px] flex items-center justify-center shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={tool.icon}
                    alt={`${tool.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  {tool.name}
                </h3>
                <p className="text-zinc-500 text-lg">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
