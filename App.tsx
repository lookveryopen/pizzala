
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Book, Package, Smartphone, Calendar, Award, 
  ExternalLink, Pizza, ArrowUpRight,
  FlaskConical, Gift, Gamepad2, Smile, Snowflake, Trees, TreePine,
  Youtube, Twitter, Palette, MessageCircle, X, Image as ImageIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import { WorkItem, MerchCategory, Sponsorship, EventProject } from './types';

// 自定義裝飾小圖示
const SushiIcon = () => <span className="text-xl animate-float" style={{ animationDelay: '0.5s' }}>🍣</span>;
const HamIcon = () => <span className="text-xl animate-float" style={{ animationDelay: '1.2s' }}>🥓</span>;
const PizzaSliceIcon = () => <span className="text-xl animate-float">🍕</span>;

const FloatingDecoration = ({ emoji, top, left, delay, opacity = "opacity-20" }: { emoji: string | React.ReactNode, top: string, left: string, delay: string, opacity?: string }) => (
  <div 
    className={`fixed animate-float pointer-events-none z-0 text-4xl ${opacity}`} 
    style={{ top, left, animationDelay: delay }}
  >
    {emoji}
  </div>
);

const SquidIcon = ({ color, delay, top }: { color: string, delay: string, top: string }) => (
  <div 
    className="absolute animate-swim pointer-events-none z-0" 
    style={{ top, animationDelay: delay, color }}
  >
    <div className="text-3xl filter blur-[1px] opacity-20">🦑</div>
  </div>
);

// 惡魔角披薩 Logo
const DevilPizzaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 6.5L4.5 2L9.5 4.5L7 6.5Z" fill="white" />
    <path d="M17 6.5L19.5 2L14.5 4.5L17 6.5Z" fill="white" />
    <path d="M12 22L3 7.5C3 7.5 7.5 5 12 5C16.5 5 21 7.5 21 7.5L12 22Z" fill="white" />
    <circle cx="12" cy="10.5" r="1.8" fill="currentColor" fillOpacity="0.3" />
    <circle cx="9" cy="14" r="1.2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="15" cy="14" r="1.2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

// 起司圖標
const CheeseIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-12 h-12 text-slate-400 group-hover:scale-110 transition-transform" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 20h18L12 4 3 20z" />
    <circle cx="9" cy="15" r="1" />
    <circle cx="15" cy="16" r="1.5" />
    <circle cx="12" cy="11" r="1" />
  </svg>
);

// 綠色蛋圖標 (澐)
const GreenEggIcon = () => (
  <div className="w-14 h-14 bg-[#B7EB8F] rounded-full border-[3px] border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_#1e293b] group-hover:-rotate-12 transition-transform overflow-hidden">
    <div className="relative w-8 h-10 bg-white rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] flex flex-col items-center justify-center border-2 border-slate-900 scale-75">
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
      </div>
    </div>
  </div>
);

