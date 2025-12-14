
import React, { useState, useEffect, useRef } from 'react';
import { GameState, Attributes, AIRootResponse, Stats, AvatarConfig, LocationInfo, Choice } from './types';
import { INITIAL_GAME_STATE, TIME_ORDER, LOCATIONS, TIME_LABELS, LOCATION_INTERACTIONS, DAYS_OF_WEEK, FAINT_EVENTS, RANDOM_EVENTS } from './constants';
import { getLocalStatusSummary } from './logic/statusSystem';
import CharacterCreation from './components/CharacterCreation';
import StatusBar from './components/StatusBar';
import GameMenu from './components/GameMenu';
import MiniMap from './components/MiniMap';
import PhoneSystem from './components/PhoneSystem';
import ArtisticAvatar from './components/ArtisticAvatar';

type Screen = 'TITLE' | 'CREATION' | 'PROLOGUE' | 'EXPLORE' | 'RESULT' | 'ENDING';

interface ChoiceResult {
  text: string;
  impact: string;
  changes: Partial<Stats>;
  newArea?: 'MINING_TOWN' | 'PROVINCIAL_CAPITAL';
  specialAction?: string;
}

const STAT_LABELS: Record<keyof Stats, string> = {
  satiety: '饱腹', hygiene: '整洁', mood: '精神', money: '现金', debt: '债务',
  academic: '学业', corruption: '心计', sin: '罪恶', stamina: '体力', resilience: '韧性',
  savviness: '心眼', intelligence: '智力', appearance: '魅力', totalDebt: '总债', motherHealth: '母亲'
};

