'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function PaymentGuide() {
  const [step, setStep] = useState(1)
  const [result, setResult] = useState<string | null>(null)

  const reset = () => { setStep(1); setResult(null) }

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
      <Card className="max-w-xl w-full shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧭 出海支付罗盘 <span className="text-xs font-normal text-gray-500">v1.0</span>
          </CardTitle>
          <p className="text-sm text-gray-500">只需两步，帮你找到最适合的美元/人民币收款方案。</p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">你拥有什么主体资质？</h3>
              <Button variant="outline" className="w-full justify-between h-14" onClick={() => setStep(2)}>
                <span>👤 只有中国身份证 + 支付宝/微信</span>
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between h-14" onClick={() => { setStep(3); setResult('stripe-hk') }}>
                <span>🏢 有香港公司 / 个体户</span>
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between h-14" onClick={() => { setStep(3); setResult('us-company') }}>
                <span>🇺🇸 有美国公司 (LLC/C-Corp)</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">你想收什么钱？</h3>
              <Button variant="outline" className="w-full justify-between h-14" onClick={() => { setStep(3); setResult('mbd') }}>
                <span>🇨🇳 主要收人民币 (国内用户)</span>
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between h-14" onClick={() => { setStep(3); setResult('kofi') }}>
                <span>💵 主要收美元 (海外用户)</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {step === 3 && result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="mb-4 flex justify-center text-green-600"><CheckCircle2 size={48} /></div>
              <h3 className="text-xl font-bold text-green-800 mb-2">推荐方案</h3>
              
              {result === 'mbd' && (
                <div>
                  <p className="font-bold text-lg">面包多 (Mianbaoduo) 或 爱发电</p>
                  <p className="text-sm text-gray-600 mt-2">支持微信/支付宝直接付款，T+1 提现到个人账户。无须公司，无须备案。</p>
                </div>
              )}
              {result === 'kofi' && (
                <div>
                  <p className="font-bold text-lg">Ko-fi + PayPal 个人版</p>
                  <p className="text-sm text-gray-600 mt-2">最简单的美元收款方式。类似“打赏”逻辑。虽然有风控风险，但是起步成本为 0。</p>
                </div>
              )}
              {result === 'stripe-hk' && (
                <div>
                  <p className="font-bold text-lg">Stripe HK + 空中云汇 (Airwallex)</p>
                  <p className="text-sm text-gray-600 mt-2">正规军打法。用香港主体开 Stripe，用 Airwallex 收美元并结汇回国内。</p>
                </div>
              )}
              {result === 'us-company' && (
                <div>
                  <p className="font-bold text-lg">Stripe US + Mercury Bank</p>
                  <p className="text-sm text-gray-600 mt-2">终极方案。全球通过率最高，但维护成本高（每年报税 $200+）。</p>
                </div>
              )}

              <Button className="mt-6 w-full" onClick={reset}>重新测试</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}