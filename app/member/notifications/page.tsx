"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, Mail, AlertCircle } from "lucide-react"

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Monthly Contribution Reminder",
    message:
      "Your monthly contribution of KES 5,000 is due on 30th January 2024. Please ensure timely payment to avoid penalties.",
    timestamp: "2024-01-25T10:30:00Z",
    isRead: false,
    type: "reminder",
    sender: "SACCO Admin",
  },
  {
    id: 2,
    title: "Loan Application Approved",
    message:
      "Congratulations! Your loan application for KES 50,000 has been approved. The funds will be disbursed within 2 business days.",
    timestamp: "2024-01-24T14:15:00Z",
    isRead: true,
    type: "approval",
    sender: "Loan Officer",
  },
  {
    id: 3,
    title: "System Maintenance Notice",
    message:
      "The SACCO system will undergo scheduled maintenance on Sunday, 28th January from 2:00 AM to 6:00 AM. Services may be temporarily unavailable.",
    timestamp: "2024-01-23T09:00:00Z",
    isRead: false,
    type: "system",
    sender: "IT Department",
  },
  {
    id: 4,
    title: "Dividend Payment Processed",
    message:
      "Your annual dividend of KES 2,500 has been credited to your account. Thank you for being a valued member.",
    timestamp: "2024-01-22T16:45:00Z",
    isRead: true,
    type: "payment",
    sender: "Finance Department",
  },
  {
    id: 5,
    title: "AGM Meeting Invitation",
    message:
      "You are invited to attend the Annual General Meeting on 15th February 2024 at 10:00 AM. Venue: SACCO Hall.",
    timestamp: "2024-01-20T11:20:00Z",
    isRead: false,
    type: "meeting",
    sender: "Secretary",
  },
]

export default function MemberNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Member",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead)
      case "read":
        return notifications.filter((n) => n.isRead)
      default:
        return notifications
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "system":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "payment":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "meeting":
        return <Mail className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-orange-100 text-orange-800"
      case "approval":
        return "bg-green-100 text-green-800"
      case "system":
        return "bg-blue-100 text-blue-800"
      case "payment":
        return "bg-green-100 text-green-800"
      case "meeting":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const totalCount = notifications.length

  return (
    <DashboardLayout role="member" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with important messages and announcements</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              {unreadCount} unread
            </Badge>
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bell className="h-8 w-8 text-sacco-blue" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                  <p className="text-sm text-gray-600">Total Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-sm text-gray-600">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalCount - unreadCount}</p>
                  <p className="text-sm text-gray-600">Read Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>View and manage your notifications from SACCO administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="read">Read ({totalCount - unreadCount})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {getFilteredNotifications().length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notifications found</p>
                    </div>
                  ) : (
                    getFilteredNotifications().map((notification) => (
                      <Card
                        key={notification.id}
                        className={`transition-all hover:shadow-md ${!notification.isRead ? "border-l-4 border-l-sacco-blue bg-blue-50/30" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3
                                    className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                                  >
                                    {notification.title}
                                  </h3>
                                  {!notification.isRead && (
                                    <Badge variant="secondary" className="text-xs">
                                      New
                                    </Badge>
                                  )}
                                  <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                                    {notification.type}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>From: {notification.sender}</span>
                                  <span>{formatTimestamp(notification.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.isRead && (
                                <Button onClick={() => markAsRead(notification.id)} variant="outline" size="sm">
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
