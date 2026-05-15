/** Image URLs — keyword-matched for gallery, courses & about */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Hero & general
  heroPoster: u("1681731030636-8f09daaa2bf3", 1920),
  classicalConcert: u("1742483377813-a2072eb657bd"),
  vocalPerformance: u("1517230878791-4d28214057c2"),
  bollywoodStudio: u("1517230878791-4d28214057c2"),
  devotional: u("1761471676364-78cf6661cb5a"),

  /** Gallery — labels in data.ts galleryImages */
  tanpuraSetup: u("1653246458437-fd78a9265711"),
  onlineMusicClass: u("1612478120679-5b7412e15f84"),
  studentVocalPerformance: u("1517230878791-4d28214057c2"),
  classicalConcertMusicians: u("1742483377813-a2072eb657bd"),
  veenaInstruments: u("1763475945300-02cf0355b078"),
  classicalInstruments: u("1633411988188-6e63354a9019"),

  // Testimonials
  student1: u("1494790108377-be9c29b29330", 200),
  student2: u("1507003211169-0a1dd7228f2d", 200),
  student3: u("1438761681033-6461ffad8d80", 200),
  student4: u("1472099645785-5658abf4ff4e", 200),
  student5: u("1544005313-94ddf0286df2", 200),

  // Legacy aliases
  instruments: u("1633411988188-6e63354a9019"),
  onlineClass: u("1606770347238-77fcfd29906c"),
  stageLights: u("1517230878791-4d28214057c2"),
  veena: u("1763475945300-02cf0355b078"),
  microphone: u("1511379938549-c1f69419868d"),
} as const;

export const heroVideoSrc = "/hero-bg.mp4";
export const riyazVideoSrc = "/riyaz-stage.mp4";
