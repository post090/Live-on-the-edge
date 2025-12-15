
import { GameState } from '../types';

/**
 * 根据当前游戏状态（数值、天数、时段）返回地图选择页面的感官描述。
 * 判定优先级严格遵循用户定义的层级逻辑。
 */
export const getLocalStatusSummary = (state: GameState): string => {
  const { stats, day, timeOfDay, statusFlags } = state;

  // --- 0. 特殊时段覆盖 (Timeline Override) ---
  if (day === 1) {
    return "30天。3万块。这是刀哥给你的死刑倒计时。你看着手里碎屏的手机，不知道哪一条路能通向活路。";
  }
  if (day === 20 && !statusFlags.isMotherDead) {
    return "医院的消毒水味似乎飘到了这里。如果今天筹不到手术费，这张地图上就只剩你一个人了。";
  }
  if (day === 29) {
    return "最后24小时。所有的账，无论是钱还是命，都要在今晚结清。黑岭镇很安静，像是在等待一场雪崩。";
  }

  // --- 1. 濒死 / 崩溃层 (The Dying / The Broken) ---
  // 触发条件：体力 < 10 或 SAN值 (mood) < 10
  if (stats.stamina < 10) {
    return "肺里像是塞满了烧红的煤渣，每一次呼吸都带着铁锈味。视线开始模糊了……如果不找个地方躺下，这可能就是最后一次看这张地图。";
  }
  if (stats.mood < 10) {
    // 根据罪恶值区分崩溃的表现形式
    if (stats.sin > 30) {
      return "那些建筑……它们在呼吸。学校的窗户像是无数只眼睛死死盯着你。刀哥的笑声就在耳边，但他明明不在这一带。必须找个地方躲起来，或者吞点什么药。";
    } else {
      return "谁在说话？闭嘴。地图上的字都在跳舞。我不记得我要去哪了，或许跳进矿坑里是个好主意？那里看起来暖和极了。";
    }
  }

  // --- 2. 肮脏 / 羞耻层 (The Filthy) ---
  // 触发条件：整洁 (hygiene) < 20
  if (stats.hygiene < 20) {
    if (timeOfDay === 'MORNING' || timeOfDay === 'FORENOON' || timeOfDay === 'AFTERNOON') {
      return "路过的人都在捂着鼻子躲避你。你低头看了看满是油污的袖口，身上那股酸臭味让你在寒风中也感到燥热。除了废墟和家里，没人会欢迎现在的你。";
    } else {
      return "你像只过街老鼠一样贴着墙根走。霓虹灯越亮，你就觉得自己越脏。这种样子去省城只会被保安打出来……或许该去澡堂冲掉这身晦气了。";
    }
  }

  // --- 3. 赤贫 / 饥饿层 (The Starving) ---
  // 触发条件：现金 < 50 且 未还清债务
  if (stats.money < 50 && stats.debt > 0) {
    if (stats.satiety < 30) {
      return "胃里空得像个无底洞，胃酸在烧。兜里只剩下几个硬币，碰得叮当响。你是去买个馒头续命，还是留着这最后一点钱坐车去碰碰运气？";
    }
    if (stats.stamina < 40) {
      return "这该死的鬼天气，冷风顺着破鞋底往骨头里钻。没钱买暖贴，没钱坐车。在这座城市，贫穷比寒冷更早杀死你。";
    }
    return "手机又震动了，不用看也知道是催债的。地图上每一个地点都像是一个可能的提款机，或者坟墓。只要能搞到钱，去哪都行，做什么都行。";
  }

  // --- 4. 堕落 / 暴富层 (The Fallen / The Tycoon) ---
  // 触发条件：罪恶 > 60 且 现金 > 5000
  if (stats.sin > 60 && stats.money > 5000) {
    if (state.currentArea === 'PROVINCIAL_CAPITAL') {
      return "黑岭太小了，容不下你的野心。省城的灯红酒绿才是你应该去的地方。至于那些还在死读书的傻瓜……让他们烂在泥里吧。";
    }
    if (stats.corruption > 50) {
      return "点燃一支烟，烟雾后的街道看起来顺眼多了。你已经学会了这里的生存法则：要么吃人，要么被吃。你摸了摸口袋里的‘硬货’，决定今晚去猎杀新的猎物。";
    }
    return "手里沉甸甸的现金让你感到前所未有的温暖。看着地图上曾经让你害怕的地方，现在你只觉得可笑。只要钱到位，黑岭镇也是天堂。";
  }

  // --- 5. 做题家 / 麻木层 (The Machine) ---
  // 触发条件：学业 > 80 且 SAN值 (mood) < 40
  if (stats.academic > 80 && stats.mood < 40) {
    if (stats.intelligence > 7) {
      return "周围的喧嚣仿佛被隔绝在一层玻璃之外。那些为了几百块钱打架的人真可悲。只要考出去……只要考出去，这一切就结束了。对吧？";
    }
    return "看什么都像几何图形。路灯是圆锥曲线，楼房是立体几何。脑子里全是单词在乱撞。只要还没死，就还能背下一页。去学校……还是去书店？";
  }

  // --- 6. 常态 / 迷茫层 (The Lost) ---
  // 默认层级：按时段进行描述
  switch (timeOfDay) {
    case 'MORNING':
    case 'FORENOON':
      return "天还没亮透，煤烟味就已经呛进了喉咙。黑岭镇醒了，像一只巨大的灰色野兽。今天该去哪找点希望？";
    case 'AFTERNOON':
    case 'DUSK':
      return "夕阳把雪地染成了血红色。一天又要过去了，距离那个审判日又近了一步。你站在路口，手里攥着仅有的筹码，犹豫不决。";
    case 'NIGHT':
    case 'MIDNIGHT':
      return "街上没人了，只有红太阳舞厅的灯还在闪。风像刀子一样刮脸。回家睡觉是唯一的免费选项，但你真的睡得着吗？";
    default:
      return "你站在小镇的废墟边缘，风中带着铁锈和绝望。这里的生存法则从未改变：忍耐，或者崩坏。";
  }
};
