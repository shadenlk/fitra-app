"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Lock, Star, Crown, Heart, Flame, Trophy } from "lucide-react"
import Link from "next/link"

export default function ProgressMapPage() {
  const user = {
    lives: 5,
    streak: 7,
    points: 1250,
  }

  const progressData = [
    {
      id: 1,
      title: "سورة الفاتحة",
      subtitle: "أم الكتاب",
      lessons: [
        { id: 1, completed: true, current: false, locked: false },
        { id: 2, completed: true, current: false, locked: false },
        { id: 3, completed: true, current: false, locked: false },
        { id: 4, completed: false, current: true, locked: false },
        { id: 5, completed: false, current: false, locked: true },
      ],
      color: "from-emerald-400 to-emerald-600",
      mascot: "🦉",
    },
    {
      id: 2,
      title: "سورة البقرة",
      subtitle: "فسطاط القرآن",
      lessons: [
        { id: 6, completed: false, current: false, locked: true },
        { id: 7, completed: false, current: false, locked: true },
        { id: 8, completed: false, current: false, locked: true },
        { id: 9, completed: false, current: false, locked: true },
        { id: 10, completed: false, current: false, locked: true },
      ],
      color: "from-emerald-400 to-emerald-600",
      mascot: "🦉",
    },
    {
      id: 3,
      title: "سورة آل عمران",
      subtitle: "الزهراوان",
      lessons: [
        { id: 11, completed: false, current: false, locked: true },
        { id: 12, completed: false, current: false, locked: true },
        { id: 13, completed: false, current: false, locked: true },
        { id: 14, completed: false, current: false, locked: true },
        { id: 15, completed: false, current: false, locked: true },
      ],
      color: "from-emerald-400 to-emerald-600",
      mascot: "🦉",
    },
    {
      id: 4,
      title: "سورة النساء",
      subtitle: "سورة النساء الكبرى",
      lessons: [
        { id: 16, completed: false, current: false, locked: true },
        { id: 17, completed: false, current: false, locked: true },
        { id: 18, completed: false, current: false, locked: true },
        { id: 19, completed: false, current: false, locked: true },
        { id: 20, completed: false, current: false, locked: true },
      ],
      color: "from-emerald-400 to-emerald-600",
      mascot: "🦉",
    },
  ]

  const getLessonIcon = (lesson: any) => {
    if (lesson.completed) return <Star className="w-6 h-6 text-white" />
    if (lesson.current) return <Play className="w-6 h-6 text-white" />
    if (lesson.locked) return <Lock className="w-4 h-4 text-gray-400" />
    return <div className="w-3 h-3 bg-white rounded-full" />
  }

  const getLessonStyle = (lesson: any, sectionColor: string) => {
    if (lesson.completed) return "bg-gradient-to-br from-[#AB5413] to-[#764328] shadow-lg"
    if (lesson.current) return "bg-gradient-to-br from-[#AB5413] to-[#764328] shadow-lg animate-pulse"
    if (lesson.locked) return "bg-gray-300"
    return "bg-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7A96F]/20 to-[#987B5E]/20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between border-b">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="font-semibold text-gray-900">خريطة التقدم</h1>
          <p className="text-sm text-gray-600">رحلتك في حفظ القرآن</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-600">{user.lives}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">{user.streak}</span>
          </div>
        </div>
      </header>

      {/* Progress Map */}
      <main className="px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {progressData.map((section, sectionIndex) => (
            <div key={section.id} className="relative mb-16">
              {/* Section Header */}
              <div className="text-center mb-8">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-[#AB5413] to-[#764328] text-white border-0 px-4 py-2 text-sm font-medium"
                >
                  {section.title}
                </Badge>
                <p className="text-gray-600 text-sm mt-2">{section.subtitle}</p>
              </div>

              {/* Lessons Path */}
              <div className="relative">
                {/* Path Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="relative mb-8">
                    {/* Lesson Node */}
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${getLessonStyle(
                          lesson,
                          section.color,
                        )} border-4 border-white relative z-10`}
                      >
                        {getLessonIcon(lesson)}
                      </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="text-center mt-3">
                      <div className="text-gray-900 text-sm font-medium">الدرس {lesson.id}</div>
                      {lesson.completed && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Crown className="w-3 h-3 text-yellow-500" />
                          <span className="text-yellow-600 text-xs">مكتمل</span>
                        </div>
                      )}
                      {lesson.current && (
                        <Link href="/memorization">
                          <Button size="sm" className="mt-2 bg-[#AB5413] hover:bg-[#764328] text-white rounded-xl">
                            ابدأ الدرس
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Mascot Position */}
                    {lesson.current && (
                      <div className="absolute -right-8 top-0 text-4xl animate-bounce">{section.mascot}</div>
                    )}

                    {/* Treasure Chest (every 5 lessons) */}
                    {lesson.id % 5 === 0 && lesson.completed && (
                      <div className="absolute -left-8 top-0 text-3xl">🏆</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Section Completion Reward */}
              {section.lessons.every((lesson) => lesson.completed) && (
                <div className="text-center mt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#D7A96F] to-[#AB5413] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-yellow-600 font-bold">تم إكمال {section.title}!</div>
                  <div className="text-gray-600 text-sm">حصلت على 500 نقطة</div>
                </div>
              )}
            </div>
          ))}

          {/* Coming Soon Sections */}
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-500" />
            </div>
            <div className="text-gray-600 font-medium">المزيد من السور قريباً...</div>
            <div className="text-gray-500 text-sm mt-2">أكمل السور الحالية لفتح المزيد</div>
          </div>
        </div>
      </main>

      {/* Bottom Stats */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-50">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#AB5413]">{user.points}</div>
              <div className="text-gray-600 text-xs">النقاط</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{user.streak}</div>
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
