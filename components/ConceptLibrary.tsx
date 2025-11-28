import React, { useState } from 'react';
import { CONCEPTS } from '../constants';
import { Concept, ConceptCategory, ConceptLevel } from '../types';
import { BookOpen, Zap, Brain, Users, ArrowLeft, PlayCircle, Layers, Star, TrendingUp, Award } from 'lucide-react';

const ConceptLibrary: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<ConceptLevel | 'ALL'>('ALL');
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);

  const filteredConcepts = selectedLevel === 'ALL' 
    ? CONCEPTS 
    : CONCEPTS.filter(c => c.level === selectedLevel);

  const getCategoryIcon = (cat: ConceptCategory) => {
    switch (cat) {
      case ConceptCategory.INNER_GAME: return <Brain className="w-5 h-5" />;
      case ConceptCategory.OUTER_GAME: return <Zap className="w-5 h-5" />;
      case ConceptCategory.SOCIAL_INTELLIGENCE: return <Users className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getLevelIcon = (level: ConceptLevel) => {
      switch(level) {
          case ConceptLevel.BEGINNER: return <Star className="w-5 h-5" />;
          case ConceptLevel.INTERMEDIATE: return <TrendingUp className="w-5 h-5" />;
          case ConceptLevel.ADVANCED: return <Award className="w-5 h-5" />;
          default: return <Layers className="w-5 h-5" />;
      }
  }
  
  const getLevelColor = (level: ConceptLevel) => {
      switch(level) {
          case ConceptLevel.BEGINNER: return 'text-green-400 bg-green-400/10 border-green-400/20';
          case ConceptLevel.INTERMEDIATE: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
          case ConceptLevel.ADVANCED: return 'text-red-400 bg-red-400/10 border-red-400/20';
          default: return 'text-slate-400';
      }
  }

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-6 overflow-hidden bg-slate-900 text-white">
      {/* Sidebar / Filter */}
      <div className="md:w-1/4 flex flex-col gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">מסלול התפתחות</h2>
            <p className="text-slate-400 text-sm mt-2">בחר את הרמה שלך כדי להתמקד במושגים הרלוונטיים.</p>
        </div>
        
        <div className="flex flex-col gap-3 mt-4">
            <button 
                onClick={() => setSelectedLevel('ALL')}
                className={`p-4 text-lg rounded-xl text-right transition-all font-bold flex items-center gap-3 ${selectedLevel === 'ALL' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'}`}
            >
                <Layers className="w-6 h-6" />
                כל המושגים
            </button>
            
            {/* Beginner */}
            <button 
                onClick={() => setSelectedLevel(ConceptLevel.BEGINNER)}
                className={`p-4 text-lg rounded-xl text-right flex items-center gap-3 transition-all font-bold ${selectedLevel === ConceptLevel.BEGINNER ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'bg-slate-800 text-green-400 hover:bg-slate-750'}`}
            >
                <Star className="w-6 h-6" />
                {ConceptLevel.BEGINNER}
            </button>

            {/* Intermediate */}
            <button 
                onClick={() => setSelectedLevel(ConceptLevel.INTERMEDIATE)}
                className={`p-4 text-lg rounded-xl text-right flex items-center gap-3 transition-all font-bold ${selectedLevel === ConceptLevel.INTERMEDIATE ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/20' : 'bg-slate-800 text-yellow-400 hover:bg-slate-750'}`}
            >
                <TrendingUp className="w-6 h-6" />
                {ConceptLevel.INTERMEDIATE}
            </button>

            {/* Advanced */}
            <button 
                onClick={() => setSelectedLevel(ConceptLevel.ADVANCED)}
                className={`p-4 text-lg rounded-xl text-right flex items-center gap-3 transition-all font-bold ${selectedLevel === ConceptLevel.ADVANCED ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-red-400 hover:bg-slate-750'}`}
            >
                <Award className="w-6 h-6" />
                {ConceptLevel.ADVANCED}
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="md:w-3/4 overflow-y-auto pl-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConcepts.map(concept => (
            <div 
                key={concept.id}
                onClick={() => setActiveConcept(concept)}
                className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-xl hover:shadow-indigo-500/10 group relative overflow-hidden"
            >
                {/* Level Badge */}
                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-bold text-xs tracking-wider border-b border-l flex items-center gap-2 ${getLevelColor(concept.level)}`}>
                    {getLevelIcon(concept.level)}
                    {concept.level}
                </div>

                <div className="mt-8 mb-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        {getCategoryIcon(concept.category)}
                        {concept.category}
                    </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors">{concept.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{concept.description}</p>
                
                <div className="mt-6 flex items-center justify-between">
                    {concept.videoId ? (
                        <div className="flex items-center gap-2 text-indigo-400 text-base font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">
                            <PlayCircle size={18} />
                            וידאו זמין
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <ArrowLeft className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors transform group-hover:-translate-x-1" />
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      {activeConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-slate-800 rounded-3xl max-w-3xl w-full p-10 border border-slate-700 shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={() => setActiveConcept(null)}
                    className="absolute top-6 left-6 p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                
                <div className="mb-8 mt-4">
                    <div className="flex gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${getLevelColor(activeConcept.level)}`}>
                            {activeConcept.level}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg flex items-center gap-2">
                            {getCategoryIcon(activeConcept.category)}
                            {activeConcept.category}
                        </span>
                    </div>
                    <h2 className="text-4xl font-black text-white mt-4">{activeConcept.title}</h2>
                </div>
                
                {/* Video Player */}
                {activeConcept.videoId && (
                  <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 aspect-video ring-4 ring-slate-800">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${activeConcept.videoId}`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div className="prose prose-invert prose-xl max-w-none text-slate-200">
                    <p className="leading-8">{activeConcept.details}</p>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-700 flex justify-end">
                    <button 
                        onClick={() => setActiveConcept(null)}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold text-lg transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        סגור
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ConceptLibrary;