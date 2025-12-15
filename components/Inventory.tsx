
import React from 'react';
import { GameState, Product } from '../types';

interface Props {
  gameState: GameState;
  onClose: () => void;
}

const Inventory: React.FC<Props> = ({ gameState, onClose }) => {
  const products = gameState.phone.products || [];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-sm h-[500px] bg-white border-[10px] border-black flex flex-col overflow-hidden animate-up shadow-2xl">
        <header className="p-6 border-b-[6px] border-black bg-slate-50">
          <h2 className="text-3xl font-black italic tracking-tighter">随身背包</h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-1">
            物品总数: {products.length}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <span className="text-5xl mb-4">🎒</span>
              <p className="text-xs font-black italic font-serif">包里空空如也，正如你苍白的人生。</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="p-4 bg-slate-50 border-2 border-black flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black italic">{p.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-serif leading-tight mt-1">“{p.description}”</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="p-6 border-t-[6px] border-black bg-white">
          <button 
            onClick={onClose}
            className="btn-flat-filled w-full py-4 text-xl tracking-[0.5em]"
          >
            收起
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Inventory;