// 灰色浣熊圖標 (索亞)
const RaccoonIcon = () => (
  <div className="w-14 h-14 bg-[#A5A5A5] rounded-full border-[3px] border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_#1e293b] group-hover:rotate-12 transition-transform overflow-hidden">
    <span className="text-3xl filter grayscale-[0.2]">🦝</span>
  </div>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSponsorIndex, setSelectedSponsorIndex] = useState<number | null>(null);
  const [selectedEventImage, setSelectedEventImage] = useState<EventProject | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevSponsor = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSponsorIndex !== null) {
      const len = RESUME_DATA.sponsorships.length;
      setSelectedSponsorIndex((selectedSponsorIndex - 1 + len) % len);
    }
  }, [selectedSponsorIndex]);

  const handleNextSponsor = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSponsorIndex !== null) {
      const len = RESUME_DATA.sponsorships.length;
      setSelectedSponsorIndex((selectedSponsorIndex + 1) % len);
    }
  }, [selectedSponsorIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedSponsorIndex !== null) {
        if (e.key === 'ArrowLeft') {
          const len = RESUME_DATA.sponsorships.length;
          setSelectedSponsorIndex((selectedSponsorIndex - 1 + len) % len);
        } else if (e.key === 'ArrowRight') {
          const len = RESUME_DATA.sponsorships.length;
          setSelectedSponsorIndex((selectedSponsorIndex + 1) % len);
        } else if (e.key === 'Escape') {
          setSelectedSponsorIndex(null);
        }
      } else if (selectedEventImage && e.key === 'Escape') {
        setSelectedEventImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSponsorIndex, selectedEventImage]);

  const activeSponsor = selectedSponsorIndex !== null ? RESUME_DATA.sponsorships[selectedSponsorIndex] : null;

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-slate-900 pb-16 selection:bg-orange-200 overflow-x-hidden font-rounded text-sm md:text-base">
      {/* 背景裝飾 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <SquidIcon color="#FF006E" delay="0s" top="15%" />
        <SquidIcon color="#A0FF00" delay="5s" top="45%" />
        <SquidIcon color="#FF8C00" delay="10s" top="75%" />
        
        {/* 背景漂浮裝飾 */}
        <FloatingDecoration emoji="🍕" top="20%" left="10%" delay="0s" />
        <FloatingDecoration emoji="🥓" top="60%" left="85%" delay="1s" />
        <FloatingDecoration emoji="🍣" top="80%" left="15%" delay="2s" />
        <FloatingDecoration emoji="🍕" top="40%" left="75%" delay="1.5s" />
      </div>

      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto max-w-5xl px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-orange-500 border-[3px] border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#1e293b] transform -rotate-6 text-white group-hover:rotate-0 transition-transform">
              <DevilPizzaIcon className="w-8 h-8" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">LALAPIZZA<span className="text-orange-600">.LOG</span></span>
          </div>
          <div className="hidden md:flex gap-6 font-black text-xs uppercase tracking-wider">
            {['Books', 'Merch', 'Digital', 'Events'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-600 transition-all border-b-2 border-transparent hover:border-orange-400 pb-0.5 relative group">
                {item}
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden z-10">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight relative">
              {RESUME_DATA.nickname} <span className="text-orange-500 drop-shadow-[3px_3px_0px_#1e293b] block md:inline">{RESUME_DATA.name}</span>
              <div className="absolute -top-6 -left-4 opacity-15 -z-10 w-24 h-24 bg-orange-400 splat-mask"></div>
            </h1>
            <p className="text-lg font-bold text-slate-700 max-w-lg leading-relaxed bg-white/70 backdrop-blur-sm p-5 rounded-[2rem] border-[3px] border-slate-900 shadow-[6px_6px_0px_#FF8C00]">
              熱愛創作與遊戲的同人作家，擅長插畫、周邊設計及活動企劃。擁有豐富的贊助與參展經驗，致力於將創意轉化為實體感動。 🍣 最愛這盤鋪滿生火腿與芝麻葉的特製披薩噴！
            </p>
            <div className="flex flex-wrap gap-3">
              {RESUME_DATA.extras.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0px_#1e293b] font-black text-xs hover:scale-105 transition-transform cursor-default">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 mx-auto group">
               <div className="absolute inset-0 bg-orange-400 rounded-[30px] rotate-6 group-hover:rotate-12 transition-transform border-[3px] border-slate-900 shadow-[6px_6px_0px_#1e293b]"></div>
               <img 
                 src="https://pbs.twimg.com/media/G5sLT7ubsAArzgA?format=jpg&name=large" 
                 alt="辣啦最愛的特製生火腿芝麻葉披薩" 
                 className="relative z-10 rounded-[28px] border-[3px] border-slate-900 object-cover w-full h-full shadow-xl transition-transform group-hover:scale-105" 
               />
               <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-4 rounded-2xl border-[3px] border-slate-900 shadow-lg -rotate-12 z-20">
                 <p className="font-black text-base italic">生火腿與芝麻葉噴！🥓</p>
               </div>
               <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full border-[3px] border-slate-900 shadow-lg animate-bounce z-20 text-2xl">
                 🍕
               </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-5xl px-6 space-y-20 relative z-10">
        {/* Books Section */}
        <section id="books" className="scroll-mt-24">
          <SectionHeader icon={<Book className="w-5 h-5" />} title="實體本本" subtitle="Publication & Art" color="#FF8C00" />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {RESUME_DATA.books.map((book, i) => (
              <WorkCard key={i} data={book} color="#FF8C00" />
            ))}
          </div>
        </section>

        {/* Merch Section */}
        <section id="merch" className="scroll-mt-24">
          <SectionHeader icon={<Package className="w-5 h-5" />} title="週邊設計" subtitle="Merch Lab" color="#A0FF00" shadowColor="#FF8C00" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {RESUME_DATA.merch.map((category, i) => (
              <MerchGroup key={i} data={category} />
            ))}
          </div>
        </section>

        {/* Digital Section */}
        <section id="digital" className="scroll-mt-24">
          <SectionHeader icon={<Smartphone className="w-5 h-5" />} title="數位作品" subtitle="Stickers & Games" color="#FF7F50" />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {RESUME_DATA.digital.map((item, i) => (
              <WorkCard key={i} data={item} isDigital color="#FF8C00" />
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="scroll-mt-24">
          <SectionHeader icon={<Calendar className="w-5 h-5" />} title="活動企劃" subtitle="Event Milestones" color="#FF8C00" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {RESUME_DATA.events.map((event, i) => {
              const isSP2 = event.title.includes('SP2') || event.category.includes('SP2');
              const isPizzaDouble = event.title.includes('披薩雙排對對碰');
              const splatColors = ['#FF8C00', '#A0FF00', '#FF006E', '#FF7F50'];
              let customColor = splatColors[i % splatColors.length];
              
              const isExchange = event.category === '交換繪';
              if (isExchange) {
                 if (event.year === "2022") customColor = '#FF6B6B';
                 else if (event.year === "2023") customColor = '#78B159';
                 else if (event.year === "2025") customColor = '#4DABF7';
              }

              const icon = isPizzaDouble ? (
                <div className="flex -space-x-1 items-center justify-center relative scale-110">
                  <span className="text-2xl z-10 animate-bounce">🍕</span>
                  <span className="text-xl animate-pulse absolute top-0 -mt-2 z-20">💥</span>
                  <span className="text-2xl z-10 animate-bounce" style={{ animationDelay: '0.2s' }}>🍕</span>
                </div>
              ) : isExchange ? (
                event.year === "2025" ? <Snowflake className="w-8 h-8" style={{ color: customColor }} /> : 
                event.year === "2023" ? <TreePine className="w-8 h-8" style={{ color: customColor }} /> : 
                <Gift className="w-8 h-8" style={{ color: customColor }} />
              ) : <Trees className="w-8 h-8" style={{ color: customColor }} />;

              const CardContent = (
                <div 
                  onClick={() => event.image && setSelectedEventImage(event)}
                  className="bg-white border-[3px] border-slate-900 rounded-[1.5rem] p-6 pt-5 shadow-[6px_6px_0px_#1e293b] w-full flex flex-col items-center gap-4 relative overflow-hidden h-full group cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full justify-between mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="h-[2px] flex-1 bg-slate-100 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{event.year}</span>
                    <div className="h-[2px] flex-1 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform" 
                       style={{ backgroundColor: `${customColor}15`, border: `2px dashed ${customColor}` }}>
                    {icon}
                  </div>
                  <div className="flex flex-col items-center gap-3 w-full pb-2">
                    <span className="px-5 py-1.5 rounded-xl text-sm font-black uppercase tracking-wider border-[3px] border-slate-900 transition-all group-hover:-translate-y-1 shadow-[4px_4px_0px_#1e293b] active:shadow-none active:translate-y-0"
                          style={{ backgroundColor: customColor, color: '#fff' }}>
                      {event.category}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight group-hover:text-orange-600 transition-colors px-2 mt-1">
                      {event.title}
                    </h3>
                  </div>
                  {event.link && <ArrowUpRight className="absolute top-2 right-2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  {event.image && <ImageIcon className="absolute top-2 right-2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              );

              return (
                <div key={i} className="relative group transition-all hover:scale-105 h-full">
                  {event.link ? (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {CardContent}
                    </a>
                  ) : CardContent}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sponsorships */}
        <section id="sponsorships" className="scroll-mt-24 pb-12">
          <SectionHeader icon={<Award className="w-5 h-5" />} title="比賽獎品贊助" subtitle="The Wall of Honor" color="#FF8C00" />
          <div className="flex flex-wrap gap-4 mt-8">
            {RESUME_DATA.sponsorships.map((sponsor, i) => (
              <button 
                key={i} 
                onClick={() => sponsor.image && setSelectedSponsorIndex(i)}
                disabled={!sponsor.image}
                className={`group bg-white card-chunky border-[3px] p-4 rounded-xl flex flex-col items-center min-w-[140px] transition-all shadow-[4px_4px_0px_#1e293b] ${sponsor.image ? 'hover:scale-105 cursor-pointer active:translate-y-1 active:shadow-none' : 'opacity-80'}`}
              >
                <Award className={`w-6 h-6 mb-1.5 transition-transform ${sponsor.image ? 'text-orange-500 group-hover:scale-125' : 'text-slate-300'}`} />
                <span className="text-[10px] font-bold text-slate-400">{sponsor.year}</span>
                <span className="font-black text-slate-900 text-center text-sm">{sponsor.title}</span>
                <div className="h-0.5 w-full bg-slate-100 my-1.5"></div>
                <span className="text-xs font-bold text-orange-600">{sponsor.award}</span>
                {sponsor.image && (
                  <div className="mt-2 text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-3 h-3" /> 點擊看獎品
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox Modal for Sponsorships */}
      {activeSponsor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedSponsorIndex(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-orange-400 transition-colors bg-white/10 p-2 rounded-full z-[110]" onClick={() => setSelectedSponsorIndex(null)}>
            <X className="w-8 h-8" />
          </button>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all p-4 bg-white/5 rounded-full hover:bg-white/10 z-[110] active:scale-95"
            onClick={handlePrevSponsor}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-all p-4 bg-white/5 rounded-full hover:bg-white/10 z-[110] active:scale-95"
            onClick={handleNextSponsor}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <img src={activeSponsor.image} alt={activeSponsor.title} className="rounded-3xl border-[6px] border-white shadow-2xl max-h-[75vh] object-contain bg-white" />
            <div className="mt-6 px-8 py-4 bg-white rounded-2xl border-[3px] border-slate-900 shadow-[6px_6px_0px_#FF8C00] font-black text-center min-w-[300px]">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{activeSponsor.year} 贊助獎品 ({(selectedSponsorIndex || 0) + 1} / {RESUME_DATA.sponsorships.length})</p>
              <h4 className="text-xl text-slate-900">【{activeSponsor.title}】{activeSponsor.award}</h4>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Event Images */}
      {selectedEventImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedEventImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-orange-400 transition-colors bg-white/10 p-2 rounded-full z-[110]" onClick={() => setSelectedEventImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <img src={selectedEventImage.image} alt={selectedEventImage.title} className="rounded-3xl border-[6px] border-white shadow-2xl max-h-[80vh] object-contain bg-white" />
            <div className="mt-6 px-8 py-4 bg-white rounded-2xl border-[3px] border-slate-900 shadow-[6px_6px_0px_#FF8C00] font-black text-center">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                {selectedEventImage.year} {selectedEventImage.title.includes('披薩雙排對對碰') ? '活動說明' : '活動圖示'}
              </p>
              <h4 className="text-xl text-slate-900">{selectedEventImage.title}</h4>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 relative overflow-visible mt-24">
        <div className="absolute bottom-[calc(100%-2px)] left-0 w-full leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-slate-900" style={{ filter: 'drop-shadow(0 -5px 0 #FF8C00)' }}>
            <path d="M0,120V60C150,110,300,10,450,60C600,110,750,10,900,60C1050,110,1200,60,1200,60V120H0Z" />
          </svg>
        </div>
        <div className="container mx-auto max-w-5xl px-6 text-center space-y-8 relative z-10 pt-4">
          <div className="space-y-4">
            <div className="flex justify-center gap-1 md:gap-2 font-zen text-white select-none">
              {['請', '給', '我', '看', '那', '個'].map((char, i) => (
                <span 
                  key={i} 
                  className="text-3xl md:text-5xl font-black italic animate-jump hover:scale-125 hover:text-orange-500 transition-all cursor-default inline-block" 
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-3 py-2"><SushiIcon /><PizzaSliceIcon /><HamIcon /></div>
            <p className="text-slate-400 font-bold italic">充滿橘色墨汁風味的同人生活。創作萬歲！辣啦萬歲噴！</p>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-slate-500 font-black tracking-[0.3em]">LALAPIZZA CREATIVE LAB © 2025</p>
            <div className="flex gap-6 font-black text-orange-400">
              <a href="https://x.com/yunxd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (TWITTER)</a>
              <a href="https://bsky.app/profile/lalapizza.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">BLUESKY</a>
              <a href="https://www.plurk.com/yun7543" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PLURK</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SectionHeader: React.FC<{ icon: React.ReactNode, title: string, subtitle: string, color: string, shadowColor?: string }> = ({ icon, title, subtitle, color, shadowColor }) => (
  <div className="relative mb-8 group">
    <div className="absolute -top-3 -left-4 w-16 h-16 opacity-15 -z-10 splat-mask group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}></div>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-900 text-white rounded-xl rotate-3 transition-transform group-hover:rotate-0" style={{ boxShadow: `4px 4px 0px ${shadowColor || color}` }}>
        {icon}
      </div>
      <div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">{title}</h2>
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
  </div>
);

const WorkCard: React.FC<{ data: WorkItem, isDigital?: boolean, color: string }> = ({ data, isDigital, color }) => {
  const isEggDogCollab = data.title.includes('EggDog');

  const renderDescription = (desc: string) => {
    const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const lines = (desc || '').split('\n').filter(l => l.trim() !== '');
    
    return (
      <div className="space-y-2">
        {lines.length > 0 && lines.map((line, lineIdx) => {
          const isSpecs = line.startsWith('規格：');
          const isBullet = line.startsWith('●') || line.startsWith('◆') || line.startsWith('·') || line.startsWith('✦');
          const parts = line.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g);
          const smallTextTarget = "（蛋狗、披薩、鳥類、人類…等）";

          return (
            <div key={lineIdx} className={`
              ${isSpecs ? 'mt-4 pt-3 border-t-2 border-dashed border-orange-200 font-black text-orange-700' : ''}
              ${isBullet ? 'pl-5 relative' : ''}
            `}>
              {isBullet && <span className="absolute left-0 text-orange-400">✦</span>}
              {parts.map((part, i) => {
                const match = mdLinkRegex.exec(part);
                mdLinkRegex.lastIndex = 0; 
                if (match) {
                  return (
                    <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-black underline decoration-2 decoration-orange-400/30 underline-offset-2 hover:bg-orange-100 px-1.5 py-0.5 rounded transition-colors inline-flex items-center gap-1">
                      {match[1]} <ExternalLink className="w-3 h-3" />
                    </a>
                  );
                }

                const cleanPart = part.replace(/^[●◆·✦]\s*/, '');
                if (cleanPart.includes(smallTextTarget)) {
                  const [before, after] = cleanPart.split(smallTextTarget);
                  return (
                    <React.Fragment key={i}>
                      {before}
                      <span className="text-[0.85em] opacity-80 font-bold tracking-tight inline-block align-baseline">
                        {smallTextTarget}
                      </span>
                      {after}
                    </React.Fragment>
                  );
                }
                return cleanPart;
              })}
            </div>
          );
        })}
        {isEggDogCollab && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <a href="https://www.youtube.com/channel/UCvxCn2LJaz8J2YqLkA7FTDw" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:bg-slate-50 p-2 rounded-2xl transition-all group/item">
              <GreenEggIcon />
              <div className="text-center">
                <p className="font-black text-slate-900 text-sm flex items-center justify-center gap-1">澐 <Youtube className="w-3 h-3 text-[#FF0000]" /></p>
                <p className="text-[10px] font-bold text-slate-400">Vegg</p>
              </div>
            </a>
            <a href="https://x.com/Raccoon_SawyerV" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:bg-slate-50 p-2 rounded-2xl transition-all group/item">
              <RaccoonIcon />
              <div className="text-center">
                <p className="font-black text-slate-900 text-sm flex items-center justify-center gap-1">索亞 <Twitter className="w-3 h-3 text-[#1DA1F2]" /></p>
                <p className="text-[10px] font-bold text-slate-400">Live2D製作</p>
              </div>
            </a>
          </div>
        )}
      </div>
    );
  };

  const CardWrapper = data.link ? 'a' : 'div';
  const wrapperProps = data.link ? { href: data.link, target: "_blank", rel: "noopener noreferrer" } : {};

  const getBottomIcon = () => {
    if (data.title.includes('看很開')) return <CheeseIcon />;
    if (data.title.includes('Sayonana')) return <Gamepad2 className="text-slate-400 w-12 h-12" />;
    if (data.title.includes('EggDog')) return null; 
    if (data.title.includes('不想上班')) return <Palette className="text-slate-400 w-12 h-12" />;
    if (data.title.includes('這種4K不要了')) return <MessageCircle className="text-slate-400 w-12 h-12" />;
    return isDigital ? <Smartphone className="text-slate-400 w-12 h-12" /> : <Book className="text-slate-400 w-12 h-12" />;
  };

  return (
    <div className="bg-white card-chunky border-[3px] border-slate-900 rounded-[2rem] p-6 md:p-8 group relative overflow-hidden transition-all flex flex-col h-full shadow-[6px_6px_0px_#1e293b]">
      <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10 splat-mask -z-0" style={{ backgroundColor: color }}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-black shadow-[3px_3px_0px_#FF8C00]">{data.year}</span>
          <span className="text-base md:text-xl font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-1 rounded-xl border-b-4 border-orange-400/50 group-hover:scale-105 transition-transform">
            {data.category}
          </span>
        </div>
        <div className="mb-4">
          <CardWrapper {...wrapperProps} className={data.link ? "block hover:opacity-90 relative group/title" : "relative"}>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-orange-600 transition-colors whitespace-pre-line">
              {data.title}
            </h3>
            {data.link && (
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white rounded-xl text-sm font-black shadow-[4px_4px_0px_#1e293b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                查看作品 <ExternalLink className="w-4 h-4" />
              </div>
            )}
          </CardWrapper>
        </div>
        <div className="text-slate-600 font-bold p-1 text-sm md:text-base leading-relaxed flex-1">
          {renderDescription(data.description || '')}
        </div>
        <div className="pt-6 mt-auto flex justify-end relative z-10 opacity-10 group-hover:opacity-100 transition-opacity">
          {getBottomIcon()}
        </div>
      </div>
    </div>
  );
};

const MerchGroup: React.FC<{ data: MerchCategory }> = ({ data }) => (
  <div className="bg-white card-chunky border-[3px] border-slate-900 rounded-xl p-5 flex flex-col h-full hover:bg-orange-50 transition-colors shadow-[4px_4px_0px_#1e293b] group/card">
    <h3 className="text-lg font-black text-slate-900 border-b-[3px] border-orange-400 pb-1.5 mb-4 flex items-center justify-between">
      {data.type} <FlaskConical className="w-5 h-5 text-orange-500 group-hover/card:-rotate-12 transition-transform duration-300" />
    </h3>
    <ul className="space-y-2 flex-1">
      {data.items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2 group/item cursor-default">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full border-2 border-slate-900 transition-transform duration-200 group-hover/item:scale-150"></div>
          <span className="font-black text-slate-600 text-sm transition-colors duration-200 group-hover/item:text-slate-900">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
