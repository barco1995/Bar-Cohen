import React, { useState } from 'react';
import { AppView } from './types';
import ConceptLibrary from './components/ConceptLibrary';
import AICoach from './components/AICoach';
import ScenarioSimulator from './components/ScenarioSimulator';
import Community from './components/Community';
import { LayoutDashboard, Book, MessageCircle, PlayCircle, Menu, X, Users } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return (
            <div className="h-full overflow-y-auto p-4 md:p-8 text-white scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="max-w-6xl mx-auto pb-24">
                    <header className="mb-10 text-center mt-4 md:mt-8">
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-purple-500 mb-6 drop-shadow-sm">
                            מאסטרי בדינמיקה חברתית
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                            לשלוט באומנות החיבור הבין-אישי. מיסודות המשחק הפנימי ועד כיול חברתי מתקדם.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                        <div 
                            onClick={() => setCurrentView(AppView.CONCEPTS)}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-3xl p-8 md:p-10 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
                        >
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-indigo-500 group-hover:text-white text-indigo-400 transition-colors">
                                <Book size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">התיאוריה</h3>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">חקור את מושגי הליבה: משחק פנימי, סטייט, כיול ולוגיסטיקה.</p>
                        </div>

                        <div 
                            onClick={() => setCurrentView(AppView.COACH)}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-3xl p-8 md:p-10 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                        >
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-purple-500 group-hover:text-white text-purple-400 transition-colors">
                                <MessageCircle size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">מאמן אישי (AI)</h3>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">קבל עצות ספציפיות בזמן אמת ממאמן מומחה לדינמיקה חברתית.</p>
                        </div>

                        <div 
                            onClick={() => setCurrentView(AppView.SIMULATOR)}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-pink-500 rounded-3xl p-8 md:p-10 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20"
                        >
                            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-pink-500 group-hover:text-white text-pink-400 transition-colors">
                                <PlayCircle size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">סימולטור שטח</h3>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">תרגל את כישורי הפתיחה והשיחה שלך במשחקי תפקידים מבוססי AI.</p>
                        </div>

                        <div 
                            onClick={() => setCurrentView(AppView.COMMUNITY)}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-orange-500 rounded-3xl p-8 md:p-10 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
                        >
                            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-orange-500 group-hover:text-white text-orange-400 transition-colors">
                                <Users size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">הקהילה (Wingman)</h3>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">מצא שותפים ליציאה באזור שלך ושתף דוחות מהשטח.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
      case AppView.CONCEPTS:
        return <ConceptLibrary />;
      case AppView.COACH:
        return <AICoach />;
      case AppView.SIMULATOR:
        return <ScenarioSimulator />;
      case AppView.COMMUNITY:
        return <Community />;
      default:
        return <div>Not found</div>;
    }
  };

  const NavItem = ({ view, icon, label }: { view: AppView; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all w-full text-right ${
        currentView === view 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-bold text-lg">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-l border-slate-800 p-8 z-20">
        <div className="flex items-center gap-4 mb-12 px-2 cursor-pointer" onClick={() => setCurrentView(AppView.DASHBOARD)}>
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-black text-white text-xl">S</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">SD Mastery</span>
        </div>
        
        <nav className="flex-1 space-y-3">
            <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={24} />} label="לוח בקרה" />
            <NavItem view={AppView.CONCEPTS} icon={<Book size={24} />} label="מושגים" />
            <NavItem view={AppView.COACH} icon={<MessageCircle size={24} />} label="מאמן AI" />
            <NavItem view={AppView.SIMULATOR} icon={<PlayCircle size={24} />} label="סימולטור" />
            <NavItem view={AppView.COMMUNITY} icon={<Users size={24} />} label="הקהילה" />
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-800 text-sm text-slate-500 px-2 font-medium">
            <p>© 2024 Social Dynamics</p>
            <p className="mt-1 opacity-70">v1.2.0 • React • Gemini</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <span className="font-black text-2xl text-white">SD Mastery</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900 z-40 pt-24 px-8 space-y-6">
            <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={28} />} label="לוח בקרה" />
            <NavItem view={AppView.CONCEPTS} icon={<Book size={28} />} label="מושגים" />
            <NavItem view={AppView.COACH} icon={<MessageCircle size={28} />} label="מאמן AI" />
            <NavItem view={AppView.SIMULATOR} icon={<PlayCircle size={28} />} label="סימולטור" />
            <NavItem view={AppView.COMMUNITY} icon={<Users size={28} />} label="הקהילה" />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden h-full relative pt-20 md:pt-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;