import React, { useState, useEffect } from 'react';
import { MapPin, Users, Send, MessageSquare, ThumbsUp, Plus, Filter, User, Crown, Star, Egg, Search, Compass, Sun, Moon } from 'lucide-react';
import { CommunityPost, PostType, UserRank, UserProgress } from '../types';
import { MOCK_COMMUNITY_POSTS, GAME_SPOTS, GENERIC_GAME_SPOTS } from '../constants';

const REGIONS: Record<string, string[]> = {
    'מרכז': ['תל אביב', 'רמת גן', 'גבעתיים', 'חולון', 'בת ים', 'פתח תקווה', 'בני ברק', 'קרית אונו'],
    'השרון': ['הרצליה', 'רמת השרון', 'רעננה', 'כפר סבא', 'הוד השרון', 'נתניה'],
    'שפלה': ['ראשון לציון', 'רחובות', 'נס ציונה', 'מודיעין', 'לוד', 'רמלה', 'יבנה', 'גדרה'],
    'ירושלים והסביבה': ['ירושלים', 'בית שמש', 'מבשרת ציון', 'מעלה אדומים'],
    'צפון': ['חיפה', 'קריות', 'חדרה', 'קיסריה', 'טבריה', 'עכו', 'נהריה', 'עפולה'],
    'דרום': ['באר שבע', 'אשדוד', 'אשקלון', 'אילת', 'שדרות', 'נתיבות', 'דימונה']
};

