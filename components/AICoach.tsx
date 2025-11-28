import React, { useState, useRef, useEffect } from 'react';
import { sendCoachMessage, initializeCoachChat } from '../services/geminiService';
import { ChatMessage, UserRank, UserProgress } from '../types';
import { COACH_SUGGESTIONS } from '../constants';
import { Send, User, Bot, Loader2, Mic, MicOff, Volume2, VolumeX, StopCircle, Sparkles, Trophy, Star, Crown, Egg } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Gamification State
  const [progress, setProgress] = useState<UserProgress>({ score: 0, rank: UserRank.NOVICE });
  const [pointsAnimation, setPointsAnimation] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load progress from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem('user_social_progress');
    if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to local storage
  useEffect(() => {
    localStorage.setItem('user_social_progress', JSON.stringify(progress));
  }, [progress]);

  // Determine Rank based on Score
  const calculateRank = (score: number): UserRank => {
      if (score >= 500) return UserRank.MASTER;
      if (score >= 100) return UserRank.PLAYER;
      return UserRank.NOVICE;
  };

  const updateScore = (pointsToAdd: number) => {
      const newScore = progress.score + pointsToAdd;
      const newRank = calculateRank(newScore);
      
      setProgress({ score: newScore, rank: newRank });
      setPointsAnimation(pointsToAdd);
      
      // Reset animation after 2 seconds
      setTimeout(() => setPointsAnimation(null), 2000);
  };

  // Initialize Speech Synthesis
  useEffect(() => {
    const loadVoices = () => {
        window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
        const initialMsg = {
            id: 'init',
            role: 'model' as const,
            text: "אהלן גבר! אני ה-Wingman הדיגיטלי שלך. בוא נדבר דוגרי - מה התקיעות הכי גדולה שלך כרגע עם נשים? פחד גישה? לא יודע מה להגיד? או שאתה סתם רוצה משימה להיום? דבר אלי.",
            timestamp: Date.now()
        };
        setMessages([initialMsg]);
        initializeCoachChat().catch(console.error);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-speak effect
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (autoSpeak && lastMsg && lastMsg.role === 'model' && messages.length > 0) {
        speakText(lastMsg.text);
    }
  }, [messages, autoSpeak]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); 
    
    const cleanText = text.replace(/[*_#`\-]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === 'he-IL' && v.name.includes('Google'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang === 'he-IL');
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        utterance.lang = 'he-IL';
    }

    utterance.rate = 1.1; 
    utterance.pitch = 1.0; 
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window)) {
      alert("הדפדפן שלך לא תומך בדיבור לטקסט. נסה להשתמש ב-Chrome.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? prev + ' ' + transcript : transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    stopSpeaking(); 

    try {
      const rawResponse = await sendCoachMessage(userMsg.text);
      
      // Parse for Points
      let displayText = rawResponse;
      const pointsMatch = rawResponse.match(/\[POINTS:\s*(\d+)\]/);
      
      if (pointsMatch) {
          const pointsEarned = parseInt(pointsMatch[1], 10);
          updateScore(pointsEarned);
          // Remove the tag from display
          displayText = rawResponse.replace(/\[POINTS:\s*(\d+)\]/, '').trim();
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: displayText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
      handleSend(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getRankIcon = () => {
      switch (progress.rank) {
          case UserRank.MASTER: return <Crown className="text-yellow-400 w-6 h-6 animate-pulse" />;
          case UserRank.PLAYER: return <Star className="text-blue-400 w-6 h-6" />;
          default: return <Egg className="text-slate-400 w-6 h-6" />;
      }
  };

  const getRankColor = () => {
      switch (progress.rank) {
          case UserRank.MASTER: return 'bg-gradient-to-r from-yellow-500 to-amber-600';
          case UserRank.PLAYER: return 'bg-indigo-600';
          default: return 'bg-slate-700';
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      
      {/* Header & Scoreboard */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 flex flex-col gap-3">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Bot className="text-indigo-500" />
                המאמן האישי
            </h2>
             {/* Auto-speak Toggle */}
            <button 
                onClick={() => setAutoSpeak(!autoSpeak)}
                className={`p-2 rounded-xl transition-all ${
                    autoSpeak ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
                title={autoSpeak ? 'הקראה פעילה' : 'הקראה כבויה'}
            >
                {autoSpeak ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>

        {/* Scoreboard Bar */}
        <div className="bg-slate-800 rounded-xl p-3 flex justify-between items-center shadow-lg relative overflow-hidden">
            {/* Points Animation Overlay */}
            {pointsAnimation && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 animate-in fade-in zoom-in duration-300">
                    <span className="text-4xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                        +{pointsAnimation} נק'
                    </span>
                </div>
            )}
            
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getRankColor()}`}>
                    {getRankIcon()}
                </div>
                <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">דרגה נוכחית</div>
                    <div className="text-white font-bold">{progress.rank}</div>
                </div>
            </div>

            <div className="text-right">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">ניקוד מצטבר</div>
                <div className="text-2xl font-black text-indigo-400 flex items-center justify-end gap-1">
                    {progress.score} 
                    <Trophy size={16} />
                </div>
            </div>
            
            {/* Progress Bar Background hint */}
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/20 w-full">
                <div 
                    className="h-full bg-indigo-500 transition-all duration-1000"
                    style={{ width: `${Math.min((progress.score % 500) / 5, 100)}%` }} // Simplified visual progress
                />
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] md:max-w-[75%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className={`p-6 rounded-2xl text-lg leading-relaxed shadow-md ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                    }`}>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    
                    {msg.role === 'model' && (
                        <button 
                            onClick={() => speakText(msg.text)}
                            className="self-start text-slate-500 hover:text-indigo-400 transition-colors p-1"
                            title="הקרא הודעה"
                        >
                            <Volume2 size={18} />
                        </button>
                    )}
                </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start w-full">
                <div className="flex gap-4 max-w-[80%]">
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <Bot size={20} />
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl rounded-tl-none border border-slate-700 flex items-center">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col gap-4">
        
        {/* Suggestion Chips */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {COACH_SUGGESTIONS.map((suggestion, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className="flex-shrink-0 bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/50 text-slate-300 border border-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                >
                    <Sparkles size={14} />
                    {suggestion}
                </button>
            ))}
        </div>

        <div className="relative flex items-end max-w-5xl mx-auto gap-3 w-full">
            <div className="relative flex-1">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="דיווחת על ביצוע? קבל ניקוד..."
                    className="w-full bg-slate-800 text-white text-lg rounded-2xl pl-4 pr-4 py-4 resize-none border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[80px]"
                />
            </div>
            
            <div className="flex flex-col gap-2">
                 {isSpeaking && (
                    <button
                        onClick={stopSpeaking}
                        className="p-4 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        title="עצור דיבור"
                    >
                        <StopCircle size={24} />
                    </button>
                 )}
            
                 <button
                    onClick={toggleListening}
                    className={`p-4 rounded-xl transition-all shadow-lg ${
                        isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                    title="לחץ כדי לדבר"
                 >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                 </button>

                <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="p-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Send size={24} className="rotate-180" /> 
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;