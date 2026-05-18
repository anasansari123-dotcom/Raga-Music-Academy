/** Image URLs — keyword-matched for gallery, courses & about */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Country flag PNGs (ISO 3166-1 alpha-2) */
export const flagImage = (countryCode: string, width = 80) =>
  `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;

export const images = {
  // Hero & general
  heroPoster: u("1681731030636-8f09daaa2bf3", 1920),
  classicalConcert: u("1742483377813-a2072eb657bd"),
  vocalPerformance: u("1517230878791-4d28214057c2"),
  bollywoodStudio: u("1517230878791-4d28214057c2"),
  devotional: u("1761471676364-78cf6661cb5a"),

  /** Gallery — traditional & Carnatic-focused (see galleryImages in data.ts) */
  galleryTanpuraShruti: u("1653246458437-fd78a9265711", 1200),
  galleryVeena: u("1763475945300-02cf0355b078", 1200),
  galleryOutdoorKutcheri: u("1771238113736-5954f174156b", 1200),
  galleryTraditionalDrums: u("1769947059310-bca7fa241a49", 1200),
  galleryStagePercussion: u("1771718968046-6b8cee870812", 1200),
  galleryGuruShishyaRiyaz: u("1721572321944-e297b2d68aa7", 1200),
  galleryCarnaticVocalEnsemble: u("1764176269321-6d14f4af09c7", 1200),
  galleryClassicalPerformance: u("1681731030357-829645dd55b1", 1200),
  galleryFacultyVocalist: "/teachers/vineela-madhumala.jpeg",

  // Legacy gallery aliases (used elsewhere)
  tanpuraSetup: u("1653246458437-fd78a9265711"),
  onlineMusicClass: pexels(8613098),
  studentVocalPerformance: pexels(5555881),
  classicalConcertMusicians: u("1742483377813-a2072eb657bd"),
  veenaInstruments: u("1763475945300-02cf0355b078"),
  classicalInstruments: u("1633411988188-6e63354a9019"),

  // Testimonials — portraits matched to student names (Pexels)
  testimonialPriya: pexels(14695385, 400),
  testimonialArjun: pexels(19070201, 400),
  testimonialAnanya: pexels(29251869, 400),
  testimonialRavi: pexels(13156800, 400),
  testimonialMeera: pexels(29026115, 400),

  /** Gallery — featured (local assets) */
  galleryVocalPerformance: "/gallery/01-vocal-performance.png",
  galleryTanpuraClassical: "/gallery/02-tanpura-classical.jpeg",
  galleryTanpuraRiyaz: "/gallery/03-tanpura-riyaz.png",
  galleryLiveStage: "/gallery/04-live-stage.png",
  galleryGuruTanpura: "/gallery/05-guru-tanpura.png",

  /** Gallery — students learning (legacy / optional) */
  galleryOnlineStudent: pexels(7606066, 1200),
  galleryMusicLesson: pexels(5555881, 1200),
  galleryStudentPractice: pexels(4260475, 1200),

  // Legacy aliases
  instruments: u("1633411988188-6e63354a9019"),
  onlineClass: u("1606770347238-77fcfd29906c"),
  stageLights: u("1517230878791-4d28214057c2"),
  veena: u("1763475945300-02cf0355b078"),
  microphone: u("1511379938549-c1f69419868d"),

  /** Global students — learners in online & vocal classes (Pexels) */
  globalUsa: pexels(7606066),
  globalCanada: pexels(4260475),
  globalAustralia: pexels(5555881),
  globalSingapore: pexels(8613098),
  globalUae: pexels(8199558),
} as const;

export const heroVideoSrc = "/hero-bg.mp4";
export const riyazVideoSrc = "/riyaz-stage.mp4";
