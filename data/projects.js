/**
 * Project data — the single source of truth for project content.
 *
 * - `projects`: every project (used by the /projects page).
 * - `featuredProjects`: the homepage subset (used by the homepage section).
 *
 * To add a new project, append one object here and drop its screenshots
 * under `/public/images/projects/<project-slug>/`. No component changes
 * needed — cards, modal, gallery, and lightbox all read from this file.
 *
 * Image shape (any number of images, never hardcoded to a count):
 *
 *   images: [
 *     "/images/projects/language-translator/screenshot-1.png",
 *     "/images/projects/language-translator/screenshot-2.png",
 *   ]
 *
 * The older single `image` field still works (normalized into `images`
 * by `lib/projectImages`), so existing entries keep rendering while you
 * migrate them one image at a time.
 *
 * Optional showcase fields — only fill in what is real. Anything omitted
 * is simply hidden in the modal. Never invent metrics, features, or results:
 *
 *   category:     e.g. "AI / Full Stack"
 *   problem:      problem / motivation paragraph
 *   features:     array of key-feature bullets
 *   contribution: "My contribution" paragraph
 *   results:      results / impact paragraph
 *   liveUrl:      live demo URL (preferred; legacy `link` still works)
 *   githubUrl:    repository URL (preferred; legacy `github` still works)
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [description]
 * @property {string} [difficulty]
 * @property {string} [category]
 * @property {string[]} [images]
 * @property {string} [image]
 * @property {string[]} [tags]
 * @property {string[]} [technologies]
 * @property {string} [link] Legacy live/demo URL.
 * @property {string} [liveUrl] Live demo URL.
 * @property {string} [github] Legacy repository URL.
 * @property {string} [githubUrl] Repository URL.
 * @property {string} [problem] Problem / motivation.
 * @property {string[]} [features] Key features.
 * @property {string} [contribution] Author's contribution.
 * @property {string} [results] Results / impact.
 */

export const projects = [
  {
    id: "emotion-speech-recognition",
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
    id: "flight-booking-lounge-modelling",
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
    id: "handwritten-recognition",
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
    id: "coffee-futures-options-pricing",
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
    id: "customer-attrition-analysis",
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
    id: "generative-ai-productivity-app",
    title: "Generative AI Productivity Application",
    difficulty: "Easy",
    subtitle: "AWS & UDACITY",
    description: "Developed a generative AI-powered productivity application using Amazon PartyRock to automate task execution, streamline workflows, and generate intelligent, context-aware responses through natural language interactions.",
    image: "/aws-ai-productivity-app.webp",
    tags: ["AWS", "Generative AI", "Udacity", "AI Productivity"],
    link: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785913542198/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE",
    github: "https://www.linkedin.com/in/charlesakinnurun/overlay/1785912206901/single-media-viewer/?profileId=ACoAAFkUBa8BSXQN5XD3dT9UvDGZw_pbP8NDByE"
  },
  {
    id: "retail-segmentation-sales-analytics",
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
    id: "financial-statement-chatbot",
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
    id: "daikibo-pay-equity-dashboard",
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
    id: "energy-churn-retention",
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
    id: "partyrock-data-analysis",
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
    id: "sentiment-analysis",
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
    id: "quant-finance-risk-research",
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
    id: "credit-scoring-model",
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
    id: "data-visualization",
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
    id: "stock-portfolio-tracker",
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
    id: "hangman-game",
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
    id: "task-automation",
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
    id: "disease-prediction",
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
    id: "basic-chatbot",
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
    id: "calculator",
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
    id: "matrix-operations",
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
    id: "student-management-system",
    title: "Student Management System",
    difficulty: "Easy",
    subtitle: "CodeAlpha",
    description: "Developed a Python-based matrix operations project that performs mathematical computations on matrices, demonstrating practical use of arrays, loops, functions, and numerical operations.",
    image: "/codealpha-image.jpg",
    tags: [ "Python", "NumPy", "Lists", "Functions", "Loops", "Matrix Operations", "Input/Output"],
    link: "https://github.com/charlesakinnurun/codealpha-matrix",
    github: "https://github.com/charlesakinnurun/codealpha-matrix"
  },
];

/**
 * Homepage showcase subset. To feature a project from `projects` here,
 * copy its object (or reference it) into this array — e.g.:
 *
 *   import { projects } from "@/data/projects";
 *   const featuredProjects = ["generative-ai-productivity-app"].map(
 *     (id) => projects.find((p) => p.id === id)
 *   );
 */
export const featuredProjects = [
  // Homepage keeps its current editorial titles/descriptions for these two,
  // plus the PartyRock deep-dive card, in the current display order.
  {
    id: "featured-ai-productivity-app",
    title: "Build your first AI productivity app",
    subtitle: "AWS AI & ML Scholars · Udacity",
    description: "Completed the AWS AI & ML Scholars project to design and ship a first AI productivity application using generative AI tools.",
    images: ["/aws-ai-productivity-app.webp"],
    tags: ["AWS", "Generative AI", "Udacity", "AI Productivity"],
  },
  {
    id: "featured-partyrock-analyze-data",
    title: "Analyze Data using AI with PartyRock",
    subtitle: "AWS AI & ML Scholars · Udacity",
    description: "Completed the AWS AI & ML Scholars project on analyzing data with AI in Amazon PartyRock, turning prompts and datasets into an interactive app.",
    images: ["/aws-partyrock-analyze-data.webp"],
    tags: ["AWS", "PartyRock", "Data Analysis", "Generative AI"],
  },
  {
    id: "featured-partyrock-analyze-data-2",
    title: "Analyze Data using AI with PartyRock",
    subtitle: "AWS AI & ML Scholars · Udacity",
    description: "Completed the AWS AI & ML Scholars project on analyzing data with AI in Amazon PartyRock, turning prompts and datasets into an interactive app.",
    images: ["/aws-partyrock-analyze-data.webp"],
    tags: ["AWS", "PartyRock", "Data Analysis", "Generative AI"],
  },
];
