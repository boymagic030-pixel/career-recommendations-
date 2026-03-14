export interface College {
    name: string;
    location: string;
    ranking: string;
}

export interface Career {
    id: string;
    title: string;
    icon: string;
    category: string;
    salary: string;
    growth: string;
    education: string;
    match: number;
    description: string;
    skills: string[];
    trending: boolean;
    about: string;
    responsibilities: string[];
    topColleges: College[];
    dayInLife?: { time: string, activity: string }[];
    pros?: string[];
    cons?: string[];
    salaryGrowth?: { level: string, range: string }[];
    topRecruiters?: string[];
}

export const careersData: Career[] = [
    {
        id: '1',
        title: 'Data Scientist',
        icon: '📊',
        category: 'Technology',
        salary: '₹8-25 LPA',
        growth: 'High',
        education: "Bachelor's Degree",
        match: 92,
        description: 'Analyze complex data to help companies make better decisions using statistical methods and machine learning.',
        skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
        trending: true,
        about: 'A Data Scientist analyzes and interprets complex digital data, such as the usage statistics of a website, especially to assist a business in its decision-making. You will build predictive models and machine learning algorithms.',
        responsibilities: [
            'Clean and organize raw data.',
            'Build predictive models and machine-learning algorithms.',
            'Analyze large amounts of information to discover trends and patterns.',
            'Present information using data visualization techniques.'
        ],
        topColleges: [
            { name: 'IIT Madras', location: 'Chennai', ranking: '#1 NIRF' },
            { name: 'IIT Delhi', location: 'New Delhi', ranking: '#2 NIRF' },
            { name: 'IIIT Hyderabad', location: 'Hyderabad', ranking: '#10 NIRF' },
            { name: 'BITS Pilani', location: 'Pilani', ranking: '#20 NIRF' },
            { name: 'NIT Trichy', location: 'Tiruchirappalli', ranking: '#9 NIRF' }
        ],
        dayInLife: [
            { time: '09:00 AM', activity: 'Daily stand-up meeting with product and engineering teams' },
            { time: '10:00 AM', activity: 'Cleaning and preparing datasets using Pandas and SQL' },
            { time: '01:00 PM', activity: 'Training and tuning a collaborative filtering ML model' },
            { time: '04:00 PM', activity: 'Presenting data visualizations and insights to stakeholders' }
        ],
        pros: ['High demand and salary', 'Intellectually stimulating work', 'Applicable across all industries'],
        cons: ['Requires continuous learning of new tools', 'Data cleaning can be tedious', 'High pressure for direct business impact'],
        salaryGrowth: [
            { level: 'Entry-Level (0-2 Yrs)', range: '₹8 - ₹12 LPA' },
            { level: 'Mid-Level (3-6 Yrs)', range: '₹14 - ₹25 LPA' },
            { level: 'Senior/Lead (7+ Yrs)', range: '₹30 - ₹60+ LPA' }
        ],
        topRecruiters: ['Google', 'Amazon', 'Fractal Analytics', 'Mu Sigma', 'Microsoft', 'JPMorgan Chase']
    },
    {
        id: '2',
        title: 'Software Engineer',
        icon: '💻',
        category: 'Technology',
        salary: '₹6-30 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 88,
        description: 'Design, develop, and maintain software applications and systems for various platforms.',
        skills: ['JavaScript', 'Python', 'System Design', 'Git'],
        trending: true,
        about: 'Software Engineers apply engineering principles to software creation. They analyze and modify existing software as well as design, construct, and test end-user applications.',
        responsibilities: [
            'Execute full software development life cycle (SDLC).',
            'Develop well-designed and testable code.',
            'Integrate software components into a fully functional software system.',
            'Troubleshoot, debug and upgrade existing systems.'
        ],
        topColleges: [
            { name: 'IIT Bombay', location: 'Mumbai', ranking: '#3 NIRF' },
            { name: 'IIT Kanpur', location: 'Kanpur', ranking: '#4 NIRF' },
            { name: 'IIT Kharagpur', location: 'Kharagpur', ranking: '#6 NIRF' },
            { name: 'VIT Vellore', location: 'Vellore', ranking: '#11 NIRF' },
            { name: 'Delhi Technological University', location: 'New Delhi', ranking: '#29 NIRF' }
        ],
        dayInLife: [
            { time: '09:30 AM', activity: 'Review pull requests and code from peers' },
            { time: '11:00 AM', activity: 'Writing code for a new backend microservice or frontend feature' },
            { time: '02:00 PM', activity: 'Debugging an issue reported by QA in the staging environment' },
            { time: '04:30 PM', activity: 'Architecture discussion for the next sprint' }
        ],
        pros: ['Excellent compensation and perks', 'Flexible hours and high remote-work capability', 'Clear progression paths'],
        cons: ['High risk of burnout', 'Sitting at a desk all day', 'Constantly shifting tech landscapes'],
        salaryGrowth: [
            { level: 'Entry/SDE I', range: '₹6 - ₹15 LPA' },
            { level: 'Mid/SDE II', range: '₹18 - ₹35 LPA' },
            { level: 'Senior/Staff', range: '₹40 - ₹80+ LPA' }
        ],
        topRecruiters: ['TCS/Infosys (Volume)', 'Atlassian', 'Uber', 'Swiggy/Zomato', 'Microsoft', 'Google']
    },
    {
        id: '3',
        title: 'Product Manager',
        icon: '🎯',
        category: 'Business',
        salary: '₹12-35 LPA',
        growth: 'High',
        education: "Bachelor's/MBA",
        match: 85,
        description: 'Lead product development from conception to launch, balancing user needs with business goals.',
        skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
        trending: true,
        about: 'Product Managers are responsible for guiding the success of a product and leading the cross-functional team that is responsible for improving it. They set the strategy, roadmap, and feature definition.',
        responsibilities: [
            'Define the product strategy and roadmap.',
            'Deliver PRDs with prioritized features and corresponding justification.',
            'Work with external third parties to assess partnerships.',
            'Run beta and pilot programs with early-stage products.'
        ],
        topColleges: [
            { name: 'IIM Ahmedabad', location: 'Ahmedabad', ranking: '#1 NIRF Mgmt' },
            { name: 'IIM Bangalore', location: 'Bangalore', ranking: '#2 NIRF Mgmt' },
            { name: 'IIM Calcutta', location: 'Kolkata', ranking: '#4 NIRF Mgmt' },
            { name: 'ISB Hyderabad', location: 'Hyderabad', ranking: '#Top Global' },
            { name: 'XLRI Jamshedpur', location: 'Jamshedpur', ranking: '#9 NIRF Mgmt' }
        ]
    },
    {
        id: '4',
        title: 'UX Designer',
        icon: '🎨',
        category: 'Creative',
        salary: '₹6-20 LPA',
        growth: 'High',
        education: "Bachelor's Degree",
        match: 82,
        description: 'Create intuitive and delightful user experiences through research, design, and testing.',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Thinking'],
        trending: false,
        about: 'UX Designers measure and optimize applications to improve ease of use, and create the best user experience by exploring many different approaches to solve end-user problems.',
        responsibilities: [
            'Conduct user research and evaluate user feedback.',
            'Illustrate design ideas using storyboards, process flows, and sitemaps.',
            'Develop UI mockups and prototypes.',
            'Create original graphic designs (e.g., images, sketches, and tables).'
        ],
        topColleges: [
            { name: 'National Institute of Design', location: 'Ahmedabad', ranking: '#1 Design' },
            { name: 'IDC, IIT Bombay', location: 'Mumbai', ranking: '#2 Design' },
            { name: 'Srishti Institute', location: 'Bangalore', ranking: '#Top Private' },
            { name: 'NLU Delhi (UX law)', location: 'New Delhi', ranking: '#Specialized' }
        ]
    },
    {
        id: '5',
        title: 'Machine Learning Engineer',
        icon: '🤖',
        category: 'Technology',
        salary: '₹10-35 LPA',
        growth: 'Very High',
        education: "Master's Preferred",
        match: 90,
        description: 'Build and deploy machine learning models at scale for real-world applications.',
        skills: ['Python', 'TensorFlow', 'Deep Learning', 'MLOps'],
        trending: true,
        about: 'Machine Learning Engineers build AI systems. They design and create machine learning programs and algorithms to enable machines to take actions without being directed.',
        responsibilities: [
            'Design machine learning systems.',
            'Research and implement appropriate ML algorithms and tools.',
            'Select appropriate datasets and data representation methods.',
            'Run machine learning tests and experiments.'
        ],
        topColleges: [
            { name: 'IIT Madras', location: 'Chennai', ranking: '#1 NIRF' },
            { name: 'IIT Bombay', location: 'Mumbai', ranking: '#3 NIRF' },
            { name: 'IIIT Hyderabad', location: 'Hyderabad', ranking: '#10 NIRF' },
            { name: 'IISc Bangalore', location: 'Bangalore', ranking: '#1 Science/Tech' }
        ]
    },
    {
        id: '6',
        title: 'Digital Marketing Manager',
        icon: '📱',
        category: 'Business',
        salary: '₹5-18 LPA',
        growth: 'Medium',
        education: "Bachelor's Degree",
        match: 75,
        description: 'Plan and execute digital marketing campaigns across various channels.',
        skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy'],
        trending: false,
        about: 'Digital Marketing Managers are responsible for developing, implementing and managing marketing campaigns that promote a company and its products/services.',
        responsibilities: [
            'Plan and execute all web, SEO/SEM, email, social media and display advertising campaigns.',
            'Design, build and maintain our social media presence.',
            'Measure and report performance of all digital marketing campaigns.',
            'Brainstorm new and creative growth strategies.'
        ],
        topColleges: [
            { name: 'MICA', location: 'Ahmedabad', ranking: '#1 Strategic Marketing' },
            { name: 'IIM Indore', location: 'Indore', ranking: '#8 NIRF' },
            { name: 'NMIMS', location: 'Mumbai', ranking: '#Top Private' }
        ]
    },
    {
        id: '7',
        title: 'Clinical Psychologist',
        icon: '🧠',
        category: 'Healthcare',
        salary: '₹4-15 LPA',
        growth: 'Growing',
        education: "Master's/Doctorate",
        match: 70,
        description: 'Assess and treat mental health conditions through therapy and counseling.',
        skills: ['Counseling', 'Assessment', 'Empathy', 'Research'],
        trending: false,
        about: 'Clinical Psychologists assess, diagnose, and treat psychological problems and the behavioral dysfunctions resulting from, or related to, physical and mental health.',
        responsibilities: [
            'Conduct psychological assessments and/or tests for diagnostic purposes.',
            'Develop and implement treatment plans.',
            'Provide therapy and counseling services.',
            'Conduct psychological research.'
        ],
        topColleges: [
            { name: 'NIMHANS', location: 'Bangalore', ranking: '#1 Psychology' },
            { name: 'TISS', location: 'Mumbai', ranking: '#Top Social Science' },
            { name: 'Delhi University', location: 'New Delhi', ranking: '#Top Central' }
        ]
    },
    {
        id: '8',
        title: 'Financial Analyst',
        icon: '💹',
        category: 'Business',
        salary: '₹6-20 LPA',
        growth: 'Medium',
        education: "Bachelor's/MBA",
        match: 78,
        description: 'Analyze financial data to guide business investment and planning decisions.',
        skills: ['Excel', 'Financial Modeling', 'Analysis', 'Reporting'],
        trending: false,
        about: 'Financial Analysts guide businesses and individuals in making investment decisions. They assess the performance of stocks, bonds, and other types of investments.',
        responsibilities: [
            'Analyze financial data and create financial models.',
            'Report on financial performance and prepare for regular leadership reviews.',
            'Analyze past results, perform variance analysis, identify trends.',
            'Work closely with the accounting team to ensure accurate financial reporting.'
        ],
        topColleges: [
            { name: 'IIM Calcutta', location: 'Kolkata', ranking: '#4 NIRF (Finance)' },
            { name: 'FMS Delhi', location: 'New Delhi', ranking: '#Top ROI' },
            { name: 'SPJIMR', location: 'Mumbai', ranking: '#Top Private' }
        ]
    },
    {
        id: '9',
        title: 'Civil Engineer',
        icon: '🏗️',
        category: 'Engineering',
        salary: '₹4-15 LPA',
        growth: 'Stable',
        education: "Bachelor's Degree",
        match: 65,
        description: 'Design, construct, and maintain infrastructure projects like buildings and bridges.',
        skills: ['AutoCAD', 'Structural Analysis', 'Project Management', 'Design'],
        trending: false,
        about: 'Civil Engineers design, build, and maintain the foundation for our modern society – our roads and bridges, drinking water and energy systems, sea ports and airports.',
        responsibilities: [
            'Manage, design, develop, create and maintain construction projects.',
            'Conduct on-site investigations and analyze data.',
            'Assess potential risks, materials and costs.',
            'Provide advice and creatively resolve any emerging problems/deficiencies.'
        ],
        topColleges: [
            { name: 'IIT Roorkee', location: 'Roorkee', ranking: '#1 Civil Engg' },
            { name: 'IIT Delhi', location: 'New Delhi', ranking: '#2 NIRF' },
            { name: 'NIT Surathkal', location: 'Surathkal', ranking: '#Top NIT' }
        ]
    },
    {
        id: '10',
        title: 'Content Writer',
        icon: '✍️',
        category: 'Creative',
        salary: '₹3-12 LPA',
        growth: 'Growing',
        education: "Bachelor's Degree",
        match: 72,
        description: 'Create engaging written content for websites, blogs, social media, and marketing.',
        skills: ['Writing', 'SEO', 'Research', 'Editing'],
        trending: false,
        about: 'Content Writers produce engaging, clear text for different advertising channels such as websites, print ads, and catalogs.',
        responsibilities: [
            'Research industry-related topics.',
            'Prepare well-structured drafts using digital publishing platforms.',
            'Create and distribute marketing copy to advertise our company and products.',
            'Edit and proofread written pieces before publication.'
        ],
        topColleges: [
            { name: 'IIMC', location: 'New Delhi', ranking: '#1 Mass Comm' },
            { name: 'Asian College of Journalism', location: 'Chennai', ranking: '#Top Private' },
            { name: 'Symbiosis Institute', location: 'Pune', ranking: '#Top Media School' }
        ]
    },
    {
        id: '11',
        title: 'DevOps Engineer',
        icon: '⚙️',
        category: 'Technology',
        salary: '₹8-28 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 86,
        description: 'Bridge development and operations to improve deployment frequency and reliability.',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud'],
        trending: true,
        about: 'DevOps Engineers introduce processes, tools, and methodologies to balance needs throughout the software development life cycle, from coding and deployment, to maintenance and updates.',
        responsibilities: [
            'Building and setting up new development tools and infrastructure.',
            'Understanding the needs of stakeholders and conveying this to developers.',
            'Working on ways to automate and improve development and release processes.',
            'Testing and examining code written by others and analyzing results.'
        ],
        topColleges: [
            { name: 'IIT Bombay', location: 'Mumbai', ranking: '#3 NIRF' },
            { name: 'IIT Kanpur', location: 'Kanpur', ranking: '#4 NIRF' },
            { name: 'BITS Pilani', location: 'Pilani', ranking: '#Top Private' }
        ]
    },
    {
        id: '12',
        title: 'Research Scientist',
        icon: '🔬',
        category: 'Science',
        salary: '₹6-20 LPA',
        growth: 'Stable',
        education: 'Doctorate',
        match: 68,
        description: 'Conduct advanced research to expand knowledge in scientific fields.',
        skills: ['Research', 'Analysis', 'Writing', 'Experimentation'],
        trending: false,
        about: 'Research Scientists plan and carry out experiments and investigations in a range of areas, including geoscience, medical research, meteorology, and pharmacology.',
        responsibilities: [
            'Plan and carry out experiments and investigations.',
            'Collect and analyze data.',
            'Keep accurate records of work undertaken.',
            'Write up results for reports and academic publications.'
        ],
        topColleges: [
            { name: 'IISc Bangalore', location: 'Bangalore', ranking: '#1 Research' },
            { name: 'TIFR', location: 'Mumbai', ranking: '#Top Fundamental' },
            { name: 'IISER Pune', location: 'Pune', ranking: '#Top Science' }
        ]
    },
    {
        id: '13',
        title: 'Cloud Architect',
        icon: '☁️',
        category: 'Technology',
        salary: '₹15-40 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 84,
        description: 'Design and oversee a company\'s cloud computing strategy, including cloud adoption plains, application design, and management.',
        skills: ['AWS/Azure/GCP', 'System Architecture', 'Networking', 'Security'],
        trending: true,
        about: 'Cloud Architects are responsible for managing the cloud architecture in an organization, especially as cloud technologies continue to grow in complexity.',
        responsibilities: [
            'Create a well-informed cloud strategy and manage the adaption process.',
            'Regularly evaluate cloud applications, hardware, and software.',
            'Develop and organize cloud systems and work closely with IT security.',
            'Respond to technical issues in a professional and timely manner.'
        ],
        topColleges: [
            { name: 'IIT Bombay', location: 'Mumbai', ranking: '#3 NIRF' },
            { name: 'BITS Pilani', location: 'Pilani', ranking: '#Top Private' },
            { name: 'NIT Trichy', location: 'Tiruchirappalli', ranking: '#9 NIRF' }
        ]
    },
    {
        id: '14',
        title: 'Corporate Lawyer',
        icon: '⚖️',
        category: 'Business',
        salary: '₹10-30 LPA',
        growth: 'Stable',
        education: "Bachelor's Degree",
        match: 75,
        description: 'Ensure the legality of commercial transactions and advise corporations on their legal rights and duties.',
        skills: ['Contract Law', 'Negotiation', 'Communication', 'Legal Research'],
        trending: false,
        about: 'A Corporate Lawyer works to ensure that a company\'s transactions comply with corporate laws and regulations. They may work at a law firm or as part of an in-house legal team.',
        responsibilities: [
            'Consult and handle all corporate legal processes.',
            'Develop company policy and position on legal issues.',
            'Research, anticipate and guard company against legal risks.',
            'Represent company in legal proceedings.'
        ],
        topColleges: [
            { name: 'NLSIU', location: 'Bangalore', ranking: '#1 Law' },
            { name: 'NLU Delhi', location: 'New Delhi', ranking: '#2 Law' },
            { name: 'Symbiosis Law School', location: 'Pune', ranking: '#Top Private' }
        ]
    },
    {
        id: '15',
        title: 'Cybersecurity Analyst',
        icon: '🛡️',
        category: 'Technology',
        salary: '₹7-25 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 89,
        description: 'Protect computer networks and systems from cyber attacks and coordinate security plans.',
        skills: ['Network Security', 'Ethical Hacking', 'Risk Management', 'Linux'],
        trending: true,
        about: 'Cybersecurity Analysts protect IT infrastructure, networks, and data from cyber attacks. They monitor systems, detect vulnerabilities, and implement defensive strategies.',
        responsibilities: [
            'Monitor computer networks for security issues.',
            'Investigate security breaches and other cybersecurity incidents.',
            'Install security measures and operate software to protect systems.',
            'Perform penetration testing.'
        ],
        topColleges: [
            { name: 'IIIT Allahabad', location: 'Prayagraj', ranking: '#Top IT' },
            { name: 'IIT Kanpur', location: 'Kanpur', ranking: '#4 NIRF (C3i Hub)' },
            { name: 'VIT Vellore', location: 'Vellore', ranking: '#11 NIRF' }
        ]
    },
    {
        id: '16',
        title: 'Investment Banker',
        icon: '💼',
        category: 'Business',
        salary: '₹15-50+ LPA',
        growth: 'Medium',
        education: "Master's Preferred",
        match: 73,
        description: 'Help organizations raise capital and provide financial advisory services.',
        skills: ['Financial Valuation', 'M&A', 'Networking', 'Excel'],
        trending: true,
        about: 'Investment Bankers connect companies that need capital with investors who have capital to spend. They work extreme hours but offer highly lucrative career paths.',
        responsibilities: [
            'Examine the financial records of clients to ensure valuation and accuracy.',
            'Provide financial advisory services.',
            'Help companies execute mergers and acquisitions (M&A).',
            'Assist clients with stock or bond offerings.'
        ],
        topColleges: [
            { name: 'IIM Ahmedabad', location: 'Ahmedabad', ranking: '#1 MBA' },
            { name: 'ISB Hyderabad', location: 'Hyderabad', ranking: '#Top Global' },
            { name: 'SRCC', location: 'New Delhi', ranking: '#1 Commerce' }
        ]
    },
    {
        id: '17',
        title: 'Bioinformatics Scientist',
        icon: '🧬',
        category: 'Science',
        salary: '₹8-22 LPA',
        growth: 'Growing',
        education: "Master's/Doctorate",
        match: 76,
        description: 'Combine biology, computer science, and information technology to analyze biological data.',
        skills: ['Genomics', 'Python/R', 'Data Analysis', 'Biology'],
        trending: true,
        about: 'Bioinformatics Scientists use computer technology to collect, store, analyze and integrate biological and genetic information which can then be applied to gene-based drug discovery and development.',
        responsibilities: [
            'Create novel computational approaches and analytical tools.',
            'Consult with researchers to analyze problems.',
            'Analyze large molecular datasets.',
            'Communicate research results through academic publications.'
        ],
        topColleges: [
            { name: 'IISc Bangalore', location: 'Bangalore', ranking: '#1 Science' },
            { name: 'IBAB', location: 'Bangalore', ranking: '#Top Biotech' },
            { name: 'IIT Delhi', location: 'New Delhi', ranking: '#2 NIRF' }
        ]
    },
    {
        id: '18',
        title: 'Architect',
        icon: '🏛️',
        category: 'Creative',
        salary: '₹5-25 LPA',
        growth: 'Stable',
        education: "Bachelor's Degree",
        match: 78,
        description: 'Design and plan buildings and other structures that are safe, functional, and aesthetically pleasing.',
        skills: ['AutoCAD', 'Design', 'Project Management', 'Creativity'],
        trending: false,
        about: 'Architects create designs for new construction projects, alterations, and redevelopments. They use their specialist construction knowledge and high-level drawing skills.',
        responsibilities: [
            'Create building designs and highly detailed drawings.',
            'Liaise with construction professionals about the feasibility of potential projects.',
            'Specify the requirements for the project.',
            'Adapt plans according to circumstances and resolve any problems that may arise during construction.'
        ],
        topColleges: [
            { name: 'SPA Delhi', location: 'New Delhi', ranking: '#1 Architecture' },
            { name: 'IIT Roorkee', location: 'Roorkee', ranking: '#2 Architecture' },
            { name: 'CEPT University', location: 'Ahmedabad', ranking: '#Top Private' }
        ]
    },
    {
        id: '19',
        title: 'Data Engineer',
        icon: '🗄️',
        category: 'Technology',
        salary: '₹8-30 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 87,
        description: 'Build systems that collect, manage, and convert raw data into usable information for data scientists.',
        skills: ['SQL', 'Python', 'ETL', 'Big Data (Spark/Hadoop)'],
        trending: true,
        about: 'Data Engineers format data to become useful and accessible for Data Scientists. They design and build pipelines that transform and transport data into a highly usable format.',
        responsibilities: [
            'Create and maintain optimal data pipeline architecture.',
            'Assemble large, complex data sets that meet business requirements.',
            'Identify, design, and implement internal process improvements.',
            'Build the infrastructure required for optimal extraction, transformation, and loading of data.'
        ],
        topColleges: [
            { name: 'IIIT Hyderabad', location: 'Hyderabad', ranking: '#10 NIRF' },
            { name: 'IIT Kanpur', location: 'Kanpur', ranking: '#4 NIRF' },
            { name: 'BITS Pilani', location: 'Pilani', ranking: '#Top Private' }
        ]
    },
    {
        id: '20',
        title: 'Event Manager',
        icon: '🎉',
        category: 'Business',
        salary: '₹4-15 LPA',
        growth: 'Growing',
        education: "Bachelor's Degree",
        match: 65,
        description: 'Plan, organize, and execute events such as weddings, conferences, or festivals.',
        skills: ['Organization', 'Communication', 'Negotiation', 'Problem Solving'],
        trending: false,
        about: 'Event Managers are responsible for planning and organizing promotional, business, and social events. They\'re responsible for running a range of events, ensuring the target audience is engaged.',
        responsibilities: [
            'Liaise with clients to find out their exact event requirements.',
            'Produce detailed proposals for events (timelines, venues, suppliers).',
            'Manage and coordinate suppliers and all event logistics.',
            'Coordinate venue management, caterers, stand designers, contractors and equipment hire.'
        ],
        topColleges: [
            { name: 'NAEMD', location: 'Mumbai', ranking: '#1 Event Mgmt' },
            { name: 'NIEM', location: 'Delhi/Mumbai', ranking: '#Top Private' },
            { name: 'Amity University', location: 'Noida', ranking: '#Top Private' }
        ]
    },
    {
        id: '21',
        title: 'Game Developer',
        icon: '🎮',
        category: 'Creative',
        salary: '₹6-25 LPA',
        growth: 'Very High',
        education: "Bachelor's Degree",
        match: 81,
        description: 'Design and develop video games for PC, console, or mobile platforms.',
        skills: ['C++', 'C#', 'Unity/Unreal', '3D Math'],
        trending: true,
        about: 'Game Developers take a designer\'s conceptual ideas and write code to turn them into a playable game. They may work on mechanics, graphics, AI, or networking.',
        responsibilities: [
            'Translate design ideas into functional game code.',
            'Code the base engine of the game.',
            'Produce prototypes of gameplay ideas and features.',
            'Animate characters and objects.'
        ],
        topColleges: [
            { name: 'NID', location: 'Ahmedabad', ranking: '#1 Design' },
            { name: 'VIT Vellore', location: 'Vellore', ranking: '#11 NIRF' },
            { name: 'UPES', location: 'Dehradun', ranking: '#Top Private' }
        ]
    }
];

export const getCareerById = (id: string) => {
    return careersData.find(career => career.id === id);
};
