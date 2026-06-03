import type { MusicProgram, CourseFee } from "./types";
import { images } from "./images";

import { PRODUCTION_SITE_URL } from "./site-url";

export const siteConfig = {
  name: "RAGA VEDA",
  tagline: "Music Academy",
  siteUrl: PRODUCTION_SITE_URL,
  phone: "+91 91365 93977",
  whatsapp: "https://wa.me/919136593977",
  payment: {
    qrImage: "/QR.png",
    upiId: "8826723643@ptaxis",
    title: "Pay via QR Code",
    instruction: "Scan this QR code or pay using the UPI ID below",
    note: "After payment, share the screenshot on WhatsApp for confirmation.",
    pagePath: "/pay",
    shareMessage:
      "Pay fees for Raga Veda Music Academy — open this link to scan our payment QR code:",
    linkLabel: "Payment page link",
  },
  social: {
    instagram:
      "https://www.instagram.com/ragavedamusicacademy?igsh=aGJ3OG5vbTl3NTh4",
    youtube: "https://youtube.com/@ragaveda",
    facebook: "https://www.facebook.com/share/18eNfNKHRR/",
  },
};

export const aboutContent = {
  title: "About Raga Veda Music Academy",
  intro: [
    "At Raga Veda Music Academy, we believe that music is not just an art form — it is a journey of confidence, creativity, discipline, and self-expression. Our mission is to nurture every student with the right guidance, structured training, and encouragement to help them discover their true musical potential.",
  ],
  founder: {
    name: "Ms. Aditi Govindan",
    role: "Advanced Level Carnatic Music Artist, Performer & Vocal Trainer",
    bio: "Founded by Ms. Aditi Govindan, the academy was established with a vision to provide high-quality and systematic music education for students of all age groups. She has received guidance under esteemed Gurus Smt. Jaishree Ranganathan, Smt. Nirmala Bhaskaran, and renowned Carnatic musician Vidwan Neyveli Santhanagopalan. With years of performance and teaching experience, she is deeply committed to preserving the rich tradition of Indian classical music while making learning accessible, enjoyable, and confidence-building for modern learners.",
    image: "/teachers/aditi-govindan.jpeg",
  },
  teachingApproach:
    "At Raga Veda Music Academy, we understand that every student learns differently. Our specially designed teaching methods focus on step-by-step learning for children, adults, beginners, advanced learners, and special children. We emphasize not only learning songs, but also building strong fundamentals in shruti alignment, voice culture, rhythm, expression, and stage confidence.",
  trainingOffered: [
    "Carnatic Classical Vocal",
    "Hindustani Classical Vocal",
    "Filmy / Bollywood Music",
    "Western Vocal Music",
  ],
  studentBenefits: [
    "Structured & Systematic Training",
    "Voice Culture & Vocal Development",
    "Pitch / Shruti Correction",
    "Personalized Feedback & Guidance",
    "Performance Opportunities",
    "Confidence Development Through Music",
    "Certification & Grade Exam Preparation",
  ],
  certifications: {
    title: "Internationally Recognized Certifications & Affiliations",
    intro:
      "Raga Veda Music Academy is proudly affiliated with prestigious organizations dedicated to the promotion and preservation of Indian Fine Arts.",
    partners: [
      {
        name: "Academy of Indian Music & Arts (AIMA)",
        description:
          "Founded by Dr. T. V. Gopalakrishnan, AIMA is a reputed charitable and cultural organization recognized by the Government of India with 80G Certification. The institution has been actively promoting Indian music, arts, and cultural education globally for several decades.",
      },
      {
        name: "Bridge Academy — International Grade Examination System",
        description:
          "Our students benefit from Bridge Academy's internationally recognized 8 Grade Examination System for Indian Fine Arts — a structured certification framework with a progressive and professional learning pathway similar to internationally recognized music grading systems.",
        highlights: [
          "Learn music in a systematic and organized manner",
          "Build strong technical and theoretical foundations",
          "Gain internationally recognized certifications",
          "Track musical progress step-by-step",
          "Prepare confidently for performances and higher-level examinations",
        ],
        note: "Bridge Academy's globally implemented certification structure is followed by a large network of reputed teachers and institutions across multiple countries, helping students receive valuable recognition for their dedication and training.",
      },
      {
        name: "Suro Bharati Sangeet Kala Kendra",
        description:
          "Our affiliated certification system is also connected with respected cultural institutions such as Suro Bharati Sangeet Kala Kendra, which has received academic equivalence from Indira Kala Sangit Vishwavidyalaya (IKSV) — one of India's prestigious universities dedicated to music and fine arts education.",
      },
    ],
  },
  closing:
    "At Raga Veda Music Academy, we are committed to creating a positive, inspiring, and supportive learning environment where students not only learn music but also develop confidence, discipline, creativity, and a lifelong appreciation for the art. Whether you are a beginner starting your musical journey or an aspiring performer looking for professional training, we warmly welcome you to become a part of our musical family and grow with the right guidance, mentorship, and opportunities.",
  stat: { value: "15+", label: "Years of Musical Excellence" },
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#teachers", label: "Teacher" },
  { href: "#affiliations", label: "Affiliations" },
  { href: "#courses", label: "Courses" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#certification", label: "Certification" },
  { href: "#demo-booking", label: "Demo Booking" },
  { href: "#faq", label: "FAQ" },
];

export const courses = [
  {
    id: "carnatic",
    title: "Carnatic Classical Vocal",
    duration: "6 Months – 3 Years",
    level: "Beginner to Advanced",
    description:
      "Certification courses from Foundation (6 months) to Advanced Diploma (3 years) — varisais, geethams, varnams, krithis & manodharma.",
    image: images.veenaInstruments,
    icon: "music2",
    href: "#carnatic",
  },
  {
    id: "hindustani",
    title: "Hindustani Classical Vocal",
    duration: "6 Months – 3 Years",
    level: "Beginner to Advanced",
    description:
      "Foundation to Advanced Diploma — swar sadhana, alaap, taans, bandish, and immersive raag study with performance training.",
    image: images.tanpuraSetup,
    icon: "mic2",
    href: "#hindustani",
  },
  {
    id: "bollywood",
    title: "Bollywood / Filmy Music",
    duration: "6 Months – 1 Year",
    level: "Beginner to Intermediate",
    description:
      "Foundation & Certificate courses in voice culture, karaoke, modulation, expression, and studio-ready Bollywood repertoire.",
    image: images.studentVocalPerformance,
    icon: "disc3",
    href: "#bollywood",
  },
  {
    id: "bhajans",
    title: "Light Music, Bhajans & Shlokas",
    duration: "6 Months",
    level: "Beginner Friendly",
    description:
      "Devotional bhajans, Sanskrit shlokas, light music & bhakti songs with pronunciation, melody, and expressive clarity.",
    image: images.devotional,
    icon: "flower2",
    href: "#bhajans",
  },
  {
    id: "western",
    title: "Western Music Vocal",
    duration: "6 Months",
    level: "Beginner Level",
    description:
      "Voice culture, solfege, pitch training, rhythm, and beginner-friendly English pop repertoire with certification.",
    image: images.studentVocalPerformance,
    icon: "music",
    href: "#western",
  },
];

export const carnaticPrograms: MusicProgram[] = [
  {
    id: "foundation",
    title: "Foundation Certificate Course",
    duration: "6 Months Duration",
    level: "Beginner Level",
    badge: "Foundation",
    objectives: [
      "Build a strong foundation in Carnatic Classical Music through swara training, rhythm practice, voice culture, and beginner compositions.",
    ],
    curriculum: [
      "Introduction to Carnatic Music",
      "Shruti Alignment & Voice Culture",
      "Basic Tala System",
      "Sarali Varisai",
      "Janta Varisai",
      "Daatu Varisai",
      "Alankarams",
      "Simple Geethams",
      "Introduction to Bhajans & Devotional Songs",
    ],
    ragas: ["Hamsadhwani", "Mohanam", "Kalyani", "Vasantha"],
    certification: "Foundation Certificate in Carnatic Vocal Music",
  },
  {
    id: "certificate",
    title: "Certificate in Carnatic Vocal Music",
    duration: "1 Year Certificate Course",
    level: "Intermediate Level",
    badge: "Certificate",
    objectives: [
      "Develop stronger classical understanding, voice control, rhythm precision, and performance confidence.",
    ],
    curriculum: [
      "Voice Culture",
      "Intermediate Swara Exercises",
      "Tala Practice & Laya Understanding",
      "Gamaka Introduction",
      "Introduction to Varnams",
      "Bhajans & Classical Light Music",
    ],
    ragas: ["Kalyani", "Hamsadhwani", "Vasantha", "Abhogi", "Hindolam", "Mohanam"],
    compositions: [
      "5 Varnams",
      "7 Kritis",
      "Simple Kirtis",
      "Devotional Songs",
      "Bhava & Expression Training",
      "Rhythm Coordination",
    ],
    certification: "Certificate in Carnatic Classical Vocal Music",
  },
  {
    id: "diploma",
    title: "Advanced Diploma Certification Course",
    duration: "3 Years Duration",
    level: "Advanced Level",
    badge: "Diploma",
    objectives: [
      "Provide advanced training in Carnatic Classical Music with focus on performance, improvisation, advanced ragas, and concert preparation.",
    ],
    curriculum: [
      "Advanced Voice Training",
      "Detailed Raga Alapana",
      "Neraval Techniques",
      "Kalpana Swaras",
      "Advanced Tala & Laya Practice",
      "Concert Structuring",
      "Bhava & Manodharma Development",
      "Devotional & Classical Repertoire Building",
    ],
    ragas: [
      "Todi",
      "Bhairavi",
      "Shankarabharanam",
      "Keeravani",
      "Kamavardhini",
      "Kharaharapriya",
      "Saveri",
      "Mayamalavagowla",
    ],
    compositions: [
      "Advanced Varnams",
      "Major Kritis of Trinity Composers",
      "Bhajans & Tillanas",
    ],
    performance: [
      "Performance Opportunities",
      "Online Student Concerts",
      "Cultural Festival Participation",
      "Competition Guidance",
      "Advanced Stage Training",
    ],
    certification: "Advanced Diploma in Carnatic Classical Vocal Music",
  },
];

export const hindustaniPrograms: MusicProgram[] = [
  {
    id: "foundation",
    title: "Foundation Certificate Course",
    duration: "6 Months Duration",
    level: "Beginner Level",
    badge: "Foundation",
    objectives: [
      "Establish a solid base in Hindustani Classical Music through swar sadhana, alankars, breathing, and introductory raag & tala.",
    ],
    curriculum: [
      "Introduction to Hindustani Classical Music",
      "Swar Sadhana",
      "Alankars",
      "Basic Voice Training",
      "Breathing Techniques",
      "Introduction to Raag & Tala",
    ],
    raags: ["Yaman", "Bhupali", "Durga", "Bilawal"],
    compositions: ["Simple Bandish", "Bhajans", "Light Classical Songs"],
    certification: "Foundation Certificate in Hindustani Vocal Music",
  },
  {
    id: "certificate",
    title: "Certificate in Hindustani Classical Vocal Music",
    duration: "1 Year Certificate Course",
    level: "Intermediate Level",
    badge: "Certificate",
    objectives: [
      "Strengthen raag understanding, introduce alaap and taans, and build rhythm precision with expanded vocal range.",
    ],
    curriculum: [
      "Advanced Swar Practice",
      "Alaap Introduction",
      "Taans Basics",
      "Rhythm & Laya Practice",
      "Voice Expansion Techniques",
    ],
    raags: ["Yaman", "Bageshree", "Bhimpalasi", "Kafi", "Desh", "Malkauns"],
    compositions: [
      "Medium Tempo Bandish",
      "Drut & Vilambit Introduction",
      "Bhajans & Semi-Classical Songs",
    ],
    certification: "Certificate in Hindustani Classical Vocal Music",
  },
  {
    id: "diploma",
    title: "Advanced Diploma Certification Course",
    duration: "3 Years Duration",
    level: "Advanced Level",
    badge: "Diploma",
    objectives: [
      "Master advanced raga development, improvisation, khayal forms, and professional stage performance techniques.",
    ],
    curriculum: [
      "Advanced Raga Development",
      "Alaap, Taans & Improvisation",
      "Vilambit & Drut Khayal",
      "Semi-Classical Forms",
      "Stage Performance Techniques",
      "Advanced Voice Culture",
    ],
    raags: [
      "Darbari Kanada",
      "Marwa",
      "Todi",
      "Multani",
      "Bihag",
      "Puriya Dhanashree",
      "Miyan Ki Malhar",
    ],
    compositions: [
      "Advanced Bandish",
      "Bhajans",
      "Thumri & Semi-Classical Introduction",
      "Performance Repertoire Development",
    ],
    performance: [
      "Concert Preparation",
      "Online Performances",
      "Competition Guidance",
    ],
    certification: "Advanced Diploma in Hindustani Classical Vocal Music",
  },
];

export const bollywoodPrograms: MusicProgram[] = [
  {
    id: "foundation",
    title: "Foundation Certificate Course",
    duration: "6 Months Duration",
    level: "Beginner Level",
    badge: "Foundation",
    objectives: [
      "Develop voice clarity, melody understanding, rhythm control, and confidence in singing Bollywood and light vocal songs.",
    ],
    curriculum: [
      "Basic Voice Culture & Breathing Techniques",
      "Pitch & Shruti Alignment",
      "Rhythm & Expression Training",
      "Karaoke & Microphone Practice",
      "Pronunciation & Feel in Singing",
      "Stage Confidence Building",
    ],
    songs: [
      "Yeh Aaina Hai Tu",
      "Yeh Raatein Yeh Mausam",
      "Na Jaane Kyun Hota Hai",
      "Zahnaaseeb",
    ],
    certification: "Foundation Certificate in Filmy Music",
  },
  {
    id: "certificate",
    title: "Certificate Course",
    duration: "1 Year Duration",
    level: "Intermediate Level",
    badge: "Certificate",
    objectives: [
      "Improve vocal expression, song presentation, voice modulation, and performance techniques through Bollywood and semi-classical songs.",
    ],
    curriculum: [
      "Advanced Voice Training",
      "Expression & Dynamics in Singing",
      "Breath Control & Smooth Transitions",
      "High & Low Pitch Practice",
      "Performance & Recording Techniques",
      "Karaoke Singing Practice",
    ],
    songs: [
      "Yeh Aaina Hai Tu",
      "Yeh Raatein Yeh Mausam",
      "Na Jaane Kyun Hota Hai",
      "Zahnaaseeb",
      "Naina Barse Rimjhim",
      "Rozana",
      "Ajeeb Dastan Hai Yeh",
    ],
    certification: "Certificate in Filmy Music (upon completion)",
  },
];

export const bhajansProgram: MusicProgram = {
  id: "bhajans-cert",
  title: "Light Music, Bhajans & Shlokas",
  duration: "6 Months Certificate Course",
  level: "All Levels Welcome",
  badge: "Certificate",
  objectives: [
    "Learn devotional songs, bhajans, light music, and Sanskrit shlokas with proper pronunciation, melody, and expression.",
  ],
  curriculum: [
    "Voice Culture & Basic Swara Practice",
    "Bhava & Devotional Expression",
    "Sanskrit Pronunciation Basics",
    "Shruti & Tala Understanding",
    "Simple Light Music Techniques",
  ],
  courseContent: [
    "Devotional Bhajans",
    "Classical Light Songs",
    "Slokas & Chanting Practice",
    "Simple Bhakti Songs",
    "Beginner Devotional Repertoire",
  ],
  skills: [
    "Melody & Rhythm Sense",
    "Devotional Singing Style",
    "Voice Clarity",
    "Confidence in Singing",
  ],
  certification: "Certificate in Light Music, Bhajans & Shlokas (upon completion)",
};

export const courseFees: CourseFee[] = [
  {
    id: "vocal",
    title: "Vocal Class",
    subtitle: "Carnatic, Hindustani, Bollywood & Western — online and offline",
    priceInr: 2499,
    priceSuffix: "per month",
  },
  {
    id: "6mo",
    title: "6 Months Course",
    subtitle: "Structured foundation certification program",
    priceInr: 12999,
  },
];

export const hindustaniHighlights = [
  {
    title: "Swar Sadhana",
    description: "Daily swar practice with tanpura for pitch alignment and vocal stability.",
  },
  {
    title: "Alaap",
    description: "Slow, meditative unfolding of raag phrases building depth and identity.",
  },
  {
    title: "Taans",
    description: "Fast melodic patterns developing agility, clarity, and virtuosic expression.",
  },
  {
    title: "Bandish & Performance",
    description: "Structured compositions with stage technique, mic skills, and concert prep.",
  },
];

export const bollywoodIntro =
  "Bollywood / Filmy Music Certification Courses — from your first film song to confident stage and recording performance.";

export const bhajansIntro =
  "A serene 6-month journey into devotional music — bhajans, Sanskrit shlokas, and light music with pristine vocal clarity.";

export const westernMusicIntro =
  "Certificate in Western Music Vocal — beginner-friendly training in voice culture, solfege, pitch, rhythm, and popular English songs.";

export const westernMusicProgram: MusicProgram = {
  id: "western-beginner",
  title: "Certificate in Western Music Vocal – Beginner Level",
  duration: "6 Months",
  level: "Beginner Level",
  badge: "Certificate",
  objectives: [
    "Build a strong foundation in Western vocal music through voice culture, pitch training, breathing techniques, rhythm understanding, and beginner song performance.",
  ],
  curriculum: [
    "Module 1 – Vocal Foundations & Voice Culture",
    "Introduction to Western Music Basics",
    "Breathing Techniques & Posture",
    "Voice Warm-ups",
    "Humming Exercises",
    "Lip Trills & Resonance Practice",
    "Vowel Practice (A, E, I, O, U)",
    "Diction & Pronunciation Training",
    "Vocal Health & Care",
    "Module 2 – Pitch & Ear Training",
    "Pitch Alignment Exercises",
    "Solfege Training (Do Re Mi Fa Sol La Ti)",
    "Scale Practice",
    "Ear Training Activities",
    "Rhythm & Tempo Understanding",
    "Beat Counting Exercises",
    "Call & Response Practice",
    "Module 3 – Vocal Techniques",
    "Chest Voice & Head Voice Introduction",
    "Voice Projection",
    "Dynamics & Expression",
    "Breath Control Exercises",
    "Sustaining Notes",
    "Simple Harmony Introduction",
    "Performance Confidence Building",
    "Assessments & Certification",
    "Practice Sessions",
    "Monthly Review",
    "Final Performance Evaluation",
    "Completion Certificate",
  ],
  songs: [
    "I Want It That Way – Backstreet Boys",
    "Unstoppable – Sia",
    "Memories – Maroon 5",
    "Diamonds – Rihanna",
  ],
  certification: "Certificate in Western Music Vocal – Beginner Level",
};

export type Teacher = {
  name: string;
  role: string;
  badge: string;
  languages: string[];
  image?: string;
  bio: string;
  tagline?: string;
  location?: string;
  highlights?: string[];
  credentials?: string[];
  founder?: boolean;
  imageRight?: boolean;
  /** Tailwind object-position, e.g. object-center */
  imagePosition?: string;
  imageFit?: "cover" | "contain";
};

export const aditiGovindan: Teacher = {
  name: "Aditi Govindan",
  role: "Carnatic Music Vocal Trainer",
  badge: "Faculty Head",
  tagline: "Tradition • Technique • Soulful Learning",
  location: "Chennai, Tamil Nadu, India",
  languages: ["Tamil", "English", "Hindi"],
  image: "/teachers/aditi-govindan.jpeg",
  imagePosition: "object-[center_25%]",
  imageFit: "cover",
  highlights: [
    "Diploma in Carnatic Music — University of Madras",
    "15+ Years of Experience",
    "Intermediate & Advanced Level Students",
  ],
  bio: "Faculty Head and Carnatic vocal educator with a Diploma in Carnatic Music from the University of Madras and 15+ years of rigorous classical training and performance. Private Carnatic vocal classes since 2019. Currently training only Intermediate and Advanced level students — with structured repertoire, voice culture, manodharma, and concert-oriented progression.",
  credentials: [
    "Diploma in Carnatic Music — University of Madras",
    "Private Carnatic vocal classes (2019 – Present)",
    "Currently training only Intermediate & Advanced level students",
    "Advanced training under Guru Smt. Nirmala Bhaskaran — voice culture, manodharma & classical compositions",
    "Performances at cultural & temple events in Chennai — Navratri Utsavam & Tamil Sangam programs",
  ],
  founder: true,
};

export const kirtiMishra: Teacher = {
  name: "Kirti Mishra",
  role: "Beginner to Advanced Hindustani Classical Trainer",
  badge: "Senior Faculty",
  tagline: "Hindustani Classical • Bollywood Vocal • Music Theory",
  location: "Jamnagar, Gujarat, India",
  languages: ["Hindi", "English", "Gujarati"],
  image: "/teachers/kirti-mishra.jpeg",
  imagePosition: "object-[center_30%]",
  imageFit: "cover",
  highlights: [
    "15+ Years of Experience",
    "Visharad in Vocal — Gandharva Mahavidyalaya, Mumbai",
    "Beginner to Advanced — Hindustani Classical",
  ],
  bio: "Hindustani music teacher with 15+ years of experience in classical and Bollywood vocal training. Kirti Mishra guides students from beginner to advanced levels through swar sadhana, alankars, ragas, taans, bandish, music theory, and performance — with structured one-on-one and group lessons.",
  credentials: [
    "Visharad in Vocal — Akhil Bhartiya Gandharva Mahavidyalaya Mandal, Mumbai (2018 – 2024)",
    "Level 3 Advanced in Hindustani classical & Bollywood singing — Amit Tomar Music Academy, Mumbai (2023 – 24)",
    "Swar Jhankar Academy — Hindustani & Bollywood vocal classes, Jamnagar (2025 – Present)",
    "Music Teacher, RSCC Music Class — vocal technique, theory & ear training (2025 – Present)",
    "Performances: Tagore Hall Ahmedabad, Reliance Greens Bhajan Sandhya, Namaste Jamnagar 2025 (Raag Megh Malhar)",
  ],
};

export const vineelaMadhumala: Teacher = {
  name: "Vineela Madhumala",
  role: "Telugu Carnatic Music Vocal Trainer",
  badge: "Lead Faculty",
  languages: ["Telugu", "English", "Hindi"],
  image: "/teachers/vineela-madhumala.jpeg",
  imageRight: true,
  imagePosition: "object-[center_12%]",
  imageFit: "cover",
  highlights: [
    "10+ Years — Carnatic Music Vocal",
    "Beginner to Intermediate Level",
    "Telugu Music & Annamayya Kirthanas",
  ],
  bio: "Telugu Carnatic music vocal trainer with 10+ years of experience. Specialised in Telugu repertoire and Annamayya kirthanas, guiding beginner to intermediate students through swara training, gamakas, varnams, and kriti study — especially for Telugu-speaking learners in their comfort language.",
  credentials: [
    "Swara & gamaka training — varnams, kritis & Telugu repertoire",
    "Specialised in Annamayya kirthanas and devotional Telugu compositions",
    "Beginner to intermediate Carnatic vocal — structured daily riyaz",
  ],
};

/** Founder listed first */
export const teachers: Teacher[] = [
  aditiGovindan,
  kirtiMishra,
  vineelaMadhumala,
];

export const globalStudents = {
  title: "Music Classes for Global Students",
  headline: "Master Indian Classical Music from Anywhere in the World",
  subtitle:
    "Flexible timings and authentic cultural learning — live online classes tailored for students across time zones.",
  regions: [
    {
      code: "us",
      name: "USA",
      image: images.globalUsa,
      imageAlt: "USA students learning Indian classical music online",
    },
    {
      code: "ca",
      name: "Canada",
      image: images.globalCanada,
      imageAlt: "Canada students in live online Carnatic and Hindustani classes",
    },
    {
      code: "au",
      name: "Australia",
      image: images.globalAustralia,
      imageAlt: "Australia students learning Indian classical music online",
    },
    {
      code: "sg",
      name: "Singapore",
      image: images.globalSingapore,
      imageAlt: "Singapore students in online Indian classical vocal training",
    },
    {
      code: "ae",
      name: "UAE",
      image: images.globalUae,
      imageAlt: "UAE students learning Carnatic and Hindustani music online",
    },
  ],
};

export type AcademyAffiliation = {
  id: string;
  name: string;
  fullName: string;
  tradition: string;
  description: string;
  highlights: string[];
  logo: string;
};

export const academyAffiliations: AcademyAffiliation[] = [
  {
    id: "tvga-aima",
    name: "Dr TVG's AIMA",
    fullName: "Academy of Indian Music & Arts (AIMA)",
    tradition: "Music, Dance & Arts",
    description:
      "Affiliated with AIMA — Dr T V Gopalakrishan, Founder Trustee and Chairman. Chennai-based academy with many branches offering offline classes in dance, music, instruments, and percussion.",
    highlights: [
      "Affiliated with AIMA — Dr T V Gopalakrishan, Founder Trustee and Chairman",
      "Registered as a Charitable Trust and christened as the Academy of Indian Music & Arts (AIMA) on June 27, 1984",
      "Recognized by the Government of India as an NGO with 80G certification and granted exemption for charitable and cultural promotion activities",
      "Offline classes",
      "Music academy located in Chennai — many branches",
      "Various courses in Dance, Music, Instruments and Percussions",
    ],
    logo: images.affiliationTvgaAima,
  },
  {
    id: "bridge-academy",
    name: "Bridge Academy",
    fullName: "Bridge Academy for Carnatic Music",
    tradition: "Carnatic Classical",
    description:
      "Online and offline grade exams in Carnatic music from anywhere in the world — with structured curriculum and certification.",
    highlights: [
      "Online / offline grade exams in Carnatic music — from anywhere in the world",
      "Structured curriculum for grade exams",
      "Study materials and books provided",
      "Exams online or offline",
      "Exam centres throughout India, Malaysia, and Sri Lanka",
      "Theory and practical exams",
      "Get certified from Bridge Academy and become a registered teacher",
    ],
    logo: images.affiliationBridgeAcademy,
  },
  {
    id: "suro-bharati",
    name: "Suro Bharati Sangeet Kala Kendra",
    fullName: "Surobharati Sangeet Kala Kendra",
    tradition: "Hindustani Classical",
    description:
      "Hindustani classical music courses, workshops, and diploma examinations through India's largest cultural examining organizations.",
    highlights: [
      "Hindustani classical music courses",
      "Workshops",
      "Music competitions",
      "Sangeet diploma and Visharad exams",
      "Affiliated with India's largest cultural examining organizations",
    ],
    logo: images.affiliationSuroBharati,
  },
];

export const certificationPrograms = [
  {
    title: "Foundation Certificate",
    duration: "6 Months",
    description:
      "Swara training, basic ragas, and voice culture — ideal for beginners building a strong classical base.",
  },
  {
    title: "Certificate Course",
    duration: "1 Year",
    description:
      "Intermediate repertoire, improved gamakas, and performance readiness with structured assessments.",
  },
  {
    title: "Advanced Diploma",
    duration: "3 Years",
    description:
      "Advanced ragas, manodharma, concert preparation, and diploma certification upon successful completion.",
  },
];

export type CourseCategory = {
  id: string;
  title: string;
  subtitle: string;
  programs: MusicProgram[];
  ragaLabel: "Ragas" | "Raags";
  variant: "dark" | "light";
  insertPricingAfter?: boolean;
  image?: string;
  teacher?: Teacher;
};

export const courseCategories: CourseCategory[] = [
  {
    id: "carnatic",
    title: "Carnatic Classical Vocal Certification Courses",
    subtitle:
      "Foundation · Certificate · Advanced Diploma — complete curriculum with ragas, compositions & certification.",
    programs: carnaticPrograms,
    ragaLabel: "Ragas",
    variant: "dark",
  },
  {
    id: "hindustani",
    title: "Hindustani Classical Vocal Certification Courses",
    subtitle:
      "Swar sadhana, alaap, taans & bandish — from beginner raags to advanced khayal and concert preparation.",
    programs: hindustaniPrograms,
    ragaLabel: "Raags",
    variant: "dark",
    insertPricingAfter: true,
  },
  {
    id: "bollywood",
    title: "Bollywood / Filmy Music Certification Courses",
    subtitle: bollywoodIntro,
    programs: bollywoodPrograms,
    ragaLabel: "Ragas",
    variant: "dark",
  },
  {
    id: "bhajans",
    title: "Light Music, Bhajans & Shlokas",
    subtitle: bhajansIntro,
    programs: [bhajansProgram],
    ragaLabel: "Ragas",
    variant: "light",
    image: images.devotional,
  },
  {
    id: "western",
    title: "Western Music Vocal Certification",
    subtitle: westernMusicIntro,
    programs: [westernMusicProgram],
    ragaLabel: "Ragas",
    variant: "dark",
    image: images.bollywoodStudio,
  },
];

export const whyChooseUs = [
  {
    title: "Certified Courses",
    description:
      "Foundation, Certificate & Advanced Diploma programs with recognized certification upon completion.",
    icon: "award",
  },
  {
    title: "Expert Mentors",
    description:
      "Learn from accomplished performers and dedicated gurus with decades of experience.",
    icon: "users",
  },
  {
    title: "Online Performances",
    description:
      "Showcase your talent in virtual recitals, student concerts, and cultural festivals.",
    icon: "video",
  },
  {
    title: "Competition Guidance",
    description:
      "Personalized coaching for music competitions and youth festivals.",
    icon: "trophy",
  },
  {
    title: "Flexible Learning",
    description:
      "One-on-one and group classes scheduled around your lifestyle.",
    icon: "calendar",
  },
  {
    title: "Stage Training",
    description:
      "Build confidence with stage etiquette, mic technique, and live performance prep.",
    icon: "spotlight",
  },
];

export const dailyRiyaz = {
  cta: "Improve Your Voice with Daily Riyaz",
  headline: "Most students quit singing because they don't have a proper practice structure.",
  description:
    "Daily Riyaz builds voice control, pitch accuracy, confidence, and classical foundation step by step. We're sharing simple Hindustani Classical practice content every day for beginners who seriously want to improve singing without confusion.",
  followNote: "Follow for more Hindustani Classical learning content",
  practices: [
    {
      title: "Swar Sadhana",
      description: "Tanpura-aligned swar practice — the foundation of Hindustani vocal discipline",
    },
    {
      title: "Alankars Practice",
      description: "Systematic alankar patterns for voice agility and pitch accuracy",
    },
    {
      title: "Breathing for Singing",
      description: "Breath control techniques for sustained phrases and vocal health",
    },
    {
      title: "Pitch Control",
      description: "Shruti alignment drills for consistent, confident intonation",
    },
    {
      title: "Beginner Music Guide",
      description: "Clear daily structure — no confusion, just consistent growth",
    },
  ],
  hashtags: [
    "HindustaniClassical",
    "DailyRiyaz",
    "IndianClassicalMusic",
    "SingingPractice",
    "MusicStudents",
    "SwarSadhana",
    "VocalTraining",
    "ClassicalVocalsIndia",
  ],
  stats: [
    { label: "Students Trained", value: 2847, suffix: "+" },
    { label: "Daily Learners", value: 936, suffix: "+" },
    { label: "Online Sessions", value: 12450, suffix: "+" },
  ],
};

export const testimonials = [
  {
    name: "Priya Anand",
    course: "Carnatic Certificate",
    image: images.testimonialPriyaAnand,
    review:
      "Raga Veda transformed my understanding of Carnatic music. My guru's patience and the structured curriculum helped me perform my first varnam within a year.",
    rating: 5,
  },
  {
    name: "Vikram Joshi",
    course: "Hindustani Advanced",
    image: images.testimonialVikramJoshi,
    review:
      "The Hindustani program is exceptional. From swar sadhana to taans, every module built my confidence. I now perform at local baithaks.",
    rating: 5,
  },
  {
    name: "Kavya Malhotra",
    course: "Bollywood Vocal",
    image: images.testimonialKavyaMalhotra,
    review:
      "I always dreamed of singing Bollywood songs professionally. The voice modulation and recording modules were game-changers for my demo reel.",
    rating: 5,
  },
  {
    name: "Gurmit Singh",
    course: "Bhajans & Shlokas",
    image: images.testimonialRajeshSharma,
    review:
      "The spiritual atmosphere of the bhajan classes is beautiful. My Sanskrit pronunciation improved dramatically, and I lead bhajans at our temple.",
    rating: 5,
  },
  {
    name: "Lakshmi Narayanan",
    course: "Carnatic Diploma",
    image: images.testimonialLakshmiNarayanan,
    review:
      "Three years of dedicated learning at Raga Veda earned me my diploma. The manodharma training and annual recitals prepared me for the stage.",
    rating: 5,
  },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  secondarySrc?: string;
  secondaryAlt?: string;
  wide?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "vocal-performance",
    src: images.galleryVocalPerformance,
    category: "Soulful Vocal Performance",
    alt: "A vocalist expressing deep emotion during live classical vocal training",
  },
  {
    id: "tanpura-classical",
    src: images.galleryTanpuraClassical,
    category: "Essence of Classical Music",
    alt: "Traditional tanpura practice — connecting with centuries of Indian classical heritage",
  },
  {
    id: "tanpura-riyaz",
    src: images.galleryTanpuraRiyaz,
    category: "Classical Melodies",
    alt: "Serene tanpura riyaz in traditional attire — the soul of Carnatic practice",
  },
  {
    id: "live-stage",
    src: images.galleryLiveStage,
    category: "Live Student Performance",
    alt: "Student showcase on stage — voice, guitar, and confident stage presence",
  },
  {
    id: "guru-tanpura",
    src: images.galleryGuruTanpura,
    category: "Soul of Tradition",
    alt: "Guru-shishya spirit — meditative riyaz with tanpura and timeless classical wisdom",
  },
  {
    id: "tanpura",
    src: images.galleryTanpuraShruti,
    alt: "Tanpura and shruti — the foundation of Carnatic vocal practice",
    category: "Shruti & Tanpura",
  },
  {
    id: "veena",
    src: images.galleryVeena,
    alt: "Veena — sacred string instrument of South Indian classical music",
    category: "Veena",
  },
  {
    id: "kutcheri",
    src: images.galleryOutdoorKutcheri,
    alt: "Traditional musicians performing at an outdoor kutcheri",
    category: "Kutcheri",
  },
  {
    id: "mridangam",
    src: images.galleryTraditionalDrums,
    alt: "Traditional Indian percussion — mridangam and classical tala",
    category: "Mridangam & Tala",
  },
  {
    id: "percussion",
    src: images.galleryStagePercussion,
    alt: "Classical percussion artist on stage during a live concert",
    category: "Laya",
  },
  {
    id: "riyaz",
    src: images.galleryGuruShishyaRiyaz,
    alt: "Guru-shishya riyaz — traditional seated classical practice",
    category: "Riyaz",
  },
  {
    id: "vocal-ensemble",
    src: images.galleryCarnaticVocalEnsemble,
    alt: "Carnatic vocal ensemble in traditional attire on stage",
    category: "Carnatic Vocal",
  },
  {
    id: "performance",
    src: images.galleryClassicalPerformance,
    alt: "Classical vocalist in traditional dress performing with instrument",
    category: "Concert",
    secondarySrc: images.galleryFacultyVocalist,
    secondaryAlt:
      "Carnatic vocal teacher in traditional saree with tanpura — Raga Veda faculty",
    wide: true,
  },
];

