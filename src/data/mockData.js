// Mock data for all engineering departments
export const departments = [
  { id: 'CSE', label: 'Computer Science & Engineering' },
  { id: 'IT', label: 'Information Technology' },
  { id: 'CCE', label: 'Computer & Communication Engineering' },
  { id: 'AIDS', label: 'AI & Data Science' },
  { id: 'AIML', label: 'AI & Machine Learning' },
  { id: 'ECE', label: 'Electronics & Communication Engineering' },
  { id: 'EEE', label: 'Electrical & Electronics Engineering' },
  { id: 'CSBS', label: 'Computer Science & Business Systems' },
  { id: 'BME', label: 'Bio Medical Engineering' },
  { id: 'CHEM', label: 'Chemical Engineering' },
  { id: 'MECH', label: 'Mechanical Engineering' },
  { id: 'CIVIL', label: 'Civil Engineering' },
];

export const colleges = [
  'Anna University',
  'IIT Madras',
  'NIT Trichy',
  'PSG College of Technology',
  'Coimbatore Institute of Technology',
  'Sri Venkateswara College of Engineering',
  'VIT Vellore',
  'SRM Institute of Science and Technology',
  'Amrita Vishwa Vidyapeetham',
  'Bannari Amman Institute of Technology',
  'Kongu Engineering College',
  'Thiagarajar College of Engineering',
  'VSB Engineering College',
];

export const skillLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'Just getting started' },
  { id: 'basic', label: 'Basic', desc: 'Know the fundamentals' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Comfortable with core concepts' },
  { id: 'advanced', label: 'Advanced', desc: 'Strong practical knowledge' },
];

export const careerGoals = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    icon: '💻',
    description: 'Build scalable applications and systems at top tech companies',
    tags: ['FAANG', 'Startups', 'Product Companies'],
    color: 'from-blue-500 to-indigo-600',
    departments: ['CSE', 'IT', 'CCE', 'AIDS', 'AIML', 'CSBS'],
  },
  {
    id: 'ai-engineer',
    title: 'AI / ML Engineer',
    icon: '🤖',
    description: 'Design and deploy machine learning models and AI systems',
    tags: ['Deep Learning', 'NLP', 'Computer Vision'],
    color: 'from-purple-500 to-violet-600',
    departments: ['CSE', 'IT', 'AIDS', 'AIML', 'CSBS'],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: '📊',
    description: 'Extract insights from data to drive business decisions',
    tags: ['Analytics', 'Statistics', 'ML Models'],
    color: 'from-teal-500 to-cyan-600',
    departments: ['CSE', 'IT', 'AIDS', 'AIML', 'ECE', 'CSBS'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Engineer',
    icon: '🔐',
    description: 'Protect systems and networks from digital threats',
    tags: ['Ethical Hacking', 'Network Security', 'SOC'],
    color: 'from-red-500 to-rose-600',
    departments: ['CSE', 'IT', 'CCE', 'ECE', 'CSBS'],
  },
  {
    id: 'higher-studies',
    title: 'Higher Studies',
    icon: '🎓',
    description: 'Pursue M.Tech, MS abroad, or MBA for deep specialization',
    tags: ['M.Tech', 'MS Abroad', 'Research'],
    color: 'from-amber-500 to-orange-600',
    departments: ['CSE', 'IT', 'CCE', 'AIDS', 'AIML', 'ECE', 'EEE', 'CSBS', 'BME', 'CHEM', 'MECH', 'CIVIL'],
  },
  {
    id: 'entrepreneur',
    title: 'Tech Entrepreneur',
    icon: '🚀',
    description: 'Build your own product or startup from scratch',
    tags: ['Startup', 'Product', 'Funding'],
    color: 'from-green-500 to-emerald-600',
    departments: ['CSE', 'IT', 'CCE', 'AIDS', 'AIML', 'ECE', 'EEE', 'CSBS', 'BME', 'CHEM', 'MECH', 'CIVIL'],
  },
];

