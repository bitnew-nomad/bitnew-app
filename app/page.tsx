'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Terminal, Shield, Compass, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-900 selection:text-white">
      {/* Hero */}
      <section className="py-24 px-6 text-center border-b border-gray-800 bg-grid-white/[0.02]">
        <div className="inline-block p-2 bg-gray-900 rounded-full text-xs text-green-400 font-mono mb-6 border border-gray-800">
          ● BitNew Protocol v1.0 Online
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          The Nomad Freeport.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          一个去中心化的数字游民社区。无审核，无追踪，代码即法律。
          <br />
          连接中国开发者的代码与全球价值。
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/community">
            <Button size="lg" className="bg-green-600 hover:bg-green-500 text-black font-bold h-12 px-8">
              进入自由港 (Community)
            </Button>
          </Link>
          <a href="https://github.com/your-repo" target="_blank">
            <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800 text-white h-12">
              GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <Terminal className="text-green-500" />
          The Arsenal (军火库)
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tool 1 */}
          <Link href="/tools/privacy">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="text-white" size={20} />
                </div>
                <CardTitle className="text-white">Privacy Generator</CardTitle>
                <CardDescription className="text-gray-400">
                  生成符合 App Store 标准的隐私协议，并提供永久托管链接。
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Tool 2 */}
          <Link href="/tools/payment">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="text-white" size={20} />
                </div>
                <CardTitle className="text-white">Payment Pathfinder</CardTitle>
                <CardDescription className="text-gray-400">
                  只有支付宝？想收美元？两步找到最适合你的合规收款方案。
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Placeholder Tool */}
          <Card className="bg-gray-900/50 border-gray-800 opacity-50 h-full">
            <CardHeader>
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-gray-500" size={20} />
              </div>
              <CardTitle className="text-gray-500">ASO Generator</CardTitle>
              <CardDescription className="text-gray-600">
                Coming Soon...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}