export const faqs = [
  {
    question: "Can beginners join?",
    answer:
      "Yes. Our Foundation programs are designed for absolute beginners. No prior classical training is required — we start with swara sadhana, basic exercises, and simple compositions at a comfortable pace.",
  },
  {
    question: "Is there an age limit?",
    answer:
      "Students of all ages are welcome. Children from around 6 years (with parental support for younger learners), teens, adults, and seniors can join. We tailor pace and repertoire to each student's age and goals.",
  },
  {
    question: "Are classes recorded?",
    answer:
      "Classes are live and interactive for real-time correction and guidance. Practice material and reference recordings are shared after sessions so students can revise between classes.",
  },
  {
    question: "Do students receive certification?",
    answer:
      "Yes. Upon successful completion of each level, students receive a recognized Foundation Certificate, Certificate Course credential, or Advanced Diploma depending on the program enrolled.",
  },
  {
    question: "What are the class timings?",
    answer:
      "We offer flexible slots including mornings, evenings, and weekends — ideal for students in India, USA, Canada, Australia, Singapore, UAE, and other regions. Your schedule is discussed during the free demo.",
  },
  {
    question: "What is the duration of each course?",
    answer:
      "Carnatic & Hindustani: 6-month Foundation, 1-year Certificate, and 3-year Advanced Diploma. Bollywood: 6-month Foundation and 1-year Certificate. Bhajans & Shlokas: 6-month Certificate course.",
  },
  {
    question: "What are the course fees for Carnatic & Hindustani?",
    answer:
      "Vocal classes start from ₹2,999. Our 6-month foundation course starts from ₹12,999. Book a free demo for detailed plans, batch options, and longer certification pathways.",
  },
  {
    question: "How do online classes work?",
    answer:
      "Live interactive sessions via video call with screen-shared notation, recorded practice material, weekly assignments, and WhatsApp support for doubts between classes.",
  },
];
