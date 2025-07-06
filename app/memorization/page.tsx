"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Play,
  Pause,
  Mic,
  MicOff,
  RotateCcw,
  CheckCircle,
  ArrowLeft,
  Headphones,
  PenTool,
  Eye,
  Info,
  Heart,
  BarChart3,
  Clock,
  Target,
  X,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function MemorizationPage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [stageProgress, setStageProgress] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0)
  const [showSurahInfo, setShowSurahInfo] = useState(false)
  const [lives, setLives] = useState(5)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [stageComplete, setStageComplete] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)

  const stages = [
    { id: 1, name: "الاستماع", icon: Headphones, color: "bg-[#AB5413]", description: "استمع للآيات بتركيز" },
    { id: 2, name: "التكرار", icon: RotateCcw, color: "bg-[#AB5413]", description: "كرر مع القارئ" },
    { id: 3, name: "القراءة", icon: Eye, color: "bg-[#AB5413]", description: "اقرأ مع التتبع" },
    { id: 4, name: "الكتابة", icon: PenTool, color: "bg-[#AB5413]", description: "اكتب لترسيخ الحفظ" },
  ]

  const CurrentStage = stages[currentStage - 1]
  const StageIcon = CurrentStage.icon

  const versesGroup = {
    surah: "الفاتحة",
    verses: "1-7",
    totalVerses: 7,
    totalWords: 29,
    revelationPlace: "مكة المكرمة",
    revelationOrder: 5,
    arabic: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      "الرَّحْمَٰنِ الرَّحِيمِ",
      "مَالِكِ يَوْمِ الدِّينِ",
      "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَي ْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    ],
    words: [
      ["بِسْمِ", "اللَّهِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"],
      ["الْحَمْدُ", "لِلَّهِ", "رَبِّ", "الْعَالَمِينَ"],
      ["الرَّحْمَٰنِ", "الرَّحِيمِ"],
      ["مَالِكِ", "يَوْمِ", "الدِّينِ"],
      ["إِيَّاكَ", "نَعْبُدُ", "وَإِيَّاكَ", "نَسْتَعِينُ"],
      ["اهْدِنَا", "الصِّرَاطَ", "الْمُسْتَقِيمَ"],
      ["صِرَاطَ", "الَّذِينَ", "أَنْعَمْتَ", "عَلَيْهِمْ", "غَيْرِ", "الْمَغْضُوبِ", "عَلَيْهِمْ", "وَلَا", "الضَّالِّينَ"],
    ],
  }

  // Show progress after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 1000)
    return () => clearTimeout(timer)
  }, [currentStage])

  // Word highlighting for stage 3 - faster
  useEffect(() => {
    if (currentStage === 3 && isPlaying) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => {
          const totalWords = versesGroup.words.flat().length
          if (prev >= totalWords - 1) {
            setStageProgress(100)
            setStageComplete(true)
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 400) // Faster word progression

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentStage])

  // Basic audio simulation
  useEffect(() => {
    if (isPlaying && currentStage !== 3) {
      const interval = setInterval(() => {
        setStageProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            setStageComplete(true)
            return 100
          }
          return prev + 5
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentStage])

  const handleStageComplete = () => {
    setShowSuccess(true)
    setTimeout(() => {
      if (currentStage < 4) {
        setCurrentStage(currentStage + 1)
        setStageProgress(0)
        setStageComplete(false)
        setShowProgress(false)
        setShowSuccess(false)
        setUserInput("")
        setCurrentVerseIndex(0)
        setCurrentWordIndex(0)
      } else {
        window.location.href = "/examination"
      }
    }, 2000)
  }

  const getCurrentWordIndex = () => {
    let wordCount = 0
    for (let i = 0; i < versesGroup.words.length; i++) {
      for (let j = 0; j < versesGroup.words[i].length; j++) {
        if (wordCount === currentWordIndex) {
          return { verseIndex: i, wordIndex: j }
        }
        wordCount++
      }
    }
    return { verseIndex: 0, wordIndex: 0 }
  }

  const renderHighlightedText = () => {
    const { verseIndex: currentVerseIdx, wordIndex: currentWordIdx } = getCurrentWordIndex()

    return versesGroup.words.map((verse, verseIndex) => (
      <div key={verseIndex} className="text-2xl font-arabic leading-relaxed text-gray-800 p-4 bg-white rounded-lg mb-3">
        <span className="inline-block w-8 h-8 bg-[#AB5413] text-white rounded-full text-sm flex items-center justify-center mr-3 mb-2">
          {verseIndex + 1}
        </span>
        <div className="inline">
          {verse.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className={`inline-block mx-1 px-2 py-1 rounded transition-all duration-300 ${
                verseIndex === currentVerseIdx && wordIndex === currentWordIdx && isPlaying
                  ? "bg-[#AB5413] text-white shadow-lg transform scale-110"
                  : verseIndex < currentVerseIdx || (verseIndex === currentVerseIdx && wordIndex < currentWordIdx)
                    ? "bg-[#D7A96F]/30 text-[#764328]"
                    : "text-gray-800"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    ))
  }

  const handlePlayButtonClick = () => {
    setClickCount((prev) => prev + 1)

    if (clickTimer) {
      clearTimeout(clickTimer)
    }

    const timer = setTimeout(() => {
      if (clickCount === 0) {
        setIsPlaying(!isPlaying)
      } else if (clickCount === 1) {
        setStageProgress(100)
        setStageComplete(true)
        setIsPlaying(false)
      }
      setClickCount(0)
    }, 300)

    setClickTimer(timer)
  }

  const BasicAudioPlayer = () => (
    <div className="bg-white rounded-xl p-6 border shadow-sm text-center">
      <div className="w-20 h-20 bg-[#AB5413] rounded-full flex items-center justify-center mx-auto mb-4">
        <StageIcon className="w-10 h-10 text-white" />
      </div>

      <Button
        size="lg"
        onClick={handlePlayButtonClick}
        className="bg-[#AB5413] hover:bg-[#764328] px-8 py-3 rounded-xl"
      >
        {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
        {isPlaying ? "إيقاف" : "تشغيل"}
      </Button>
    </div>
  )

  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer)
      }
    }
  }, [clickTimer])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="font-semibold text-gray-900">رحلة الحفظ</h1>
          <p className="text-sm text-gray-600">
            {versesGroup.surah} - آيات {versesGroup.verses}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-600">{lives}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSurahInfo(!showSurahInfo)}
            className="text-[#AB5413]"
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Surah Info Modal */}
      <AnimatePresence>
        {showSurahInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSurahInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">معلومات السورة</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowSurahInfo(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 relative mx-auto mb-3">
                    <Image src="/images/fitra-logo.png" alt="فطرة" width={64} height={64} className="object-contain" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#AB5413] mb-2">سورة {versesGroup.surah}</h4>
                  <p className="text-gray-600">أم الكتاب</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-[#D7A96F]/20 border-[#D7A96F]">
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="w-6 h-6 text-[#AB5413] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#AB5413]">{versesGroup.totalVerses}</div>
                      <div className="text-sm text-[#764328]">آية</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#987B5E]/20 border-[#987B5E]">
                    <CardContent className="p-4 text-center">
                      <Target className="w-6 h-6 text-[#764328] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#764328]">{versesGroup.totalWords}</div>
                      <div className="text-sm text-[#987B5E]">كلمة</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#D7A96F]/20 border-[#D7A96F]">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-6 h-6 text-[#AB5413] mx-auto mb-2" />
                      <div className="text-lg font-bold text-[#AB5413]">مكية</div>
                      <div className="text-sm text-[#764328]">النزول</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#987B5E]/20 border-[#987B5E]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">📜</div>
                      <div className="text-lg font-bold text-[#764328]">#{versesGroup.revelationOrder}</div>
                      <div className="text-sm text-[#987B5E]">ترتيب النزول</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">فضل السورة</h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    سورة الفاتحة هي أعظم سورة في القرآن الكريم، وهي ركن من أركان الصلاة، تحتوي على جميع معاني القرآن
                    الكريم.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-[#AB5413] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#AB5413] mb-2">ممتاز! 🎉</h3>
              <p className="text-gray-600 mb-4">أكملت مرحلة {CurrentStage.name} بنجاح</p>
              <div className="text-sm text-[#764328]">الانتقال للمرحلة التالية...</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#AB5413] text-white px-4 py-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <StageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              المرحلة {currentStage}: {CurrentStage.name}
            </h2>
            <p className="text-[#D7A96F]">{CurrentStage.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white px-4 py-3 border-b"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">التقدم</span>
              <Badge variant="secondary" className="bg-[#D7A96F]/20 text-[#AB5413]">
                {Math.round(stageProgress)}%
              </Badge>
            </div>
            <Progress value={stageProgress} className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-4 py-6">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Stage 1: Listen Only */}
          {currentStage === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">استمع للآيات بتركيز وانتباه</p>
                <p className="text-sm text-[#AB5413] mt-2">سيتم تشغيل التلاوة بصوت القارئ المفضل لديك</p>
              </div>
              <BasicAudioPlayer />
            </div>
          )}

          {/* Stage 2: Repeat */}
          {currentStage === 2 && (
            <div className="space-y-6">
              <BasicAudioPlayer />
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#AB5413] hover:bg-[#764328]"} px-8 py-3 rounded-xl`}
                >
                  {isRecording ? <MicOff className="w-6 h-6 mr-2" /> : <Mic className="w-6 h-6 mr-2" />}
                  {isRecording ? "إيقاف التكرار" : "ابدأ التكرار"}
                </Button>
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 bg-[#D7A96F]/20 p-4 rounded-xl"
                  >
                    <div className="flex items-center justify-center gap-2 text-[#AB5413]">
                      <div className="w-3 h-3 bg-[#AB5413] rounded-full animate-pulse"></div>
                      <span>جاري التسجيل...</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Stage 3: Read with highlighting */}
          {currentStage === 3 && (
            <div className="space-y-6">
              <BasicAudioPlayer />
              <div className="bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20 rounded-2xl p-6">
                <h4 className="font-semibold text-[#AB5413] mb-4 text-center">تتبع النص</h4>
                <div className="space-y-3 text-right">{renderHighlightedText()}</div>
              </div>
            </div>
          )}

          {/* Stage 4: Writing */}
          {currentStage === 4 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#AB5413]">اكتب الآية {currentVerseIndex + 1}</h4>
                  <Badge variant="secondary" className="bg-[#D7A96F]/20 text-[#AB5413]">
                    {currentVerseIndex + 1}/{versesGroup.arabic.length}
                  </Badge>
                </div>

                <div className="relative bg-white rounded-xl p-4 border-2 border-[#D7A96F] min-h-[120px]">
                  <div className="absolute inset-4 text-lg font-arabic text-gray-300 pointer-events-none leading-relaxed opacity-50">
                    {versesGroup.arabic[currentVerseIndex]}
                  </div>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="relative z-10 w-full h-full bg-transparent text-lg font-arabic text-gray-800 resize-none focus:outline-none leading-relaxed"
                    dir="rtl"
                  />
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  <Button
                    onClick={() => {
                      if (currentVerseIndex < versesGroup.arabic.length - 1) {
                        setCurrentVerseIndex(currentVerseIndex + 1)
                        setUserInput("")
                      } else {
                        setStageProgress(100)
                        setStageComplete(true)
                      }
                    }}
                    className="bg-[#AB5413] hover:bg-[#764328] px-8 py-3 rounded-xl"
                  >
                    <PenTool className="w-5 h-5 mr-2" />
                    {currentVerseIndex < versesGroup.arabic.length - 1 ? "الآية التالية" : "إنهاء الكتابة"}
                  </Button>

                  {currentVerseIndex > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentVerseIndex(currentVerseIndex - 1)
                        setUserInput("")
                      }}
                      className="px-8 py-3 rounded-xl border-[#987B5E] text-[#987B5E] hover:bg-[#987B5E]/10"
                    >
                      الآية السابقة
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <AnimatePresence>
          {(stageComplete || stageProgress >= 100) && !showSuccess && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <Button
                className="w-full bg-[#AB5413] hover:bg-[#764328] py-4 text-lg font-medium rounded-xl"
                onClick={handleStageComplete}
              >
                {currentStage < 4 ? "المرحلة التالية" : "التقييم"}
                <ArrowLeft className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
