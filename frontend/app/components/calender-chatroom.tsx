import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar, Users, Hash, ChevronLeft, ChevronRight } from "lucide-react"

interface ChatRoom {
  id: string
  title: string
  group: string
  channel: string
  date: string
}

const groups = [
  { id: "development", name: "開発チーム" },
  { id: "design", name: "デザインチーム" },
  { id: "marketing", name: "マーケティングチーム" },
  { id: "sales", name: "営業チーム" },
  { id: "general", name: "全体" },
]

const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

const dayNames = ["月", "火", "水", "木", "金", "土", "日"]

export default function CalendarChatroom() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [channelName, setChannelName] = useState<string>("")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      title: "プロジェクト会議",
      group: "development",
      channel: "project-meeting",
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "デザインレビュー",
      group: "design",
      channel: "design-review",
      date: "2024-01-20",
    },
  ])

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    setSelectedDate(dateStr)
    setIsModalOpen(true)
  }

  const handleCreateChatRoom = () => {
    if (!selectedGroup || !channelName.trim()) {
      return
    }

    const groupName = groups.find((g) => g.id === selectedGroup)?.name || ""
    const newChatRoom: ChatRoom = {
      id: Date.now().toString(),
      title: `${groupName} - ${channelName}`,
      group: selectedGroup,
      channel: channelName,
      date: selectedDate,
    }

    setChatRooms([...chatRooms, newChatRoom])
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGroup("")
    setChannelName("")
    setSelectedDate("")
  }

  function getGroupColor(groupId: string): string {
    const colors: Record<string, string> = {
      development: "#3b82f6",
      design: "#8b5cf6",
      marketing: "#f59e0b",
      sales: "#10b981",
      general: "#6b7280",
    }
    return colors[groupId] || "#6b7280"
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Monday = 0

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getChatRoomsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return chatRooms.filter((room) => room.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">チャットルーム管理カレンダー</h1>
        <p className="text-gray-600">日付をクリックして新しいチャットルームを作成できます</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
          </h2>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 border-b">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 h-24"></div>
            }

            const roomsForDay = getChatRoomsForDate(day)
            const isToday = day.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`p-2 h-24 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isToday ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {roomsForDay.slice(0, 2).map((room) => (
                    <div
                      key={room.id}
                      className="text-xs p-1 rounded text-white truncate"
                      style={{ backgroundColor: getGroupColor(room.group) }}
                      title={room.title}
                    >
                      {room.title}
                    </div>
                  ))}
                  {roomsForDay.length > 2 && (
                    <div className="text-xs text-gray-500">+{roomsForDay.length - 2} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              チャットルーム作成
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">選択日付</Label>
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })
                  : ""}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="group" className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                グループ
              </Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="グループを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel" className="text-sm font-medium flex items-center gap-2">
                <Hash className="w-4 h-4" />
                チャンネル名
              </Label>
              <Input
                id="channel"
                placeholder="チャンネル名を入力してください"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCloseModal} className="flex-1">
              キャンセル
            </Button>
            <Button onClick={handleCreateChatRoom} disabled={!selectedGroup || !channelName.trim()} className="flex-1">
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 作成済みチャットルーム一覧 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">作成済みチャットルーム</h2>
        <div className="grid gap-3">
          {chatRooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getGroupColor(room.group) }} />
                <div>
                  <h3 className="font-medium">{room.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(room.date).toLocaleDateString("ja-JP")} • #{room.channel}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-400">{groups.find((g) => g.id === room.group)?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

