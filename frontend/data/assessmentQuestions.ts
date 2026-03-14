export interface AptitudeQuestion {
    id: number;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
    tip: string;
    category: string;
}

export interface InterestQuestion {
    id: number;
    question: string;
    options: { id: string; text: string; icon: string }[];
}

export const interestQuestionsByStream: Record<string, InterestQuestion[]> = {
    science: [
        {
            id: 1,
            question: 'Which activity excites you the most?',
            options: [
                { id: 'a', text: 'Solving complex mathematical problems', icon: '🧮' },
                { id: 'b', text: 'Conducting experiments and building prototypes', icon: '🔬' },
                { id: 'c', text: 'Writing algorithms and coding', icon: '💻' },
                { id: 'd', text: 'Studying human anatomy and biology', icon: '🧬' },
            ],
        },
        {
            id: 2,
            question: 'What type of environment do you prefer?',
            options: [
                { id: 'a', text: 'A high-tech laboratory', icon: '🧪' },
                { id: 'b', text: 'Working with machinery or robotics', icon: '🤖' },
                { id: 'c', text: 'A fast-paced tech startup', icon: '🚀' },
                { id: 'd', text: 'A hospital or clinical setting', icon: '🏥' },
            ],
        },
        {
            id: 3,
            question: 'How do you prefer to learn new things?',
            options: [
                { id: 'a', text: 'Hands-on experimentation', icon: '🔬' },
                { id: 'b', text: 'Analyzing data and finding patterns', icon: '📊' },
                { id: 'c', text: 'Reading scientific journals', icon: '📖' },
                { id: 'd', text: 'Developing new software or tools', icon: '⚙️' },
            ],
        },
        {
            id: 4,
            question: 'Which science field interests you most?',
            options: [
                { id: 'a', text: 'Physics and Space Exploration', icon: '🌌' },
                { id: 'b', text: 'Chemistry and Materials Science', icon: '⚗️' },
                { id: 'c', text: 'Computer Science and AI', icon: '🤖' },
                { id: 'd', text: 'Medicine and Healthcare', icon: '💊' },
            ],
        },
        {
            id: 5,
            question: 'What motivates you in your work?',
            options: [
                { id: 'a', text: 'Making scientific breakthroughs', icon: '🏆' },
                { id: 'b', text: 'Helping others through technology', icon: '❤️' },
                { id: 'c', text: 'Building innovative products', icon: '🛠️' },
                { id: 'd', text: 'Understanding how the universe works', icon: '🌍' },
            ],
        },
    ],
    commerce: [
        {
            id: 1,
            question: 'Which activity excites you the most?',
            options: [
                { id: 'a', text: 'Managing a team or project', icon: '👥' },
                { id: 'b', text: 'Analyzing financial markets and stocks', icon: '📈' },
                { id: 'c', text: 'Developing business strategies', icon: '🎯' },
                { id: 'd', text: 'Working with numbers, accounts, and audits', icon: '📒' },
            ],
        },
        {
            id: 2,
            question: 'What type of environment do you prefer?',
            options: [
                { id: 'a', text: 'A bustling corporate office', icon: '🏢' },
                { id: 'b', text: 'A dynamic trading floor', icon: '💹' },
                { id: 'c', text: 'An innovative startup ecosystem', icon: '💡' },
                { id: 'd', text: 'A consultancy firm dealing with clients', icon: '🤝' },
            ],
        },
        {
            id: 3,
            question: 'What drives you the most?',
            options: [
                { id: 'a', text: 'Financial success and wealth creation', icon: '💰' },
                { id: 'b', text: 'Building a successful brand or business', icon: '🏆' },
                { id: 'c', text: 'Developing efficient systems and processes', icon: '⚙️' },
                { id: 'd', text: 'Negotiating and networking', icon: '💬' },
            ],
        },
        {
            id: 4,
            question: 'Which commerce area fascinates you?',
            options: [
                { id: 'a', text: 'Investment Banking and Finance', icon: '🏦' },
                { id: 'b', text: 'Marketing and Brand Management', icon: '📢' },
                { id: 'c', text: 'Accounting and Taxation', icon: '📋' },
                { id: 'd', text: 'Entrepreneurship and Startups', icon: '🚀' },
            ],
        },
        {
            id: 5,
            question: 'How do you prefer to make decisions?',
            options: [
                { id: 'a', text: 'Based on data and analytics', icon: '📊' },
                { id: 'b', text: 'Using gut instinct and experience', icon: '🧠' },
                { id: 'c', text: 'Consulting team members and peers', icon: '🤝' },
                { id: 'd', text: 'Following market trends and research', icon: '🔍' },
            ],
        },
    ],
    arts: [
        {
            id: 1,
            question: 'Which activity excites you the most?',
            options: [
                { id: 'a', text: 'Writing stories, articles, or scripts', icon: '✍️' },
                { id: 'b', text: 'Creating visual art, designs, or illustrations', icon: '🎨' },
                { id: 'c', text: 'Studying history, cultures, and society', icon: '🌍' },
                { id: 'd', text: 'Advocating for social justice and rights', icon: '⚖️' },
            ],
        },
        {
            id: 2,
            question: 'What type of environment do you prefer?',
            options: [
                { id: 'a', text: 'A creative studio or agency', icon: '🌈' },
                { id: 'b', text: 'A newsroom or media house', icon: '📰' },
                { id: 'c', text: 'An NGO or community organization', icon: '🤝' },
                { id: 'd', text: 'Academia, libraries, or archives', icon: '📚' },
            ],
        },
        {
            id: 3,
            question: 'How do you prefer to express yourself?',
            options: [
                { id: 'a', text: 'Through writing or poetry', icon: '📝' },
                { id: 'b', text: 'Via digital media, film, or photography', icon: '🎬' },
                { id: 'c', text: 'Through public speaking or debate', icon: '🎤' },
                { id: 'd', text: 'Through counseling and helping others', icon: '❤️' },
            ],
        },
        {
            id: 4,
            question: 'Which arts discipline appeals to you most?',
            options: [
                { id: 'a', text: 'Fine Arts and Illustration', icon: '🖌️' },
                { id: 'b', text: 'Journalism and Mass Communication', icon: '📡' },
                { id: 'c', text: 'Psychology and Social Work', icon: '🧩' },
                { id: 'd', text: 'Literature and Language', icon: '📚' },
            ],
        },
        {
            id: 5,
            question: 'What kind of impact do you want to have?',
            options: [
                { id: 'a', text: 'Inspire people through creative expression', icon: '✨' },
                { id: 'b', text: 'Influence public opinion and policy', icon: '🗳️' },
                { id: 'c', text: 'Preserve culture and historical knowledge', icon: '🏛️' },
                { id: 'd', text: 'Support communities and mental well-being', icon: '💙' },
            ],
        },
    ],
    vocational: [
        {
            id: 1,
            question: 'Which activity excites you the most?',
            options: [
                { id: 'a', text: 'Fixing or building things with my hands', icon: '🔧' },
                { id: 'b', text: 'Cooking, baking, or culinary arts', icon: '🍳' },
                { id: 'c', text: 'Designing interiors or fashion', icon: '👗' },
                { id: 'd', text: 'Learning practical tech or mechanical skills', icon: '💻' },
            ],
        },
        {
            id: 2,
            question: 'What type of environment do you prefer?',
            options: [
                { id: 'a', text: 'A bustling kitchen or hotel setup', icon: '🏨' },
                { id: 'b', text: 'A workshop or manufacturing unit', icon: '⚙️' },
                { id: 'c', text: 'A specialized clinic or care center', icon: '🩺' },
                { id: 'd', text: 'A design or animation studio', icon: '🎬' },
            ],
        },
        {
            id: 3,
            question: 'How do you prefer to learn new things?',
            options: [
                { id: 'a', text: 'On-the-job practical training', icon: '🛠️' },
                { id: 'b', text: 'Visual demonstrations and step-by-step guides', icon: '👀' },
                { id: 'c', text: 'By trial, error, and practice', icon: '🔄' },
                { id: 'd', text: 'Interacting directly with tools and materials', icon: '🏗️' },
            ],
        },
        {
            id: 4,
            question: 'Which vocational area interests you most?',
            options: [
                { id: 'a', text: 'Electrical and Electronics Trade', icon: '⚡' },
                { id: 'b', text: 'Hospitality and Tourism', icon: '🌴' },
                { id: 'c', text: 'Beauty and Wellness Therapy', icon: '💅' },
                { id: 'd', text: 'IT and Computer Hardware Repair', icon: '🖥️' },
            ],
        },
        {
            id: 5,
            question: 'What best describes your working style?',
            options: [
                { id: 'a', text: 'I like working with my hands on physical tasks', icon: '🙌' },
                { id: 'b', text: 'I love creating tangible products or food', icon: '🎁' },
                { id: 'c', text: 'I enjoy perfecting a specialized skill', icon: '🎯' },
                { id: 'd', text: 'I prefer applying learned techniques precisely', icon: '📐' },
            ],
        },
    ]
};

