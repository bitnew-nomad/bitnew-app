'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { generateTripcode } from '@/lib/tripcode'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area" // 需安装 npx shadcn@latest add scroll-area
import { Hash, Zap, Shield, Ghost, Send, Terminal, DollarSign } from "lucide-react"

// 定义频道配置
const CHANNELS = [
  { id: 'general', name: '大厅 (General)', icon: Terminal, desc: '闲聊、灌水、新人报道' },
  { id: 'bounty', name: '赏金猎人 (Bounty)', icon: DollarSign, desc: '提问、求助、悬赏 BITS' },
  { id: 'blackmarket', name: '黑市 (Market)', icon: Zap, desc: '源码交易、接支付、换汇' },
  { id: 'rant', name: '树洞 (Anonymous)', icon: Ghost, desc: '吐槽大厂、发泄情绪、阅后即焚' },
]

type Post = {
  id: number
  content: string
  author_name: string
  created_at: string | null
  likes: number
  channel: string
}

export default function CyberMopCommunity() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [secret, setSecret] = useState('')
  // identity is derived from `secret` to avoid unnecessary setState inside effects
  
  // 模拟 Mop 的 "BITS" 余额 (未来从数据库读)
  const [bits, setBits] = useState(100) 

  // 1. 身份生成系统
  const [guestId] = useState(() => 'GUEST-' + Math.floor(Math.random() * 1000))

  const identity = useMemo(() => {
    return secret ? generateTripcode(secret) : guestId
  }, [secret, guestId])

  // 2. 实时获取帖子
  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('channel', activeChannel) // 只看当前频道的
      .order('created_at', { ascending: false })
    setPosts((data as Post[] | null) || [])
  }, [activeChannel])

  // 切换频道时刷新 (call asynchronously to avoid sync setState in effect)
  useEffect(() => {
    const load = async () => { await fetchPosts() }
    void load()
  }, [fetchPosts])

  // 3. 发射逻辑
  const handlePost = async () => {
    if (!content.trim()) return
    if (!secret) return alert("【拒绝访问】请输入暗号(Key)以连接节点。")

    // 扣除 BITS (模拟)
    if (bits < 5) return alert("BITS 不足！去回复别人赚取 BITS 吧。")
    setBits(prev => prev - 5)

    const tripcode = generateTripcode(secret)
    
    await supabase.from('posts').insert([{
      content,
      author_name: tripcode, // 使用生成的 ID
      channel: activeChannel,
      likes: 0
    }])

    setContent('')
    fetchPosts()
  }

  return (
    <div className="flex h-screen bg-black text-green-500 font-mono overflow-hidden">
      
      {/* LEFT SIDEBAR: Discord 风格频道栏 */}
      <div className="w-64 border-r border-green-900 bg-gray-950 flex flex-col">
        <div className="p-4 border-b border-green-900">
          <h1 className="text-xl font-bold flex items-center gap-2 text-green-400">
            <Shield size={20} />
            BitNew_DAO
          </h1>
          <div className="text-xs text-green-800 mt-1">v1.0.2 // ONLINE</div>
        </div>
        
        <div className="flex-1 py-4 space-y-1">
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeChannel === ch.id 
                  ? 'bg-green-900/30 text-green-300 border-r-2 border-green-500' 
                  : 'text-green-700 hover:bg-green-900/10 hover:text-green-500'
              }`}
            >
              <ch.icon size={18} />
              <div>
                <div className="font-bold text-sm">#{ch.id}</div>
                <div className="text-[10px] opacity-60">{ch.name.split(' ')[0]}</div>
              </div>
            </button>
          ))}
        </div>

        {/* 底部：用户状态 */}
        <div className="p-4 border-t border-green-900 bg-black">
          <div className="text-xs text-green-700 mb-1">IDENTITY STATUS</div>
          <div className="flex items-center justify-between">
            <div className="font-bold text-green-400">{identity}</div>
            <div className="flex items-center text-yellow-500 text-sm">
              <DollarSign size={14} />
              {bits}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: 聊天流 */}
      <div className="flex-1 flex flex-col bg-black relative">
        {/* 频道头部 */}
        <header className="h-14 border-b border-green-900 flex items-center px-6 justify-between bg-gray-950/50">
          <div className="flex items-center gap-2 text-green-300">
            <Hash size={20} />
            <span className="font-bold uppercase">{activeChannel}</span>
            <span className="text-green-700 text-sm hidden sm:inline-block">
              {CHANNELS.find(c => c.id === activeChannel)?.desc}
            </span>
          </div>
          <div className="text-xs text-green-800">ENCRYPTED CONNECTION</div>
        </header>

        {/* 消息列表 */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center text-green-900 py-20 select-none">
                <Terminal size={48} className="mx-auto mb-4 opacity-20" />
                <p>NO SIGNALS DETECTED IN SECTOR #{activeChannel.toUpperCase()}</p>
                <p className="text-xs mt-2">Be the first to transmit.</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="group flex gap-4 hover:bg-green-900/5 p-2 rounded -ml-2">
                  {/* 头像代号 */}
                  <div className="w-10 h-10 bg-green-900/20 rounded flex items-center justify-center text-xs font-bold text-green-600 border border-green-900/50 shrink-0">
                    {post.author_name.slice(-2)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-green-400 hover:underline cursor-pointer">
                        {post.author_name}
                      </span>
                      <span className="text-[10px] text-green-800">
                        {new Date(post.created_at).toLocaleTimeString()}
                      </span>
                      {post.likes > 0 && (
                        <span className="text-xs text-yellow-600 bg-yellow-900/10 px-1 rounded">
                          +{post.likes} BITS
                        </span>
                      )}
                    </div>
                    <p className="text-green-300/90 leading-relaxed whitespace-pre-wrap text-sm">
                      {post.content}
                    </p>
                    
                    {/* 底部操作栏 (Mop 风格) */}
                    <div className="flex gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-green-700">
                      <button className="hover:text-green-400">[顶 UP]</button>
                      <button className="hover:text-red-400">[踩 DOWN]</button>
                      <button className="hover:text-yellow-400">[打赏 TIP]</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* 底部输入框 */}
        <div className="p-4 bg-gray-950 border-t border-green-900">
          {/* 暗号输入区 */}
          {!secret && (
            <div className="mb-2 bg-yellow-900/20 border border-yellow-900/50 p-2 rounded text-xs text-yellow-500 flex justify-between items-center">
              <span>⚠️ WARNING: You are in GUEST mode. Set your KEY to earn BITS.</span>
            </div>
          )}
          
          <div className="flex gap-2 mb-2">
             <div className="relative flex-1">
                <div className="absolute left-3 top-2.5 text-green-800 font-bold text-xs">KEY://</div>
                <Input 
                  type="password" 
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                  className="bg-black border-green-900 pl-14 h-9 text-xs text-green-500 focus:ring-green-700"
                  placeholder="Enter your secret passphrase..."
                />
             </div>
          </div>

          <div className="flex gap-2">
            <Textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Message #${activeChannel}...`}
              className="bg-black border-green-900 min-h-[50px] text-green-400 focus:ring-green-700 resize-none"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handlePost()
                }
              }}
            />
            <Button 
              onClick={handlePost} 
              className="h-auto w-16 bg-green-800 hover:bg-green-700 text-black"
            >
              <Send size={18} />
            </Button>
          </div>
          <div className="text-[10px] text-green-900 mt-2 text-right">
             COST: 5 BITS / TRANSMISSION
          </div>
        </div>
      </div>
      
    </div>
  )
}