const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [filterLocation, setFilterLocation] = useState('כל הארץ');
  const [addressInput, setAddressInput] = useState('');
  
  // Post Creation State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<PostType>(PostType.WINGMAN_REQUEST);
  const [newPostLocation, setNewPostLocation] = useState('תל אביב');
  const [gameTime, setGameTime] = useState<'DAY' | 'NIGHT'>('NIGHT');
  const [selectedSpot, setSelectedSpot] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userRank, setUserRank] = useState<UserRank>(UserRank.NOVICE);

  useEffect(() => {
    // Load posts from local storage or use mock
    const savedPosts = localStorage.getItem('community_posts');
    if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
    } else {
        setPosts(MOCK_COMMUNITY_POSTS);
        localStorage.setItem('community_posts', JSON.stringify(MOCK_COMMUNITY_POSTS));
    }

    // Get user rank
    const savedProgress = localStorage.getItem('user_social_progress');
    if (savedProgress) {
        const progress: UserProgress = JSON.parse(savedProgress);
        setUserRank(progress.rank);
    }
  }, []);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;

    let fullLocationString = newPostLocation;
    if (selectedSpot) {
        fullLocationString = `${newPostLocation} (${selectedSpot})`;
    }

    const newPost: CommunityPost = {
        id: Date.now().toString(),
        author: 'אני', // In a real app this would be the user's name
        rank: userRank,
        type: newPostType,
        location: fullLocationString,
        content: newPostContent,
        timestamp: Date.now(),
        likes: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('community_posts', JSON.stringify(updatedPosts));
    
    // Reset form
    setNewPostContent('');
    setSelectedSpot('');
    setIsFormOpen(false);
  };

  // Address Matching Logic for Filter
  const handleAddressSearch = () => {
      if (!addressInput.trim()) return;

      // Flatten cities to find a match
      let foundCity = '';
      const allCities = Object.values(REGIONS).flat();
      
      // Check if any known city is inside the address string
      for (const city of allCities) {
          if (addressInput.includes(city) || city.includes(addressInput)) {
              foundCity = city;
              break;
          }
      }

      if (foundCity) {
          setFilterLocation(foundCity);
      }
  };

  const getFilteredPosts = () => {
      if (filterLocation === 'כל הארץ') return posts;

      const isRegion = Object.keys(REGIONS).includes(filterLocation);

      if (isRegion) {
          const citiesInRegion = REGIONS[filterLocation];
          return posts.filter(p => {
              return citiesInRegion.some(city => p.location.includes(city));
          });
      } else {
          return posts.filter(p => p.location.includes(filterLocation));
      }
  };

  const filteredPosts = getFilteredPosts();

  const getTypeStyle = (type: PostType) => {
      switch(type) {
          case PostType.WINGMAN_REQUEST: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
          case PostType.FIELD_REPORT: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
          default: return 'bg-slate-700 text-slate-300';
      }
  };

  const getRankIcon = (rank: UserRank) => {
      switch (rank) {
          case UserRank.MASTER: return <Crown size={14} className="text-yellow-400" />;
          case UserRank.PLAYER: return <Star size={14} className="text-blue-400" />;
          default: return <Egg size={14} className="text-slate-400" />;
      }
  };

  // Helper to get available spots based on city and time
  const getAvailableSpots = () => {
      const cityData = GAME_SPOTS[newPostLocation];
      if (cityData) {
          return gameTime === 'DAY' ? cityData.day : cityData.night;
      }
      return gameTime === 'DAY' ? GENERIC_GAME_SPOTS.day : GENERIC_GAME_SPOTS.night;
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 z-10 shadow-md">
            <div>
                <h2 className="text-3xl font-black flex items-center gap-3">
                    <Users className="text-indigo-500" />
                    הקהילה
                </h2>
                <p className="text-slate-400 text-sm mt-1">מצא שותף ליציאה (Wingman) או שתף דוחות מהשטח</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
                {/* Address Search */}
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 w-full md:w-64 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <Search size={18} className="text-slate-400 ml-2" />
                    <input 
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="חפש לפי כתובת או עיר..."
                        className="bg-transparent outline-none text-white text-sm w-full placeholder-slate-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddressSearch()}
                    />
                    <button onClick={handleAddressSearch} className="text-indigo-400 text-xs font-bold hover:text-indigo-300">
                        חפש
                    </button>
                </div>

                {/* Region Select */}
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 w-full md:w-auto min-w-[200px]">
                    <Compass size={18} className="text-slate-400 ml-2" />
                    <select 
                        value={filterLocation}
                        onChange={(e) => {
                            setFilterLocation(e.target.value);
                            setAddressInput(''); // Clear manual search when selecting dropdown
                        }}
                        className="bg-transparent text-white font-bold outline-none cursor-pointer w-full text-sm"
                    >
                        <option value="כל הארץ" className="bg-slate-800 text-white">🌍 כל הארץ</option>
                        {Object.entries(REGIONS).map(([region, cities]) => (
                            <optgroup key={region} label={region} className="bg-slate-800 text-slate-400 font-normal">
                                <option value={region} className="bg-slate-800 text-indigo-300 font-bold">📍 כל אזור {region}</option>
                                {cities.map(city => (
                                    <option key={city} value={city} className="bg-slate-800 text-white">{city}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Create Post Button (if closed) */}
                {!isFormOpen && (
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.01]"
                    >
                        <Plus size={24} />
                        פרסם פוסט חדש
                    </button>
                )}

                {/* Create Post Form */}
                {isFormOpen && (
                    <div className="bg-slate-800 border border-indigo-500/50 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-top-4 relative">
                        <h3 className="text-lg font-bold mb-4 text-indigo-300">יצירת פוסט חדש</h3>
                        
                        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                            <button 
                                onClick={() => setNewPostType(PostType.WINGMAN_REQUEST)}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold whitespace-nowrap transition-colors ${newPostType === PostType.WINGMAN_REQUEST ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                            >
                                🔥 חיפוש ווינגמן
                            </button>
                            <button 
                                onClick={() => setNewPostType(PostType.FIELD_REPORT)}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold whitespace-nowrap transition-colors ${newPostType === PostType.FIELD_REPORT ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                            >
                                📝 דו"ח שטח
                            </button>
                        </div>

                        {/* Location Selection */}
                        <div className="mb-4">
                            <label className="text-xs text-slate-400 mb-1 block">בחר עיר</label>
                            <select 
                                value={newPostLocation}
                                onChange={(e) => {
                                    setNewPostLocation(e.target.value);
                                    setSelectedSpot('');
                                }}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-3 text-sm outline-none mb-3"
                            >
                                {Object.entries(REGIONS).map(([region, cities]) => (
                                    <optgroup key={region} label={region}>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>

                            {/* Game Spot Selector */}
                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-wide flex items-center gap-2">
                                    <MapPin size={12} />
                                    איפה יוצאים ל-Game?
                                </label>
                                
                                {/* Time Toggle */}
                                <div className="flex gap-2 mb-4 bg-slate-800 p-1 rounded-lg w-max">
                                    <button 
                                        onClick={() => setGameTime('DAY')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${gameTime === 'DAY' ? 'bg-yellow-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <Sun size={16} />
                                        Daygame
                                    </button>
                                    <button 
                                        onClick={() => setGameTime('NIGHT')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${gameTime === 'NIGHT' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <Moon size={16} />
                                        Nightgame
                                    </button>
                                </div>

                                {/* Spots Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {getAvailableSpots().map((spot, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSpot(spot)}
                                            className={`text-xs p-2 rounded-lg border transition-all truncate text-right ${
                                                selectedSpot === spot 
                                                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-inner' 
                                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                                            }`}
                                        >
                                            {spot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <textarea 
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder={newPostType === PostType.WINGMAN_REQUEST ? "תאר את התוכנית שלך... איזה סוג של Game? איזה שעות?" : "ספר לנו מה קרה, מה למדת ואיך הגבת..."}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white resize-none h-32 focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
                        />

                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setIsFormOpen(false)}
                                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                ביטול
                            </button>
                            <button 
                                onClick={handlePostSubmit}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2"
                            >
                                <Send size={16} className="rotate-180" />
                                פרסם
                            </button>
                        </div>
                    </div>
                )}

                {/* Feed */}
                {filteredPosts.map(post => (
                    <div key={post.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-slate-300" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{post.author}</span>
                                        <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded text-xs text-slate-400 border border-slate-700">
                                            {getRankIcon(post.rank)}
                                            {post.rank}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                        <span>{new Date(post.timestamp).toLocaleDateString('he-IL')}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={10} />
                                            {post.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getTypeStyle(post.type)}`}>
                                {post.type}
                            </span>
                        </div>

                        <p className="text-slate-200 leading-relaxed whitespace-pre-line mb-6">
                            {post.content}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors group">
                                <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">{post.likes} לייקים</span>
                            </button>
                            
                            {post.type === PostType.WINGMAN_REQUEST ? (
                                <button className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-sm font-bold transition-colors">
                                    אני בעניין! ✋
                                </button>
                            ) : (
                                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <MessageSquare size={18} />
                                    <span className="text-sm font-medium">הגב</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-xl font-bold mb-2">לא נמצאו פוסטים באזור זה</p>
                        <p className="text-sm mb-6">נסה לחפש אזור אחר או היה הראשון לפרסם!</p>
                        <button onClick={() => setIsFormOpen(true)} className="text-indigo-400 hover:underline">
                            פתח פוסט חדש
                        </button>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};

export default Community;