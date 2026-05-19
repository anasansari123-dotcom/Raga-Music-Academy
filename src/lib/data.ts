import type { MusicProgram, PricingTier } from "./types";
import { images } from "./images";

export const siteConfig = {
  name: "RAGA VEDA",
  tagline: "Online Music Academy",
  email: "nadhavedamusicschool@gmail.com",
  phone: "+91 91365 93977",
  whatsapp: "https://wa.me/919136593977",
  social: {
    instagram:
      "https://www.instagram.com/ragavedamusicacademy?igsh=aGJ3OG5vbTl3NTh4",
    youtube: "https://youtube.com/@ragaveda",
    facebook: "https://www.facebook.com/share/18eNfNKHRR/",
  },
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#teachers", label: "Teacher" },
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

export const classicalPricing: PricingTier[] = [
  {
    id: "6mo",
    duration: "6 Months",
    label: "Foundation",
    actualInr: 14999,
    actualUsd: 249,
    offerInr: 11999,
    offerUsd: 179,
  },
  {
    id: "1yr",
    duration: "1 Year",
    label: "Certificate",
    actualInr: 29999,
    actualUsd: 499,
    offerInr: 24999,
    offerUsd: 349,
  },
  {
    id: "3yr",
    duration: "3 Years",
    label: "Advanced Diploma",
    actualInr: 84999,
    actualUsd: 1499,
    offerInr: 74999,
    offerUsd: 999,
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
  role: "Advanced Carnatic Music Vocal Trainer",
  badge: "Faculty Head & Founder",
  tagline: "Tradition • Technique • Soulful Learning",
  location: "Chennai, Tamil Nadu, India",
  languages: ["Tamil", "English", "Hindi"],
  image: "/teachers/aditi-govindan.jpeg",
  imagePosition: "object-[center_25%]",
  imageFit: "cover",
  highlights: [
    "Diploma in Carnatic Music — Delhi University (2016)",
    "10+ Years Classical Training",
    "Guru Smt. Nirmala Bhaskaran",
  ],
  bio: "Dedicated Carnatic vocal music educator with over 10 years of rigorous classical training and performance exposure. Experienced in nurturing beginners with strong fundamentals, voice culture, and traditional repertoire — delivering structured, inspiring, and disciplined music education online and offline.",
  credentials: [
    "Advanced training under Guru Smt. Nirmala Bhaskaran — voice culture, manodharma & classical compositions",
    "Private Carnatic vocal classes for children & beginners (2024 – Present)",
    "Curriculum: slokas, bhajans, varnams & kritis with shruti alignment and laya control",
    "Performances at cultural & temple events in Chennai and Delhi — Navratri Utsavam & Tamil Sangam programs",
  ],
  founder: true,
};

export const kirtiMishra: Teacher = {
  name: "Kirti Mishra",
  role: "Hindustani Classical Music Teacher",
  badge: "Senior Faculty",
  tagline: "Hindustani Classical • Bollywood Vocal • Music Theory",
  location: "Jamnagar, Gujarat, India",
  languages: ["Hindi", "English", "Gujarati"],
  image: "/teachers/kirti-mishra.jpeg",
  imagePosition: "object-[center_30%]",
  imageFit: "cover",
  highlights: [
    "Visharad in Vocal — Gandharva Mahavidyalaya, Mumbai",
    "Level 3 Advanced — Hindustani & Bollywood",
    "M.Com — MKHS Gujarati College, Indore",
  ],
  bio: "A passionate music educator with extensive experience in Hindustani classical and Bollywood vocal training. Kirti Mishra inspires students through engaging one-on-one and group lessons — covering swar sadhana, alankars, ragas, taans, music theory, sight-reading, and performance — while fostering discipline, creativity, and lifelong musical appreciation.",
  credentials: [
    "Swar Jhankar Academy (Self Employed) — Online music classes, Jamnagar (2025 – Present)",
    "Music Teacher, RSCC Music Class — instrumental & vocal technique, theory & ear training (2025 – Present)",
    "Visharad in Vocal — Akhil Bhartiya Gandharva Mahavidyalaya Mandal, Mumbai (2018 – 2024)",
    "Level 3rd Advanced in Hindustani classical & Bollywood singing — Amit Tomar Music Academy, Mumbai (2023 – 24)",
    "PGDCA — Rajeev Gandhi Computer Saksharta Mission (2008 – 09, A+ 90%)",
    "Performances: Tagore Hall Ahmedabad, Reliance Greens Bhajan Sandhya, Namaste Jamnagar 2025 (Raag Megh Malhar)",
  ],
};

export const vineelaMadhumala: Teacher = {
  name: "Vineela Madhumala",
  role: "Carnatic Music Vocal Teacher",
  badge: "Lead Faculty",
  languages: ["Telugu", "English", "Hindi"],
  image: "/teachers/vineela-madhumala.jpeg",
  imageRight: true,
  imagePosition: "object-[center_12%]",
  imageFit: "cover",
  highlights: ["Swara & Gamaka Training", "Varnams & Kritis", "Telugu-Speaking Learners"],
  bio: "Our lead Carnatic faculty guides students through swara training, gamakas, varnams, and kriti study with clear daily structure. Classes are especially welcoming for Telugu-speaking learners who want classical vocal training in their comfort language.",
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
  {
    title: "Daily Riyaz Practice",
    description:
      "Comment RIYAZ for structured daily practice — swar sadhana, alankars & pitch control.",
    icon: "sunrise",
  },
];

export const dailyRiyaz = {
  cta: 'Comment "RIYAZ" to Improve Your Voice Daily',
  headline: "Most students quit singing because they don't have a proper practice structure.",
  description:
    "Daily Riyaz builds voice control, pitch accuracy, confidence, and classical foundation step by step. We're sharing simple Hindustani Classical practice content every day for beginners who seriously want to improve singing without confusion.",
  callToAction:
    'Comment "RIYAZ" and we\'ll send the daily practice structure & beginner resources.',
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
    name: "Priya Sharma",
    course: "Carnatic Certificate",
    image: images.testimonialPriya,
    review:
      "Raga Veda transformed my understanding of Carnatic music. My guru's patience and the structured curriculum helped me perform my first varnam within a year.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    course: "Hindustani Advanced",
    image: images.testimonialArjun,
    review:
      "The Hindustani program is exceptional. From swar sadhana to taans, every module built my confidence. I now perform at local baithaks.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    course: "Bollywood Vocal",
    image: images.testimonialAnanya,
    review:
      "I always dreamed of singing Bollywood songs professionally. The voice modulation and recording modules were game-changers for my demo reel.",
    rating: 5,
  },
  {
    name: "Ravi Krishnan",
    course: "Bhajans & Shlokas",
    image: images.testimonialRavi,
    review:
      "The spiritual atmosphere of the bhajan classes is beautiful. My Sanskrit pronunciation improved dramatically, and I lead bhajans at our temple.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    course: "Carnatic Diploma",
    image: images.testimonialMeera,
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
      "6 Months — Offer: ₹11,999 / $179 USD (Actual: ₹14,999 / $249). 1 Year — Offer: ₹24,999 / $349 USD (Actual: ₹29,999 / $499). 3 Years — Offer: ₹74,999 / $999 USD (Actual: ₹84,999 / $1,499). See our Fees section within Courses for full details.",
  },
  {
    question: "How do online classes work?",
    answer:
      "Live interactive sessions via video call with screen-shared notation, recorded practice material, weekly assignments, and WhatsApp support for doubts between classes.",
  },
];
