"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Settings,
  Flame,
  Star,
  Menu,
  Home,
  BarChart3,
  User,
  Check,
  Headphones,
  RotateCcw,
  Eye,
  PenTool,
  FileText,
  Heart,
  Map,
  Trophy,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [showDrawer, setShowDrawer] = useState(false)

  const user = {
    name: "أحمد محمد",
    totalProgress: 12,
    points: 1250,
  }

  const dailyTasks = [
    { id: 1, name: "الاستماع", icon: Headphones, completed: true },
    { id: 2, name: "التكرار", icon: RotateCcw, completed: true },
    { id: 3, name: "القراءة", icon: Eye, completed: true },
    { id: 4, name: "الكتابة", icon: PenTool, completed: false },
    { id: 5, name: "التقييم", icon: FileText, completed: false },
  ]

  const completedTasks = dailyTasks.filter((task) => task.completed).length
  const totalTasks = dailyTasks.length

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between border-b">
        <button onClick={() => setShowDrawer(true)} className="p-2 -mr-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <Image src="/images/fitra-logo.png" alt="فطرة" width={32} height={32} className="object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-600">{user.points}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-64px)] px-4 py-4 flex flex-col">
        {/* Welcome Card */}
        <Card className="mb-4 bg-white text-[#764328] border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">أهلاً {user.name}</h2>
                <p className="text-[#D7A96F] text-sm">استمر في رحلتك المباركة</p>
              </div>
              <div className="text-right">
              
              {/* <!-- Circular Progress --> */}
              <div className="relative size-40">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  {/* <!-- Background Circle --> */}
                  <circle cx="18" cy="18" r="16" fill="none" 
                    className="stroke-current text-gray-200 " stroke-width="2"></circle>

                  {/* <!-- Progress Circle --> */}
                  <circle cx="18" cy="18" r="16" fill="none" 
                    className="stroke-current text-[#764328] " 
                    stroke-width="2" stroke-dasharray="100" stroke-dashoffset={100 - user.totalProgress} 
                    stroke-linecap="round"></circle>
                </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-center text-2xl font-bold text-[#764328]">
                      {user.totalProgress}%
                    </span>
                  </div>

                </div>

                <div className="text-xs opacity-90 flex items-center justify-center">من القرآن</div>
              </div>
              
            </div>
      
          </CardContent>
        </Card>

        {/* Daily Tasks - Single Row */}
        <Card className="mb-4 border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">مهام اليوم</h3>
              <Badge variant="secondary" className="bg-[#D7A96F]/20 text-[#AB5413]">
                {completedTasks}/{totalTasks}
              </Badge>
            </div>

            {/* Single Row Task List */}
            <div className="grid grid-cols-5 gap-2 mb-5">
              {dailyTasks.map((task, index) => (
                <div key={task.id} className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      task.completed ? "bg-[#AB5413] text-white" : "bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    {task.completed ? <Check className="w-5 h-5" /> : <task.icon className="w-5 h-5 text-[#AB5413]" />}
                  </div>
                  <div className={`text-xs font-medium ${task.completed ? "text-[#AB5413]" : "text-gray-900"}`}>
                    {task.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Action Button */}
            <div className="mb-2">
              <Link href="/memorization">
                <Button className="w-full bg-[#34725D] hover:bg-[#20524B] py-4 text-lg font-medium rounded-xl">
                  <Play className="w-6 h-6 mr-3" />
                  متابعة الحفظ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>



        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4 ">
          <Link href="/progress-map">
            <Button
              variant="outline"
              className="w-full h-60 py-3 flex flex-col items-center justify-center rounded-xl border-2 bg-white text-blue hover:bg-[#987B5E]/10"
            >
              <Map className="w-16 h-16 mr-2" strokeWidth={1}/>
              خريطة التقدم
            </Button>
          </Link>

          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="w-full h-60 py-3 flex flex-col items-center justify-center rounded-xl border-2 bg-white text-[#E5AE4E] hover:bg-[#987B5E]/10"
            >
              <Trophy className="w-16 h-16 mr-2" strokeWidth={1} />
               المتصدرين 

            </Button>
          </Link>

          <Link href="/settings">
            <Button
              variant="outline"
              className="w-full h-60 py-3 flex flex-col items-center justify-center rounded-xl border-2 bg-white text-grey hover:bg-[#987B5E]/10"
            >
              <Settings className="w-16 h-16 mr-2" strokeWidth={1} />
              الإعدادات 

            </Button>
          </Link>




        </div>




        {/* Daily Verse */}
        <Card className="mt-auto border-0 shadow-sm bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-[#764328] mb-2 text-sm">آية اليوم</h3>
            <blockquote className="text-[#AB5413] font-medium text-sm leading-relaxed">
              "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
            </blockquote>
            <p className="text-xs text-[#987B5E] mt-1">ولقد سهلنا القرآن للحفظ والفهم، فهل من متذكر؟</p>
          </CardContent>
        </Card>
      </main>

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDrawer(false)}>
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#AB5413] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.points} نقطة</p>
                </div>
              </div>

              <nav className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-500">الحساب</h4>
                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#D7A96F]/10 transition-colors"
                      onClick={() => setShowDrawer(false)}
                    >
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">الرئيسية</span>
                    </Link>
                    <Link
                      href="/progress"
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#D7A96F]/10 transition-colors"
                      onClick={() => setShowDrawer(false)}
                    >
                      <BarChart3 className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">التقدم</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#D7A96F]/10 transition-colors"
                      onClick={() => setShowDrawer(false)}
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">الإعدادات</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
