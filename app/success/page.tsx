'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function SuccessPage() {
  const [formData, setFormData] = useState({
    appName: '',
    email: '',
    url: ''
  })
  const [generatedLink, setGeneratedLink] = useState('')

  const handleCreateLink = () => {
    if (!formData.appName || !formData.email) {
      alert('Please fill in App Name and Email')
      return
    }

    // 核心逻辑：生成带参数的 URL
    const baseUrl = window.location.origin
    const params = new URLSearchParams({
      name: formData.appName,
      email: formData.email,
      url: formData.url,
      date: new Date().toLocaleDateString()
    })
    
    setGeneratedLink(`${baseUrl}/p?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Payment Successful! 🎉</h1>
          <p className="text-green-700 mt-2">
            Now, let's generate your permanent hosted link.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configure Your Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>App Name</Label>
              <Input 
                placeholder="My Awesome App" 
                value={formData.appName}
                onChange={e => setFormData({...formData, appName: e.target.value})}
              />
            </div>
            <div>
              <Label>Support Email</Label>
              <Input 
                placeholder="support@myapp.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label>Website (Optional)</Label>
              <Input 
                placeholder="https://myapp.com" 
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
              />
            </div>
            
            <Button onClick={handleCreateLink} className="w-full bg-slate-900 hover:bg-slate-800">
              Generate Permanent Link
            </Button>

            {generatedLink && (
              <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-sm font-semibold mb-2">✅ Here is your Hosted URL:</p>
                <div className="flex items-center gap-2">
                  <Input readOnly value={generatedLink} className="bg-white" />
                  <Button 
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink)
                      alert('Copied!')
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Paste this URL into App Store Connect. Keep this link safe to edit later!
                </p>
                <div className="mt-4 text-center">
                   <a href={generatedLink} target="_blank" className="text-blue-600 hover:underline text-sm">
                     Test Link →
                   </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
           <Link href="/" className="text-sm text-gray-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}