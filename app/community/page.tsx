'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { generateTripcode } from '@/lib/tripcode' // 引入刚才写的
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThumbsUp, Hash, Terminal } from "lucide-react"

type Post = {
  id: number
  content: string
  author_name: string // 存 Tripcode ID
  likes: number
  created_at: string
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [secret, setSecret] = useState('') // 用户的暗号
  const [tripcode, setTripcode] = useState('NOMAD-??????')

  // 监听暗号变化，实时计算 ID 给用户看
  useEffect(() => {
    if (secret) {
      setTripcode(generateTripcode(secret))
    } else {
      setTripcode('NOMAD-??????')
    }
  }, [secret])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
  }

  useEffect(() => { fetchPosts() }, [])

  const handlePost = async () => {
    if (!content.trim()) return
    if (!secret.trim()) return alert("请输入一个暗号来生成你的身份！")

    // 真正的 ID 是由暗号生成的
    const identity = generateTripcode(secret)

    // 发送到数据库 (注意：我们只存 ID，不存暗号，所以是安全的)
    // *你需要去 Supabase 修改表结构，把 author_name 改成 tripcode，或者直接用 author_name 存
    const { error } = await supabase
      .from('posts')
      .insert([{ content, author_name: identity, likes: 0 }])

    if (!error) {
      setContent('')
      fetchPosts()
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 border-b border-green-800 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Terminal size={24} />
            THE_FREEPORT_V1
          </h1>
          <div className="text-xs text-green-800">NO_LOGS // NO_MASTERS</div>
        </header>

        {/* 发射台 */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-green-900 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="w-1/3">
              <label className="text-xs text-green-700 mb-1 block">YOUR SECRET KEY (暗号)</label>
              <div className="relative">
                <Hash className="absolute left-2 top-2.5 text-green-800 w-4 h-4" />
                <Input 
                  type="password" 
                  placeholder="Keep it safe..." 
                  className="pl-8 bg-black border-green-900 text-green-500 focus:ring-green-700"
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
               <label className="text-xs text-green-700 mb-1 block">PUBLIC IDENTITY (你的身份)</label>
               <div className="h-10 flex items-center px-3 bg-black border border-green-900 text-green-400 font-bold tracking-wider">
                 {tripcode}
               </div>
            </div>
          </div>

          <Textarea 
            placeholder="Broadcast your signal..." 
            className="bg-black border-green-900 text-green-500 min-h-[100px] mb-4 focus:ring-green-700"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          
          <Button onClick={handlePost} className="w-full bg-green-900 hover:bg-green-800 text-black font-bold">
            BROADCAST (发射)
          </Button>
        </div>

        {/* 信息流 */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border-l-2 border-green-900 pl-4 py-2 hover:border-green-500 transition-colors">
              <div className="flex justify-between text-xs text-green-800 mb-1">
                <span className="font-bold text-green-600">{post.author_name}</span> {/* 这里显示的是 Tripcode */}
                <span>{new Date(post.created_at).toLocaleTimeString()}</span>
              </div>
              <p className="text-green-400 text-sm whitespace-pre-wrap">{post.content}</p>
              <div className="mt-2 flex gap-4 text-xs text-green-800">
                <span className="cursor-pointer hover:text-green-500">[▲ UPVOTE {post.likes}]</span>
                <span className="cursor-pointer hover:text-red-500">[▼ REPORT]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}