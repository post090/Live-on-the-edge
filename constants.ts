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
  { id: 't1', name: '暗巷信使', reward: 350, desc: '把那个黑色包裹塞进老矿区3号井口的石缝里。别回头看。', risk: '中', stamina: -1, sin: 2 },
  { id: 't2', name: '舞厅望风', reward: 220, desc: '在红太阳门口待一晚。看到穿制服的，就往对街丢个空酒瓶。', risk: '高', stamina: -2, sin: 1 },
  { id: 't3', name: '旧房拆迁“劝说”', reward: 950, desc: '带上你的狠劲，去吓唬那些不肯搬走的老师傅。', risk: '极高', sin: 5, resilience: -1, stamina: -3 }
];

export const YUEYUE_USERS = [
  { id: 'u1', name: '寂寞的张总', dist: '0.5km', bio: '省城出差，找个本地姑娘带路。干净的来。', impact: { money: 850, mood: -15, sin: 4, appearance: 1, hygiene: -25 } },
  { id: 'u2', name: '落魄诗人', dist: '1.2km', bio: '在这个腐烂的时代，谁能共度今宵？', impact: { mood: 8, satiety: 10, money: 20, hygiene: -15 } },
  { id: 'u3', name: '小岭混混', dist: '0.2km', bio: '今晚红太阳，哥带你飞。', impact: { mood: -15, money: 50, hygiene: -20, sin: 2 } }
];

