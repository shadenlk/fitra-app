"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Target, Brain, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SetupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    currentLevel: "",
    dailyTime: "",
    learningStyle: "",
    preferredDays: [],
    goals: "",
    preferredReciter: "",
  })

  const reciters = [
    { name: "الحصري", fullName: "محمود خليل الحصري" },
    { name: "العفاسي", fullName: "مشاري راشد العفاسي" },
    { name: "المنشاوي", fullName: "محمد صديق المنشاوي" },
    { name: "الطبلاوي", fullName: "محمد محمود الطبلاوي" },
    { name: "عبد الباسط", fullName: "عبد الباسط عبد الصمد" },
  ]

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image src="/images/fitra-logo.png" alt="فطرة" width={40} height={40} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-emerald-800">فطرة</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">الخطوة {step} من 4</span>
            <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">مرحباً بك في فطرة</CardTitle>
              <CardDescription>دعنا نتعرف عليك لنخصص تجربتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكريم</Label>
                <Input
                  id="name"
                  placeholder="أدخل اسمك"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>الفئة العمرية</Label>
                <RadioGroup value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="child" id="child" />
                    <Label htmlFor="child">طفل (5-12 سنة)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="teen" id="teen" />
                    <Label htmlFor="teen">مراهق (13-17 سنة)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="adult" id="adult" />
                    <Label htmlFor="adult">بالغ (18-60 سنة)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior">كبير السن (60+ سنة)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!formData.name || !formData.age}
              >
                التالي
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Current Level */}
        {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">مستواك الحالي</CardTitle>
              <CardDescription>حدد مستوى حفظك الحالي للقرآن الكريم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={formData.currentLevel}
                onValueChange={(value) => setFormData({ ...formData, currentLevel: value })}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">مبتدئ (لم أحفظ شيئاً بعد)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="some-surahs" id="some-surahs" />
                  <Label htmlFor="some-surahs">حفظت بعض السور القصيرة</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="juz" id="juz" />
                  <Label htmlFor="juz">حفظت جزء أو أكثر</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="multiple-juz" id="multiple-juz" />
                  <Label htmlFor="multiple-juz">حفظت عدة أجزاء</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">حافظ متقدم (أكثر من 10 أجزاء)</Label>
                </div>
              </RadioGroup>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  السابق
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={!formData.currentLevel}
                >
                  التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Learning Preferences */}
        {step === 3 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">تفضيلات التعلم</CardTitle>
              <CardDescription>ساعدنا في تخصيص تجربتك التعليمية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>الوقت المتاح يومياً للحفظ</Label>
                <Select
                  value={formData.dailyTime}
                  onValueChange={(value) => setFormData({ ...formData, dailyTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الوقت المناسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 دقيقة</SelectItem>
                    <SelectItem value="30">30 دقيقة</SelectItem>
                    <SelectItem value="45">45 دقيقة</SelectItem>
                    <SelectItem value="60">ساعة واحدة</SelectItem>
                    <SelectItem value="90">ساعة ونصف</SelectItem>
                    <SelectItem value="120">ساعتان أو أكثر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>أسلوب التعلم المفضل</Label>
                <RadioGroup
                  value={formData.learningStyle}
                  onValueChange={(value) => setFormData({ ...formData, learningStyle: value })}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual">بصري (أتعلم بالرؤية والقراءة)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <Label htmlFor="auditory">سمعي (أتعلم بالاستماع)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <Label htmlFor="kinesthetic">حركي (أتعلم بالممارسة والكتابة)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="mixed" id="mixed" />
                    <Label htmlFor="mixed">مختلط (أحب التنويع)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  السابق
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={!formData.dailyTime || !formData.learningStyle}
                >
                  التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Final Setup */}
        {step === 4 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">اللمسة الأخيرة</CardTitle>
              <CardDescription>حدد هدفك وابدأ رحلتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>هدفك من الحفظ</Label>
                <Select value={formData.goals} onValueChange={(value) => setFormData({ ...formData, goals: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر هدفك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete">حفظ القرآن الكريم كاملاً</SelectItem>
                    <SelectItem value="specific-surahs">حفظ سور معينة</SelectItem>
                    <SelectItem value="daily-wird">تحسين الورد اليومي</SelectItem>
                    <SelectItem value="tajweed">إتقان التجويد</SelectItem>
                    <SelectItem value="review">مراجعة ما حفظته سابقاً</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>القارئ المفضل</Label>
                <Select
                  value={formData.preferredReciter}
                  onValueChange={(value) => setFormData({ ...formData, preferredReciter: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القارئ المفضل" />
                  </SelectTrigger>
                  <SelectContent>
                    {reciters.map((reciter) => (
                      <SelectItem key={reciter.name} value={reciter.name}>
                        {reciter.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">ملخص خطتك المخصصة:</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• الوقت اليومي: {formData.dailyTime} دقيقة</li>
                  <li>
                    • أسلوب التعلم:{" "}
                    {formData.learningStyle === "visual"
                      ? "بصري"
                      : formData.learningStyle === "auditory"
                        ? "سمعي"
                        : formData.learningStyle === "kinesthetic"
                          ? "حركي"
                          : "مختلط"}
                  </li>
                  <li>• المستوى: {formData.currentLevel === "beginner" ? "مبتدئ" : "متقدم"}</li>
                  <li>
                    • القارئ المفضل:{" "}
                    {reciters.find((r) => r.name === formData.preferredReciter)?.fullName || "غير محدد"}
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  السابق
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">ابدأ رحلتي مع فطرة</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
