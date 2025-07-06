"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Clock, Target, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function WelcomePage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSetup, setShowSetup] = useState(false)
  const [dailyTime, setDailyTime] = useState("")
  const [wirdAmount, setWirdAmount] = useState("")
  const [targetTime, setTargetTime] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
      setShowSetup(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const timeOptions = [
    { value: "15", label: "15 دقيقة", description: "للمبتدئين", icon: "⏰" },
    { value: "30", label: "30 دقيقة", description: "متوسط", icon: "⏱️" },
    { value: "45", label: "45 دقيقة", description: "متقدم", icon: "⏲️" },
    { value: "60", label: "ساعة واحدة", description: "مكثف", icon: "🕐" },
  ]

  const wirdOptions = [
    { value: "3-ayat", label: "3 آيات يومياً", description: "بداية مثالية", icon: "📖" },
    { value: "5-ayat", label: "5 آيات يومياً", description: "وتيرة جيدة", icon: "📚" },
    { value: "1-page", label: "صفحة واحدة", description: "تحدي متوسط", icon: "📄" },
    { value: "quarter-hizb", label: "ربع حزب", description: "للمتقدمين", icon: "📜" },
  ]

  const targetOptions = [
    { value: "6-months", label: "6 أشهر", description: "سريع ومكثف", icon: "🚀" },
    { value: "1-year", label: "سنة واحدة", description: "متوازن", icon: "🎯" },
    { value: "2-years", label: "سنتان", description: "مريح ومستدام", icon: "🌱" },
    { value: "3-years", label: "3 سنوات", description: "بطيء ومتقن", icon: "🏔️" },
  ]

  return (
    <div className="min-h-screen bg-[#CDBEA9] relative overflow-hidden">
      <AnimatePresence>
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen text-white px-6"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 relative">
                <Image src="/images/fitra-logo.png" alt="فطرة" width={48} height={48} className="object-contain" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-5xl font-bold mb-4 text-center"
            >
              فطرة
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl text-center opacity-90 leading-relaxed"
            >
              فِطْرَتَ اللّهِ الْتِي فَطَرَ النَاسَ عَلَيْهَا
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-12"
            >
              <div className="flex space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        ) : showSetup ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center px-6 py-8"
          >
            <div className="text-center text-white mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Image src="/images/fitra-logo.png" alt="فطرة" width={48} height={48}/>
              </div>
              <h1 className="text-2xl text-[#34725D] font-bold mb-2">ابدأ رحلتك</h1>
              <p className="text-white/80">حدد خطتك الشخصية</p>
            </div>

            <div className="space-y-8">
              {/* Daily Time Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Clock className="w-5 h-5" />
                  <label className="font-medium">الوقت المتاح يومياً</label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {timeOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 border-2 ${
                        dailyTime === option.value
                          ? "border-[#D7A96F] bg-[#D7A96F]/20 shadow-lg scale-105"
                          : "border-white/20 bg-white/90 hover:bg-white hover:scale-102"
                      }`}
                      onClick={() => setDailyTime(option.value)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-xl mb-1">{option.icon}</div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                        {dailyTime === option.value && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-[#AB5413] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Wird Amount Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Target className="w-5 h-5" />
                  <label className="font-medium">الورد اليومي</label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {wirdOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 border-2 ${
                        wirdAmount === option.value
                          ? "border-[#D7A96F] bg-[#D7A96F]/20 shadow-lg scale-105"
                          : "border-white/20 bg-white/90 hover:bg-white hover:scale-102"
                      }`}
                      onClick={() => setWirdAmount(option.value)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-xl mb-1">{option.icon}</div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                        {wirdAmount === option.value && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-[#AB5413] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Target Time Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Calendar className="w-5 h-5" />
                  <label className="font-medium">الهدف الزمني</label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {targetOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 border-2 ${
                        targetTime === option.value
                          ? "border-[#D7A96F] bg-[#D7A96F]/20 shadow-lg scale-105"
                          : "border-white/20 bg-white/90 hover:bg-white hover:scale-102"
                      }`}
                      onClick={() => setTargetTime(option.value)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-xl mb-1">{option.icon}</div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                        {targetTime === option.value && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-[#AB5413] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Link href="/dashboard">
                <Button
                  className="w-full bg-white text-[#AB5413] hover:bg-gray-50 py-4 rounded-xl font-medium text-lg mt-8 shadow-lg"
                  disabled={!dailyTime || !wirdAmount || !targetTime}
                >
                  ابدأ رحلتي
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
