
import { GameState, LocationInfo, AIRootResponse, Message, ShortVideo, Product } from './types';

export const INITIAL_POINTS = 20;
export const DAYS_OF_WEEK = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export const TIME_ORDER: ('MORNING' | 'FORENOON' | 'AFTERNOON' | 'DUSK' | 'NIGHT' | 'MIDNIGHT')[] = 
  ['MORNING', 'FORENOON', 'AFTERNOON', 'DUSK', 'NIGHT', 'MIDNIGHT'];

export const TIME_LABELS: Record<string, string> = { 
  MORNING: '清晨 06:00', 
  FORENOON: '上午 08:00', 
  AFTERNOON: '下午 13:00', 
  DUSK: '黄昏 17:00', 
  NIGHT: '夜晚 20:00', 
  MIDNIGHT: '深夜 02:00' 
};

export const AREA_LABELS: Record<string, string> = {
  MINING_TOWN: '黑岭矿区',
  PROVINCIAL_CAPITAL: '繁华省城',
};

export const LOCATIONS: LocationInfo[] = [
  { id: 'HOME', name: '霉味的家', description: '药瓶与借条，你人生的底色。', color: 'bg-slate-700', icon: '🏚', area: 'MINING_TOWN' },
  { id: 'SCHOOL', name: '高三二班', description: '卷子堆得像坟头。', color: 'bg-emerald-900', icon: '🏫', area: 'MINING_TOWN' },
  { id: 'RUINS', name: '矿区废墟', description: '法律照不到的阴影。', color: 'bg-zinc-800', icon: '🏭', area: 'MINING_TOWN' },
  { id: 'CLUB', name: '红太阳舞厅', description: '劣质酒精与生存的交易。', color: 'bg-indigo-950', icon: '💃', area: 'MINING_TOWN' },
  { id: 'STATION', name: '火车站', description: '前往省城的唯一途径。', color: 'bg-blue-900', icon: '🚉', area: 'MINING_TOWN' },
  { id: 'BATH', name: '公共澡堂', description: '雾气腾腾，掩盖一切。恢复整洁的场所。', color: 'bg-cyan-800', icon: '🛁', area: 'MINING_TOWN' },
  { id: 'SQUARE', name: '站前广场', description: '混乱的集散地，充满骗子。', color: 'bg-slate-600', icon: '🏢', area: 'PROVINCIAL_CAPITAL' },
  { id: 'MARKET', name: '批发市场', description: '倒爷的天堂，苦力的地狱。', color: 'bg-amber-800', icon: '📦', area: 'PROVINCIAL_CAPITAL' },
  { id: 'CYBER', name: '赛博电脑城', description: '销赃与黑客技术。', color: 'bg-blue-950', icon: '🖥', area: 'PROVINCIAL_CAPITAL' },
  { id: 'CLINIC', name: '地下黑诊所', description: '老鬼的手术刀总在颤抖。', color: 'bg-rose-950', icon: '💉', area: 'PROVINCIAL_CAPITAL' },
  { id: 'UNI', name: '大学城', description: '门票很贵的理想之地。', color: 'bg-teal-900', icon: '🎓', area: 'PROVINCIAL_CAPITAL' },
  { id: 'HOTEL', name: '金皇朝大酒店', description: '欲望与资本的终极博弈。', color: 'bg-amber-600', icon: '🏰', area: 'PROVINCIAL_CAPITAL' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: '临期压缩饼干', price: 65, description: '口感像石灰，但能止住胃部的痉挛。', impact: { satiety: 20, mood: -8 } },
  { id: 'p2', name: '廉价劣质香水', price: 120, description: '刺鼻的香味，勉强能盖住身上的汗味和霉味。', impact: { appearance: 1, hygiene: 12 } },
  { id: 'p3', name: '二手MP3播放器', price: 550, description: '里面存了几首过时的流行歌，唯一的慰藉。', impact: { mood: 8 } },
  { id: 'p4', name: '《高考提分宝典》', price: 880, description: '封面上印着的名师早已过气，但你别无选择。', impact: { academic: 12 } },
  { id: 'p5', name: '防身折叠刀', price: 1200, description: '它不会给你勇气，但会让那些流氓犹豫。', impact: { resilience: 1, sin: 8 } },
  { id: 'p6', name: '二手智能手机', price: 4500, description: '更快的网速，更深的泥潭。', impact: { savviness: 2 } }
];

export const GRAY_TASKS = [
  { id: 't1', name: '暗巷信使', reward: 350, desc: '把那个黑色包裹塞进老矿区3号井口的石缝里。别回头看。', risk: '中', stamina: -40, sin: 20 },
  { id: 't2', name: '舞厅望风', reward: 220, desc: '在红太阳门口待一晚。看到穿制服的，就往对街丢个空酒瓶。', risk: '高', stamina: -60, sin: 15 },
  { id: 't3', name: '旧房拆迁“劝说”', reward: 950, desc: '带上你的狠劲，去吓唬那些不肯搬走的老师傅。', risk: '极高', sin: 50, resilience: -2, stamina: -75 }
];

