export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CONCEPTS = 'CONCEPTS',
  COACH = 'COACH',
  SIMULATOR = 'SIMULATOR',
  COMMUNITY = 'COMMUNITY'
}

export enum ConceptCategory {
  INNER_GAME = 'משחק פנימי',
  OUTER_GAME = 'משחק חיצוני',
  SOCIAL_INTELLIGENCE = 'אינטליגנציה חברתית',
  LOGISTICS = 'לוגיסטיקה'
}

export enum ConceptLevel {
  BEGINNER = 'מתחיל (יסודות)',
  INTERMEDIATE = 'בינוני (בניית יכולת)',
  ADVANCED = 'מתקדם (מאסטרי)'
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  category: ConceptCategory;
  level: ConceptLevel;
  details: string;
  videoId?: string; // YouTube Video ID
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'מתחיל' | 'בינוני' | 'מתקדם';
  initialPrompt: string;
}

export enum UserRank {
  NOVICE = 'טירון חברתי', // 0 - 100
  PLAYER = 'שחקן מתקדם', // 100 - 500
  MASTER = 'מאסטר (ציון לשבח)' // 500+
}

export interface UserProgress {
  score: number;
  rank: UserRank;
}

export enum PostType {
  WINGMAN_REQUEST = 'חיפוש ווינגמן',
  FIELD_REPORT = 'דו"ח שטח',
  GENERAL = 'כללי'
}

export interface CommunityPost {
  id: string;
  author: string;
  rank: UserRank;
  type: PostType;
  location: string;
  content: string;
  timestamp: number;
  likes: number;
}