const STAT_COLORS: Record<string, string> = {
  money: 'text-blue-700',
  intelligence: 'text-cyan-700',
  appearance: 'text-rose-600',
  stamina: 'text-emerald-700',
  resilience: 'text-amber-600',
  savviness: 'text-zinc-900',
  satiety: 'text-orange-600',
  mood: 'text-indigo-600',
  hygiene: 'text-sky-500',
  academic: 'text-teal-700',
  motherHealth: 'text-rose-800',
  debt: 'text-red-700',
  sin: 'text-red-900',
  corruption: 'text-indigo-800'
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('TITLE');
  const [prologueStep, setPrologueStep] = useState(0);
  const [prologueChoice, setPrologueChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentEvent, setCurrentEvent] = useState<AIRootResponse | null>(null);
  const [resultData, setResultData] = useState<ChoiceResult | null>(null);
  const [statusDescription, setStatusDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [finalEnding, setFinalEnding] = useState<{ id: string, title: string, content: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameState) setStatusDescription(getLocalStatusSummary(gameState));
  }, [gameState]);

  const handleStartGame = (attr: Attributes, avatar: AvatarConfig) => {
    const newState: GameState = { 
      ...INITIAL_GAME_STATE, 
      attributes: attr, 
      avatar: avatar,
      stats: {
        ...INITIAL_GAME_STATE.stats,
        intelligence: attr.intelligence,
        appearance: attr.appearance,
        stamina: attr.stamina,
        resilience: attr.resilience,
        savviness: attr.savviness
      }
    };
    setGameState(newState);
    setScreen('PROLOGUE');
    setPrologueStep(0);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handlePrologueChoice = (choice: 'A' | 'B' | 'C') => {
    setPrologueChoice(choice);
    setPrologueStep(3);
  };

  const finishPrologue = () => {
    if (!gameState || !prologueChoice) return;
    let changes: Partial<Stats> = {};
    if (prologueChoice === 'A') changes = { mood: -10, resilience: 5 };
    else if (prologueChoice === 'B') changes = { mood: -20, money: 200 };
    else if (prologueChoice === 'C') changes = { stamina: -30, sin: 10 };

    const ns = { ...gameState.stats };
    Object.entries(changes).forEach(([k, v]) => {
      const key = k as keyof Stats;
      ns[key] = Math.max(0, ns[key] + (v as number));
    });
    setGameState({ ...gameState, stats: ns });
    setScreen('EXPLORE');
  };

  const handleExplore = async (loc: LocationInfo) => {
    if (!gameState || loading) return;
    setLoading(true);
    let finalEvent = LOCATION_INTERACTIONS[loc.id]?.[gameState.timeOfDay] || 
                     LOCATION_INTERACTIONS[loc.id]?.['ANY'] || 
                     Object.values(LOCATION_INTERACTIONS[loc.id] || {})[0];

    if (!finalEvent) {
      finalEvent = { title: loc.name, description: loc.description, is_final: true, choices: [] };
    }

    setTimeout(() => {
      setGameState(prev => prev ? ({ ...prev, location: loc.name }) : null);
      setCurrentEvent(finalEvent);
      setLoading(false);
    }, 600);
  };

  const checkRequirements = (choice: Choice): boolean => {
    if (!gameState || !choice.requirements) return true;
    return !Object.entries(choice.requirements).some(([k, v]) => gameState.stats[k as keyof Stats] < (v as number));
  };

  const handleChoice = (choiceIndex: number) => {
    if (!gameState || !currentEvent) return;
    if (choiceIndex === -1) { setCurrentEvent(null); return; }
    const choice = currentEvent.choices[choiceIndex];
    if (!choice || !checkRequirements(choice)) return;

    setResultData({
      text: choice.text,
      impact: choice.impact_description,
      changes: choice.stat_changes,
      newArea: choice.new_area,
      specialAction: choice.special_action
    });
    setScreen('RESULT');
  };

  const finalizeStats = (changes: Partial<Stats>, newArea?: 'MINING_TOWN' | 'PROVINCIAL_CAPITAL', specialAction?: string) => {
    if (!gameState) return;
    const newStats: Stats = { ...gameState.stats };
    const newFlags = { ...gameState.statusFlags };
    
    Object.entries(changes).forEach(([key, val]) => {
      const k = key as keyof Stats;
      newStats[k] = Math.max(0, (newStats[k] || 0) + (val as number));
    });

    newStats.satiety = Math.max(0, newStats.satiety - 5); 
    newStats.mood = Math.max(0, newStats.mood - 3);
    if (!newFlags.isMotherDead) newStats.motherHealth = Math.max(0, newStats.motherHealth - 1);

    const currentTimeIdx = TIME_ORDER.indexOf(gameState.timeOfDay);
    let nextTimeIdx = (currentTimeIdx + 1) % TIME_ORDER.length;
    let nextDay = gameState.day;
    
    if (nextTimeIdx === 0) {
      nextDay++;
      newStats.debt = Math.floor(newStats.debt * 1.08); 
    }

    if (nextDay > 30) {
      setScreen('ENDING'); // Ending calculation logic omitted for brevity in minimal update
      return;
    }

    const newState: GameState = {
      ...gameState,
      day: nextDay,
      timeOfDay: TIME_ORDER[nextTimeIdx],
      stats: newStats,
      statusFlags: newFlags,
      currentArea: newArea || gameState.currentArea,
      location: newArea ? (newArea === 'PROVINCIAL_CAPITAL' ? '站前广场' : '霉味的家') : gameState.location,
      history: [...gameState.history, `[第 ${gameState.day} 天] ${resultData?.text}`].slice(-30),
    };
    
    setGameState(newState);
    setScreen('EXPLORE');
    setCurrentEvent(null);
    setResultData(null);
  };

  if (screen === 'TITLE') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white grain-overlay">
        <div className="mb-12 animate-up z-20">
          <div className="inline-block bg-red-700 text-white px-3 py-1 text-[9px] font-black mb-6 uppercase tracking-[0.2em]">2014 // 黑岭伤痕</div>
          <h1 className="text-6xl sm:text-8xl font-black text-black tracking-tighter mb-4 border-b-[10px] border-black inline-block px-4 py-2 italic leading-none">边缘生活</h1>
          <p className="text-[11px] text-slate-400 font-black tracking-[0.5em] mt-6 italic uppercase">逃离，或被吞噬。</p>
        </div>
        <button onClick={() => setScreen('CREATION')} className="btn-flat-filled w-full max-w-xs py-5 text-xl tracking-[0.5em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">开启人生</button>
      </div>
    );
  }

  if (screen === 'CREATION') return <CharacterCreation onComplete={handleStartGame} onBack={() => setScreen('TITLE')} />;

  if (screen === 'PROLOGUE') {
    return (
      <div className={`fixed inset-0 bg-black z-[500] flex flex-col p-6 transition-transform duration-75 overflow-y-auto no-scrollbar ${isShaking ? 'translate-x-1 translate-y-1' : ''}`}>
        {prologueStep === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto py-10">
             <div className="space-y-6 font-serif italic text-white/90 text-lg leading-relaxed animate-up">
                <p className="animate-[fadeInSafe_2s_forwards]">黑岭镇的风，听起来总是像有人在哭。</p>
                <p className="animate-[fadeInSafe_2s_forwards_1.5s] opacity-0">这里只有两种颜色：雪的白，和煤渣的黑。</p>
                <p className="animate-[fadeInSafe_2s_forwards_3s] opacity-0">今天是4月7日。距离高考还有30天。</p>
                <p className="animate-[fadeInSafe_2s_forwards_4.5s] opacity-0">距离我还清那笔“买命钱”，还有...</p>
             </div>
             <button onClick={() => { triggerShake(); setPrologueStep(1); }} className="mt-12 text-white/30 text-xs tracking-[1em] animate-pulse uppercase">（音效：砰！砰！砰！）</button>
          </div>
        )}

        {prologueStep === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-up py-10">
             <div className="bg-white/5 border-4 border-white/20 p-8 text-center backdrop-blur-sm relative w-full">
                <p className="text-white font-serif italic text-xl leading-relaxed">...还有0秒。</p>
             </div>
             <div className="w-full bg-white p-6 border-[6px] border-black shadow-[10px_10px_0px_0px_rgba(255,0,0,0.3)]">
                <p className="text-black font-black italic text-sm mb-2 opacity-60">【序章：碎裂的清晨】</p>
                <p className="text-white bg-black px-2 py-1 inline-block text-[10px] font-black italic mb-4">CG：第一人称视角。眼前是破旧的防盗门...</p>
                <p className="text-black font-black italic mb-2">门外男人的吼声：</p>
                <p className="text-2xl font-black italic tracking-tighter leading-tight">“元一！开门！别装死！我知道你在家！再不开门，老子把你家这破防盗网给拆了！”</p>
             </div>
             <button onClick={() => setPrologueStep(2)} className="btn-flat-filled w-full max-w-xs py-4 text-xl tracking-widest bg-red-700">起身开门</button>
          </div>
        )}

        {prologueStep === 2 && (
          <div className="flex-1 flex flex-col animate-up py-10 max-w-xl mx-auto w-full">
             <div className="bg-white p-8 border-b-[12px] border-red-800 relative mb-8">
                <span className="absolute -top-5 left-6 bg-black text-white px-4 py-1 text-sm font-black italic tracking-widest uppercase">刀哥</span>
                <p className="text-xl font-black leading-snug italic mb-6">
                  “哟，高材生，起得挺早啊。复习呢？你爸跑了整整三个月，连个屁都没放。你知道道上的规矩。父债子偿。”
                </p>
                <p className="text-lg font-black leading-snug text-red-700 italic border-l-4 border-red-700 pl-4">
                  “利滚利，到现在是34万。我也不是不讲理的人。30天，我要见到3万块的利息。见不到钱，我就把你妈那一身的管子拔了，再把你卖到南边的洗头房去。”
                </p>
                <div className="mt-6 border-t border-black/10 pt-4">
                  <p className="text-[10px] font-black opacity-40 leading-tight">里屋传来母亲剧烈的咳嗽声，撕心裂肺。</p>
                </div>
             </div>
             
             <div className="space-y-4 pb-20">
                <div className="text-white text-[10px] font-black tracking-widest mb-2 opacity-50 uppercase">面对威胁，你的本能反应是？</div>
                <button onClick={() => handlePrologueChoice('A')} className="w-full group flex flex-col items-start p-4 bg-black border-2 border-white/30 hover:border-white transition-all text-left">
                  <span className="text-emerald-500 text-xs font-black italic mb-1">🟢 选项 A：【沉默隐忍】</span>
                  <span className="text-white/80 text-sm font-bold group-hover:text-white">低头，咬牙，不让眼泪掉下来。（韧性+5, 精神-10）</span>
                </button>
                <button onClick={() => handlePrologueChoice('B')} className="w-full group flex flex-col items-start p-4 bg-black border-2 border-white/30 hover:border-white transition-all text-left">
                  <span className="text-yellow-500 text-xs font-black italic mb-1">🟡 选项 B：【试图求情】</span>
                  <span className="text-white/80 text-sm font-bold group-hover:text-white">抓住刀哥的袖子，卑微乞求。（现金+200, 精神-20）</span>
                </button>
                <button onClick={() => handlePrologueChoice('C')} className="w-full group flex flex-col items-start p-4 bg-black border-2 border-white/30 hover:border-white transition-all text-left">
                  <span className="text-red-500 text-xs font-black italic mb-1">🔴 选项 C：【冷眼对视】</span>
                  <span className="text-white/80 text-sm font-bold group-hover:text-white">死死盯着他的眼睛，进行谈判。（恶名+10, 体力-30）</span>
                </button>
             </div>
          </div>
        )}

        {prologueStep === 3 && (
          <div className="flex-1 flex flex-col animate-up py-10 max-w-xl mx-auto w-full">
             <div className="bg-white p-8 border-b-[12px] border-black mb-8 italic font-serif">
                {prologueChoice === 'A' && (
                  <>
                    <p className="mb-4">（元一死死咬住嘴唇，直到尝到了铁锈般的血腥味。不看他，也不看母亲。）</p>
                    <p className="font-black text-xl mb-4">刀哥：“啧，真没劲。跟你那个废物爹一样，三棍子打不出一个屁。”</p>
                    <p>他站起身，把那本复习资料扔在脏水里，用皮鞋碾了碾。离开时扔下一句话：“记住了，30天。”</p>
                  </>
                )}
                {prologueChoice === 'B' && (
                  <>
                    <p className="mb-4">（元一猛地向前一步，死死抓住了刀哥那件貂皮夹克的袖口。）</p>
                    <p className="mb-4">元一：“刀哥……求你了。再给我点时间。别动我妈……求求你。”</p>
                    <p className="font-black text-xl mb-4">刀哥：“松手。脏。”</p>
                    <p>他抽出两张钞票，飘落在脏水里：“拿去买点肉吃，吃饱了才有力气卖。”</p>
                  </>
                )}
                {prologueChoice === 'C' && (
                  <>
                    <p className="mb-4">（元一抬起头。眼神里没有泪水，只有一种令人心惊的死寂。）</p>
                    <p className="mb-4">元一：“我是你唯一的资产，刀哥。杀了我，你一分钱也拿不到。”</p>
                    <p className="text-red-600 font-black italic">（音效：清脆的打击声。眼前瞬间变红。）</p>
                    <p className="font-black text-xl mb-4">刀哥：“有点骨气。既然是资产，那就给我保值点。”</p>
                  </>
                )}
             </div>

             <div className="space-y-6">
                <div className="bg-slate-900 border-2 border-white/20 p-6">
                   <p className="text-white/60 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">【序章：尾声】</p>
                   <p className="text-white italic leading-relaxed mb-6 font-serif">
                     刀哥带着人离开了。屋子里重新安静下来。我捡起地上的书，擦了擦。擦不干净了。就像我的人生一样。
                   </p>
                   
                   <div className="space-y-2">
                     <div className="bg-red-950 border border-red-500 p-3 flex items-center gap-3 animate-pulse">
                        <span className="text-xl">💰</span>
                        <div>
                          <div className="text-red-500 text-[8px] font-black">小借贷 App 通知</div>
                          <div className="text-white text-[10px] font-bold">当前欠款 ¥341,200</div>
                        </div>
                     </div>
                     <div className="bg-blue-950 border border-blue-500 p-3 flex items-center gap-3">
                        <span className="text-xl">📅</span>
                        <div>
                          <div className="text-blue-500 text-[8px] font-black">日历 App 提醒</div>
                          <div className="text-white text-[10px] font-bold">距离高考还有 30 天</div>
                        </div>
                     </div>
                   </div>
                </div>

                <div className="bg-white p-6 border-4 border-black font-black italic">
                   “{prologueChoice === 'C' ? '这口血，我会咽下去。然后，加倍还给这个世界。' : '我要活下去。不管是用手，还是用身体……只要能活过这30天。'}”
                </div>

                <button onClick={finishPrologue} className="btn-flat-filled w-full py-5 text-2xl tracking-[1em] bg-black">开始生存</button>
             </div>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'ENDING' && finalEnding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-black text-white text-center grain-overlay">
         <div className="mb-8 border-4 border-white p-4 inline-block">
            <h1 className="text-4xl font-black italic mb-2 tracking-tighter">生存记录结算</h1>
            <p className="text-[10px] font-mono opacity-50">2014 完结 // 档案封存</p>
         </div>
         <h2 className="text-3xl font-black text-red-600 mb-6 italic">{finalEnding.title}</h2>
         <p className="text-lg font-serif leading-relaxed mb-12 max-w-lg italic font-black">“{finalEnding.content}”</p>
         <button onClick={() => window.location.reload()} className="px-10 py-4 border-4 border-white text-white font-black hover:bg-white hover:text-black transition-all">重新轮回</button>
      </div>
    );
  }

  if (!gameState) return null;

  return (
    <div className="flex flex-col h-screen relative bg-white overflow-hidden font-sans">
      <StatusBar gameState={gameState} onMenuOpen={() => setIsMenuOpen(true)} onPhoneOpen={() => setIsPhoneOpen(true)} />
      <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} gameState={gameState} onLoad={s => setGameState(s)} onRestart={() => window.location.reload()} />
      {isPhoneOpen && <PhoneSystem gameState={gameState} onClose={() => setIsPhoneOpen(false)} onUpdateStats={ch => {
          const ns = {...gameState.stats};
          Object.entries(ch).forEach(([k,v]) => {
            const key = k as keyof Stats;
            ns[key] = Math.max(0, ns[key] + (v as number));
          });
          setGameState({...gameState, stats: ns});
      }} onMarkMessageRead={() => {}} />}
      
      <main className="flex-1 mt-[142px] overflow-hidden flex flex-col">
        {screen === 'EXPLORE' && !currentEvent && (
          <div className="animate-up flex-1 flex flex-col overflow-y-auto no-scrollbar">
            <MiniMap currentLocation={gameState.location} onSelect={handleExplore} isTrapped={gameState.isTrapped} day={gameState.day} currentArea={gameState.currentArea} />
            <div className="flex-1 flex flex-col items-center justify-center px-10 text-center py-12">
              <p className="text-black font-serif italic text-base leading-snug font-black opacity-80">{statusDescription}</p>
            </div>
          </div>
        )}
        
        {screen === 'RESULT' && resultData && (
          <div className="flex-1 overflow-y-auto px-5 pt-6 pb-12 animate-up bg-slate-50">
            <h2 className="text-2xl font-black italic border-l-[8px] border-black pl-4 mb-6">{resultData.text}</h2>
            <div className="p-6 bg-white border-2 border-black mb-10 shadow-sm font-serif font-black italic">“{resultData.impact}”</div>
            <div className="grid grid-cols-2 gap-3 mb-12">
              {Object.entries(resultData.changes).map(([stat, val]) => (val as number) !== 0 && (
                <div key={stat} className="flex justify-between p-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className={`text-[10px] font-black opacity-60 uppercase ${STAT_COLORS[stat] || 'text-slate-500'}`}>{STAT_LABELS[stat as keyof Stats]}</span>
                  <span className={`text-sm font-black ${(val as number) > 0 ? 'text-blue-700' : 'text-red-700'}`}>{(val as number) > 0 ? '+' : ''}{val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => finalizeStats(resultData.changes, resultData.newArea, resultData.specialAction)} className="btn-flat-filled w-full py-5 text-xl tracking-[0.8em] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">继续挣扎</button>
          </div>
        )}

        {screen === 'EXPLORE' && currentEvent && (
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24" ref={scrollRef}>
             <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-black border-l-[10px] border-red-800 pl-4 py-0.5 italic leading-tight">{currentEvent.title}</h2>
             </div>
             <p className="text-lg font-serif font-black leading-snug mb-10">{currentEvent.description}</p>
             <div className="space-y-3">
                {currentEvent.choices.map((c, i) => {
                  const isAvailable = checkRequirements(c);
                  return (
                    <button 
                      key={i} 
                      onClick={() => handleChoice(i)} 
                      disabled={!isAvailable}
                      className={`btn-flat w-full text-left p-4 flex flex-col border-[3px] transition-all ${isAvailable ? 'hover:bg-slate-50 border-black' : 'opacity-40 grayscale border-slate-300 cursor-not-allowed bg-slate-100'}`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] font-black opacity-30 tracking-widest leading-none">抉择 {i+1}</span>
                        {!isAvailable && <span className="text-[8px] font-black bg-black text-white px-1 py-0.5 leading-none">条件不足</span>}
                      </div>
                      <span className="text-sm font-black mt-1 leading-tight">{c.text}</span>
                    </button>
                  );
                })}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