// Quiz questions
export const quizQuestions = [
  {
    id: 1,
    question: 'What year are you currently in?',
    type: 'single',
    options: [
      { id: 'y1', label: '1st Year', value: 1 },
      { id: 'y2', label: '2nd Year', value: 2 },
      { id: 'y3', label: '3rd Year', value: 3 },
      { id: 'y4', label: '4th Year', value: 4 },
    ],
  },
  {
    id: 2,
    question: 'Which areas interest you the most?',
    type: 'multi',
    options: [
      { id: 'i1', label: 'Web Development', value: 'web' },
      { id: 'i2', label: 'Machine Learning / AI', value: 'ml' },
      { id: 'i3', label: 'Mobile Apps', value: 'mobile' },
      { id: 'i4', label: 'Cloud & DevOps', value: 'devops' },
      { id: 'i5', label: 'Cybersecurity', value: 'security' },
      { id: 'i6', label: 'Data Analytics', value: 'data' },
      { id: 'i7', label: 'Embedded Systems', value: 'embedded' },
      { id: 'i8', label: 'Research / Academia', value: 'research' },
    ],
  },
  {
    id: 3,
    question: 'Which of these skills do you already have?',
    type: 'multi',
    options: [
      { id: 's1', label: 'Python', value: 'python' },
      { id: 's2', label: 'JavaScript', value: 'js' },
      { id: 's3', label: 'Java / C++', value: 'java' },
      { id: 's4', label: 'SQL / Databases', value: 'sql' },
      { id: 's5', label: 'Git & Version Control', value: 'git' },
      { id: 's6', label: 'HTML / CSS', value: 'html' },
      { id: 's7', label: 'Linux / Terminal', value: 'linux' },
      { id: 's8', label: 'None of the above', value: 'none' },
    ],
  },
  {
    id: 4,
    question: 'How do you prefer to learn?',
    type: 'single',
    options: [
      { id: 'l1', label: 'Video tutorials (YouTube, Udemy)', value: 'video' },
      { id: 'l2', label: 'Reading documentation and books', value: 'docs' },
      { id: 'l3', label: 'Building projects hands-on', value: 'projects' },
      { id: 'l4', label: 'Structured courses with mentorship', value: 'courses' },
    ],
  },
  {
    id: 5,
    question: 'How many hours per week can you commit to learning?',
    type: 'single',
    options: [
      { id: 'h1', label: '1–5 hours', value: '1-5' },
      { id: 'h2', label: '5–10 hours', value: '5-10' },
      { id: 'h3', label: '10–15 hours', value: '10-15' },
      { id: 'h4', label: '15+ hours', value: '15+' },
    ],
  },
];

