
import React from 'react';
import { GameState } from './types';
import { TIME_LABELS, DAYS_OF_WEEK } from './constants';
import ArtisticAvatar from './components/ArtisticAvatar';

interface Props {
  gameState: GameState;
  onMenuOpen: () => void;
  onPhoneOpen: () => void;
}

const StatusBar: React.FC<Props> = ({ gameState, onMenuOpen, onPhoneOpen }) => {
  const { stats, day, timeOfDay, location, isTrapped, phone } = gameState;
  const timeLabel = TIME_LABELS[timeOfDay];
  const unreadMessages = phone.messages.filter(m => !m.isRead).length;

  const predictedScore = Math.min(750, Math.floor(stats.academic * 2.0 + stats.intelligence * 10 - stats.sin * 0.5));
  
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
        <div className={`absolute inset-y-0 left-0 ${colorClass} transition-all duration-500`} style={{ width: `${Math.min(100, value)}%` }} />
      