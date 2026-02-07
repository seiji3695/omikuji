import React from 'react';
import { FortuneData } from '../types';

interface FortuneDisplayProps {
  data: FortuneData;
}

const FortuneDisplay: React.FC<FortuneDisplayProps> = ({ data }) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 text-center border border-purple-200">
      <h2 className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-6 font-serif">
        🔮 本日の御神託 🔮
      </h2>
      <div className="space-y-6">
        <div className="border-b border-purple-300 pb-4">
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2 font-serif">
            ✨ 運勢 ✨
          </h3>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            {data.fortune}
          </p>
        </div>
        <div className="border-b border-purple-300 pb-4">
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2 font-serif">
            🍀 ラッキーアイテム 🍀
          </h3>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            {data.luckyItem}
          </p>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2 font-serif">
            🕊️ 一言アドバイス 🕊️
          </h3>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            {data.advice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FortuneDisplay;