export const LOCATION_INTERACTIONS: Record<string, Record<string, AIRootResponse>> = {
  // 黑岭镇 (Map A)
  HOME: { ANY: { 
    title: "霉味的家", description: "只有一张破床和满地药瓶。你的避风港，也是债主的靶子。", is_final: true, 
    choices: [ 
      { text: "A. 【深度睡眠】", impact_description: "不做梦是最大的奢侈。", stat_changes: { stamina: 5, mood: 10 } }, 
      { text: "B. 【搜刮旧物】 (需心眼>3)", impact_description: "你在柜底找到了父亲藏的私房钱。", stat_changes: { money: 125, savviness: 0.1 }, requirements: { savviness: 3 } }, 
      { text: "C. 【接待讨债人】 (求饶)", impact_description: "你苦苦哀求，他们宽限了一天。", stat_changes: { resilience: -1, mood: -15 } },
      { text: "D. 【煮碗挂面】 (¥5)", impact_description: "一碗白面，热气腾腾，让你想起了以前。", stat_changes: { money: -5, satiety: 20, mood: 5 }, requirements: { money: 5 } }
    ] 
  }},
  SCHOOL: { ANY: { 
    title: "高三二班", description: "卷子堆得像坟头。这是通往光明的唯一正道，但路很窄。", is_final: true, 
    choices: [ 
      { text: "A. 【死磕复习】", impact_description: "你沉浸在题海中，暂时忘记了现实的寒冷。", stat_changes: { academic: 5, intelligence: 0.2, stamina: -1, mood: -5 } }, 
      { text: "B. 【校园倒卖】", impact_description: "你将身上的一些玩意高价卖给了好奇的同学。", stat_changes: { money: 200, academic: -5, savviness: 0.5 } }, 
      { text: "C. 【偷窃试卷】 (需心眼>5)", impact_description: "你趁办公室没人，偷出了下周的模拟题。", stat_changes: { academic: 50, sin: 10, mood: -20 }, requirements: { savviness: 5 } } 
    ] 
  }},
  RUINS: { ANY: { 
    title: "矿区废墟", description: "被封锁的旧矿井，法外之地，寒风凛冽。", is_final: true, 
    choices: [ 
      { text: "A. 【拾荒】", impact_description: "你翻找着废铁，满手乌黑，极其低效。", stat_changes: { money: 30, stamina: -2, hygiene: -30 } }, 
      { text: "B. 【“纸飞机”取货】", impact_description: "你挖出了违禁包裹，心脏狂跳。", stat_changes: { money: 1000, sin: 20, mood: -10, stamina: -1 } }, 
      { text: "C. 【黑吃黑】 (需心眼>6)", impact_description: "你伏击了交易的小混混。", stat_changes: { money: 1200, mood: -20, sin: 30, stamina: -3 }, requirements: { savviness: 6 } } 
    ] 
  }},
  CLUB: { ANY: { 
    title: "红太阳舞厅", description: "劣质香水味。这里是元一接触“社会”的第一站。", is_final: true, 
    choices: [ 
      { text: "A. 【做服务生】", impact_description: "忍受客人的污言秽语，你捡到了一个打火机。", stat_changes: { money: 80, stamina: -1.5, mood: 5 } }, 
      { text: "B. 【线下接单】 (陪酒)", impact_description: "你喝下了那杯苦涩的酒，忍受着骚扰。", stat_changes: { money: 500, hygiene: -50, mood: -15, sin: 5, stamina: -1 } }, 
      { text: "C. 【购买情报】 (¥50)", impact_description: "保安收了烟，告诉你债主刀哥的行踪。", stat_changes: { money: -50, savviness: 1 }, requirements: { money: 50 } },
      { text: "D. 【买醉放松】 (¥120)", impact_description: "酒精让你暂时忘记了那个叫刀哥的男人。", stat_changes: { money: -120, mood: 35, satiety: 5, hygiene: -10 }, requirements: { money: 120 } }
    ] 
  }},
  STATION: { ANY: { 
    title: "火车站", description: "连接地狱与人间的通道。三教九流汇聚。", is_final: true, 
    choices: [ 
      { text: "A. 【前往省城】 (¥50)", impact_description: "你想去霓虹灯下看看。", stat_changes: { money: -50 }, new_area: 'PROVINCIAL_CAPITAL', requirements: { money: 50 } }, 
      { text: "B. 【练习扒窃】 (需心眼>4)", impact_description: "你顺走了一个旅客的钱包。", stat_changes: { money: 180, sin: 10, stamina: -1 }, requirements: { savviness: 4 } }, 
      { text: "C. 【张贴小广告】", impact_description: "你贴着办证广告，忍受着白眼和谩骂。", stat_changes: { money: 80, resilience: -0.5, stamina: -1.5 } } 
    ] 
  }},
  BATH: { ANY: { 
    title: "公共澡堂", description: "恢复整洁的唯一场所。洗去煤灰，才能像个人样。", is_final: true, 
    choices: [ 
      { text: "A. 【洗澡】 (¥15)", impact_description: "热水让你感到片刻安宁。", stat_changes: { money: -15, hygiene: 100, mood: 5 }, requirements: { money: 15 } }, 
      { text: "B. 【更衣室摸奖】 (需心眼>5)", impact_description: "你撬开了柜锁，拿走了里面的手表和现金。", stat_changes: { money: 250, sin: 15, mood: -20 }, requirements: { savviness: 5 } }, 
      { text: "C. 【听墙根】", impact_description: "你在迷雾中偷听到大佬的谈话，获得了某些内幕。", stat_changes: { savviness: 1.5 } },
      { text: "D. 【桑拿按摩】 (¥150)", impact_description: "温热的蒸汽和粗鲁的按摩缓解了你灵魂的疲惫。", stat_changes: { money: -150, mood: 45, stamina: 0.5, hygiene: 20 }, requirements: { money: 150 } }
    ] 
  }},

  // 省城 (Map B)
  SQUARE: { ANY: { 
    title: "省城站前广场", description: "霓虹紫。混乱的集散地，充满骗子和流浪汉。", is_final: true, 
    choices: [ 
      { text: "A. 【长椅过夜】", impact_description: "省下了住宿费，但有概率被偷钱。", stat_changes: { stamina: 1, hygiene: -20, mood: -10 } }, 
      { text: "B. 【乞讨/卖惨】 (需整洁<20)", impact_description: "路人投来了同情的硬币。", stat_changes: { money: 120, mood: -10, appearance: -1 }, requirements: { hygiene: 20 } }, 
      { text: "C. 【购买假证】 (¥200)", impact_description: "你拥有了一个可以出入网吧或开房的虚假身份。", stat_changes: { money: -200, sin: 5, savviness: 1 }, requirements: { money: 200 } },
      { text: "D. 【买票返回黑岭】 (¥50)", impact_description: "你最终决定回到那个熟悉且压抑的地方。", stat_changes: { money: -50 }, new_area: 'MINING_TOWN', requirements: { money: 50 } }
    ] 
  }},
  MARKET: { ANY: { 
    title: "综合批发市场", description: "倒爷的天堂，也是苦力的地狱。", is_final: true, 
    choices: [ 
      { text: "A. 【进货】 (¥500)", impact_description: "你买了一些电子垃圾和盗版书。", stat_changes: { money: -500, savviness: 0.5 }, requirements: { money: 500 } }, 
      { text: "B. 【做搬运工】", impact_description: "纯卖力气，你的肩膀磨破了皮，但赚得多一些。", stat_changes: { money: 150, stamina: -4, hygiene: -30 } }, 
      { text: "C. 【走私接头】", impact_description: "你帮人把违禁品藏在货车底盘运回黑岭。", stat_changes: { money: 2000, sin: 30, mood: -20, stamina: -1 } },
      { text: "D. 【路边摊盒饭】 (¥15)", impact_description: "虽然卫生堪忧，但量大管饱，填补了胃里的空虚。", stat_changes: { money: -15, satiety: 40, hygiene: -10 }, requirements: { money: 15 } }
    ] 
  }},
  CYBER: { ANY: { 
    title: "赛博电脑城", description: "冷光蓝。假货横行，信息集散地。", is_final: true, 
    choices: [ 
      { text: "A. 【销赃】", impact_description: "你卖掉了从黑岭弄来的手机，价格不错。", stat_changes: { money: 500, sin: 10 } }, 
      { text: "B. 【找黑客“强子”】 (¥5000)", impact_description: "强子帮你搞到了高考题库，智力爆发。", stat_changes: { money: -5000, intelligence: 3, academic: 100 }, requirements: { money: 5000 } }, 
      { text: "C. 【购买装备】 (¥800)", impact_description: "你买到了针孔摄像头和窃听器。", stat_changes: { money: -800, savviness: 2 }, requirements: { money: 800 } } 
    ] 
  }},
  CLINIC: { ANY: { 
    title: "地下黑诊所", description: "只要有钱，什么都能治，也什么都敢收。", is_final: true, 
    choices: [ 
      { text: "A. 【卖血】", impact_description: "抽完血后，你感到天旋地转，但救急够了。", stat_changes: { money: 800, stamina: -4, resilience: -1 } }, 
      { text: "B. 【购买“聪明药”】 (¥1200)", impact_description: "这种药能让你效率翻倍，但你会逐渐上瘾。", stat_changes: { money: -1200, academic: 40, mood: -10, stamina: -2 }, requirements: { money: 1200 } }, 
      { text: "C. 【治疗隐疾】 (¥500)", impact_description: "你治疗了身体的创伤 and 隐疾。", stat_changes: { money: -500, motherHealth: 10 }, requirements: { money: 500 } } 
    ] 
  }},
  UNI: { ANY: { 
    title: "虚构大学城", description: "你梦寐以求的地方，但你需要门票。", is_final: true, 
    choices: [ 
      { text: "A. 【潜入旁听】 (需整洁>80)", impact_description: "你在教室后排听了一节课，学到了很多。", stat_changes: { academic: 20, intelligence: 0.5, mood: 15 }, requirements: { hygiene: 80 } }, 
      { text: "B. 【寻找“枪手”】 (¥10000)", impact_description: "中介收了钱，承诺会有人替考。", stat_changes: { money: -10000, sin: 50, mood: -30 }, requirements: { money: 10000 } }, 
      { text: "C. 【钓鱼诈骗】", impact_description: "你伪装成学生骗取生活费，钱到账了。", stat_changes: { money: 500, savviness: 1, sin: 15 } },
      { text: "D. 【蹭学生食堂】 (¥12)", impact_description: "在青春洋溢的食堂里，你像个格格不入的幽灵。", stat_changes: { money: -12, satiety: 35, mood: 10 }, requirements: { money: 12 } }
    ] 
  }},
  HOTEL: { ANY: { 
    title: "金皇朝大酒店", description: "富豪的销金窟，普通人的禁地。", is_final: true, 
    choices: [ 
      { text: "A. 【高端局】 (需魅力>8)", impact_description: "你出卖了最后的尊严，灵魂彻底崩坏。", stat_changes: { money: 5000, mood: -100, sin: 80, appearance: 1 }, requirements: { appearance: 8 } }, 
      { text: "B. 【捉奸勒索】 (需心眼>7)", impact_description: "你拍下了权贵的丑闻，勒索成功。", stat_changes: { money: 15000, sin: 40, savviness: 2 }, requirements: { savviness: 7 } }, 
      { text: "C. 【清洗罪证】 (¥10000)", impact_description: "你找律师抹去了案底。", stat_changes: { money: -10000, sin: -50 }, requirements: { money: 10000 } },
      { text: "D. 【海鲜自助】 (¥888)", impact_description: "昂贵的食材并未带给你多少快乐，只有腹部的充实感。", stat_changes: { money: -888, satiety: 100, mood: 30 }, requirements: { money: 888 } }
    ] 
  }},
};

export const INITIAL_GAME_STATE: GameState = {
  day: 1,
  timeOfDay: 'MORNING',
  attributes: { intelligence: 4, appearance: 4, stamina: 5, resilience: 3, savviness: 2 },
  avatar: { hair: 'ponytail', eyes: 'tired', expression: 'stoic', outfit: 'uniform', accessory: 'none' },
  stats: { satiety: 60, hygiene: 60, mood: 60, money: 50, debt: 3000, totalDebt: 30000, academic: 25, sin: 0, stamina: 5, resilience: 3, savviness: 2, intelligence: 4, appearance: 4, motherHealth: 60 },
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
    choices: [{ text: "...", impact_description: "你在医院或冷清的家中醒来。", stat_changes: { stamina: 1, money: -500 } }]
  }
};
