"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Medal, Crown, Star, Flame, TrendingUp, Calendar, Users, Target } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly")

  const currentUser = {
    id: "current",
    name: "أحمد محمد",
    rank: 15,
    points: 1250,
    streak: 7,
    versesMemorized: 47,
    avatar: "👤",
  }

  const leaderboardData = {
    weekly: [
      {
        id: 1,
        name: "محمد عبدالله",
        points: 2850,
        streak: 12,
        versesMemorized: 89,
        avatar: "🧔",
        badge: "المتصدر",
        change: "+2",
      },
      {
        id: 2,
        name: "فاطمة أحمد",
        points: 2720,
        streak: 15,
        versesMemorized: 76,
        avatar: "👩",
        badge: "المثابرة",
        change: "-1",
      },
      {
        id: 3,
        name: "عبدالرحمن محمد",
        points: 2650,
        streak: 9,
        versesMemorized: 82,
        avatar: "👨",
        badge: "المتقن",
        change: "+1",
      },
      {
        id: 4,
        name: "عائشة سالم",
        points: 2480,
        streak: 11,
        versesMemorized: 71,
        avatar: "👩‍🦱",
        badge: "النشيطة",
        change: "0",
      },
      {
        id: 5,
        name: "يوسف إبراهيم",
        points: 2350,
        streak: 8,
        versesMemorized: 65,
        avatar: "👨‍🦲",
        badge: "المجتهد",
        change: "+3",
      },
    ],
    monthly: [
      {
        id: 1,
        name: "فاطمة أحمد",
        points: 8920,
        streak: 28,
        versesMemorized: 156,
        avatar: "👩",
        badge: "ملكة الشهر",
        change: "+1",
      },
      {
        id: 2,
        name: "محمد عبدالله",
        points: 8750,
        streak: 25,
        versesMemorized: 142,
        avatar: "🧔",
        badge: "المتميز",
        change: "-1",
      },
      {
        id: 3,
        name: "عبدالرحمن محمد",
        points: 8420,
        streak: 22,
        versesMemorized: 138,
        avatar: "👨",
        badge: "المستمر",
        change: "0",
      },
    ],
    allTime: [
      {
        id: 1,
        name: "عبدالرحمن محمد",
        points: 25680,
        streak: 45,
        versesMemorized: 892,
        avatar: "👨",
        badge: "أسطورة فطرة",
        change: "0",
      },
      {
        id: 2,
        name: "فاطمة أحمد",
        points: 24950,
        streak: 52,
        versesMemorized: 856,
        avatar: "👩",
        badge: "حافظة القرآن",
        change: "0",
      },
      {
        id: 3,
        name: "محمد عبدالله",
        points: 23780,
        streak: 38,
        versesMemorized: 798,
        avatar: "🧔",
        badge: "المعلم",
        change: "0",
      },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600"
    if (change.startsWith("-")) return "text-red-600"
    return "text-gray-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="font-semibold text-gray-900">المتصدرين</h1>
          <p className="text-sm text-gray-600">تنافس مع المجتمع</p>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Current User Rank */}
      <div className="px-4 py-4 bg-gradient-to-r from-[#AB5413] to-[#764328]">
        <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{currentUser.avatar}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{currentUser.name}</h3>
                <p className="text-sm opacity-90">مرتبتك الحالية</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">#{currentUser.rank}</div>
                <div className="text-sm opacity-90">{currentUser.points} نقطة</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex bg-white rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === "weekly" ? "bg-[#AB5413] text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-1" />
            أسبوعي
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === "monthly" ? "bg-[#AB5413] text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-1" />
            شهري
          </button>
          <button
            onClick={() => setActiveTab("allTime")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === "allTime" ? "bg-[#AB5413] text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-1" />
            الأفضل
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <main className="px-4 pb-6">
        <div className="space-y-3">
          {leaderboardData[activeTab as keyof typeof leaderboardData].map((user, index) => (
            <Card key={user.id} className="border-0 shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">{getRankIcon(index + 1)}</div>

                  {/* Avatar */}
                  <div className="text-2xl">{user.avatar}</div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.badge && (
                        <Badge variant="secondary" className="text-xs bg-[#D7A96F]/20 text-[#AB5413]">
                          {user.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{user.points}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{user.streak}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>{user.versesMemorized}</span>
                      </div>
                    </div>
                  </div>

                  {/* Change */}
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getChangeColor(user.change)}`}>
                      {user.change !== "0" && user.change}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-[#D7A96F]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#AB5413]" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">المشاركون</h4>
              <p className="text-2xl font-bold text-[#AB5413]">2,847</p>
              <p className="text-xs text-gray-600">مستخدم نشط</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-[#987B5E]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-[#764328]" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">هدفك</h4>
              <p className="text-2xl font-bold text-[#764328]">المرتبة 10</p>
              <p className="text-xs text-gray-600">5 مراتب للوصول</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="mt-6 border-0 shadow-sm bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-[#AB5413] mx-auto mb-3" />
            <h4 className="font-semibold text-[#764328] mb-2">استمر في التقدم!</h4>
            <p className="text-sm text-[#AB5413] leading-relaxed">
              كل آية تحفظها تقربك خطوة من المقدمة. المنافسة الحقيقية مع نفسك، والآخرون يحفزونك للأفضل.
            </p>
          </CardContent>
        </Card>
      </main>
      {/* Bottom Stats */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-50">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#AB5413]">{currentUser.points}</div>
              <div className="text-gray-600 text-xs">النقاط</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{currentUser.streak}</div>
              <div className="text-gray-600 text-xs">أيام متتالية</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#AB5413]">3</div>
              <div className="text-gray-600 text-xs">دروس مكتملة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
