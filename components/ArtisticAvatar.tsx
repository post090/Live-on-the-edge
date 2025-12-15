
import React from 'react';

interface Props {
  className?: string;
  isSmall?: boolean;
  speakerId?: 'PLAYER' | 'TEACHER' | 'MOTHER' | 'THUG' | 'OLD_MINER' | 'BOSS' | 'BOYFRIEND' | 'DAO_GE' | 'CHEN_YI' | 'HONG_JIE' | 'OLD_GUI';
  avatarConfig?: {
    hair: string;
    eyes: string;
    expression: string;
    outfit: string;
    accessory: string;
  };
}

const ArtisticAvatar: React.FC<Props> = ({ className, speakerId = 'PLAYER', avatarConfig }) => {
  // 核心视觉：黑白极简简笔画艺术
  const getAvatarUrl = () => {
    switch(speakerId) {
      case 'PLAYER': 
        // 女生简笔画/艺术线条：体现清冷的女学生侧影
        return 'https://images.unsplash.com/photo-1515463138280-67d1dcbf317f?auto=format&fit=crop&w=400&q=80'; 
      case 'MOTHER': 
        // 母亲：虚弱的女性线条
        return 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&w=400&q=80';
      case 'CHEN_YI': 
        // 少年：清纯的男性轮廓
        return 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80';
      case 'DAO_GE': 
        // 刀哥：带有威胁感的粗线条人像
        return 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80';
      case 'BOSS': 
        // 老板：带有装饰感的线条
        return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
      case 'THUG':
        // 暴徒：面部线条生硬的人像
        return 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80';
      default:
        return 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=400&q=80';
    }
  };

  const getFilters = () => {
    // 针对简笔画风格优化滤镜：高对比度模拟炭笔或钢笔在纸上的感觉
    if (speakerId === 'PLAYER') {
        return "grayscale(1) contrast(1.8) brightness(1.1)";
    }
    return "grayscale(1) contrast(1.5) brightness(1.1)";
  };

  return (
    <div className={`relative overflow-hidden bg-white border-[2px] border-black transition-all duration-300 ${className}`}>
      {/* 核心人像图片：确保图片在白色背景上清晰可见 */}
      <img 
        src={getAvatarUrl()} 
        alt={speakerId}
        style={{ filter: getFilters() }}
        className="w-full h-full object-cover transition-transform duration-500"
        onError={(e) => {
          // 备用方案：如果图片加载失败，显示一个色块确保 UI 不塌陷
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400/FFFFFF/000000?text=ART';
        }}
      />

      {/* 纸张质感叠加（极简） */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      
      {/* 极简边框装饰 */}
      <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none"></div>
    </div>
  );
};

export default ArtisticAvatar;
