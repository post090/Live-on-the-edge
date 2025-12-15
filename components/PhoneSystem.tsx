
import React, { useState } from 'react';
import { GameState, Message, ShortVideo, Stats, Product, MessageOption } from '../types';
import { YUEYUE_USERS, GRAY_TASKS, PRODUCTS } from '../constants';

interface Props {
  gameState: GameState;
  onUpdateStats: (changes: Partial<Stats>) => void;
  onClose: () => void;
  onMarkMessageRead: (msgId: string) => void;
}

const PhoneSystem: React.FC<Props> = ({ gameState, onUpdateStats, onClose, onMarkMessageRead }) => {
  const [activeApp, setActiveApp] = useState<'HOME' | 'SOCIAL' | 'VIDEO' | 'SHOP' | 'YUEYUE' | 'TG' | 'LOAN'>('HOME');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const unreadCount = gameState.phone.messages.filter(m => !m.isRead).length;

  const handleOpenChat = (msg: Message) => {
    onMarkMessageRead(msg.id);
    setSelectedChatId(msg.id);
  };

  const handlePurchase = (product: Product) => {
    if (gameState.stats.money < product.price) {
      alert("淘货网：账户余额不足。在这个世界上，连生存都需要预付代价。");
      return;
    }
    onUpdateStats({ ...product.impact, money: -product.price });
    alert(`成功购买 ${product.name}。你在消费中感到一丝虚幻的权力感。`);
  };

  const handleBorrow = (amount: number) => {
    onUpdateStats({ money: amount, debt: amount * 1.5 });
    alert(`借贷：¥${amount}已到账。你签下了一份让灵魂抵押的契约。`);
  };

  const handleGrayTask = (task: any) => {
    if (gameState.stats.savviness < 5) {
      alert("纸飞机：你还没学会如何像一个阴影里的掠食者那样思考。心眼不足。");
      return;
    }
    if (confirm(`【加密指令】是否接取任务“${task.name}”？\n风险级别：${task.risk}`)) {
      onUpdateStats({ 
        money: task.reward, 
        stamina: task.stamina, 
        sin: task.sin, 
        mood: -15 
      });
      alert(`你潜入黑暗中完成了任务。¥${task.reward}到账，但你的双手似乎再也洗不干净了。`);
    }
  };

  const handleYueYue = (user: any) => {
    if (gameState.stats.appearance < 8 && user.id === 'u1') {
      alert("约约：对方看了你的头像，把你屏蔽了。魅力不足。");
      return;
    }
    if (confirm(`与“${user.name}”见面？距离：${user.dist}`)) {
      onUpdateStats(user.impact);
      alert(`在这个冰冷的夜晚，你与陌生人交换了某种东西。${user.impact.money ? '钱到账了，但你不敢照镜子。' : '至少胃里不再那么疼了。'}`);
    }
  };

  const renderHome = () => (
    <div className="flex-1 grid grid-cols-3 gap-6 p-8 content-start bg-slate-100 h-full">
      <AppIcon label="沉默通讯" icon="✉" bg="bg-blue-600" onClick={() => setActiveApp('SOCIAL')} badge={unreadCount} />
      <AppIcon label="快见视频" icon="▶" bg="bg-red-600" onClick={() => setActiveApp('VIDEO')} />
      <AppIcon label="淘货网" icon="🛒" bg="bg-amber-500" onClick={() => setActiveApp('SHOP')} />
      <AppIcon label="约约" icon="💜" bg="bg-purple-600" onClick={() => setActiveApp('YUEYUE')} />
      <AppIcon label="纸飞机" icon="✈" bg="bg-cyan-700" onClick={() => setActiveApp('TG')} />
      <AppIcon label="小借贷" icon="💰" bg="bg-yellow-600" onClick={() => setActiveApp('LOAN')} />
    </div>
  );

  const AppIcon = ({ label, icon, bg, onClick, badge }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 ${bg} border-4 border-black flex items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all`}>
        <span className="text-white text-2xl">{icon}</span>
        {badge > 0 && <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-black w-5 h-5 flex items-center justify-center border-2 border-black rounded-full animate-bounce">{badge}</div>}
      </div>
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );

  const renderSocial = () => {
    if (selectedChatId) {
      const chat = gameState.phone.messages.find(m => m.id === selectedChatId);
      return (
        <div className="flex-1 flex flex-col bg-white">
          <div className="h-10 bg-slate-100 border-b-2 border-black flex items-center px-4">
            <button onClick={() => setSelectedChatId(null)} className="mr-3 font-black">←</button>
            <span className="text-xs font-black">{chat?.sender}</span>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
            <div className="self-start max-w-[80%] bg-slate-200 p-3 text-xs font-medium border-2 border-black">
              {chat?.content}
              <div className="text-[8px] opacity-40 mt-1">{chat?.time}</div>
            </div>
          </div>
          <div className="p-2 bg-slate-50 border-t-2 border-black">
             <div className="text-[10px] text-slate-400 font-black mb-1 px-1">无法回复（权限限制）</div>
             <div className="h-8 bg-white border-2 border-slate-300 rounded px-2 flex items-center text-[10px] opacity-50 italic">
               输入消息...
             </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        <div className="p-4 border-b-2 border-black font-black italic bg-blue-50">消息列表</div>
        {gameState.phone.messages.map(m => (
          <button key={m.id} onClick={() => handleOpenChat(m)} className={`p-4 border-b border-slate-200 text-left hover:bg-slate-50 relative ${!m.isRead ? 'bg-blue-50/50' : ''}`}>
             <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black">{m.sender}</span>
                <span className="text-[8px] opacity-40">{m.time}</span>
             </div>
             <p className="text-[10px] text-slate-500 truncate">{m.content}</p>
             {!m.isRead && <div className="absolute top-4 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
          </button>
        ))}
      </div>
    );
  };

  const renderShop = () => (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      <div className="p-4 border-b-2 border-black bg-amber-50 font-black italic">淘货网 // 生存特惠</div>
      <div className="p-4 grid grid-cols-1 gap-3">
        {PRODUCTS.map(p => (
          <div key={p.id} className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between font-black mb-1">
               <span className="text-xs">{p.name}</span>
               <span className="text-xs text-amber-700 font-mono">¥{p.price}</span>
            </div>
            <p className="text-[9px] text-slate-400 mb-3">{p.description}</p>
            <button onClick={() => handlePurchase(p)} className="w-full py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest active:bg-slate-800">结算</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLoan = () => (
    <div className="flex-1 flex flex-col bg-yellow-50 overflow-y-auto">
      <div className="p-4 bg-yellow-600 text-white border-b-4 border-black font-black italic">小借贷 // 负债评估</div>
      <div className="p-6">
        <div className="bg-white border-4 border-black p-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
           <span className="text-[10px] font-black opacity-50">总债务</span>
           <div className="text-3xl font-mono font-black text-red-600">¥{gameState.stats.totalDebt}</div>
           <div className="mt-2 text-[8px] text-slate-400">可用现金：¥{gameState.stats.money}</div>
        </div>
        <div className="space-y-4">
           <button onClick={() => handleBorrow(1000)} className="btn-flat w-full py-4 text-xs font-black border-yellow-800 bg-white">紧急周转金 ¥1000 (利息 50%)</button>
           <button onClick={() => handleBorrow(5000)} className="btn-flat w-full py-4 text-xs font-black border-yellow-800 bg-white">短期大额贷 ¥5000 (利息 50%)</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-[320px] h-[640px] bg-slate-900 border-[8px] border-black rounded-[40px] flex flex-col overflow-hidden animate-up shadow-2xl">
        <div className="flex-1 m-2 bg-white rounded-[30px] flex flex-col overflow-hidden relative border-4 border-slate-800">
           <div className="h-6 bg-black text-white px-6 flex items-center justify-between text-[7px] font-black shrink-0">
              <div>移动网络 📶</div>
              <div className="font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
              <div>🔋 28%</div>
           </div>
           <div className="flex-1 flex flex-col overflow-hidden relative">
              {activeApp === 'HOME' && renderHome()}
              {activeApp === 'SOCIAL' && renderSocial()}
              {activeApp === 'SHOP' && renderShop()}
              {activeApp === 'LOAN' && renderLoan()}
              {activeApp === 'TG' && (
                <div className="flex-1 bg-slate-950 text-cyan-400 p-4 font-mono overflow-y-auto no-scrollbar">
                  <div className="mb-4 text-xs font-black border-b border-cyan-800 pb-2 flex justify-between">
                    <span>加密协议 // TG</span>
                    <span className="animate-pulse">● 已加密</span>
                  </div>
                  {GRAY_TASKS.map(task => (
                    <div key={task.id} className="mb-4 border border-cyan-900 p-3 bg-black/60 relative overflow-hidden group">
                      <div className="flex justify-between text-[10px] font-black mb-1">
                        <span>{task.name}</span>
                        <span className="text-emerald-500">¥{task.reward}</span>
                      </div>
                      <p className="text-[8px] text-cyan-200/60 mb-3 leading-relaxed">“{task.desc}”</p>
                      <button onClick={() => handleGrayTask(task)} className="w-full py-1.5 bg-cyan-950 border border-cyan-500 text-cyan-400 text-[9px] font-black hover:bg-cyan-500 hover:text-black transition-colors uppercase tracking-widest">接收指令</button>
                    </div>
                  ))}
                </div>
              )}
              {activeApp === 'YUEYUE' && (
                <div className="flex-1 bg-purple-50 p-4 overflow-y-auto">
                  <div className="mb-4 font-black italic text-purple-600 border-b border-purple-200 pb-2">约约 // 附近的人</div>
                  {YUEYUE_USERS.map(user => (
                    <div key={user.id} className="bg-white border-2 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(147,51,234,0.2)]">
                       <div className="flex justify-between text-xs font-black">
                         <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>{user.name}</span>
                         <span className="text-[8px] text-slate-400">{user.dist}</span>
                       </div>
                       <p className="text-[9px] text-slate-500 my-3 italic leading-snug">“{user.bio}”</p>
                       <button onClick={() => handleYueYue(user)} className="w-full py-1.5 bg-purple-600 text-white text-[9px] font-black active:scale-95 transition-transform uppercase">建立连接</button>
                    </div>
                  ))}
                </div>
              )}
              {activeApp === 'VIDEO' && (
                <div className="flex-1 bg-black text-white p-6 flex flex-col justify-center gap-8">
                  <div className="text-center border-4 border-white py-4 font-black italic text-2xl tracking-tighter">快见视频</div>
                  <div className="space-y-4">
                    <button onClick={() => { onUpdateStats({ mood: 10, stamina: -5 }); alert("沉浸在奶头乐中，你获得了短暂的宁静。精神 +10"); }} className="w-full py-6 border-4 border-white font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black">刷短视频</button>
                    <button onClick={() => { 
                      if(gameState.stats.stamina < 30) { alert("你太虚弱了，直播间观众说你看上去像个死人。"); return; }
                      onUpdateStats({ money: 200, stamina: -30, sin: 5, mood: -10 }); 
                      alert("直播结束。你出卖了廉价的尊严换回 ¥200。");
                    }} className="w-full py-6 border-4 border-red-600 text-red-600 font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white">边缘直播</button>
                  </div>
                </div>
              )}
           </div>
           <div className="h-14 border-t-4 border-black bg-white flex items-center justify-around shrink-0 z-50">
              <button onClick={() => setActiveApp('HOME')} className={`text-xl ${activeApp === 'HOME' ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`}>🏠</button>
              <button onClick={() => setActiveApp('SOCIAL')} className={`text-xl ${activeApp === 'SOCIAL' ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`}>✉</button>
              <button onClick={() => setActiveApp('SHOP')} className={`text-xl ${activeApp === 'SHOP' ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`}>🛒</button>
           </div>
        </div>
        <div className="h-10 flex items-center justify-center" onClick={onClose}><div className="w-8 h-8 rounded-full border-2 border-slate-700 active:bg-slate-800 transition-colors"></div></div>
      </div>
    </div>
  );
};

export default PhoneSystem;
