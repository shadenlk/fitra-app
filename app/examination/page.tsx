"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Heart, Mic, MicOff, PenTool, Volume2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ExaminationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [lives, setLives] = useState(5)
  const [score, setScore] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [inputMode, setInputMode] = useState<"write" | "voice">("write")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showTasmeeSection, setShowTasmeeSection] = useState(false)

  const examQuestions = [
    {
      id: 1,
      type: "complete",
      question: "أكمل الآية الكريمة:",
      beforeText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ",
      afterText: "",
      correctAnswer: "الرَّحِيمِ",
      alternatives: ["الرحيم", "الرَّحِيمِ", "الرحیم"],
    },
    {
      id: 2,
      type: "complete",
      question: "أكمل الآية الكريمة:",
      beforeText: "الْحَمْدُ لِلَّهِ",
      afterText: "",
      correctAnswer: "رَبِّ الْعَالَمِينَ",
      alternatives: ["رب العالمين", "رَبِّ الْعَالَمِينَ", "ربّ العالمین"],
    },
    {
      id: 3,
      type: "complete",
      question: "أكمل الآية الكريمة:",
      beforeText: "إِيَّاكَ نَعْبُدُ",
      afterText: "",
      correctAnswer: "وَإِيَّاكَ نَسْتَعِينُ",
      alternatives: ["وإياك نستعين", "وَإِيَّاكَ نَسْتَعِينُ", "و إیاک نستعین"],
    },
  ]

  const currentQ = examQuestions[currentQuestion]

  // Show progress after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate voice recognition
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setUserAnswer(currentQ.correctAnswer)
        setIsRecording(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isRecording, currentQ.correctAnswer])

  const checkAnswer = (answer: string) => {
    const normalizedAnswer = answer.trim().toLowerCase()
    const correctAnswers = [currentQ.correctAnswer, ...currentQ.alternatives].map((ans) => ans.toLowerCase().trim())

    return correctAnswers.some((correct) => {
      const normalizedCorrect = correct.replace(/[\u064B-\u0652]/g, "").replace(/\s+/g, " ")
      const normalizedInput = normalizedAnswer.replace(/[\u064B-\u0652]/g, "").replace(/\s+/g, " ")
      return normalizedCorrect === normalizedInput
    })
  }

  const handleSubmitAnswer = () => {
    const correct = checkAnswer(userAnswer)
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    } else {
      setLives(lives - 1)
      if (lives <= 1) {
        setTimeout(() => {
          alert("انتهت المحاولات! سيتم إعادة تشغيل الامتحان")
          setCurrentQuestion(0)
          setLives(5)
          setScore(0)
          setShowResult(false)
        }, 2000)
        return
      }
    }

    setTimeout(() => {
      if (currentQuestion < examQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setUserAnswer("")
        setShowResult(false)
      } else {
        // Show Tasmee section after completing questions
        setShowTasmeeSection(true)
        setShowResult(false)
      }
    }, 2000)
  }

  const handleVoiceToggle = () => {
    if (inputMode === "voice") {
      setIsRecording(!isRecording)
    }
  }

  const handleTasmeeComplete = () => {
    window.location.href = "/evaluation"
  }

  // Tasmee Section
  if (showTasmeeSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
          <Link href="/memorization">
            <Button variant="ghost" size="icon">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="font-semibold text-gray-900">التسميع النهائي</h1>
            <p className="text-sm text-gray-600">سمّع سورة الفاتحة كاملة</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-red-600">{lives}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6">
          <Card className="mb-6 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-[#AB5413] rounded-full flex items-center justify-center mx-auto">
                  <Volume2 className="w-12 h-12 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#AB5413] mb-2">التسميع النهائي</h3>
                  <p className="text-gray-600">
                    الآن حان وقت التسميع النهائي. اضغط على زر التسجيل وسمّع سورة الفاتحة كاملة من الذاكرة.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${
                    isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#AB5413] hover:bg-[#764328]"
                  } px-8 py-3 rounded-xl`}
                >
                  {isRecording ? <MicOff className="w-6 h-6 mr-2" /> : <Mic className="w-6 h-6 mr-2" />}
                  {isRecording ? "إيقاف التسميع" : "ابدأ التسميع"}
                </Button>

                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#D7A96F]/20 p-4 rounded-xl"
                  >
                    <div className="flex items-center justify-center gap-2 text-[#AB5413]">
                      <div className="w-3 h-3 bg-[#AB5413] rounded-full animate-pulse"></div>
                      <span>جاري تسجيل التسميع... سمّع بوضوح وهدوء</span>
                    </div>
                  </motion.div>
                )}

                <div className="bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20 rounded-xl p-4">
                  <h4 className="font-semibold text-[#764328] mb-2">نصائح للتسميع:</h4>
                  <ul className="text-sm text-[#AB5413] text-right space-y-1">
                    <li>• تحدث بوضوح وبصوت مسموع</li>
                    <li>• لا تتسرع في القراءة</li>
                    <li>• إذا أخطأت، توقف وأعد المحاولة</li>
                    <li>• تذكر أن الهدف هو التعلم والتحسن</li>
                  </ul>
                </div>

                <Button
                  onClick={handleTasmeeComplete}
                  className="w-full bg-[#AB5413] hover:bg-[#764328] py-3 text-lg rounded-xl"
                  disabled={!isRecording}
                >
                  إنهاء التسميع والانتقال للتقييم
                  <ArrowLeft className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <Link href="/memorization">
          <Button variant="ghost" size="icon">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="font-semibold text-gray-900">تقييم سورة الفاتحة</h1>
          <p className="text-sm text-gray-600">أكمل الآيات الناقصة</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-600">{lives}</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white px-4 py-3 border-b"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                السؤال {currentQuestion + 1} من {examQuestions.length}
              </span>
              <Badge variant="secondary" className="bg-[#D7A96F]/20 text-[#AB5413]">
                النتيجة: {score}/{examQuestions.length}
              </Badge>
            </div>
            <Progress value={((currentQuestion + 1) / examQuestions.length) * 100} className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-4 py-6">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-[#AB5413] mb-2">{currentQ.question}</h3>
              </div>

              {/* Question Text */}
              <div className="bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20 rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-arabic leading-relaxed text-gray-800 mb-4">
                    {currentQ.beforeText}{" "}
                    <span className="inline-block min-w-[100px] border-b-2 border-dashed border-[#AB5413] pb-1">
                      ______
                    </span>{" "}
                    {currentQ.afterText}
                  </div>
                  <div className="text-sm text-[#764328]">اكتب أو قل الكلمة المناسبة لإكمال الآية</div>
                </div>
              </div>

              {/* Input Mode Toggle */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setInputMode("write")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      inputMode === "write" ? "bg-white text-[#AB5413] shadow-sm" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <PenTool className="w-4 h-4" />
                    كتابة
                  </button>
                  <button
                    onClick={() => setInputMode("voice")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      inputMode === "voice" ? "bg-white text-[#AB5413] shadow-sm" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    صوت
                  </button>
                </div>
              </div>

              {/* Writing Input */}
              {inputMode === "write" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#AB5413] focus:outline-none text-lg font-arabic text-center resize-none"
                      placeholder="اكتب إجابتك هنا..."
                      rows={3}
                      dir="rtl"
                    />
                  </div>
                </motion.div>
              )}

              {/* Voice Input */}
              {inputMode === "voice" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
                  <div className="w-24 h-24 bg-[#AB5413] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-12 h-12 text-white" />
                  </div>

                  <Button
                    size="lg"
                    onClick={handleVoiceToggle}
                    className={`${
                      isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#AB5413] hover:bg-[#764328]"
                    } px-8 py-3 rounded-xl`}
                  >
                    {isRecording ? <MicOff className="w-6 h-6 mr-2" /> : <Mic className="w-6 h-6 mr-2" />}
                    {isRecording ? "إيقاف التسجيل" : "ابدأ التسجيل"}
                  </Button>

                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 bg-[#D7A96F]/20 p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-center gap-2 text-[#AB5413]">
                        <div className="w-3 h-3 bg-[#AB5413] rounded-full animate-pulse"></div>
                        <span>جاري الاستماع... قل إجابتك بوضوح</span>
                      </div>
                    </motion.div>
                  )}

                  {userAnswer && !isRecording && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-[#987B5E]/20 rounded-xl"
                    >
                      <div className="text-sm text-[#764328] mb-2">تم التعرف على:</div>
                      <div className="text-lg font-arabic text-[#AB5413]">{userAnswer}</div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || isRecording}
                  className="flex-1 bg-[#AB5413] hover:bg-[#764328] py-3 text-lg rounded-xl"
                >
                  {currentQuestion < examQuestions.length - 1 ? "التالي" : "التسميع النهائي"}
                  <ArrowLeft className="w-5 h-5 ml-2" />
                </Button>

                {/* Skip Button */}
                <Button
                  onClick={() => {
                    if (currentQuestion < examQuestions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1)
                      setUserAnswer("")
                      setShowResult(false)
                    } else {
                      setShowTasmeeSection(true)
                    }
                  }}
                  variant="outline"
                  className="px-6 py-3 rounded-xl border-[#987B5E] text-[#987B5E] hover:bg-[#987B5E]/10"
                >
                  تخطي
                </Button>
              </div>

              {/* Lives Warning */}
              {lives <= 2 && (
                <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 text-red-700">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      تحذير: تبقى لك {lives} {lives === 1 ? "محاولة" : "محاولات"} فقط!
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <Card className="w-full max-w-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                    {isCorrect ? (
                      <div className="w-16 h-16 bg-[#AB5413] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                        <XCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${isCorrect ? "text-[#AB5413]" : "text-red-600"}`}>
                    {isCorrect ? "إجابة صحيحة! 🎉" : "إجابة خاطئة"}
                  </h3>

                  <div className="text-gray-600 mb-4">
                    <div className="text-sm mb-2">إجابتك:</div>
                    <div className="text-lg font-arabic bg-gray-50 p-3 rounded-lg">{userAnswer}</div>
                  </div>

                  {!isCorrect && (
                    <div className="text-gray-600 mb-4">
                      <div className="text-sm mb-2">الإجابة الصحيحة:</div>
                      <div className="text-lg font-arabic bg-[#D7A96F]/20 p-3 rounded-lg text-[#AB5413]">
                        {currentQ.correctAnswer}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    {isCorrect ? "ممتاز! استمر في التقدم" : "لا تقلق، ستتحسن مع الممارسة"}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
