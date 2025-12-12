import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-slate-900">Thank You!</h1>
        <p className="mt-4 text-slate-600">
          Your payment was successful. 
        </p>
        <p className="mt-2 text-sm text-slate-500 border-t pt-4 mt-4">
          Check your email (or Ko-fi messages) for your permanent hosted link instructions.
        </p>
        <Link href="/">
          <Button className="mt-6 w-full" variant="outline">Create Another</Button>
        </Link>
      </div>
    </div>
  )
}