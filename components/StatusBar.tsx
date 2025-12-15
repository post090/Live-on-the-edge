
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

  const predictedScore = Math.min(750, Math.floor(stats.academic * 2.0 + stats.intelligence * 10 - stats.sin * 0.5));
  
  const timeLabel = TIME_LABELS[timeOfDay];
  
  const timeStyles: Record<string, string> = {
    MORNING: 'bg-slate-100 text-slate-900 border-slate-400',
    MIDNIGHT: 'bg-red-950 text-red-500 border-red-500 animate-pulse',
    NIGHT: 'bg-black text-white border-white/20',
    DUSK: 'bg-orange-950 text-orange-500 border-orange-800'
  };

  const StatProgress = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[6px] font-black uppercase tracking-tighter text-slate-500">{label}</span>
        <span className="text-[7px] font-mono font-black">{Math.round(value)}</span>
      </div>
      <div className="h-1 bg-black/10 relative overflow-hidden">
        <div className={`absolute inset-y-0 left-0 ${colorClass} transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col select-none bg-white shadow-2xl">
      <div className="bg-black text-white px-4 h-10 flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-black italic leading-none">第 {day.toString().padStart(2, '0')} 天</span>
          <div className={`px-2 py-0.5 border-2 rounded-sm text-[10px] font-black italic transition-all ${timeStyles[timeOfDay] || 'bg-white text-black border-black'}`}>{timeLabel}</div>
          <span className="text-[9px] font-black text-red-500 animate-pulse">高考: {30-day}天</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onPhoneOpen} className="relative active:scale-90 transition-transform">
             <span className="text-xl">✉</span>
             {unreadMessages > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-black animate-bounce"></span>}
          </button>
          <button onClick={onMenuOpen} className="text-lg">☰</button>
        </div>
      </div>

      <div className="bg-white border-b-2 border-black flex items-stretch h-16">
        <div className="flex items-stretch border-r border-black/10">
          <div className="w-16 h-full relative border-r border-black/10">
             <ArtisticAvatar speakerId="PLAYER" className="w-full h-full grayscale opacity-80" />
          </div>
          <div className="flex flex-col justify-center px-3">
            <span className="text-[6px] font-black text-slate-400 uppercase leading-none mb-1">生存金</span>
            <div className="flex items-baseline gap-0.5 text-lg font-mono font-black italic">
              <span className="opacity-30">¥</span>{stats.money}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-around items-center px-2">
          <div className="flex flex-col items-center"><span className="text-[5px] text-slate-400 font-black">智力</span><span className="text-sm font-black italic">{stats.intelligence}</span></div>
          <div className="flex flex-col items-center"><span className="text-[5px] text-slate-400 font-black">魅力</span><span className="text-sm font-black italic text-rose-600">{stats.appearance}</span></div>
          <div className="flex flex-col items-center"><span className="text-[5px] text-slate-400 font-black">心计</span><span className="text-sm font-black italic text-cyan-700">{stats.corruption}</span></div>
          <div className="flex flex-col items-center"><span className="text-[5px] text-slate-400 font-black">罪恶</span><span className="text-sm font-black italic text-red-900">{stats.sin}</span></div>
        </div>
        <div className="border-l border-black/10 flex flex-col justify-center px-4 text-right">
           <span className="text-[8px] font-black truncate max-w-[70px] leading-none mb-1 uppercase">{location}</span>
           <div className="bg-black text-white px-1.5 py-0.5 text-[10px] font-black italic skew-x-[-10deg]">预计总分: {predictedScore}</div>
        </div>
      </div>

      <div className="bg-slate-50 border-b-4 border-black px-4 h-8 flex items-center gap-2">
        <StatProgress label="饱腹" value={stats.satiety} colorClass="bg-orange-800" />
        <StatProgress label="精神" value={stats.mood} colorClass="bg-indigo-800" />
        <StatProgress label="学业" value={stats.academic} colorClass="bg-emerald-800" />
        <StatProgress label="整洁" value={stats.hygiene} colorClass="bg-sky-800" />
        <div className="flex flex-col gap-0.5 w-1/3">
           <div className="flex justify-between px-0.5"><span className="text-[6px] font-black text-red-800 uppercase">债务</span><span className="text-[7px] font-mono font-black">{stats.debt}</span></div>
           <div className="h-1 bg-red-100 relative">
             <div className="absolute inset-y-0 left-0 bg-red-800 transition-all duration-500" style={{ width: `${Math.min(100, (stats.debt / 5000) * 100)}%` }} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
