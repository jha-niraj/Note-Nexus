import type { Quiz } from "@/types/quiz"

export const quizData: Quiz[] = [
  // Computer Science Quizzes
  {
    id: 1,
    title: "Database Management Systems Quiz",
    subject: "Database Management",
    category: "Computer Science",
    difficulty: "Intermediate",
    timeLimit: 20, // minutes
    questionCount: 15,
    author: "Priya S.",
    rating: 4.8,
    attempts: 1245,
    description:
      "Test your knowledge of relational database concepts, SQL queries, normalization, and transaction management.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["SQL", "DBMS", "Normalization"],
    questions: [
      {
        id: 1,
        question: "Which normal form eliminates transitive dependencies?",
        options: ["First Normal Form", "Second Normal Form", "Third Normal Form", "Boyce-Codd Normal Form"],
        correctAnswer: 2,
        explanation:
          "Third Normal Form (3NF) eliminates transitive dependencies, where a non-key attribute depends on another non-key attribute.",
      },
      {
        id: 2,
        question: "Which SQL statement is used to create a new table in a database?",
        options: ["ALTER TABLE", "CREATE TABLE", "MAKE TABLE", "GENERATE TABLE"],
        correctAnswer: 1,
        explanation: "CREATE TABLE is the SQL statement used to create a new table in a database.",
      },
      {
        id: 3,
        question: "What is a foreign key?",
        options: [
          "A key that can be used to uniquely identify a row in a table",
          "A key that is used to link two tables together",
          "A key that is not used in the table",
          "A key that is used to encrypt data",
        ],
        correctAnswer: 1,
        explanation:
          "A foreign key is a field in one table that refers to the primary key in another table, creating a link between the two tables.",
      },
    ],
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    subject: "Algorithms",
    category: "Computer Science",
    difficulty: "Advanced",
    timeLimit: 30,
    questionCount: 20,
    author: "Rahul M.",
    rating: 4.9,
    attempts: 987,
    description: "Challenge yourself with complex algorithmic problems and data structure implementations.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Algorithms", "Data Structures", "Complexity Analysis"],
    questions: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: 1,
        explanation:
          "Binary search has a time complexity of O(log n) because it divides the search interval in half with each comparison.",
      },
      {
        id: 2,
        question: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Binary Tree"],
        correctAnswer: 1,
        explanation:
          "A stack follows the Last In First Out (LIFO) principle, where the last element added is the first one to be removed.",
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of quicksort?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: 3,
        explanation:
          "The worst-case time complexity of quicksort is O(n²), which occurs when the pivot chosen is always the smallest or largest element.",
      },
    ],
  },

  // Business Quizzes
  {
    id: 3,
    title: "Marketing Management Concepts",
    subject: "Marketing",
    category: "Business",
    difficulty: "Intermediate",
    timeLimit: 25,
    questionCount: 18,
    author: "Ankit K.",
    rating: 4.7,
    attempts: 1432,
    description: "Test your understanding of key marketing concepts, strategies, and consumer behavior.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Marketing", "Consumer Behavior", "Market Segmentation"],
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT one of the 4Ps of marketing?",
        options: ["Product", "Price", "Promotion", "People"],
        correctAnswer: 3,
        explanation:
          "The traditional 4Ps of marketing are Product, Price, Place, and Promotion. People is part of the extended 7Ps.",
      },
      {
        id: 2,
        question: "What is market segmentation?",
        options: [
          "Dividing a market into distinct groups with similar needs",
          "Analyzing competitor strategies",
          "Setting product prices",
          "Designing promotional campaigns",
        ],
        correctAnswer: 0,
        explanation:
          "Market segmentation is the process of dividing a broad consumer market into sub-groups of consumers based on shared characteristics.",
      },
      {
        id: 3,
        question: "Which pricing strategy involves setting a high initial price and then lowering it over time?",
        options: ["Penetration pricing", "Economy pricing", "Price skimming", "Value pricing"],
        correctAnswer: 2,
        explanation:
          "Price skimming involves setting a high initial price for a product and then gradually reducing the price as competitor products enter the market.",
      },
    ],
  },
  {
    id: 4,
    title: "Financial Accounting Principles",
    subject: "Accounting",
    category: "Business",
    difficulty: "Intermediate",
    timeLimit: 30,
    questionCount: 20,
    author: "Manish G.",
    rating: 4.6,
    attempts: 1098,
    description: "Test your knowledge of accounting principles, financial statements, and ratio analysis.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Accounting", "Financial Statements", "Ratio Analysis"],
    questions: [
      {
        id: 1,
        question: "Which financial statement shows a company's revenues and expenses over a period of time?",
        options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Retained Earnings"],
        correctAnswer: 1,
        explanation:
          "The Income Statement (also called Profit and Loss Statement) shows a company's revenues, expenses, and profits/losses over a specific period.",
      },
      {
        id: 2,
        question: "What does the accounting equation state?",
        options: [
          "Assets = Liabilities + Owner's Equity",
          "Assets = Liabilities - Owner's Equity",
          "Assets + Liabilities = Owner's Equity",
          "Assets - Owner's Equity = Liabilities",
        ],
        correctAnswer: 0,
        explanation:
          "The accounting equation states that Assets = Liabilities + Owner's Equity, which is the foundation of the double-entry bookkeeping system.",
      },
      {
        id: 3,
        question: "Which of the following is a liquidity ratio?",
        options: ["Debt-to-Equity Ratio", "Return on Assets", "Current Ratio", "Gross Profit Margin"],
        correctAnswer: 2,
        explanation:
          "The Current Ratio is a liquidity ratio that measures a company's ability to pay short-term obligations by dividing current assets by current liabilities.",
      },
    ],
  },

  // Engineering Quizzes
  {
    id: 5,
    title: "Thermodynamics Fundamentals",
    subject: "Mechanical Engineering",
    category: "Engineering",
    difficulty: "Advanced",
    timeLimit: 35,
    questionCount: 25,
    author: "Ramesh S.",
    rating: 4.8,
    attempts: 876,
    description: "Challenge yourself with complex problems on thermodynamic laws, heat transfer, and thermal systems.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Thermodynamics", "Heat Transfer", "Engineering"],
    questions: [
      {
        id: 1,
        question: "Which law of thermodynamics states that energy cannot be created or destroyed?",
        options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
        correctAnswer: 1,
        explanation:
          "The First Law of Thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another.",
      },
      {
        id: 2,
        question: "What is the unit of thermal conductivity?",
        options: ["W/m²K", "W/mK", "J/kgK", "W/K"],
        correctAnswer: 1,
        explanation:
          "The unit of thermal conductivity is Watts per meter-Kelvin (W/mK), which represents the quantity of heat transmitted through a unit thickness in a direction normal to a surface of unit area.",
      },
      {
        id: 3,
        question: "Which heat transfer mechanism does NOT require a medium?",
        options: ["Conduction", "Convection", "Radiation", "All require a medium"],
        correctAnswer: 2,
        explanation:
          "Radiation is the only heat transfer mechanism that does not require a medium and can occur in a vacuum, as it transfers energy through electromagnetic waves.",
      },
    ],
  },

  // Agriculture Quizzes
  {
    id: 6,
    title: "Soil Science Fundamentals",
    subject: "Soil Science",
    category: "Agriculture",
    difficulty: "Intermediate",
    timeLimit: 25,
    questionCount: 18,
    author: "Gurpreet S.",
    rating: 4.7,
    attempts: 765,
    description:
      "Test your knowledge of soil properties, fertility management, and sustainable agricultural practices.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Soil Science", "Agriculture", "Fertility Management"],
    questions: [
      {
        id: 1,
        question: "Which soil texture has the highest water-holding capacity?",
        options: ["Sandy soil", "Loamy soil", "Clay soil", "Silt soil"],
        correctAnswer: 2,
        explanation:
          "Clay soil has the highest water-holding capacity due to its small particle size and large surface area.",
      },
      {
        id: 2,
        question: "What is soil pH a measure of?",
        options: ["Soil texture", "Hydrogen ion concentration", "Organic matter content", "Soil temperature"],
        correctAnswer: 1,
        explanation:
          "Soil pH is a measure of the hydrogen ion concentration in soil solution, indicating its acidity or alkalinity on a scale of 0-14.",
      },
      {
        id: 3,
        question: "Which nutrient is most commonly deficient in agricultural soils worldwide?",
        options: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"],
        correctAnswer: 0,
        explanation:
          "Nitrogen is the most commonly deficient nutrient in agricultural soils worldwide, as it is required in large amounts by plants and is easily lost through leaching and volatilization.",
      },
    ],
  },

  // Biotechnology Quizzes
  {
    id: 7,
    title: "Molecular Biology Techniques",
    subject: "Molecular Biology",
    category: "Biotechnology",
    difficulty: "Advanced",
    timeLimit: 30,
    questionCount: 20,
    author: "Sneha M.",
    rating: 4.8,
    attempts: 654,
    description:
      "Test your knowledge of DNA extraction, PCR, gel electrophoresis, and other molecular biology techniques.",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Molecular Biology", "PCR", "DNA Extraction"],
    questions: [
      {
        id: 1,
        question: "What is the purpose of the denaturation step in PCR?",
        options: [
          "To activate the DNA polymerase",
          "To separate the DNA strands",
          "To allow primers to bind to the template",
          "To extend the primers",
        ],
        correctAnswer: 1,
        explanation:
          "The denaturation step in PCR involves heating the DNA to 94-98°C to separate the double-stranded DNA into single strands, allowing primers to bind in the subsequent annealing step.",
      },
      {
        id: 2,
        question: "Which technique is used to separate DNA fragments based on size?",
        options: ["PCR", "Gel electrophoresis", "DNA sequencing", "Southern blotting"],
        correctAnswer: 1,
        explanation:
          "Gel electrophoresis is used to separate DNA fragments based on size, with smaller fragments moving faster through the gel matrix when an electric current is applied.",
      },
      {
        id: 3,
        question: "What is the role of restriction enzymes in molecular biology?",
        options: [
          "To amplify DNA",
          "To cut DNA at specific sequences",
          "To join DNA fragments together",
          "To synthesize DNA from RNA",
        ],
        correctAnswer: 1,
        explanation:
          "Restriction enzymes (or restriction endonucleases) cut DNA at specific recognition sequences, creating fragments that can be used in various molecular biology applications like cloning.",
      },
    ],
  },
]

