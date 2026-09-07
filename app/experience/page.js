import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const experiences = [
  {
    id: "aws-future-ai-programmer",
    company: "Amazon Web Services",
    role: "AI/ML Engineering Scholar - Future AWS AI Programmer",
    period: "July 2026 - Present",
    description: "Developed a Transformer-based NLP model for movie review sentiment analysis, applying tokenization, attention mechanisms, and model fine-tuning to classify reviews as positive or negative and evaluate sentiment classification performance.",
    logo: "/amazon_web_services_logo.jpg"
  },
  {
    id: "aws-ai-practitioner-challenge",
    company: "Amazon Web Services",
    role: "AI/ML Engineering Scholar - AWS AI Practitioner Challenge",
    period: "March 2026 - August 2026",
    description: "Developed an AI productivity application that applied generative AI to automate common tasks, improving workflow efficiency and demonstrating practical application of AWS generative AI technologies.",
    logo: "/amazon_web_services_logo.jpg"
  },
  {
    id: "flyrank-machine-learning-engineering",
    company: "FlyRank AI",
    role: "Machine Learning Engineering Interm",
    period: "June 2026 - Present",
    description: "Developed and evaluated 3–5 machine learning models using Python and scikit-learn, achieving up to 92% classification accuracy on the final validation dataset.",
    logo: "/flyrank_logo.jpg"
  },
  {
    id: "dev-weekends-ai-engineering",
    company: "Dev Weekends",
    role: "AI Engineering Fellow",
    period: "April 2026 - Present",
    description: "Engineered and deployed 5+ AI-powered applications using Python and modern LLM frameworks, improving task automation and user interaction efficiency by up to 80%.",
    logo: "/dev_weekends_logo.jpg"
  },
  {
    id: "analyst-lab-africa-machine-learning",
    company: "Analyst Lab Africa",
    role: "Machine Learning Intern",
    period: "June 2026 - Present",
    description: "Engineered and evaluated 10+ machine learning models using Python, Scikit-learn, Pandas, and NumPy for classification and regression tasks, achieving 85–92% predictive accuracy across multiple datasets.",
    logo: "/analystlab_africa_logo.jpg"
  },
  {
    id: "algoverse-ai-researcher",
    company: "Algoverse",
    role: "AI Researcher",
    period: "July 2026- August 2026",
    description: "Conducting research on state-of-the-art AI techniques, including large language models (LLMs), deep learning, and modern machine learning methodologies.",
    logo: "/algoverse_logo.jpg"
  },
  {
    id: "codealpha-data-science",
    company: "CodeAlpha",
    role: "Data Science & AI/ML Intern",
    period: "June 2026 - August 2026",
    description: "Engineered and deployed 6+ end-to-end data science and machine learning projects using Python, Scikit-learn, TensorFlow, Pandas, and NumPy, improving predictive model performance by up to 22% through iterative optimization.",
    logo: "/codealpha_logo.jpg"
  },
  {
    id: "nexus-trade-1",
    company: "NexusTrade",
    role: "Agentic AI Scholar",
    period: "May 2026 - June 2026",
    description: "Developed practical understanding of AI agents, agentic workflows, LLMs, prompt engineering, and tool-using systems..",
    logo: "/nexus_trade_logo.jpg"
  },
  {
    id: "nexus-trade-2",
    company: "NexusTrade",
    role: "Algorithmic Trading Scholar",
    period: "May 2026 - Sep 2026",
    description: "Applied statistics, probability, mathematical modeling, and data analysis to analyze financial markets and identify trading opportunities.",
    logo: "/nexus_trade_logo.jpg"
  },
  {
    id: "imc",
    company: "IMC Trading",
    role: "IMC Prosperity 4 Participant",
    period: "April 2026",
    description: "Developed and optimized algorithmic trading strategies that improved simulated portfolio returns by 15–25% across multiple rounds.",
    logo: "/imc_logo.jpg"
  },
  {
    id: "oasis-infobyte",
    company: "Oasis Infobyte",
    role: "Data Science Intern",
    period: "June 2024 - Sep 2024",
    description: "Developed and implemented 10+ machine learning models using Python, Scikit-learn, and Pandas for classification and regression tasks, achieving 85–92% predictive accuracy across multiple datasets.",
    logo: "/oasis_infobyte_logo.jpg"
  },
  {
    id: "bcg-x-1",
    company: "BCG X",
    role: "Generative AI",
    period: "Dec 2026 - Jan 2026",
    description: "Developed a Python-based rule-driven financial chatbot that processed two structured CSV datasets to deliver interactive financial insights across Apple, Microsoft, and Tesla, covering key financial data from fiscal years 2021–2023.",
    logo: "/bcg_x_logo.jpg"
  },
  {
    id: "bcg-x-2",
    company: "BCG X",
    role: "Data Science",
    period: "Dec 2026 - Jan 2026",
    description: "Engineered 12 price-differential features across off-peak, peak, and mid-peak tariff periods (December vs. January deltas + cross-period averages) to capture seasonal pricing dynamics as churn signals.",
    logo: "/bcg_x_logo.jpg"
  },
  {
    id: "british-airways",
    company: "British Airways",
    role: "Data Science",
    period: "Nov 2025 - Dec 2025",
    description: "Engineered an end-to-end machine learning pipeline using scikit-learn to identify key drivers of air ticket booking, achieving 85% model accuracy.",
    logo: "/british_airways_logo.jpg"
  },
  {
    id: "lbg",
    company: "Lloyds Banking Group",
    role: "Data Science & Analytics",
    period: "Nov 2025 - Dec 2025",
    description: "Partitioned 1,000 records into an 80/20 stratified train/test split (800 train, 200 test), then applied SMOTE to resolve a 796:204 class imbalance in the training set.",
    logo: "/lloyds_banking_group_logo.jpg"
  },
  {
    id: "jpmc",
    company: "JP Morgan Chase",
    role: "Quantitative Research",
    period: "Nov 2025 - Dec 2025",
    description: "Engineered a SARIMAX-based natural gas price forecasting model using 48 months of historical data, capturing 12-month seasonal patterns and extending predictions to a daily-frequency series one year ahead via a queryable get_price_estimate('YYYY-MM-DD') function.",
    logo: "/jpmc_logo.jpg"
  },
  {
    id: "lagos_subeb",
    company: "Lagos State Universal Basic Education Board",
    role: "Undergraduate Teaching Assistant",
    period: "Sep 2025 - Dec 2025",
    description: "Taught core ICT topics at Army Cantonment Boys Junior Secondary School to 40+ JSS2 students per covering computer components, input/output devices, and basic system operations, achieving over 65% average assessment performance.",
    logo: "/lagos_subeb.jpg"
  },
  {
    id: "quantium",
    company: "Quantium",
    role: "Data Analytics",
    period: "Apr 2025 - May 2025",
    description: "Engineered 7 new time-based features from raw Excel date serials, including Year, Month, Quarter, Week Number, and Weekday, using pandas datetime parsing to enable multi-dimensional time-series analysis",
    logo: "/quantium_logo.jpg"
  },
  {
    id: "citi",
    company: "Citi",
    role: "Market Quantitative Analysis (MQA)",
    period: "Apr 2025 - May 2025",
    description: "Engineered a multi-model quantitative pricing framework for coffee futures options, implementing Cost of Carry, Black-Scholes, and Monte Carlo Simulation models to estimate fair contract values from first principles and benchmark pricing outputs across methodologies.",
    logo: "/citi_logo.jpg"
  },
  {
    id: "dsn-nigeria-1",
    company: "DSN-Data Science Nigeria",
    role: "DSN x Microsoft AI National Skills Initiative (AINSI) - AI for the Future Workforce",
    period: "Apr 2025",
    description: "Enrolled in a nationwide 4-week virtual AI fluency program delivered through a partnership between Data Science Nigeria (DSN), 3MTT, and Microsoft - designed to build strong foundational understanding of AI fundamentals, generative AI, and responsible AI practices..",
    logo: "/dsn_logo.jpg"
  },
  {
    id: "dsn-nigeria-2",
    company: "DSN-Data Science Nigeria",
    role: "DSN x Microsoft Elevate - AI Developer Program",
    period: "Apr 2025",
    description: "Selected to join a nationwide community of learners as part of the DSN Microsoft AI Developers Program - a fully virtual, self-paced 4-week program structured around Data Analytics and Artificial Intelligence.",
    logo: "/dsn_logo.jpg"
  },
  {
    id: "deloitte",
    company: "Deloitte",
    role: "Data Analytics",
    period: "Feb 2025 - March 2025",
    description: "Investigated gender pay inequality across 8+ job roles and 4 global factory locations, analysing 10,000+ employee compensation records to identify pay gaps of up to 12% between comparable roles.",
    logo: "/deloitte_logo.jpg"
  },
  {
    id: "code-alpha-2",
    company: "CodeAlpha",
    role: "Machine Learning Intern",
    period: "Oct 2024 - Feb 2025",
    description: "Developed a handwritten character recognition system using CNNs, achieving 94% accuracy in identifying diverse alphanumeric characters.",
    logo: "/codealpha_logo.jpg"
  },
  {
    id: "code-alpha-3",
    company: "CodeAlpha",
    role: "Data Science Intern",
    period: "Oct 2024 - Feb 2025",
    description: "Engineered a credit scoring model that accurately predicted loan default risk with an 88% AUC-ROC score, optimizing risk assessment protocols.",
    logo: "/codealpha_logo.jpg"
  },
  {
    id: "codsoft",
    company: "Codsoft",
    role: "Machine Learning Intern",
    period: "Feb 2023 - Jun 2023",
    description: "Developed and tuned 10+ machine learning models, achieving an average accuracy increase of 15% through systematic hyperparameter optimization using GridSearchCV.",
    logo: "/codsoft_logo.jpg"
  },
  {
    id: "cognifyz-technologies",
    company: "Cognifyz Technologies",
    role: "Data Science & Machine Learning Intern",
    period: "May 2022 - Aug 2022",
    description: "Developed and tuned 10+ machine learning models, achieving an average accuracy increase of 15% through systematic hyperparameter optimization using GridSearchCV.",
    logo: "/cognifyz_technologies_logo.jpg"
  },
]

const communityExperiences = [
  {
    id: "github-open-source-developer",
    community: "GitHub",
    role: "Open Source Developer",
    period: "Jan 2024 - Present",
    description: "Engineered and maintained a portfolio of 200+ repositories executing 2000+ commits across personal and open source projects in data science, machine learning, computer science, natural language processing, computer vision and artificial intelligence.",
    logo: "/github_logo.jpg"
  }
]

function ExperienceCard({ experiences, title }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">{title}</h2>
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="group cursor-pointer bg-zinc-900  rounded-lg p-6 transition-all duration-300 hover:text-[#6b21a8] hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company || exp.community} logo`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <h3 className="text-2xl sm:text-3xl font-semibold  hover:text-[#6b21a8] transition-colors">
                  {exp.company || exp.community}
                </h3>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-zinc-400">{exp.role} | {exp.period}</p>
              <p className="text-sm sm:text-base text-zinc-300">
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section className="w-full min-h-screen bg-transparent text-white py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Experience  
        </h2>
        
        
        <ExperienceCard experiences={experiences} title="" />
        
        <div className="mt-20">
          <ExperienceCard experiences={communityExperiences} title="Community Building" />
        </div>
      </div>
    </section>
  )
}

