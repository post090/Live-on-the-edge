
import React from 'react';
import { GameState } from '../types';
import { TIME_LABELS } from '../constants';
import ArtisticAvatar from './ArtisticAvatar';

interface Props {
  gameState: GameState;
  onMenuOpen: () => void;
  onPhoneOpen: () => void;
}

const StatusBar: React.FC<Props> = ({ gameState, onMenuOpen, onPhoneOpen }) => {
  const { stats, day, timeOfDay, location, phone } = gameState;
  const unreadMessages = phone.messages.filter(m => !m.isRead).length;

  // 高考分数预测逻辑 (满分 750)
  const predictedScore = Math.min(750, Math.floor(stats.academic * 2.8 + stats.intelligence * 14 - stats.sin * 1.5));
  
  const getPredictedSchool = (score: number) => {
    if (score >= 680) return "C9联盟 / 定向选调";
    if (score >= 610) return "重点一本 / 211院校";
    if (score >= 530) return "普通本科 / 省属公办";
    if (score >= 450) return "民办三本 / 职业技术";
    if (score >= 380) return "技校预备 / 劳动力市场";
    return "社会闲散 / 生存死局";
  };

  const predictedSchool = getPredictedSchool(predictedScore);
  
  const timeStyles: Record<string, string> = {
    MORNING: 'bg-slate-100 text-slate-900 border-slate-400',
    MIDNIGHT: 'bg-red-950 text-red-500 border-red-500 animate-pulse',
    NIGHT: 'bg-black text-white border-white/20',
    DUSK: 'bg-orange-950 text-orange-500 border-orange-800'
  };

  const StatBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="flex flex-col flex-1 gap-1">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[7px] font-black text-slate-500 uppercase tracking-tighter leading-none">{label}</span>
        <span className="text-[9px] font-mono font-black leading-none">{Math.round(value)}</span>
      </div>
      <div className="h-1 bg-black/5 relative overflow-hidden">
        <div className={`absolute inset-y-0 left-0 ${colorClass} transition-all duration-700`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );

  const MiniAttr = ({ label, value, color }: { label: string, value: number | string, color?: string }) => (
    <div className="flex flex-col items-center min-w-[34px]">
      <span className="text-[6px] font-black text-slate-400 uppercase leading-none mb-0.5">{label}</span>
      <span className={`text-[9px] font-black italic leading-none ${color || 'text-black'}`}>{value}</span>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col select-none bg-white border-b-[4px] border-black shadow-2xl">
      {/* 分区 1: 时间/环境/控制 */}
      <div className="bg-black text-white px-3 h-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black italic tracking-tighter">第 {day} 天</span>
          <div className={`px-1.5 py-0.5 border text-[7px] font-black uppercase ${timeStyles[timeOfDay]}`}>
            {TIME_LABELS[timeOfDay]}
          </div>
          <span className="text-[7px] font-black text-red-500 animate-pulse uppercase">剩 {30-day} 天</span>
          <span className="text-[7px] font-black text-slate-500 ml-1 truncate max-w-[80px] border-l border-white/20 pl-2">{location}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onPhoneOpen} className="relative active:scale-90 transition-transform">
             <span className="text-lg">✉</span>
             {unreadMessages > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-black animate-bounce"></span>}
          </button>
          <button onClick={onMenuOpen} className="text-base">☰</button>
        </div>
      </div>

      {/* 分区 2: 经济命脉 (现金与债务) */}
      <div className="flex items-stretch bg-white border-b border-black/10 h-12">
        <div className="w-12 border-r border-black/10 flex items-center justify-center p-0.5 bg-slate-50">
          <ArtisticAvatar speakerId="PLAYER" className="w-full h-full grayscale opacity-90" />
        </div>
        <div className="flex-1 flex items-center px-4 justify-between">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[6px] font-black text-slate-400 uppercase leading-none mb-1">现金</span>
              <span className="text-base font-mono font-black italic leading-none">¥{stats.money}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[6px] font-black text-red-500 uppercase leading-none mb-1">本期应还</span>
              <span className="text-base font-mono font-black text-red-700 leading-none">¥{stats.debt}</span>
            </div>
          </div>
          <div className="flex flex-col items-end opacity-20">
             <span className="text-[6px] font-black text-slate-400 uppercase mb-1">总欠款</span>
             <span className="text-[10px] font-mono font-black leading-none">¥{stats.totalDebt}</span>
          </div>
        </div>
      </div>

      {/* 分区 3: 状态 (饱腹/精神/整洁/母亲健康) */}
      <div className="bg-slate-50 px-3 py-1.5 flex gap-3 border-b border-black/5">
        <StatBar label="饱腹" value={stats.satiety} colorClass="bg-orange-800" />
        <StatBar label="精神" value={stats.mood} colorClass="bg-indigo-800" />
        <StatBar label="整洁" value={stats.hygiene} colorClass="bg-sky-700" />
        <StatBar label="母亲" value={stats.motherHealth} colorClass="bg-rose-800" />
      </div>

      {/* 分区 4: 属性 (体力/智力/魅力/心眼/韧性) 与 罪恶 */}
      <div className="p-2 flex flex-col gap-2 bg-white border-b border-black/5">
        <div className="flex justify-between items-center px-0.5">
          {/* 核心属性组 - 全个位数 */}
          <div className="flex gap-2.5">
            <MiniAttr label="体力" value={stats.stamina} color="text-emerald-700" />
            <MiniAttr label="智力" value={stats.intelligence} />
            <MiniAttr label="魅力" value={stats.appearance} color="text-rose-600" />
            <MiniAttr label="心眼" value={stats.savviness} color="text-zinc-900" />
            <MiniAttr label="韧性" value={stats.resilience} color="text-amber-600" />
          </div>
          {/* 特殊区隔 */}
          <div className="flex gap-2.5 border-l-2 border-black/10 pl-3">
            <MiniAttr label="罪恶" value={stats.sin} color="text-red-900" />
          </div>
        </div>
      </div>

      {/* 分区 5: 高考拟投档预测 */}
      <div className="bg-slate-100 p-1.5 flex justify-between items-center px-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[7px] font-black text-slate-400 uppercase">学业水平 {stats.academic}</span>
          <span className="text-[7px] font-black text-slate-400 uppercase ml-2">预计总分</span>
          <span className="text-xs font-black italic text-black leading-none">{predictedScore}</span>
        </div>
        <div className="bg-black text-white px-2 py-0.5 text-[8px] font-black italic skew-x-[-12deg] tracking-tighter uppercase">
          拟投档：{predictedSchool}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