export const pathSpecificQuestions: Record<string, AptitudeQuestion[]> = {
    science: [
        {
            id: 1,
            question: 'If a machine produces 40 parts in 2 hours, how many will 3 machines produce in 5 hours?',
            options: [
                { id: 'a', text: '100' },
                { id: 'b', text: '150' },
                { id: 'c', text: '300' },
                { id: 'd', text: '600' }
            ],
            correctAnswer: 'c',
            explanation: 'One machine produces 20 parts/hour. Three machines produce 60 parts/hour. In 5 hours, they produce 60 × 5 = 300 parts.',
            tip: 'Find the unit rate first (parts per machine per hour).',
            category: 'Numerical Reasoning'
        },
        {
            id: 2,
            question: 'Find the next number in the series representing logical logic gates: 1, 2, 4, 8, __',
            options: [
                { id: 'a', text: '12' },
                { id: 'b', text: '16' },
                { id: 'c', text: '24' },
                { id: 'd', text: '32' }
            ],
            correctAnswer: 'b',
            explanation: 'This is a binary sequence where each number is multiplied by 2 (powers of 2). Next is 8 × 2 = 16.',
            tip: 'Engineering logic often follows exponential or binary patterns.',
            category: 'Logical Reasoning'
        },
        {
            id: 3,
            question: 'Which of the following describes "Algorithm"?',
            options: [
                { id: 'a', text: 'A type of hardware component' },
                { id: 'b', text: 'A step-by-step procedure for solving a problem' },
                { id: 'c', text: 'A programming language' },
                { id: 'd', text: 'A computer virus' }
            ],
            correctAnswer: 'b',
            explanation: 'An algorithm is a finite sequence of well-defined instructions to solve a class of problems.',
            tip: 'Algorithms are the blueprints of logic in computer science.',
            category: 'Technical Aptitude'
        },
        {
            id: 4,
            question: 'If a patient is prescribed 500mg of medication twice a day for 7 days, what is the total dosage in grams?',
            options: [
                { id: 'a', text: '3.5g' },
                { id: 'b', text: '7g' },
                { id: 'c', text: '3500g' },
                { id: 'd', text: '7000g' }
            ],
            correctAnswer: 'b',
            explanation: '500mg × 2 = 1000mg (1 gram) per day. Over 7 days, this is 7 grams total.',
            tip: '1 gram = 1000 milligrams. Pay close attention to units in medical calculations.',
            category: 'Numerical Aptitude'
        },
        {
            id: 5,
            question: 'If all circuits are closed and some closed circuits are active, which is true?',
            options: [
                { id: 'a', text: 'All circuits are active' },
                { id: 'b', text: 'Some circuits may not be active' },
                { id: 'c', text: 'No circuits are active' },
                { id: 'd', text: 'All active items are circuits' }
            ],
            correctAnswer: 'b',
            explanation: 'Since only some closed circuits are active, and all circuits are closed, it is certain that some circuits may not be active.',
            tip: 'Draw Venn diagrams for syllogisms like "All A is B, Some B is C".',
            category: 'Logical Deduction'
        },
        {
            id: 6,
            question: 'What is the speed of light approximately in a vacuum?',
            options: [
                { id: 'a', text: '3 × 10⁶ m/s' },
                { id: 'b', text: '3 × 10⁸ m/s' },
                { id: 'c', text: '3 × 10¹⁰ m/s' },
                { id: 'd', text: '3 × 10⁴ m/s' }
            ],
            correctAnswer: 'b',
            explanation: 'The speed of light in a vacuum is approximately 3 × 10⁸ meters per second (300,000 km/s).',
            tip: 'Einstein\'s theory of special relativity is based on the constant speed of light.',
            category: 'Scientific Knowledge'
        },
        {
            id: 7,
            question: 'A train travels 300 km in 4 hours. What is its average speed?',
            options: [
                { id: 'a', text: '65 km/h' },
                { id: 'b', text: '70 km/h' },
                { id: 'c', text: '75 km/h' },
                { id: 'd', text: '80 km/h' }
            ],
            correctAnswer: 'c',
            explanation: 'Speed = Distance / Time = 300 km / 4 hours = 75 km/h.',
            tip: 'Always use Speed = Distance ÷ Time formula for such calculations.',
            category: 'Numerical Reasoning'
        },
        {
            id: 8,
            question: 'Which element has the atomic number 6?',
            options: [
                { id: 'a', text: 'Nitrogen' },
                { id: 'b', text: 'Oxygen' },
                { id: 'c', text: 'Carbon' },
                { id: 'd', text: 'Hydrogen' }
            ],
            correctAnswer: 'c',
            explanation: 'Carbon has atomic number 6, meaning it has 6 protons in its nucleus. It is essential for all known life.',
            tip: 'The atomic number equals the number of protons in an atom\'s nucleus.',
            category: 'Scientific Knowledge'
        }
    ],
    commerce: [
        {
            id: 1,
            question: 'If a product is bought for ₹500 and sold for ₹600, what is the profit percentage?',
            options: [
                { id: 'a', text: '10%' },
                { id: 'b', text: '16.67%' },
                { id: 'c', text: '20%' },
                { id: 'd', text: '25%' }
            ],
            correctAnswer: 'c',
            explanation: 'Profit = 600 - 500 = 100. Profit % = (Profit/Cost) × 100 = (100/500) × 100 = 20%.',
            tip: 'Profit percentage is always calculated on the Cost Price (CP).',
            category: 'Quantitative Aptitude'
        },
        {
            id: 2,
            question: 'Which of the following best defines "ROI"?',
            options: [
                { id: 'a', text: 'Rate of Inflation' },
                { id: 'b', text: 'Return on Investment' },
                { id: 'c', text: 'Revenue over Income' },
                { id: 'd', text: 'Ratio of Interest' }
            ],
            correctAnswer: 'b',
            explanation: 'ROI stands for Return on Investment, a massive metric in business to evaluate the profitability of an investment.',
            tip: 'ROI = (Net Profit / Cost of Investment) x 100.',
            category: 'Business Awareness'
        },
        {
            id: 3,
            question: 'A manager noticed a 15% drop in sales. If previous sales were 4000 units, what are current sales?',
            options: [
                { id: 'a', text: '3200' },
                { id: 'b', text: '3400' },
                { id: 'c', text: '3600' },
                { id: 'd', text: '3800' }
            ],
            correctAnswer: 'b',
            explanation: '15% of 4000 = 600. Current sales = 4000 - 600 = 3400 units.',
            tip: 'Use 10% blocks. 10% is 400, 5% is 200. Total 600.',
            category: 'Data Interpretation'
        },
        {
            id: 4,
            question: 'If Project X takes 3 managers 10 days to plan, how long will it take 5 managers assuming equal efficiency?',
            options: [
                { id: 'a', text: '4 days' },
                { id: 'b', text: '5 days' },
                { id: 'c', text: '6 days' },
                { id: 'd', text: '8 days' }
            ],
            correctAnswer: 'c',
            explanation: 'Managers and days are inversely proportional. M1 × D1 = M2 × D2. 3 × 10 = 5 × X. X = 30 / 5 = 6 days.',
            tip: 'More resources mean less time to complete the same amount of work.',
            category: 'Problem Solving'
        },
        {
            id: 5,
            question: 'Read the statement: "Company A increased its marketing budget." Conclusion: "Sales will increase." Is this conclusion logical?',
            options: [
                { id: 'a', text: 'Definitely True' },
                { id: 'b', text: 'Probably True' },
                { id: 'c', text: 'Insufficient Data' },
                { id: 'd', text: 'Definitely False' }
            ],
            correctAnswer: 'c',
            explanation: 'An increased marketing budget does not mathematically guarantee increased sales; other factors like product quality, market conditions, and campaign effectiveness play a role.',
            tip: 'In business logic, do not assume causation without direct evidence.',
            category: 'Critical Reasoning'
        },
        {
            id: 6,
            question: 'What does "EBITDA" stand for in finance?',
            options: [
                { id: 'a', text: 'Earnings Before Interest, Taxes, Depreciation and Amortization' },
                { id: 'b', text: 'Estimated Balance In Total Debt Analysis' },
                { id: 'c', text: 'Economic Benchmark of Internal Trade Data Analysis' },
                { id: 'd', text: 'Effective Business Investment Total Dividend Amount' }
            ],
            correctAnswer: 'a',
            explanation: 'EBITDA is a key financial metric used to assess a company\'s operational performance excluding non-operational expenses.',
            tip: 'EBITDA is widely used by investors and analysts to evaluate business profitability.',
            category: 'Financial Literacy'
        },
        {
            id: 7,
            question: 'If simple interest on ₹2000 for 3 years is ₹300, what is the interest rate?',
            options: [
                { id: 'a', text: '3%' },
                { id: 'b', text: '5%' },
                { id: 'c', text: '7%' },
                { id: 'd', text: '10%' }
            ],
            correctAnswer: 'b',
            explanation: 'SI = (P × R × T) / 100. 300 = (2000 × R × 3) / 100. R = 30000 / 6000 = 5%.',
            tip: 'Use SI = PRT/100 and rearrange to find the unknown variable.',
            category: 'Quantitative Aptitude'
        },
        {
            id: 8,
            question: 'In accounting, which of the following is a current asset?',
            options: [
                { id: 'a', text: 'Land and Building' },
                { id: 'b', text: 'Machinery' },
                { id: 'c', text: 'Accounts Receivable' },
                { id: 'd', text: 'Long-term Investments' }
            ],
            correctAnswer: 'c',
            explanation: 'Accounts Receivable is a current asset because it is expected to be converted to cash within one year.',
            tip: 'Current assets are those convertible to cash within 12 months.',
            category: 'Accounting Knowledge'
        }
    ],
    arts: [
        {
            id: 1,
            question: 'Which color mode is primarily used for digital screen design (web/app)?',
            options: [
                { id: 'a', text: 'CMYK' },
                { id: 'b', text: 'RGB' },
                { id: 'c', text: 'Pantone' },
                { id: 'd', text: 'Grayscale' }
            ],
            correctAnswer: 'b',
            explanation: 'RGB (Red, Green, Blue) is the color model used for emitting light on digital screens. CMYK is for printing.',
            tip: 'Remember: RGB for screens, CMYK for printers.',
            category: 'Design Knowledge'
        },
        {
            id: 2,
            question: 'What is the next shape in the sequence: Triangle, Square, Pentagon, __?',
            options: [
                { id: 'a', text: 'Circle' },
                { id: 'b', text: 'Hexagon' },
                { id: 'c', text: 'Heptagon' },
                { id: 'd', text: 'Octagon' }
            ],
            correctAnswer: 'b',
            explanation: 'The sequence follows the number of sides: 3, 4, 5. The next shape should have 6 sides (Hexagon).',
            tip: 'Count sides or angles in visual sequence questions.',
            category: 'Visual Logic'
        },
        {
            id: 3,
            question: 'In typography, what do we call the spacing between individual letters?',
            options: [
                { id: 'a', text: 'Leading' },
                { id: 'b', text: 'Kerning' },
                { id: 'c', text: 'Tracking' },
                { id: 'd', text: 'Padding' }
            ],
            correctAnswer: 'b',
            explanation: 'Kerning is the spacing between specific pairs of characters. Tracking is for a whole block of text. Leading is vertical space.',
            tip: 'Attention to detail in typography is crucial for UX/UI designers.',
            category: 'Creative Aptitude'
        },
        {
            id: 4,
            question: 'If you combine Red and Yellow in standard color mixing, what do you get?',
            options: [
                { id: 'a', text: 'Orange' },
                { id: 'b', text: 'Green' },
                { id: 'c', text: 'Purple' },
                { id: 'd', text: 'Brown' }
            ],
            correctAnswer: 'a',
            explanation: 'Red and Yellow are primary colors that mix to create Orange in standard color theory.',
            tip: 'Understanding color theory is foundational for design careers.',
            category: 'Design Literacy'
        },
        {
            id: 5,
            question: 'Identify the odd one out from the following design-related terms:',
            options: [
                { id: 'a', text: 'Symmetry' },
                { id: 'b', text: 'Balance' },
                { id: 'c', text: 'Contrast' },
                { id: 'd', text: 'Pixel' }
            ],
            correctAnswer: 'd',
            explanation: 'Symmetry, Balance, and Contrast are principles of design. A Pixel is a physical unit of digital display resolution.',
            tip: 'Differentiate between design principles and design mediums/units.',
            category: 'Abstract Reasoning'
        },
        {
            id: 6,
            question: 'In the sentence "She was happy as she had passed the exam", identify the type of clause.',
            options: [
                { id: 'a', text: 'Relative Clause' },
                { id: 'b', text: 'Adverbial Clause of Reason' },
                { id: 'c', text: 'Noun Clause' },
                { id: 'd', text: 'Conditional Clause' }
            ],
            correctAnswer: 'b',
            explanation: '"As she had passed the exam" explains the reason for her happiness — an adverbial clause of reason.',
            tip: 'Identify what question the clause answers: why, where, when, or how.',
            category: 'Language Aptitude'
        },
        {
            id: 7,
            question: 'Which literary device is used in "The stars danced in the sky"?',
            options: [
                { id: 'a', text: 'Simile' },
                { id: 'b', text: 'Metaphor' },
                { id: 'c', text: 'Personification' },
                { id: 'd', text: 'Alliteration' }
            ],
            correctAnswer: 'c',
            explanation: 'Personification gives human qualities to non-human things. Stars cannot literally "dance" — this is a human attribute.',
            tip: 'If it gives human behavior to a non-human object, it is personification.',
            category: 'Literary Knowledge'
        },
        {
            id: 8,
            question: 'If a painting has 5 different shades and 3 must always be displayed together, how many unique combinations can exist?',
            options: [
                { id: 'a', text: '2' },
                { id: 'b', text: '3' },
                { id: 'c', text: '4' },
                { id: 'd', text: '6' }
            ],
            correctAnswer: 'b',
            explanation: 'With 3 fixed, the remaining 2 shades can be chosen or not. There are 3 combinations: choose 0, 1, or 2 of the remaining. But all 3 must appear, giving 3 valid subsets.',
            tip: 'Break constraints down: fixed elements reduce the combination space.',
            category: 'Creative Logic'
        }
    ],
    vocational: [
        {
            id: 1,
            question: 'If gear A with 20 teeth turns gear B with 40 teeth, how many rotations does B make when A makes 4?',
            options: [
                { id: 'a', text: '2' },
                { id: 'b', text: '4' },
                { id: 'c', text: '6' },
                { id: 'd', text: '8' }
            ],
            correctAnswer: 'a',
            explanation: 'Gear ratio is 20:40 or 1:2. The larger gear turns half as fast. 4 rotations of A = 2 rotations of B.',
            tip: 'Mechanical advantage is inversely proportional to gear rotation speed.',
            category: 'Mechanical Reasoning'
        },
        {
            id: 2,
            question: 'Which tool is most appropriate for tightening a hexagonal nut?',
            options: [
                { id: 'a', text: 'Pliers' },
                { id: 'b', text: 'Screwdriver' },
                { id: 'c', text: 'Spanner or Wrench' },
                { id: 'd', text: 'Hammer' }
            ],
            correctAnswer: 'c',
            explanation: 'Spanners/wrenches are specifically designed to provide grip and mechanical advantage in applying torque to turn nuts and bolts.',
            tip: 'Select the tool designed specifically for the shape and function required.',
            category: 'Practical Reasoning'
        },
        {
            id: 3,
            question: 'If a recipe for 4 people requires 200g of flour, how much is needed for 10 people?',
            options: [
                { id: 'a', text: '400g' },
                { id: 'b', text: '500g' },
                { id: 'c', text: '600g' },
                { id: 'd', text: '1000g' }
            ],
            correctAnswer: 'b',
            explanation: 'Amount per person is 200g / 4 = 50g. For 10 people it is 10 × 50g = 500g.',
            tip: 'Use standard ratios and proportions.',
            category: 'Quantitative Skills'
        },
        {
            id: 4,
            question: 'Which of the following describes a "VLAN"?',
            options: [
                { id: 'a', text: 'A visual LAN adapter' },
                { id: 'b', text: 'A virtual local area network' },
                { id: 'c', text: 'A verified login area node' },
                { id: 'd', text: 'A video localization algorithm network' }
            ],
            correctAnswer: 'b',
            explanation: 'VLAN stands for Virtual Local Area Network, which groups host computers logically rather than physically.',
            tip: 'This tests basic IT networking knowledge useful for vocational computer courses.',
            category: 'Technical Aptitude'
        },
        {
            id: 5,
            question: 'When mixing cement, sand, and gravel, the standard ratio is often 1:2:4. If you use 10kg of cement, how much gravel is needed?',
            options: [
                { id: 'a', text: '20kg' },
                { id: 'b', text: '30kg' },
                { id: 'c', text: '40kg' },
                { id: 'd', text: '50kg' }
            ],
            correctAnswer: 'c',
            explanation: 'The ratio of cement to gravel is 1:4. Therefore, 10kg of cement requires 10 × 4 = 40kg of gravel.',
            tip: 'Follow the ratio strictly for proportions.',
            category: 'Construction Mathematics'
        },
        {
            id: 6,
            question: 'A 3-phase electrical motor runs at 1440 RPM. If the full-load slip is 4%, what is the synchronous speed?',
            options: [
                { id: 'a', text: '1200 RPM' },
                { id: 'b', text: '1440 RPM' },
                { id: 'c', text: '1500 RPM' },
                { id: 'd', text: '1800 RPM' }
            ],
            correctAnswer: 'c',
            explanation: 'Ns = Nr / (1 - s) = 1440 / (1 - 0.04) = 1440 / 0.96 = 1500 RPM.',
            tip: 'Slip is the difference between synchronous and actual speed as a percentage of synchronous speed.',
            category: 'Electrical Reasoning'
        },
        {
            id: 7,
            question: 'In carpentry, which joint is best for connecting two pieces of wood at a right angle?',
            options: [
                { id: 'a', text: 'Butt Joint' },
                { id: 'b', text: 'Dovetail Joint' },
                { id: 'c', text: 'Mortise and Tenon Joint' },
                { id: 'd', text: 'Finger Joint' }
            ],
            correctAnswer: 'c',
            explanation: 'The mortise and tenon joint is one of the strongest and most common wood joints, used for right-angle connections in furniture and frames.',
            tip: 'Different joints serve different structural and aesthetic purposes in woodworking.',
            category: 'Practical Reasoning'
        },
        {
            id: 8,
            question: 'If a hotel room is occupied for 12 nights at ₹2500 per night with a 15% seasonal discount, what is the total bill?',
            options: [
                { id: 'a', text: '₹25,000' },
                { id: 'b', text: '₹25,500' },
                { id: 'c', text: '₹30,000' },
                { id: 'd', text: '₹30,500' }
            ],
            correctAnswer: 'b',
            explanation: 'Full price = 12 × 2500 = ₹30,000. Discount = 15% of 30,000 = ₹4,500. Final = 30,000 - 4,500 = ₹25,500.',
            tip: 'Always calculate the full amount first, then apply the discount.',
            category: 'Hospitality Mathematics'
        }
    ]
};

export const defaultQuestions = pathSpecificQuestions['science'];
