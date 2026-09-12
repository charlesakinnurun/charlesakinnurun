'use client'

import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/Pagination"
import Image from 'next/image'

const PROJECTS_PER_PAGE = 6

const DIFFICULTY_STYLES = {
  Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Hard: "text-red-400 bg-red-500/10 border-red-500/30",
}

const DEFAULT_DIFFICULTY = "Medium"

const difficultyStyle = (difficulty) =>
  DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES[DEFAULT_DIFFICULTY]

const projects = [
  {
    title: "Emotion Speech Recognition",
    difficulty: "Medium",
    subtitle: "CodeAlpha",
    description: "Developed a deep learning-based speech emotion recognition system that analyzes audio recordings and classifies human emotions such as happiness, sadness, anger, and neutrality. Extracted MFCC features from speech signals and trained neural network models to identify emotional patterns from audio data using datasets such as RAVDESS and TESS.",
    image: "/codealpha-image.jpg",
    tags: ["Python","CNN", "PyTorch", "RNN/LSTM", "MFCC", "Pandas", "Matplotlib", "Scikit-learn", "NumPy"],
    link: "https://github.com/charlesakinnurun/codealpha-emotion-speech-recognition",
    github: "https://github.com/charlesakinnurun/codealpha-emotion-speech-recognition"
  },
  {
    title: "Flight Booking Drivers & Premium Lounge Modelling Framework",
    difficulty: "Medium",
    subtitle: "British Airways",
    description: "Engineered a machine learning pipeline achieving 85% accuracy in predicting customer booking behaviour and developed a scalable demand forecasting framework supporting capacity planning across 1,500+ premium lounge departures at Heathrow Terminal 3.",
    image: "/british-airways-logo.jpg",
    tags: ["Python", "Pandas", "Numpy", "Seaborn", "Matplotlib", "Scikit-learn"],
    link: "https://github.com/charlesakinnurun/british-airways-data-science",
    github: "https://github.com/charlesakinnurun/british-airways-data-science"
  },
  {
    title: "Handwritten Recognition",
    difficulty: "Medium",
    subtitle: "CodeAlpha",
    description: "Architected a deep learning model for recognizing handwritten digits and characters from images using Convolutional Neural Networks (CNNs). Trained on MNIST/EMNIST datasets with image preprocessing and classification techniques, with potential for extension to full word and sentence recognition using sequence models such as CRNNs.",
    image: "/codealpha-image.jpg",
    tags: ["Librosa", "NumPy", "Pandas", "Scikit-learn", "PyTorch", "Matplotlib", "Seaborn", "SoundFile", "SciPy"],
    link: "https://github.com/charlesakinnurun/codealpha-handwritten-character-recognition",
    github: "https://github.com/charlesakinnurun/codealpha-handwritten-character-recognition"
  },
  {
    title: "Coffee Futures Options Pricing & Quantitative Modeling",
    difficulty: "Hard",
    subtitle: "Citi",
    description: "Developed a quantitative pricing framework for coffee futures options by integrating Cost of Carry, Black-Scholes, and Monte Carlo simulation models to value commodity derivatives and analyze pricing under real-world market conditions.",
    image: "/citi-logo.png",
    tags: ["Quantitative Finance", "Black-Scholes", "Risk-Management", "Financial Modelling"],
    link: "https://github.com/charlesakinnurun/citi-mqa",
    github: "https://github.com/charlesakinnurun/citi-mqa"
  },
  {
    title: "Customer Attrition Analysis",
    difficulty: "Medium",
    subtitle: "Lloyds Banking Group",
    description: "Built an end-to-end machine learning pipeline to predict customer churn by engineering customer-level features, optimizing ensemble models, and using SHAP to deliver interpretable insights into the key drivers of customer attrition.",
    image: "/lbg.jpg",
    tags: ["Python", "Scikit-learn", "Pandas", "Seaborn" ,"Matplotlib"],
    link: "https://github.com/charlesakinnurun/lloyds-bank-data-science-and-analytics",
    github: "https://github.com/charlesakinnurun/lloyds-bank-data-science-and-analytics"
  },
  {
    title: "Generative AI Productivity Application",
    difficulty: "Easy",
    subtitle: "AWS & UDACITY",
    description: "Developed a generative AI-powered productivity application using Amazon PartyRock to automate task execution, streamline workflows, and generate intelligent, context-aware responses through natural language interactions.",
    image: "/aws-ai-productivity-app.webp",
    tags: ["AWS", "Generative AI", "Udacity", "AI Productivity"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785913542198/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785913542198/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    title: "Retail Customer Segmentation & Sales Analytics",
    difficulty: "Medium",
    subtitle: "Quantium",
    description: "Analyzed retail transaction and customer behavior data to segment customers, uncover sales trends, evaluate marketing experiments, and generate data-driven recommendations for improving retail performance.",
    image: "/quantium.jpg",
    tags: ["Python", "Pandas", "NumPy", "EDA"],
    link: "https://github.com/charlesakinnurun/quantium-data-analytics",
    github: "https://github.com/charlesakinnurun/quantium-data-analytics"
  },
  {
    title: "AI-Powered Financial Statement Chatbot",
    difficulty: "Medium",
    subtitle: "BCG X",
    description: "Developed a Python-based financial statement chatbot that enables interactive querying of company financial metrics and growth trends across multiple public companies and fiscal years using structured financial datasets.",
    image: "/bcg-x.png",
    tags: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    link: "https://github.com/charlesakinnurun/BCGX-generative-AI",
    github: "https://github.com/charlesakinnurun/BCGX-generative-AI"
  },
  {
    title: "Daikibo Manufacturing Analytics & Pay Equity Dashboard",
    difficulty: "Medium",
    subtitle: "Deloitte",
    description: "Conducted end-to-end analytics on manufacturing telemetry and employee compensation data to optimize operations and evaluate global pay equity.",
    image: "/deloitte.jpg",
    tags: ["Tableau", "Microsoft Excel", "Python", "Data Analysis"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    title: "Energy Customer Churn Prediction & Retention Analytics",
    difficulty: "Medium",
    subtitle: "BCG X",
    description: "Developed an end-to-end machine learning solution to predict energy customer churn, identify key churn drivers, and optimize a data-driven retention strategy that projected approximately $3,200 in incremental revenue.",
    image: "/bcg-x.png",
    tags: ["AWS", "Data Analysis", "Generative AI", "PartyRock"],
    link: "https://github.com/charlesakinnurun/deloitte-data-analytics",
    github: "https://github.com/charlesakinnurun/deloitte-data-analytics"
  },
  {
    title: "Generative AI Data Analysis with Amazon PartyRock",
    difficulty: "Easy",
    subtitle: "AWS & UDACITY",
    description: "Engineered an AI-powered analytics application with PartyRock to explore datasets, generate insights, summarize trends, and answer natural language questions through an interactive interface.",
    image: "/aws-partyrock-analyze-data.webp",
    tags: ["AWS", "Data Analysis", "Generative AI", "PartyRock"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    title: "Sentinment Analysis",
    difficulty: "Medium",
    subtitle: "CodeAlpha",
    description: "Developed a machine learning-based sentiment analysis system that processes textual reviews and classifies them as positive or negative. Applied NLP techniques for text preprocessing and feature extraction, then trained and evaluated a classification model to identify sentiment patterns in customer feedback.",
    image: "/codealpha-image.jpg",
    tags: ["NLP", "Python", "Scikit-learn", "Pandas", "NumPy", "Seaborn"],
    link: "https://github.com/charlesakinnurun/codealpha-sentinment-analysis",
    github: "https://github.com/charlesakinnurun/codealpha-sentinment-analysis"
  },
  {
    title: "Quantitative Finance & Risk Analytics Research",
    difficulty: "Hard",
    subtitle: "JP Morgan Chase",
    description: "Engineered a SARIMAX-based natural gas price forecasting model using 48 months of historical data, capturing 12-month seasonal patterns and extending predictions to a daily-frequency series one year ahead via a queryable get_price_estimate('YYYY-MM-DD') function.",
    image: "/jpmorganchase.png",
    tags: ["AWS", "Data Analysis", "Generative AI", "PartyRock"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    title: "Credit Scoring Model",
    difficulty: "Medium",
    subtitle: "CodeAlpha",
    description: "Developed a machine learning credit scoring model to predict creditworthiness from financial and repayment history, using feature engineering and classification algorithms to identify high- and low-risk borrowers.",
    image: "/codealpha-image.jpg",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Seaborn"],
    link: "https://github.com/charlesakinnurun/codealpha-credit-scoring-model",
    github: "https://github.com/charlesakinnurun/codealpha-credit-scoring-model"
  },
  {
    title: "Data Visualization",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Created an interactive data visualization project that transformed raw datasets into clear, insightful visualizations. Analyzed trends, patterns, and relationships using charts and graphs to communicate data-driven insights effectively and support better decision-making.",
    image: "/codealpha-image.jpg",
    tags: ["Data Visualization", "Data Analysis", "EDA", "Data Cleaning"],
    link: "https://github.com/charlesakinnurun/codealpha-data-visualization",
    github: "https://github.com/charlesakinnurun/codealpha-data-visualization"
  },
  {
    title: "Stcok Portfolio Tracker",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a Stock Portfolio Tracker that allows users to record stock holdings, calculate investment values, and monitor portfolio performance. The project applies Python programming, data structures, and financial calculations to create a practical tool for managing stock investments.",
    image: "/codealpha-image.jpg",
    tags: ["Python","Pandas", "NumPy", "Matplotlib", "yfinance"],
    link: "https://github.com/charlesakinnurun/codealpha-stock-portfolio-tracker",
    github: "https://github.com/charlesakinnurun/codealpha-stock-portfolio-tracker"
  },
  {
    title: "Hangman Game",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed an interactive Hangman word-guessing game that challenges players to identify hidden words by guessing letters while managing a limited number of attempts. Implemented game logic, user input handling, word selection, and win/loss conditions to create an engaging console or web-based gaming experience.",
    image: "/codealpha-image.jpg",
    tags: ["Python", "Random", "Tkinter"],
    link: "https://github.com/charlesakinnurun/codealpha-hangman-game",
    github: "https://github.com/charlesakinnurun/codealpha-hangman-game"
  },
  {
    title: "Task Automation",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Engineered a Python-based task automation solution to streamline repetitive file and data management tasks, including file organization, email extraction, and webpage title retrieval.",
    image: "/codealpha-image.jpg",
    tags: ["Python", "OS", "Shutil", "Regex (re)", "Requests", "File Handling"],
    link: "https://github.com/charlesakinnurun/codealpha-task-automation",
    github: "https://github.com/charlesakinnurun/codealpha-task-automation"
  },
  {
    title: "Disease Prediction",
    difficulty: "Medium",
    subtitle: "CodeAlpha",
    description: "Developed a machine learning model to predict the likelihood of diseases using structured patient data such as symptoms, age, and blood test results. Applied classification algorithms including SVM, Logistic Regression, Random Forest, and XGBoost to analyze medical datasets and evaluate predictive performance using standard classification metrics.",
    image: "/codealpha-image.jpg",
    tags: ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
    link: "https://github.com/charlesakinnurun/codealpha-disease-prediction",
    github: "https://github.com/charlesakinnurun/codealpha-disease-prediction"
  },
  {
    title: "Basic Chatbot",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a rule-driven chatbot that processes user inputs and delivers predefined responses using conditional logic, functions, loops, and input/output handling.",
    image: "/codealpha-image.jpg",
    tags: ["Python", "if-elif", "Functions", "Loops", "Input/Output", "String Handling"],
    link: "https://github.com/charlesakinnurun/codealpha-chatbot",
    github: "https://github.com/charlesakinnurun/codealpha-chatbot"
  },
  {
    title: "Calculator",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a calculator application that performs basic arithmetic operations using user input, conditional logic, functions, and loops.",
    image: "/codealpha-image.jpg",
    tags: ["Python", "Functions", "Conditional Statements", "Input/Output", "Loops", "Arithmetic Operators"],
    link: "https://github.com/charlesakinnurun/codealpha-calculator",
    github: "https://github.com/charlesakinnurun/codealpha-calculator"
  },
  {
    title: "Matrix",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a Python-based matrix operations project that performs mathematical computations on matrices, demonstrating practical use of arrays, loops, functions, and numerical operations.",
    image: "/codealpha-image.jpg",
    tags: [ "Python", "NumPy", "Lists", "Functions", "Loops", "Matrix Operations", "Input/Output"],
    link: "https://github.com/charlesakinnurun/codealpha-matrix",
    github: "https://github.com/charlesakinnurun/codealpha-matrix"
  },
  {
    title: "Student Management System",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a Python-based matrix operations project that performs mathematical computations on matrices, demonstrating practical use of arrays, loops, functions, and numerical operations.",
    image: "/codealpha-image.jpg",
    tags: [ "Python", "NumPy", "Lists", "Functions", "Loops", "Matrix Operations", "Input/Output"],
    link: "https://github.com/charlesakinnurun/codealpha-matrix",
    github: "https://github.com/charlesakinnurun/codealpha-matrix"
  },
]


export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
           My Projects
          </h2>
        <div key={currentPage} className="space-y-12 animate-in fade-in duration-300">
          {paginatedProjects.map((project, index) => (
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
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-lg text-zinc-400">{project.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border shrink-0 ${difficultyStyle(project.difficulty)}`}
                      >
                        {project.difficulty || DEFAULT_DIFFICULTY}
                      </span>
                      <Link 
                        href={project.link} target="_blank"
                        className="text-white hover:text-purple-400 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <ArrowUpRight className="w-6 h-6" />
                        <span className="sr-only">View Project</span>
                      </Link>
                    </div>
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </section>
  )
}

