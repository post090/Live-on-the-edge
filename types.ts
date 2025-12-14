
export interface Attributes {
  intelligence: number;
  appearance: number;
  stamina: number;
  resilience: number;
  savviness: number;
}

export interface AvatarConfig {
  hair: string;
  eyes: string;
  accessory: string;
  outfit: string;
  expression: string;
}

export interface Stats {
  satiety: number;
  hygiene: number;
  mood: number; // 精神/SAN值
  money: number;
  debt: number; // 本期还款目标
  totalDebt: number; // 总债务
  academic: number;
  corruption: number; // 心计
  sin: number; // 罪恶
  stamina: number; // 体力
  resilience: number; // 韧性
  savviness: number; // 心眼
  intelligence: number; // 智力
  appearance: number; // 魅力
  motherHealth: number; // 母亲健康
}

export interface MessageOption {
  text: string;
  impact: Partial<Stats>;
  replyText: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isRead: boolean;
  impact?: Partial<Stats>;
  options?: MessageOption[];
  selectedOptionIndex?: number;
}

export interface ShortVideo {
  id: string;
  author: string;
  description: string;
  tags: string[];
  impact: Partial<Stats>;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  impact: Partial<Stats>;
}

export interface PhoneState {
  isOpen: boolean;
  messages: Message[];
  videos: ShortVideo[];
  products: Product[];
  activeApp: 'HOME' | 'SOCIAL' | 'VIDEO' | 'SHOP' | 'YUEYUE' | 'TG' | 'LOAN';
}

export interface LocationInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  area: 'MINING_TOWN' | 'PROVINCIAL_CAPITAL';
  isTrap?: boolean;
}

export interface Choice {
  text: string;
  impact_description: string;
  stat_changes: Partial<Stats>;
  next_event?: AIRootResponse;
  unlock_message?: Message;
  new_area?: 'MINING_TOWN' | 'PROVINCIAL_CAPITAL';
  requirements?: Partial<Stats>;
  is_return?: boolean;
  special_action?: string; // 用于处理解释/摊牌等特殊逻辑
}

export interface AIRootResponse {
  title: string;
  description: string;
  is_final: boolean;
  choices: Choice[];
  speakerId?: 'PLAYER' | 'TEACHER' | 'MOTHER' | 'THUG' | 'OLD_MINER' | 'BOSS' | 'BOYFRIEND' | 'DAO_GE' | 'CHEN_YI' | 'HONG_JIE' | 'OLD_GUI';
  first_visit_text?: string;
}

export interface StatusFlags {
  fluDays: number; // 流感剩余天数
  isCrackdown: boolean; // 严打状态
  chenYiRelation: number; // 陈屹好感/信任度
  hasCheatPackage: boolean; // 是否持有作弊套装
  isMotherDead: boolean;
}

export interface GameState {
  day: number;
  timeOfDay: 'MORNING' | 'FORENOON' | 'AFTERNOON' | 'DUSK' | 'NIGHT' | 'MIDNIGHT';
  attributes: Attributes;
  avatar: AvatarConfig;
  stats: Stats;
  history: string[];
  location: string;
  currentArea: 'MINING_TOWN' | 'PROVINCIAL_CAPITAL';
  isTrapped: boolean;
  phone: PhoneState;
  visitedLocations: string[]; 
  statusFlags: StatusFlags;
}