// Department-specific roadmap data
export const roadmapData = {
  'software-engineer': {
    CSE: [
      {
        id: 1,
        phase: 'Foundation',
        title: 'Master Programming Fundamentals',
        description: 'Build strong programming skills in Python, Java, or C++. Practice daily coding problems.',
        duration: '8 weeks',
        status: 'completed',
        skills: ['Python', 'Data Structures', 'Algorithms'],
        resources: ['LeetCode', 'HackerRank', 'CS50'],
      },
      {
        id: 2,
        phase: 'Core Skills',
        title: 'Data Structures & Algorithms',
        description: 'Deep-dive into arrays, trees, graphs, dynamic programming. Solve 100+ problems.',
        duration: '12 weeks',
        status: 'in-progress',
        skills: ['DSA', 'Problem Solving', 'Competitive Programming'],
        resources: ['LeetCode Medium/Hard', 'CLRS Book', 'Striver SDE Sheet'],
      },
      {
        id: 3,
        phase: 'Development',
        title: 'Full-Stack Web Development',
        description: 'Learn React, Node.js, and databases. Build 3 full-stack projects.',
        duration: '10 weeks',
        status: 'upcoming',
        skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
        resources: ['The Odin Project', 'Full Stack Open', 'Scrimba'],
      },
      {
        id: 4,
        phase: 'Systems',
        title: 'System Design & Architecture',
        description: 'Learn how to design scalable systems. Study real-world architectures.',
        duration: '8 weeks',
        status: 'upcoming',
        skills: ['System Design', 'Microservices', 'Caching', 'Load Balancing'],
        resources: ['Grokking System Design', 'ByteByteGo', 'System Design Primer'],
      },
      {
        id: 5,
        phase: 'Career Prep',
        title: 'Interview Preparation & Placements',
        description: 'Mock interviews, resume building, and applying to target companies.',
        duration: '6 weeks',
        status: 'locked',
        skills: ['Interview Skills', 'Resume Writing', 'Communication'],
        resources: ['Pramp', 'Interviewing.io', 'LinkedIn'],
      },
    ],
    IT: [
      {
        id: 1, phase: 'Foundation', title: 'Programming & Web Basics', description: 'HTML, CSS, JavaScript, Python basics.', duration: '8 weeks', status: 'completed', skills: ['HTML', 'CSS', 'JavaScript', 'Python'], resources: ['freeCodeCamp', 'MDN Web Docs'],
      },
      {
        id: 2, phase: 'Backend', title: 'Backend Development & APIs', description: 'Node.js, Express, REST API design, SQL/NoSQL.', duration: '10 weeks', status: 'in-progress', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'], resources: ['Express docs', 'PostgreSQL Tutorial'],
      },
      {
        id: 3, phase: 'Cloud', title: 'Cloud Fundamentals (AWS/GCP)', description: 'Deploy apps, understand cloud architecture.', duration: '8 weeks', status: 'upcoming', skills: ['AWS', 'Docker', 'CI/CD'], resources: ['AWS Free Tier', 'A Cloud Guru'],
      },
      {
        id: 4, phase: 'DSA', title: 'Data Structures & Problem Solving', description: 'Placement-focused DSA preparation.', duration: '10 weeks', status: 'upcoming', skills: ['DSA', 'Problem Solving'], resources: ['LeetCode', 'GeeksForGeeks'],
      },
      {
        id: 5, phase: 'Career', title: 'Placement & Interview Prep', description: 'Resume, mock interviews, job applications.', duration: '6 weeks', status: 'locked', skills: ['Resume', 'Interview Skills'], resources: ['Naukri', 'LinkedIn'],
      },
    ],
    ECE: [
      {
        id: 1, phase: 'Foundation', title: 'C/C++ & Python Programming', description: 'Start with embedded-friendly languages.', duration: '6 weeks', status: 'completed', skills: ['C', 'C++', 'Python'], resources: ['CS50', 'NPTEL'],
      },
      {
        id: 2, phase: 'Core', title: 'DSA & Problem Solving', description: 'Compete for software roles in ECE.', duration: '10 weeks', status: 'in-progress', skills: ['DSA', 'Algorithms'], resources: ['LeetCode', 'HackerRank'],
      },
      {
        id: 3, phase: 'Specialization', title: 'Embedded Systems / VLSI / IoT', description: 'Choose your ECE specialization path.', duration: '10 weeks', status: 'upcoming', skills: ['Arduino', 'Raspberry Pi', 'VLSI'], resources: ['NPTEL', 'Coursera'],
      },
      {
        id: 4, phase: 'Projects', title: 'Build Hardware+Software Projects', description: 'IoT home automation, FPGA projects.', duration: '8 weeks', status: 'upcoming', skills: ['IoT', 'FPGA', 'Arduino'], resources: ['Hackster.io', 'GitHub'],
      },
      {
        id: 5, phase: 'Career', title: 'Core ECE + Software Placements', description: 'Target both core ECE and IT companies.', duration: '6 weeks', status: 'locked', skills: ['Interview', 'Resume'], resources: ['LinkedIn', 'VLSI Expert'],
      },
    ],
    EEE: [
      {
        id: 1, phase: 'Foundation', title: 'Python & MATLAB Programming', description: 'Simulation and control systems programming.', duration: '6 weeks', status: 'completed', skills: ['Python', 'MATLAB'], resources: ['Coursera', 'NPTEL'],
      },
      {
        id: 2, phase: 'Core', title: 'Power Systems & Control Theory', description: 'Strengthen EEE fundamentals.', duration: '10 weeks', status: 'in-progress', skills: ['Power Systems', 'Control Theory', 'PLC'], resources: ['NPTEL', 'MIT OpenCourseWare'],
      },
      {
        id: 3, phase: 'Specialization', title: 'Automation & PLC/SCADA', description: 'Industrial automation skills for core companies.', duration: '8 weeks', status: 'upcoming', skills: ['PLC', 'SCADA', 'Automation'], resources: ['Siemens TIA Portal', 'Udemy'],
      },
      {
        id: 4, phase: 'Software Bridge', title: 'DSA & Software Skills (Optional)', description: 'Bridge to IT sector placements.', duration: '8 weeks', status: 'upcoming', skills: ['DSA', 'Python', 'SQL'], resources: ['LeetCode', 'HackerRank'],
      },
      {
        id: 5, phase: 'Career', title: 'Core EEE + PSU Exam Preparation', description: 'GATE, PSU exams, and core placements.', duration: '10 weeks', status: 'locked', skills: ['GATE', 'Interview'], resources: ['GATE Academy', 'Made Easy'],
      },
    ],
  },
  'ai-engineer': {
    CSE: [
      {
        id: 1, phase: 'Foundation', title: 'Python & Math for AI', description: 'Linear Algebra, Statistics, Calculus, NumPy, Pandas.', duration: '8 weeks', status: 'completed', skills: ['Python', 'NumPy', 'Pandas', 'Statistics'], resources: ['Khan Academy', '3Blue1Brown', 'Python.org'],
      },
      {
        id: 2, phase: 'Core ML', title: 'Machine Learning Fundamentals', description: 'Supervised, unsupervised learning. Scikit-learn, model evaluation.', duration: '10 weeks', status: 'in-progress', skills: ['Scikit-learn', 'ML Algorithms', 'Model Evaluation'], resources: ['Andrew Ng ML Course', 'Kaggle'],
      },
      {
        id: 3, phase: 'Deep Learning', title: 'Deep Learning & Neural Networks', description: 'CNNs, RNNs, Transformers using PyTorch/TensorFlow.', duration: '12 weeks', status: 'upcoming', skills: ['PyTorch', 'TensorFlow', 'CNNs', 'Transformers'], resources: ['Fast.ai', 'Deep Learning Specialization'],
      },
      {
        id: 4, phase: 'Specialization', title: 'NLP & LLMs / Computer Vision', description: 'Choose specialization: language models or vision systems.', duration: '10 weeks', status: 'upcoming', skills: ['Hugging Face', 'OpenCV', 'LangChain'], resources: ['HuggingFace Docs', 'Paperswithcode'],
      },
      {
        id: 5, phase: 'Production', title: 'MLOps & AI Deployment', description: 'Deploy models to production. MLflow, Docker, FastAPI.', duration: '8 weeks', status: 'locked', skills: ['MLflow', 'Docker', 'FastAPI', 'Cloud'], resources: ['MLflow Docs', 'Coursera MLOps'],
      },
    ],
  },
  'data-scientist': {
    CSE: [
      {
        id: 1, phase: 'Foundation', title: 'Python, SQL & Statistics', description: 'Data manipulation, querying, and statistical thinking.', duration: '8 weeks', status: 'completed', skills: ['Python', 'SQL', 'Statistics'], resources: ['Mode Analytics', 'DataCamp'],
      },
      {
        id: 2, phase: 'Analysis', title: 'Exploratory Data Analysis', description: 'Pandas, visualization with Matplotlib, Seaborn, Plotly.', duration: '8 weeks', status: 'in-progress', skills: ['Pandas', 'Matplotlib', 'Seaborn', 'Plotly'], resources: ['Kaggle', 'Towards Data Science'],
      },
      {
        id: 3, phase: 'Modeling', title: 'Machine Learning for Data Science', description: 'Regression, classification, clustering, feature engineering.', duration: '10 weeks', status: 'upcoming', skills: ['Scikit-learn', 'Feature Engineering', 'Model Selection'], resources: ['Kaggle Courses', 'Fast.ai'],
      },
      {
        id: 4, phase: 'Specialization', title: 'Business Intelligence & Dashboards', description: 'Tableau, Power BI, stakeholder communication.', duration: '6 weeks', status: 'upcoming', skills: ['Tableau', 'Power BI', 'Storytelling'], resources: ['Tableau Public', 'PowerBI Learning'],
      },
      {
        id: 5, phase: 'Career', title: 'Portfolio & Job Applications', description: 'Build 3 end-to-end data science projects and apply.', duration: '6 weeks', status: 'locked', skills: ['Portfolio', 'GitHub', 'LinkedIn'], resources: ['Kaggle', 'GitHub'],
      },
    ],
  },
};