export const YUEYUE_USERS = [
  { id: 'u1', name: '寂寞的张总', dist: '0.5km', bio: '省城出差，找个本地姑娘带路。干净的来。', impact: { money: 850, mood: -55, sin: 45, appearance: 1, hygiene: -75 } },
  { id: 'u2', name: '落魄诗人', dist: '1.2km', bio: '在这个腐烂的时代，谁能共度今宵？', impact: { mood: 12, satiety: 10, money: 20, hygiene: -25 } },
  { id: 'u3', name: '小岭混混', dist: '0.2km', bio: '今晚红太阳，哥带你飞。', impact: { mood: -15, money: 50, hygiene: -50, sin: 15 } }
];

export const LOCATION_INTERACTIONS: Record<string, Record<string, AIRootResponse>> = {
  HOME: { ANY: { title: "霉味的家", description: "破床和药瓶。这是避风港，也是靶子。", is_final: true, speakerId: 'MOTHER', choices: [ { text: "深度睡眠", impact_description: "不做梦是最大的奢侈。", stat_changes: { stamina: 30, mood: 4, satiety: -10 } }, { text: "搜刮旧物 (需心眼>5)", impact_description: "你在柜底找到了父亲藏的旧票据和几十块钱。现金+35", stat_changes: { money: 35, mood: -12 }, requirements: { savviness: 5 } }, { text: "接待讨债人 (求饶)", impact_description: "你苦苦哀求，他们宽限了一天。韧性-1", stat_changes: { resilience: -1, mood: -15 } } ] } },
  SCHOOL: { ANY: { title: "高三二班", description: "这里是通往光明的正道，但路很窄。", is_final: true, speakerId: 'CHEN_YI', choices: [ { text: "死磕复习", impact_description: "这让你暂时忘记了债主。", stat_changes: { academic: 2, intelligence: 0.1, stamina: -30, mood: -15, satiety: -15 } }, { text: "偷窃试卷 (需心眼>7)", impact_description: "你把考卷揣进怀里。学业+3(虚假), 罪恶+3", stat_changes: { academic: 3, sin: 3, mood: -25 }, requirements: { savviness: 7 } }, { text: "离开学校", impact_description: "书本无法填饱肚子。", stat_changes: {}, is_return: true } ] } },
  RUINS: { ANY: { title: "矿区废墟", description: "法外之地，寒风凛冽。", is_final: true, speakerId: 'OLD_MINER', choices: [ { text: "拾荒", impact_description: "你翻找着废铁，有所收获。", stat_changes: { money: 12, stamina: -45, hygiene: -50 } }, { text: "“纸飞机”取货", impact_description: "你挖出了违禁包裹。现金+650, 罪恶+4", stat_changes: { money: 650, sin: 4, mood: -30, stamina: -35 } }, { text: "黑吃黑 (需心眼>8)", impact_description: "你伏击了落单的混混。现金+350, 精神-4, 罪恶+5", stat_changes: { money: 350, mood: -4, sin: 5, stamina: -65 }, requirements: { savviness: 8 } } ] } },
  CLUB: { ANY: { title: "红太阳舞厅", description: "这里是接触“社会”的第一站。", is_final: true, speakerId: 'BOSS', choices: [ { text: "做服务生", impact_description: "忍受客人的污言秽语。", stat_changes: { money: 45, stamina: -40, mood: -18, hygiene: -30 } }, { text: "线下接单 (陪酒)", impact_description: "你喝下了那杯苦涩的酒。现金+320, 整洁-85, 精神-35", stat_changes: { money: 320, hygiene: -85, mood: -35, sin: 2, stamina: -30 } }, { text: "购买情报 (¥200)", impact_description: "保安告诉你：刀哥明晚要来你家。", stat_changes: { money: -200 } } ] } },
  STATION: { ANY: { title: "火车站", description: "连接地狱与人间的通道。", is_final: true, choices: [ { text: "前往省城 (¥250)", impact_description: "你想去霓虹灯下看看。", stat_changes: { money: -250 }, new_area: 'PROVINCIAL_CAPITAL' }, { text: "练习扒窃 (需心眼>6)", impact_description: "你顺走了一个男人的钱包。现金+9, 罪恶+2", stat_changes: { money: 9, sin: 2, mood: -15 }, requirements: { savviness: 6 } }, { text: "张贴小广告", impact_description: "你忍受着白眼和谩骂。现金+4, 韧性-1, stamina: -35", stat_changes: { money: 4, resilience: -1, stamina: -35 } } ] } },
  BATH: { ANY: { title: "公共澡堂", description: "洗去煤灰，才能像个人样。", is_final: true, choices: [ { text: "洗澡 (¥75)", impact_description: "热水让你感到片刻安宁。", stat_changes: { money: -75, hygiene: 70, mood: 8 } }, { text: "更衣室摸奖 (需心眼>8)", impact_description: "你撬开了柜锁。获得现金和一块旧手表。现金+12, 罪恶+3", stat_changes: { money: 12, sin: 3, mood: -20 }, requirements: { savviness: 8 } }, { text: "听墙根", impact_description: "你听到了大佬在谈论债主的死对头。", stat_changes: {} } ] } },
};

