import React, { useState, useCallback } from 'react';
import { generateFortune } from './services/geminiService';
import { FortuneData, ErrorResponse } from './types';
import { DRAW_FORTUNE_PROMPT } from './constants';
import FortuneDisplay from './components/FortuneDisplay';

function App() {
  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFortune = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFortuneData(null); // Clear previous fortune
    try {
      const data = await generateFortune(DRAW_FORTUNE_PROMPT);
      setFortuneData(data);
    } catch (err: any) {
      console.error("Error drawing fortune:", err);
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(err.message as string);
      } else {
        setError("運勢を占う際に不明なエラーが発生しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this function is created once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-900 mb-8 sm:mb-10 text-center font-serif leading-tight">
        🔮 おみくじアプリ 🔮
      </h1>

      <div className="w-full flex justify-center mb-8">
        <button
          onClick={fetchFortune}
          disabled={loading}
          className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              占っています...
            </span>
          ) : (
            'おみくじを引く'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-8 w-full max-w-md text-center shadow-md">
          <p className="font-bold">エラー:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {fortuneData && <FortuneDisplay data={fortuneData} />}

      {!loading && !error && !fortuneData && (
        <div className="text-center text-gray-600 mt-12 text-lg md:text-xl">
          <p>ボタンを押して、今日の運勢を占ってみましょう！</p>
          <p className="mt-2 text-sm text-gray-500">
            （「おみくじを引く」と占い師が答えます）
          </p>
        </div>
      )}
    </div>
  );
}

export default App;