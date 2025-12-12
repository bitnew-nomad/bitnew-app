'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function HomePage() {
  const [step, setStep] = useState(1) // 1: Input, 2: Preview
  const [formData, setFormData] = useState({
    appName: '',
    email: '',
    url: ''
  })
  const [policy, setPolicy] = useState('')

  const handleGenerate = () => {
    if (!formData.appName || !formData.email) {
      alert('Please fill in App Name and Email')
      return
    }

    // 这里是符合 Google/Apple 基本要求的通用模板
    const template = `PRIVACY POLICY FOR ${formData.appName.toUpperCase()}

Last updated: ${new Date().toLocaleDateString()}

1. INTRODUCTION
Welcome to ${formData.appName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights.

2. DATA WE COLLECT
We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
- Device Data: Device type, operating system.
- Usage Data: Information about how you use our application.

3. HOW WE USE YOUR DATA
We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
- To provide and maintain the Service.
- To improve our App functionality.

4. CONTACT US
If you have any questions about this privacy policy, please contact us at: ${formData.email}
${formData.url ? `or visit our website: ${formData.url}` : ''}
`
    setPolicy(template)
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Indie Privacy Generator</h1>
          <p className="text-slate-600 mt-2">Get App Store & Google Play compliant in 30 seconds.</p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Enter App Details</CardTitle>
              <CardDescription>We'll generate a hosted policy for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>App Name</Label>
                <Input 
                  placeholder="e.g. Flappy Bird Remake" 
                  value={formData.appName}
                  onChange={e => setFormData({...formData, appName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input 
                  placeholder="support@example.com" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Website (Optional)</Label>
                <Input 
                  placeholder="https://..." 
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                />
              </div>
              <Button className="w-full mt-4" onClick={handleGenerate}>
                Generate Policy
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Preview Your Policy</CardTitle>
              <CardDescription>Here is your generated text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                className="min-h-[300px] font-mono text-xs" 
                readOnly 
                value={policy} 
              />
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4 text-center">
                <h3 className="font-bold text-green-800 text-lg mb-2">Want a Permanent URL?</h3>
                <p className="text-green-700 text-sm mb-4">
                  Don't want to host this yourself? Get a permanent link (e.g. 1dollar-launch.xyz/p/yourapp) to paste directly into App Store Connect.
                </p>
                
                {/* 👇 你的 KO-FI 链接就在这里 👇 */}
                <a 
                  href="https://ko-fi.com/s/d0afdef925" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                    Get Hosted URL for $1
                  </Button>
                </a>
                <p className="text-xs text-gray-500 mt-2">Secure payment via PayPal / Ko-fi</p>
              </div>

              <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>
                Edit Details
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}