"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, CheckCircle, Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EvaluationPage() {
  const [sessionResults] = useState({
    totalQuestions: 3,
    correctAnswers: 2,
    accuracy: 67,
    pointsEarned: 150,
    timeSpent: 8,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7A96F]/20 via-white to-[#987B5E]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/images/fitra-logo.png" alt="فطرة" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#AB5413]">تقييم الأداء</h1>
                <p className="text-sm text-gray-600">جلسة حفظ سورة الفاتحة</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-yellow-600">+{sessionResults.pointsEarned}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md">
        {/* Congratulations Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-[#AB5413] to-[#764328] text-white">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">أحسنت! 🎉</h2>
            <p className="text-xl mb-4">لقد أكملت جلسة الحفظ بنجاح</p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {sessionResults.correctAnswers}/{sessionResults.totalQuestions}
                </div>
                <div className="text-sm opacity-90">إجابات صحيحة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionResults.accuracy}%</div>
                <div className="text-sm opacity-90">دقة الأداء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionResults.timeSpent}</div>
                <div className="text-sm opacity-90">دقيقة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">ملخص الأداء</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">دقة الإجابات</span>
                  <span className="font-semibold">{sessionResults.accuracy}%</span>
                </div>
                <Progress value={sessionResults.accuracy} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">سرعة الإنجاز</span>
                  <span className="font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">التركيز</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link href="/memorization">
            <Button className="w-full bg-[#AB5413] hover:bg-[#764328] py-4 text-lg rounded-xl">
              <RotateCcw className="w-5 h-5 mr-2" />
              ابدأ جلسة جديدة
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full py-4 text-lg rounded-xl border-2 bg-transparent border-[#987B5E] text-[#987B5E] hover:bg-[#987B5E]/10"
            >
              <Home className="w-5 h-5 mr-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        {/* Motivational Message */}
        <Card className="mt-6 border-0 shadow-sm bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-[#AB5413] mx-auto mb-3" />
            <h4 className="font-semibold text-[#764328] mb-2">رسالة تحفيزية</h4>
            <p className="text-sm text-[#AB5413]">"مَن قَرَأَ حَرْفًا مِن كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ"</p>
            <p className="text-xs text-[#987B5E] mt-2">استمر في رحلتك المباركة، كل حرف تحفظه له أجر عظيم</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