export const INITIAL_GAME_STATE: GameState = {
  day: 1,
  timeOfDay: 'MORNING',
  attributes: { intelligence: 4, appearance: 4, stamina: 4, resilience: 3, savviness: 2 },
  avatar: { hair: 'ponytail', eyes: 'tired', expression: 'stoic', outfit: 'uniform', accessory: 'none' },
  stats: { satiety: 30, hygiene: 30, mood: 30, money: 50, debt: 3000, totalDebt: 30000, academic: 25, sin: 0, stamina: 70, resilience: 3, savviness: 2, intelligence: 4, appearance: 4, motherHealth: 60 },
  history: ["2014年春，黑岭镇。你站在人生的十字路口。"],
  location: "霉味的家",
  currentArea: 'MINING_TOWN',
  isTrapped: false,
  statusFlags: {
    fluDays: 0,
    isCrackdown: false,
    chenYiRelation: 30,
    hasCheatPackage: false,
    isMotherDead: false
  },
  phone: { 
    isOpen: false, 
    messages: [
      { id: 'm1', sender: '刀哥', content: '倒计时4天，准备好手指。', time: '08:00', isRead: false, impact: { mood: -20 } },
      { id: 'm2', sender: '陈屹', content: '这道函数题你会吗？我看你今天没来。', time: '12:00', isRead: false, impact: { mood: 2 } },
      { id: 'm3', sender: '母亲', content: '元一，药吃完了，别乱跑，早点回来。', time: '14:30', isRead: false }
    ], 
    videos: [
      { id: 'v1', author: '省城名媛', description: '省城的包包真好看。', tags: ['梦想'], impact: { mood: -12 }, likes: 100 }
    ], 
    products: [], 
    activeApp: 'HOME' 
  },
  visitedLocations: ['HOME']
};

export const AVATAR_OPTIONS: Record<string, any> = {
  hair: [
    { id: 'ponytail', label: '学生马尾', impact: '清纯感' },
    { id: 'messy', label: '凌乱短发', impact: '生活所迫' },
    { id: 'bangs', label: '厚重齐刘海', impact: '自我封闭' },
    { id: 'dyed', label: '劣质染发', impact: '叛逆边缘' },
    { id: 'brittle', label: '干燥枯发', impact: '营养不良' }
  ],
  eyes: [
    { id: 'tired', label: '浓重黑眼圈', impact: '极度疲惫' },
    { id: 'sharp', label: '冷冽双眸', impact: '极具心眼' },
    { id: 'numb', label: '麻木眼神', impact: '灵魂空洞' },
    { id: 'swollen', label: '泛红泪眼', impact: '刚刚哭过' },
    { id: 'focused', label: '专注凝视', impact: '执着学业' }
  ],
  expression: [
    { id: 'stoic', label: '隐忍', impact: '抗压' },
    { id: 'neutral', label: '麻木', impact: '沉沦' },
    { id: 'smile', label: '强行微笑', impact: '讨好世界' },
    { id: 'grit', label: '咬牙', impact: '坚毅挣扎' },
    { id: 'sneer', label: '讥讽', impact: '看透现实' }
  ],
  outfit: [
    { id: 'uniform', label: '脏旧校服', impact: '学生身份' },
    { id: 'padded', label: '黑色棉服', impact: '融入阴影' },
    { id: 'hoodie', label: '宽大卫衣', impact: '隐藏自我' },
    { id: 'suit', label: '二手正装', impact: '试图体面' },
    { id: 'sequins', label: '廉价亮片裙', impact: '舞厅特供' }
  ],
  accessory: [
    { id: 'none', label: '无', impact: '一贫如洗' },
    { id: 'glasses', label: '破损眼镜', impact: '知识代价' },
    { id: 'studs', label: '塑料耳钉', impact: '廉价叛逆' },
    { id: 'red_string', label: '红头绳', impact: '母亲的期盼' },
    { id: 'knife', label: '折叠刀', impact: '危险防备' }
  ],
};

export const FAINT_EVENTS: Record<string, AIRootResponse> = {
  DEFAULT: {
    title: "失去意识",
    description: "你感到一阵天旋地转，所有的声音都在远去...",
    is_final: true,
    choices: [{ text: "...", impact_description: "你在医院或冷清的家中醒来。", stat_changes: { stamina: 8, money: -500 } }]
  }
};
