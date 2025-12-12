'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageSquare } from "lucide-react"

// 定义帖子类型
type Post = {
  id: number
  content: string
  author_name: string
  likes: number
  created_at: string
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newContent, setNewContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [loading, setLoading] = useState(true)

  // 1. 获取帖子列表
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false }) // 最新在最前
    
    if (error) console.error('Error fetching posts:', error)
    else setPosts(data || [])
    setLoading(false)
  }

  // 初始化加载
  useEffect(() => {
    fetchPosts()
  }, [])

  // 2. 发布帖子 (你的日记写在这里)
  const handleSubmit = async () => {
    if (!newContent.trim()) return alert("写点什么吧，指挥官。")

    const name = authorName.trim() || '匿名游民' // 默认名字

    const { error } = await supabase
      .from('posts')
      .insert([{ content: newContent, author_name: name }])

    if (error) {
      alert('发送失败，请检查数据库配置。')
      console.error(error)
    } else {
      setNewContent('')
      fetchPosts() // 刷新列表
    }
  }

  // 3. 点赞 (共同治理)
  const handleLike = async (id: number, currentLikes: number) => {
    // 乐观更新 UI (让用户觉得极快)
    setPosts(posts.map(p => p.id === id ? { ...p, likes: currentLikes + 1 } : p))

    await supabase
      .from('posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', id)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="font-bold text-xl">BitNew <span className="text-xs bg-black text-white px-2 py-1 rounded ml-1">DAO</span></div>
        <a href="/" className="text-sm hover:underline">返回工具箱</a>
      </nav>

      <main className="max-w-2xl mx-auto p-4 py-10">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">数字游民自由港</h1>
          <p className="text-slate-500">
            无审核、无登录、去中心化。记录你的出海日记，或吐槽这个世界。
          </p>
        </div>

        {/* 发布框 */}
        <Card className="mb-10 shadow-lg border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">发布新动态</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="今天发生了什么？分享你的入坑指南..." 
              className="min-h-[120px] bg-slate-50"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            />
            <div className="flex gap-4">
              <Input 
                placeholder="代号 (可选)" 
                className="w-1/3"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
              />
              <Button className="flex-1 bg-black hover:bg-slate-800" onClick={handleSubmit}>
                发射 🚀
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 帖子列表 */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-slate-400">正在连接节点...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-slate-400">一片荒芜。做第一个开拓者吧。</p>
          ) : (
            posts.map(post => (
              <Card key={post.id} className="shadow-sm hover:shadow-md transition border-slate-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-slate-900">{post.author_name}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-slate-700 leading-relaxed mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <button 
                      onClick={() => handleLike(post.id, post.likes)}
                      className="flex items-center gap-1 hover:text-red-500 transition"
                    >
                      <ThumbsUp size={16} />
                      {post.likes || 0}
                    </button>
                    {/* 暂时不做评论功能，保持极简 */}
                    <span className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      0
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </main>
    </div>
  )
}