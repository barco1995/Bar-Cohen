import React, { useState, useRef, useEffect } from 'react';
import { SCENARIOS } from '../constants';
import { SimulationScenario, ChatMessage } from '../types';
import { initializeSimulation, sendSimulationMessage } from '../services/geminiService';
import { Play, MessageSquare, RefreshCw, Loader2, Award, Mic, MicOff, Send, Volume2, VolumeX, StopCircle } from 'lucide-react';

const ScenarioSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true); // Default to true for immersion
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Ensure voices are loaded
    const loadVoices = () => {
        window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.cancel();
    };
  }, []);

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
    
    // Clean text for roleplay (remove actions in *asterisks*)
    const cleanText = text.replace(/\*[^*]+\*/g, '').replace(/[*_#`\-]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Voice selection logic
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === 'he-IL' && v.name.includes('Google'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang === 'he-IL');
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        utterance.lang = 'he-IL';
    }

    utterance.rate = 1.1; // Faster, less robotic
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

  const startScenario = async (scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    setLoading(true);
    setMessages([]); // Clear previous
    stopSpeaking();
    
    try {
        const initialText = await initializeSimulation(scenario.initialPrompt);
        setMessages([{
            id: 'init',
            role: 'model',
            text: initialText,
            timestamp: Date.now()
        }]);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: input,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    stopSpeaking(); // User interrupts

    try {
        const { reply } = await sendSimulationMessage(userMsg.text);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: reply,
            timestamp: Date.now()
        }]);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const reset = () => {
    stopSpeaking();
    setActiveScenario(null);
    setMessages([]);
  };

  if (!activeScenario) {
    return (
        <div className="h-full p-8 bg-slate-900 text-white overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-black mb-4">סימולטור שטח</h2>
                <p className="text-slate-300 text-xl mb-10 max-w-3xl">תרגל את הכיול החברתי שלך בסביבת משחקי תפקידים בטוחה. בלי לחץ, רק אימון.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {SCENARIOS.map(scenario => (
                        <div key={scenario.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-500/10 group">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide ${
                                    scenario.difficulty === 'מתחיל' ? 'bg-green-500/20 text-green-400' :
                                    scenario.difficulty === 'בינוני' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {scenario.difficulty}
                                </span>
                                <div className="p-3 bg-slate-700 rounded-full group-hover:bg-indigo-600 transition-colors text-white">
                                     <Award className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-white">{scenario.title}</h3>
                            <p className="text-slate-300 text-lg mb-8 flex-grow leading-relaxed">{scenario.description}</p>
                            <button 
                                onClick={() => startScenario(scenario)}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                <Play size={22} fill="currentColor" />
                                התחל סימולציה
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 relative">
        {/* Header */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-10 shadow-md">
            <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    {activeScenario.title}
                </h3>
                <p className="text-base text-slate-400 mt-1">הישאר בדמות. כייל את התגובות שלך.</p>
            </div>
            
            <div className="flex items-center gap-4">
                 {/* Auto-speak Toggle */}
                <button 
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
                        autoSpeak ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                >
                    {autoSpeak ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    <span className="hidden md:inline">{autoSpeak ? 'שמע פעיל' : 'שמע כבוי'}</span>
                </button>

                <button onClick={reset} className="text-base font-medium text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                    <RefreshCw size={18} /> סיום סשן
                </button>
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-sm font-medium text-slate-500 mb-2 px-1">
                        {msg.role === 'user' ? 'אתה' : 'מטרה'}
                    </span>
                    <div className={`max-w-[85%] md:max-w-[70%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-1 p-6 rounded-2xl text-xl shadow-lg border ${
                            msg.role === 'user' 
                            ? 'bg-slate-800 border-indigo-500/30 text-white rounded-tl-none' 
                            : 'bg-indigo-900/30 border-indigo-500/50 text-indigo-100 backdrop-blur-md rounded-tr-none'
                        }`}>
                            {msg.text}
                        </div>
                         {/* Speak Button for Model */}
                        {msg.role === 'model' && (
                             <button 
                                onClick={() => speakText(msg.text)}
                                className="self-end mb-2 text-slate-500 hover:text-indigo-400 transition-colors p-2 bg-slate-800/50 rounded-full"
                                title="השמע מחדש"
                            >
                                <Volume2 size={20} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
             {loading && (
                 <div className="flex items-start">
                    <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30 rounded-tr-none">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                    </div>
                 </div>
             )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-3 max-w-5xl mx-auto items-end">
                <div className="flex-1 relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="כתוב או דבר את התגובה שלך..."
                        disabled={loading}
                        className="w-full bg-slate-800 text-white text-lg border border-slate-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none min-h-[70px]"
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
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <Send size={24} className="rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ScenarioSimulator;