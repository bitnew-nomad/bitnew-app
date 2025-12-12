"use client";

import React, { useState } from 'react';
import { 
  Terminal, Activity, MapPin, Search, Hash, 
  MessageSquare, ChevronUp, Zap, Box, Settings, 
  User, Globe, ShieldAlert
} from 'lucide-react';

// --- 1. MOCK DATA (假数据，营造氛围) ---
const MOCK_THREADS = [
  {
    id: 1,
    title: "Stripe 香港区最新风控规则实测，大量号被封...",
    summary: "昨天晚上开始，我这边的 3 个号接连收到邮件。目前的规律看来是针对虚拟卡段的...",
    author: "0xFE...3A",
    badges: ["OG", "Maker"],
    tags: ["支付", "风控"],
    city: "Hong Kong",
    replies: 42,
    heat: "high", // high, medium, low
    time: "10m ago",
    type: "signal"
  },
  {
    id: 2,
    title: "[悬赏 500 BITS] 求一个能用的美区 Apple ID 注册环境",
    summary: "试了指纹浏览器和接码平台，还是提示无法验证。需要老手指导，成功后直接转账。",
    author: "0xAB...99",
    badges: ["Paid"],
    tags: ["悬赏", "黑市"],
    city: "Global",
    replies: 12,
    heat: "medium", // medium
    time: "45m ago",
    type: "bounty"
  },
  {
    id: 3,
    title: "清迈宁曼路 Co-working Space 避雷指南",
    summary: "网速不行，椅子也不舒服，咖啡还巨贵。建议大家去 Maya 旁边那家...",
    author: "Trip_99X",
    badges: [],
    tags: ["避雷", "生活"],
    city: "Chiang Mai",
    replies: 5,
    heat: "low",
    time: "2h ago",
    type: "signal"
  },
  {
    id: 4,
    title: "独立开发出海：如何用 Next.js + Supabase 快速构建 MVP",
    summary: "这篇教程是基于我过去三个月的实战经验。包括鉴权、数据库设计以及支付对接...",
    author: "Dev_Master",
    badges: ["Maker", "10k"],
    tags: ["教程", "全栈"],
    city: "Digital",
    replies: 128,
    heat: "high",
    type: "signal"
  }
];

// --- 2. COMPONENTS (组件) ---

// 左侧导航按钮
const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-all duration-200 group relative flex items-center justify-center
      ${active ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'}`}
  >
    <Icon size={20} strokeWidth={2} />
    {/* Tooltip 模拟 */}
    <span className="absolute left-14 bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-slate-700/50">
      {label}
    </span>
  </button>
);