// Default roadmap (fallback for any department/goal combo not explicitly defined)
export const defaultRoadmap = (goal, dept) => {
  const steps = roadmapData[goal]?.[dept] || roadmapData[goal]?.CSE || roadmapData['software-engineer'].CSE;
  return steps;
};

// Department-specific skills
export const skillsData = {
  'software-engineer': {
    mustLearn: [
      { id: 's1', name: 'Data Structures & Algorithms', description: 'Arrays, linked lists, trees, graphs, dynamic programming — the backbone of every coding interview.', difficulty: 'Intermediate', priority: 'High', icon: '🏗️', timeToLearn: '3–4 months' },
      { id: 's2', name: 'Python or Java', description: 'Pick one language and master it. Python is versatile; Java is preferred at enterprise companies.', difficulty: 'Beginner', priority: 'High', icon: '🐍', timeToLearn: '6–8 weeks' },
      { id: 's3', name: 'Git & GitHub', description: 'Version control is non-negotiable. Every employer expects proficiency in Git workflows.', difficulty: 'Beginner', priority: 'High', icon: '🔧', timeToLearn: '1–2 weeks' },
      { id: 's4', name: 'SQL & Databases', description: 'Relational databases power most enterprise systems. PostgreSQL is the modern standard.', difficulty: 'Intermediate', priority: 'High', icon: '🗄️', timeToLearn: '4–6 weeks' },
    ],
    recommended: [
      { id: 's5', name: 'React & Frontend Development', description: 'Build modern UIs. React is the most in-demand frontend framework globally.', difficulty: 'Intermediate', priority: 'Medium', icon: '⚛️', timeToLearn: '8–10 weeks' },
      { id: 's6', name: 'REST APIs & Node.js', description: 'Backend development fundamentals for building APIs and server-side logic.', difficulty: 'Intermediate', priority: 'Medium', icon: '🌐', timeToLearn: '6–8 weeks' },
      { id: 's7', name: 'System Design', description: 'Required for senior roles and FAANG interviews. Design scalable, distributed systems.', difficulty: 'Advanced', priority: 'Medium', icon: '🏛️', timeToLearn: '10–12 weeks' },
      { id: 's8', name: 'Docker & Kubernetes', description: 'Containerization is now standard in DevOps. Essential for modern deployment pipelines.', difficulty: 'Intermediate', priority: 'Medium', icon: '🐳', timeToLearn: '4–6 weeks' },
    ],
    advanced: [
      { id: 's9', name: 'Cloud Platforms (AWS/GCP)', description: 'Cloud certification opens doors. AWS Solutions Architect is highly respected.', difficulty: 'Advanced', priority: 'Low', icon: '☁️', timeToLearn: '12–16 weeks' },
      { id: 's10', name: 'Microservices Architecture', description: 'Build complex systems as loosely-coupled services. Required at scale.', difficulty: 'Advanced', priority: 'Low', icon: '🔗', timeToLearn: '8–10 weeks' },
    ],
  },
  'ai-engineer': {
    mustLearn: [
      { id: 'a1', name: 'Python & NumPy/Pandas', description: 'Python is the lingua franca of AI. NumPy and Pandas handle all data manipulation.', difficulty: 'Beginner', priority: 'High', icon: '🐍', timeToLearn: '4–6 weeks' },
      { id: 'a2', name: 'Linear Algebra & Statistics', description: 'The mathematical foundation every ML engineer must master.', difficulty: 'Intermediate', priority: 'High', icon: '📐', timeToLearn: '6–8 weeks' },
      { id: 'a3', name: 'Machine Learning Fundamentals', description: 'Regression, classification, clustering — understand the algorithms deeply.', difficulty: 'Intermediate', priority: 'High', icon: '🤖', timeToLearn: '8–12 weeks' },
      { id: 'a4', name: 'PyTorch or TensorFlow', description: 'The essential deep learning frameworks for building and training neural networks.', difficulty: 'Advanced', priority: 'High', icon: '🔥', timeToLearn: '8–10 weeks' },
    ],
    recommended: [
      { id: 'a5', name: 'Natural Language Processing', description: 'Transformers, BERT, LLMs. The hottest area in AI right now.', difficulty: 'Advanced', priority: 'Medium', icon: '📝', timeToLearn: '10–12 weeks' },
      { id: 'a6', name: 'Computer Vision', description: 'CNNs, object detection, image segmentation using OpenCV and PyTorch.', difficulty: 'Advanced', priority: 'Medium', icon: '👁️', timeToLearn: '8–10 weeks' },
      { id: 'a7', name: 'MLOps & Model Deployment', description: 'Deploy models as APIs. FastAPI, Docker, MLflow, cloud deployment.', difficulty: 'Intermediate', priority: 'Medium', icon: '🚀', timeToLearn: '6–8 weeks' },
    ],
    advanced: [
      { id: 'a8', name: 'Reinforcement Learning', description: 'Train agents to make sequential decisions. Foundation of AGI research.', difficulty: 'Advanced', priority: 'Low', icon: '🎮', timeToLearn: '12–16 weeks' },
      { id: 'a9', name: 'LLM Fine-tuning & RAG', description: 'Fine-tune language models on domain data. Build retrieval-augmented generation systems.', difficulty: 'Advanced', priority: 'Low', icon: '🧠', timeToLearn: '10–14 weeks' },
    ],
  },
  'data-scientist': {
    mustLearn: [
      { id: 'd1', name: 'Python & SQL', description: 'Essential tools for every data scientist. Python for analysis, SQL for querying.', difficulty: 'Beginner', priority: 'High', icon: '📊', timeToLearn: '6–8 weeks' },
      { id: 'd2', name: 'Statistics & Probability', description: 'Hypothesis testing, distributions, Bayesian thinking — the heart of data science.', difficulty: 'Intermediate', priority: 'High', icon: '📈', timeToLearn: '6–8 weeks' },
      { id: 'd3', name: 'Pandas & Data Wrangling', description: 'Clean, transform, and analyze messy real-world data.', difficulty: 'Intermediate', priority: 'High', icon: '🐼', timeToLearn: '4–6 weeks' },
    ],
    recommended: [
      { id: 'd4', name: 'Machine Learning (Scikit-learn)', description: 'Regression, classification, clustering models for business problems.', difficulty: 'Intermediate', priority: 'Medium', icon: '⚙️', timeToLearn: '8–10 weeks' },
      { id: 'd5', name: 'Data Visualization', description: 'Matplotlib, Seaborn, Tableau — turn data into compelling stories.', difficulty: 'Beginner', priority: 'Medium', icon: '📉', timeToLearn: '4–6 weeks' },
      { id: 'd6', name: 'A/B Testing & Experimentation', description: 'Design and analyze experiments to measure product impact.', difficulty: 'Intermediate', priority: 'Medium', icon: '🔬', timeToLearn: '4–6 weeks' },
    ],
    advanced: [
      { id: 'd7', name: 'Deep Learning for Data Science', description: 'Neural networks for tabular, text, and image data.', difficulty: 'Advanced', priority: 'Low', icon: '🧬', timeToLearn: '10–12 weeks' },
      { id: 'd8', name: 'Big Data & Spark', description: 'Process petabyte-scale datasets with Apache Spark.', difficulty: 'Advanced', priority: 'Low', icon: '⚡', timeToLearn: '8–10 weeks' },
    ],
  },
  'cybersecurity': {
    mustLearn: [
      { id: 'c1', name: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP/S, firewalls — understand how the internet works.', difficulty: 'Beginner', priority: 'High', icon: '🌐', timeToLearn: '4–6 weeks' },
      { id: 'c2', name: 'Linux & Command Line', description: 'Security professionals live in Linux. Master shell scripting and system administration.', difficulty: 'Intermediate', priority: 'High', icon: '🐧', timeToLearn: '6–8 weeks' },
      { id: 'c3', name: 'Python for Security', description: 'Automate attacks and defenses. Write exploit scripts and security tools.', difficulty: 'Intermediate', priority: 'High', icon: '🐍', timeToLearn: '6–8 weeks' },
    ],
    recommended: [
      { id: 'c4', name: 'Ethical Hacking & Penetration Testing', description: 'Kali Linux, Metasploit, Burp Suite — the tools of the trade.', difficulty: 'Advanced', priority: 'Medium', icon: '💀', timeToLearn: '10–12 weeks' },
      { id: 'c5', name: 'Web Application Security (OWASP)', description: 'SQL injection, XSS, CSRF. The OWASP Top 10 is mandatory knowledge.', difficulty: 'Intermediate', priority: 'Medium', icon: '🔐', timeToLearn: '6–8 weeks' },
      { id: 'c6', name: 'Cryptography Basics', description: 'Symmetric/asymmetric encryption, hashing, PKI, TLS.', difficulty: 'Intermediate', priority: 'Medium', icon: '🔑', timeToLearn: '4–6 weeks' },
    ],
    advanced: [
      { id: 'c7', name: 'Malware Analysis & Reverse Engineering', description: 'Analyze and dissect malicious software. Assembly, IDA Pro, Ghidra.', difficulty: 'Advanced', priority: 'Low', icon: '🦠', timeToLearn: '12–16 weeks' },
      { id: 'c8', name: 'Cloud Security (AWS/Azure)', description: 'Secure cloud infrastructure. IAM, VPC, cloud-native security tools.', difficulty: 'Advanced', priority: 'Low', icon: '☁️', timeToLearn: '8–10 weeks' },
    ],
  },
  'higher-studies': {
    mustLearn: [
      { id: 'h1', name: 'Research Methodology', description: 'Literature review, problem formulation, experimental design, paper writing.', difficulty: 'Intermediate', priority: 'High', icon: '📚', timeToLearn: '6–8 weeks' },
      { id: 'h2', name: 'GATE / GRE Preparation', description: 'GATE for M.Tech, GRE for MS abroad. Systematic subject-wise preparation required.', difficulty: 'Advanced', priority: 'High', icon: '📝', timeToLearn: '24–32 weeks' },
      { id: 'h3', name: 'Core Subject Mastery', description: 'Algorithms, OS, DBMS, Networks — strengthen fundamentals for entrance exams.', difficulty: 'Intermediate', priority: 'High', icon: '🎯', timeToLearn: '16–20 weeks' },
    ],
    recommended: [
      { id: 'h4', name: 'Research Paper Writing', description: 'Write and publish in IEEE/ACM conferences. Essential for top university applications.', difficulty: 'Advanced', priority: 'Medium', icon: '✍️', timeToLearn: '12–16 weeks' },
      { id: 'h5', name: 'SOP & LOR Preparation', description: 'Statement of Purpose, Letters of Recommendation, and application strategy.', difficulty: 'Beginner', priority: 'Medium', icon: '📄', timeToLearn: '4–6 weeks' },
    ],
    advanced: [
      { id: 'h6', name: 'Open Source Contributions', description: 'Contributing to GitHub projects strengthens applications for top universities.', difficulty: 'Intermediate', priority: 'Low', icon: '🌟', timeToLearn: 'Ongoing' },
    ],
  },
  'entrepreneur': {
    mustLearn: [
      { id: 'e1', name: 'Full-Stack Development', description: 'Build your own product end-to-end. React + Node.js + cloud deployment.', difficulty: 'Intermediate', priority: 'High', icon: '💻', timeToLearn: '12–16 weeks' },
      { id: 'e2', name: 'Product Management Basics', description: 'User research, MVP thinking, roadmap planning, metrics.', difficulty: 'Beginner', priority: 'High', icon: '📋', timeToLearn: '4–6 weeks' },
      { id: 'e3', name: 'Business Model Design', description: 'Revenue models, unit economics, go-to-market strategy.', difficulty: 'Intermediate', priority: 'High', icon: '📊', timeToLearn: '4–6 weeks' },
    ],
    recommended: [
      { id: 'e4', name: 'No-Code / Low-Code Tools', description: 'Bubble, Webflow, Notion — build faster with less code for early MVPs.', difficulty: 'Beginner', priority: 'Medium', icon: '⚡', timeToLearn: '3–4 weeks' },
      { id: 'e5', name: 'Startup Fundraising', description: 'Angel investors, VCs, pitch decks, term sheets — the startup funding ecosystem.', difficulty: 'Intermediate', priority: 'Medium', icon: '💰', timeToLearn: '4–6 weeks' },
      { id: 'e6', name: 'Digital Marketing & Growth', description: 'SEO, content marketing, social media growth, paid ads.', difficulty: 'Beginner', priority: 'Medium', icon: '📣', timeToLearn: '4–6 weeks' },
    ],
    advanced: [
      { id: 'e7', name: 'Legal & Company Formation', description: 'Pvt. Ltd. registration, IP protection, founder agreements.', difficulty: 'Intermediate', priority: 'Low', icon: '⚖️', timeToLearn: '2–4 weeks' },
    ],
  },
};

// Default skills (fallback)
export const defaultSkills = skillsData['software-engineer'];

// Mentor conversation templates
export const mentorResponses = {
  greeting: (name, goal, stage) =>
    `Hi ${name}! 👋 I'm your AI Career Mentor. Based on your goal of becoming a **${goal}** and your current position at the **${stage}** stage, I'm here to give you precise, actionable guidance — not generic advice. What would you like to work on today?`,

  roadmapQuestion: (goal, currentStep, nextStep) =>
    `Great question about your roadmap! You've completed the **${currentStep}** phase — that's a strong foundation. Your next focus should be **${nextStep}**.\n\n**Why this matters for your ${goal} goal:** This phase directly prepares you for the skills employers will test in interviews. Students who skip this stage often struggle in technical rounds.\n\n**My recommendation:** Spend 2–3 hours daily on this. Set a 30-day checkpoint to review your progress with me.`,

  skillQuestion: (skill, goal, difficulty) =>
    `**${skill}** is ${difficulty === 'High' ? 'absolutely critical' : 'important'} for your path to becoming a **${goal}**.\n\n**Why you need it:** This skill appears in 70%+ of job descriptions for ${goal} roles. Interviewers will assume you know it.\n\n**How to learn it:** Start with the official documentation, then build a small project using it. Aim to be comfortable within 4–6 weeks.\n\n**Confidence check:** On a scale of 1–10, where are you with this skill right now? Tell me and I'll give you a precise learning plan.`,

  progressQuestion: (completed, total, nextMilestone) =>
    `You've completed **${completed} out of ${total}** roadmap steps — that's **${Math.round((completed / total) * 100)}% of your journey** done! 🎯\n\n**You're doing well.** Your next milestone is: **${nextMilestone}**.\n\n**To stay on track:** I recommend completing at least one roadmap step every 2 weeks. At your current pace, you'll be placement-ready in approximately ${Math.ceil(((total - completed) * 2))} weeks.\n\n**One thing to watch:** Don't skip the project-building phases. Employers want to see what you've built, not just what you've studied.`,

  genericAdvice: (goal) =>
    `That's a thoughtful question for someone targeting a **${goal}** role.\n\nHere's my honest assessment: The biggest mistake engineering students make is studying theory without building real projects. Recruiters at top companies want to see:\n\n1. **GitHub profile** with 3–5 solid projects\n2. **DSA proficiency** (100+ solved problems minimum)\n3. **System design understanding** (for senior roles)\n\n**Your immediate action:** Open your roadmap, find the current step, and commit to finishing it this week. Small consistent wins compound into big career results.\n\nWhat specific challenge are you facing right now?`,

  default: (goal) =>
    `I understand your question. As someone working toward **${goal}**, every decision you make now shapes your career trajectory.\n\nCould you be more specific about what you're struggling with? For example:\n- Are you stuck on a particular skill?\n- Unsure about which companies to target?\n- Confused about your roadmap priority?\n\nThe more specific you are, the better I can guide you. I'm here to give you honest, roadmap-based advice — not generic tips you can find on Google.`,
};

// Dashboard summary
export const getDashboardData = (profile, goal, roadmap, progress) => {
  const completedSteps = roadmap?.filter((s) => s.status === 'completed')?.length || 0;
  const inProgressStep = roadmap?.find((s) => s.status === 'in-progress');
  const nextAction = inProgressStep
    ? `Continue: ${inProgressStep.title}`
    : 'Start your first roadmap step';

  return {
    careerGoal: goal?.title || 'Software Engineer',
    nextAction,
    roadmapProgress: Math.round((completedSteps / (roadmap?.length || 5)) * 100),
    completedSteps,
    totalSteps: roadmap?.length || 5,
    currentStage: inProgressStep?.phase || 'Foundation',
    weeklyHours: profile?.weeklyHours || '5–10',
    aiSuggestion: `Focus on "${inProgressStep?.title || 'DSA fundamentals'}" this week. Completing this phase puts you on track for placement prep by next semester.`,
    stats: [
      { label: 'Skills Learned', value: completedSteps * 3, icon: '⚡', color: 'text-indigo-600' },
      { label: 'Days Streak', value: 7, icon: '🔥', color: 'text-orange-500' },
      { label: 'Roadmap %', value: `${Math.round((completedSteps / (roadmap?.length || 5)) * 100)}%`, icon: '📈', color: 'text-emerald-600' },
      { label: 'Weeks Active', value: 3, icon: '📅', color: 'text-purple-600' },
    ],
  };
};

// Analysis result generator
export const generateAnalysisResult = (profile, goal, quizAnswers) => {
  const goalData = careerGoals.find((g) => g.id === goal);
  const roadmap = defaultRoadmap(goal, profile?.department);

  return {
    summary: `Based on your profile as a ${profile?.year}th year ${profile?.department} student, your goal of becoming a **${goalData?.title}** is achievable and well-aligned with your department strengths.`,
    strengths: [
      `${profile?.department} background gives you strong technical foundations`,
      `Your interest in ${goal?.includes('ai') ? 'AI/ML' : 'software development'} is growing in industry demand`,
      `Skill level "${profile?.skillLevel}" indicates readiness to start advanced topics`,
    ],
    skillGaps: [
      'Data Structures & Algorithms proficiency needs strengthening',
      'Real-world project portfolio is missing — start building now',
      'Communication and collaboration skills for team environments',
    ],
    recommendation: `Start with Phase 1 of your personalized roadmap immediately. Your department background is an advantage — use it. Estimate 6–9 months to placement readiness with consistent 10+ hours/week effort.`,
    roadmapPreview: roadmap?.slice(0, 3) || [],
    confidence: 87,
    estimatedTimeline: '6–9 months',
    nextStep: roadmap?.[0]?.title || 'Master Programming Fundamentals',
  };
};
