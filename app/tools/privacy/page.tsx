'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // 需安装 accordion

// 如果没有安装图标库，先用文字代替，或者运行 npx shadcn@latest add accordion 安装组件
import { CheckCircle2, Globe, Shield, Zap } from "lucide-react" 

export default function LandingPage() {
  const [appName, setAppName] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)
  
  // 模拟生成链接 (实际使用你的逻辑)
  const generateUrl = () => {
    if(!appName || !email) return alert("Please fill in the basics.")
    setIsGenerated(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. Navbar - 极简导航 */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-sm font-mono">IP</div>
            <span>IndiePrivacy</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#faq" className="hover:text-black transition">FAQ</a>
            <a href="mailto:support@1dollar-launch.xyz" className="hover:text-black transition">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* 2. Hero Section - 痛点直击 */}
        <section className="py-20 sm:py-32 px-4 text-center bg-gradient-to-b from-slate-50 to-white">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Stuck on <span className="text-blue-600">App Store Review?</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Don't waste time deploying a website just for a privacy policy. 
            <br className="hidden sm:block" />
            Generate a compliant policy and get a <strong>permanent hosted URL</strong> in 30 seconds.
          </p>
          
          {/* 工具卡片区域 */}
          <div className="max-w-xl mx-auto">
            <Card className="shadow-2xl border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-4 text-white text-sm font-medium text-center">
                Try the Generator (MVP)
              </div>
              <CardContent className="p-6 space-y-4 text-left">
                {!isGenerated ? (
                  <>
                    <div className="space-y-2">
                      <Label>App Name</Label>
                      <Input placeholder="e.g. Daily Tracker" value={appName} onChange={e => setAppName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input placeholder="support@yourapp.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={generateUrl}>
                      Generate Policy & Preview
                    </Button>
                    <p className="text-xs text-slate-400 text-center">No sign-up required. Instant preview.</p>
                  </>
                ) : (
                  <div className="text-center space-y-6 py-4">
                    <div className="text-green-600 flex justify-center mb-2">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-xl font-bold">Policy Ready!</h3>
                    <p className="text-slate-600 text-sm">
                      Your privacy policy content has been generated. <br/>
                      To get the <strong>Hosted URL</strong> for App Store Connect, choose a plan:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a href="https://ko-fi.com/s/d0afdef925" target="_blank" className="block">
                        <Button variant="outline" className="w-full h-auto py-4 flex flex-col border-slate-300 hover:border-black hover:bg-slate-50">
                          <span className="text-lg font-bold">$1.00</span>
                          <span className="text-xs text-slate-500">PayPal / Card</span>
                        </Button>
                      </a>
                      <a href="https://mbd.pub/o/你的链接" target="_blank" className="block">
                        <Button variant="outline" className="w-full h-auto py-4 flex flex-col border-slate-300 hover:border-green-600 hover:bg-green-50">
                          <span className="text-lg font-bold">¥7.00</span>
                          <span className="text-xs text-slate-500">WeChat / Alipay</span>
                        </Button>
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsGenerated(false)}>Edit Details</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Social Proof / Features - 信任背书 */}
        <section id="features" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Permanently Hosted</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  You get a clean URL (e.g. 1dollar-launch.xyz/p/...) that never expires. Perfect for App Store metadata.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Store Compliant</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Templates based on Apple's App Store & Google Play requirements. Passed review for 100+ apps.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  No coding, no servers, no recurring fees. Pay once, use forever. 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FAQ Section - 消除顾虑 */}
        <section id="faq" className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Why does this cost money?</AccordionTrigger>
                <AccordionContent>
                  Because I pay for the domain and server maintenance to keep your links alive forever. $1 is a small one-time fee to support an indie developer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I edit the policy later?</AccordionTrigger>
                <AccordionContent>
                  Yes! The URL uses query parameters. You can change your email or app name in the URL anytime without paying again.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it compatible with Google Play?</AccordionTrigger>
                <AccordionContent>
                  Yes, the generated policy includes standard clauses required by both Apple App Store and Google Play Store.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* 5. Footer - 商业质感 */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-white text-lg">IndiePrivacy</span>
            <p className="text-xs mt-1">Built by an Indie Hacker for Indie Hackers.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}