// 中间列表卡片
const ThreadCard = ({ thread, active, onClick }: any) => {
  // 热度颜色条逻辑
  const heatColor = 
    thread.heat === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 
    thread.heat === 'medium' ? 'bg-orange-400' : 'bg-zinc-700';

  return (
    <div 
      onClick={onClick}
      className={`relative p-4 cursor-pointer border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors group
        ${active ? 'bg-slate-800' : ''}`}
    >
      {/* 左侧热度指示条 */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${heatColor} ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

      <div className="flex justify-between items-start mb-1">
        <div className="flex gap-2 items-center">
          {thread.city && thread.city !== 'Global' && thread.city !== 'Digital' && (
             <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-slate-700/50">
               {thread.city}
             </span>
          )}
          {thread.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] text-slate-400">#{tag}</span>
          ))}
        </div>
        <span className="text-[10px] font-mono text-zinc-600">{thread.time}</span>
      </div>

      <h3 className={`text-sm font-medium leading-tight mb-2 line-clamp-2 ${active ? 'text-slate-200' : 'text-zinc-300 group-hover:text-zinc-200'}`}>
        {thread.title}
      </h3>

      <p className="text-xs text-slate-400 line-clamp-1 mb-3">
        {thread.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
             <User size={10} />
             {thread.author}
           </span>
        </div>
        <div className="flex items-center gap-3 text-zinc-600 text-xs">
          <span className="flex items-center gap-1 hover:text-zinc-400"><MessageSquare size={12} /> {thread.replies}</span>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN LAYOUT (主布局) ---

export default function BitNewPrototype() {
  const [activeTab, setActiveTab] = useState('signals');
  const [selectedThreadId, setSelectedThreadId] = useState(1);
  const selectedThread = MOCK_THREADS.find(t => t.id === selectedThreadId);

  return (
    // 全屏容器：禁止 body 滚动，使用内部滚动
    <div className="flex h-screen w-full bg-slate-900 text-zinc-300 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. 左侧导航港 (Command Rail) - 极窄 */}
      <aside className="w-[68px] flex-shrink-0 flex flex-col items-center py-5 border-r border-slate-700/50 z-20 bg-slate-900/95 backdrop-blur">
        {/* LOGO */}
        <div className="mb-8 w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
          B
        </div>

        {/* 导航菜单 */}
        <div className="flex flex-col gap-2 w-full px-2">
          <NavItem icon={Activity} label="信号广场 (Signals)" active={activeTab === 'signals'} onClick={() => setActiveTab('signals')} />
          <NavItem icon={Zap} label="热门 (Trending)" active={activeTab === 'trending'} onClick={() => setActiveTab('trending')} />
          <NavItem icon={Globe} label="城市指南 (Cities)" active={activeTab === 'cities'} onClick={() => setActiveTab('cities')} />
          <NavItem icon={Box} label="军火库 (Arsenal)" active={activeTab === 'arsenal'} onClick={() => setActiveTab('arsenal')} />
        </div>

        <div className="mt-auto flex flex-col gap-4 w-full px-2">
          <div className="w-8 h-[1px] bg-zinc-800 mx-auto" />
          <NavItem icon={User} label="档案 (Dossier)" />
          <NavItem icon={Settings} label="系统 (System)" />
        </div>
      </aside>

      {/* 2. 中间信号流 (The Feed) - 固定宽度 */}
      <section className="w-[380px] flex-shrink-0 flex flex-col border-r border-slate-700/50 bg-slate-900/50">
        {/* 顶部工具栏 */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
          <span className="font-semibold text-slate-200 flex items-center gap-2">
            <Activity size={16} className="text-indigo-500"/> 
            Signals
          </span>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Search size={16} /></button>
            <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Settings size={16} /></button>
          </div>
        </div>

        {/* 列表区域 (可滚动) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {MOCK_THREADS.map(thread => (
            <ThreadCard 
              key={thread.id} 
              thread={thread} 
              active={selectedThreadId === thread.id}
              onClick={() => setSelectedThreadId(thread.id)}
            />
          ))}
          {/* 模拟更多内容 */}
          <div className="p-8 text-center text-xs text-zinc-600 font-mono">
            -- END OF SIGNAL STREAM --
          </div>
        </div>
      </section>

      {/* 3. 右侧详情终端 (The Detail Deck) - 自适应 */}
      <main className="flex-1 flex flex-col bg-slate-900 min-w-0">
        {selectedThread ? (
          <>
            {/* 顶部 Header */}
            <header className="h-14 flex items-center justify-between px-6 border-b border-slate-700/50 sticky top-0 bg-slate-900/90 backdrop-blur z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 text-xs">THREAD #{selectedThread.id}</span>
                {selectedThread.tags.map(tag => (
                   <span key={tag} className="px-2 py-0.5 bg-slate-800 text-zinc-400 text-xs rounded border border-slate-700/50">
                     {tag}
                   </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-xs flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition-colors font-medium">
                   <ChevronUp size={14} /> Boost ({selectedThread.replies})
                 </button>
              </div>
            </header>

            {/* 内容滚动区 */}
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-4xl mx-auto w-full">
              {/* 楼主信息 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-lg shadow-indigo-900/20">
                  {selectedThread.author.substring(0,2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200 font-mono font-bold">{selectedThread.author}</span>
                    {selectedThread.badges.map(badge => (
                      <span key={badge} className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-yellow-500 rounded border border-slate-700/50 font-mono">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">2 hours ago • via Encrypted Terminal</div>
                </div>
              </div>

              {/* --- 接上一段代码 --- */}
              
              <article className="prose prose-invert prose-zinc max-w-none mb-12">
                <h1 className="text-2xl font-bold text-slate-200 mb-6 leading-tight">
                  {selectedThread.title}
                </h1>
                <p className="text-zinc-300 leading-relaxed mb-4 text-sm">
                  {selectedThread.summary}
                </p>
                <p className="text-zinc-300 leading-relaxed mb-4 text-sm">
                  经过多番测试，发现这次的风控逻辑主要针对虚拟卡段（尤其是 4859 开头的）。
                  建议大家立刻把资金转出，或者切换到实体的 Wise 卡。
                </p>
                
                {/* 模拟代码块 (Code Block) */}
                <div className="bg-slate-800 border border-slate-700/50 rounded-lg p-4 font-mono text-xs text-zinc-300 mb-6 overflow-x-auto relative group">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2 select-none uppercase tracking-wider">
                    <span>config.json</span>
                    <span>JSON</span>
                  </div>
                  <pre className="text-emerald-400">{`{
  "status": "failed",
  "reason": "risk_level_high",
  "gateway": "stripe_hk_v2"
}`}</pre>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] bg-slate-800 text-zinc-400 px-2 py-1 rounded hover:text-zinc-200">Copy</button>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-4 text-sm">
                  我也整理了一份目前还能用的 BIN 码列表，大家可以参考下面的文档。
                </p>

                {/* 模拟富媒体卡片 (Link Card / Rich Media) */}
                <div className="my-6 border border-slate-700/50 rounded-lg overflow-hidden hover:border-zinc-600 transition-all cursor-pointer group bg-slate-800/40 hover:bg-slate-800">
                   <div className="flex h-24">
                      <div className="w-24 bg-zinc-800 flex-shrink-0 flex items-center justify-center text-zinc-600">
                         <ShieldAlert size={24} />
                      </div>
                      <div className="p-3 flex flex-col justify-center">
                         <h4 className="font-bold text-zinc-200 text-sm mb-1 group-hover:text-indigo-400 transition-colors">Stripe Docs - Restricted Businesses</h4>
                         <p className="text-xs text-slate-400 line-clamp-2">The following categories of businesses and business practices are restricted from using the Stripe Service...</p>
                         <span className="text-[10px] text-zinc-600 mt-2 flex items-center gap-1">
                            <Globe size={10} /> stripe.com
                         </span>
                      </div>
                   </div>
                </div>
              </article>

              {/* 回复区分割线 */}
              <div className="flex items-center gap-4 my-8">
                 <div className="h-[1px] bg-zinc-800 flex-1"></div>
                 <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Encrypted Signals</span>
                 <div className="h-[1px] bg-zinc-800 flex-1"></div>
              </div>

              {/* 回复流 (The Thread) */}
              <div className="space-y-6 pb-12">
                 
                 {/* 模拟回复 1 (普通) */}
                 <div className="flex gap-3 group">
                    <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-slate-400 text-[10px] font-mono flex-shrink-0">
                      0x
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-zinc-300 text-xs font-bold font-mono">Nomad_A1</span>
                          <span className="text-[10px] text-zinc-600">1h ago</span>
                       </div>
                       <p className="text-zinc-400 text-sm leading-relaxed">
                          确实，我的 Wise 昨天也被警告了。现在的环境越来越难了。
                       </p>
                       <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity select-none">
                          <button className="text-[10px] text-slate-400 hover:text-zinc-300 font-mono">[REPLY]</button>
                          <button className="text-[10px] text-slate-400 hover:text-zinc-300 font-mono">[BOOST]</button>
                       </div>
                    </div>
                 </div>

                 {/* 模拟回复 2 (高亮/神回复) */}
                 <div className="flex gap-3 group">
                    <div className="w-8 h-8 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-[10px] font-mono border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)] flex-shrink-0">
                      MK
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-indigo-300 text-xs font-bold font-mono">Maker_Pro</span>
                          <span className="bg-indigo-500/10 text-indigo-400 text-[9px] px-1.5 py-px rounded border border-indigo-500/20 font-mono">🔥 TOP SIGNAL</span>
                          <span className="text-[10px] text-zinc-600">45m ago</span>
                       </div>
                       <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-indigo-500/30 transition-colors">
                          <p className="text-zinc-200 text-sm leading-relaxed">
                             推荐大家试试 Airwallex，目前香港区还比较稳。我有邀请码，需要的私信 Tripcode。
                             另外，如果你是用 Node.js 对接的，记得把 API 版本降级到 2023-10 之前的版本。
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* 底部输入框 (Sticky Bottom Input) */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur z-20">
              <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-3 focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all shadow-lg">
                  <textarea 
                    placeholder="Broadcast your signal..." 
                    className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 resize-none outline-none min-h-[24px] max-h-32"
                    rows={1}
                  />
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-700/50">
                     <div className="flex gap-3 text-slate-400">
                        <button className="hover:text-indigo-400 transition-colors"><MapPin size={16} /></button>
                        <button className="hover:text-indigo-400 transition-colors"><Terminal size={16} /></button>
                        <button className="hover:text-indigo-400 transition-colors"><ShieldAlert size={16} /></button>
                     </div>
                     <button className="bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold px-4 py-1.5 rounded-lg transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center gap-2">
                        <span>SEND</span>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                     </button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          // 空状态 (Empty State)
          <div className="flex-1 flex items-center justify-center flex-col text-zinc-700 select-none">
            <Terminal size={64} strokeWidth={1} className="mb-6 opacity-20" />
            <p className="font-mono text-sm tracking-widest">WAITING FOR SIGNAL...</p>
          </div>
        )}
      </main>
    </div>
  );
}