'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { generateTripcode } from '@/lib/tripcode'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // 需安装 npx shadcn@latest add avatar
import { Hash, Zap, Shield, Ghost, Send, Radio, Disc, Globe, Sparkles, ChevronRight } from "lucide-react"

// 频道配置 - 更现代的图标
const CHANNELS = [
  { id: 'general', name: 'General', icon: Globe, color: 'text-blue-400', desc: 'The public square.' },
  { id: 'bounty', name: 'Bounties', icon: Zap, color: 'text-yellow-400', desc: 'Earn BITS by solving problems.' },
  { id: 'market', name: 'Market', icon: Disc, color: 'text-purple-400', desc: 'Trade tools and services.' },
  { id: 'anon', name: 'Whisper', icon: Ghost, color: 'text-gray-400', desc: 'Anonymous signals. No logs.' },
]

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [posts, setPosts] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [secret, setSecret] = useState('')
  const [identity, setIdentity] = useState('GUEST')
  const [bits, setBits] = useState(100)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 身份生成
  useEffect(() => {
    if (secret) {
      setIdentity(generateTripcode(secret))
    } else {
      setIdentity('GUEST')
    }
  }, [secret])

  // 获取帖子
  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('channel', activeChannel)
      .order('created_at', { ascending: true }) // 聊天软件通常是旧的在上，新的在下，或者反过来，这里我们用正序模拟聊天流
    
    setPosts(data || [])
    // 自动滚动到底部
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  useEffect(() => { fetchPosts() }, [activeChannel])

  // 发射
  const handlePost = async () => {
    if (!content.trim()) return
    if (!secret) return alert("Access Denied: Key required.")
    
    setBits(prev => prev - 5)
    const tripcode = generateTripcode(secret)
    
    // 乐观更新 (先显示，后上传)
    const newPost = {
      id: Date.now(),
      content,
      author_name: tripcode,
      channel: activeChannel,
      created_at: new Date().toISOString(),
      likes: 0
    }
    setPosts(prev => [...prev, newPost])
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

    await supabase.from('posts').insert([{
      content,
      author_name: tripcode,
      channel: activeChannel,
      likes: 0
    }])
    setContent('')
  }

  return (
    <div className="flex h-screen bg-[#09090b] text-slate-300 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. SIDEBAR: 磨砂玻璃质感 */}
      <div className="w-72 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] mr-3">
            <span className="font-bold text-white text-sm">B</span>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight">BitNew</h1>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              System Online
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 py-6 space-y-1 px-3">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Frequency</div>
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-all duration-200 group ${
                activeChannel === ch.id 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <ch.icon size={16} className={`${activeChannel === ch.id ? ch.color : 'text-slate-600 group-hover:text-slate-400'}`} />
              <span className="text-sm font-medium">{ch.name}</span>
              {activeChannel === ch.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </button>
          ))}
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="bg-zinc-900/80 rounded-xl p-3 border border-white/5 shadow-inner">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Identity</div>
              <div className="flex items-center gap-1 text-xs font-mono text-indigo-400">
                <Sparkles size={10} />
                {bits} BITS
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-white tracking-tight truncate">
              {identity}
            </div>
            <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[70%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#09090b] to-[#111113]">
        {/* Channel Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.01] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Hash size={20} className="text-slate-500" />
            <h2 className="font-bold text-white text-lg">{CHANNELS.find(c => c.id === activeChannel)?.name}</h2>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-slate-400 border border-white/5">
              {CHANNELS.find(c => c.id === activeChannel)?.desc}
            </span>
          </div>
          <div className="flex gap-4">
             {/* 右上角可以放一些工具按钮 */}
             <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><Radio size={16} /></Button>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] text-slate-600">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                   <Radio size={32} className="opacity-50" />
                </div>
                <p>No signals found.</p>
                <p className="text-sm">Broadcast something to start the chain.</p>
              </div>
            ) : (
              posts.map((post, i) => {
                // 简单的头像颜色生成逻辑
                const seed = post.author_name.charCodeAt(post.author_name.length - 1) % 5
                const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500']
                
                return (
                  <div key={post.id || i} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${colors[seed]} shrink-0`}>
                      {post.author_name.slice(-2)}
                    </div>
                    
                    <div className="flex-1 max-w-3xl">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`font-semibold hover:underline cursor-pointer ${post.author_name === identity ? 'text-indigo-400' : 'text-slate-200'}`}>
                          {post.author_name}
                        </span>
                        <span className="text-xs text-slate-600">
                          {new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="text-slate-300 leading-relaxed text-[15px] bg-white/[0.03] p-3 rounded-2xl rounded-tl-none border border-white/5 shadow-sm inline-block">
                        {post.content}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-4 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-slate-500">
                        <button className="hover:text-indigo-400 transition-colors">Like</button>
                        <button className="hover:text-indigo-400 transition-colors">Reply</button>
                        <button className="hover:text-indigo-400 transition-colors">Tip 1 BIT</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 bg-[#09090b] border-t border-white/5">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 p-2 rounded-xl border border-white/10 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all shadow-lg">
            {!secret && (
              <div className="px-4 py-2 mb-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-500 flex items-center gap-2">
                <Shield size={12} />
                <span>Guest Mode: Set your <strong>Secret Key</strong> below to establish a permanent identity.</span>
              </div>
            )}
            
            <Textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Message #${activeChannel}...`}
              className="bg-transparent border-none text-slate-200 placeholder:text-slate-600 focus-visible:ring-0 min-h-[50px] resize-none text-base"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handlePost()
                }
              }}
            />
            
            <div className="flex justify-between items-center mt-2 px-1">
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative w-full max-w-[200px]">
                  <Input 
                    type="password"
                    value={secret}
                    onChange={e => setSecret(e.target.value)}
                    placeholder="Secret Key (Password)"
                    className="h-8 text-xs bg-black/20 border-white/10 text-slate-300 focus:border-indigo-500/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <span className="text-xs text-slate-600 font-mono">5 BITS fee</span>
                 <Button 
                    size="sm" 
                    onClick={handlePost} 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4"
                    disabled={!content.trim()}
                 >
                    <Send size={16} className="mr-2" />
                    Send
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}