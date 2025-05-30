"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { Bell, Send, Edit, Trash2, Users, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminNotificationsPage() {
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    targetRole: "",
  })

  // Mock data for sent notifications
  const notifications = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message: "The system will be under maintenance on Sunday from 2 AM to 6 AM.",
      targetRole: "All",
      sentBy: "Admin User",
      timestamp: "2024-01-15 10:30 AM",
      recipients: 156,
      status: "Sent",
    },
    {
      id: 2,
      title: "New Loan Products Available",
      message: "We have introduced new loan products with competitive rates.",
      targetRole: "Member",
      sentBy: "Admin User",
      timestamp: "2024-01-14 2:15 PM",
      recipients: 120,
      status: "Sent",
    },
    {
      id: 3,
      title: "Monthly Report Submission Reminder",
      message: "Please submit your monthly reports by the end of this week.",
      targetRole: "Treasurer",
      sentBy: "Admin User",
      timestamp: "2024-01-13 9:00 AM",
      recipients: 5,
      status: "Sent",
    },
    {
      id: 4,
      title: "Welcome to SaccoSmart",
      message: "Welcome to our new digital platform. Explore all the features available.",
      targetRole: "All",
      sentBy: "System",
      timestamp: "2024-01-12 8:00 AM",
      recipients: 156,
      status: "Draft",
    },
  ]

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: any) => <div className="font-medium max-w-[200px] truncate">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }: any) => (
        <div className="max-w-[300px] truncate text-sm text-gray-600">{row.getValue("message")}</div>
      ),
    },
    {
      accessorKey: "targetRole",
      header: "Target Audience",
      cell: ({ row }: any) => {
        const role = row.getValue("targetRole")
        const variant = role === "All" ? "default" : role === "Member" ? "secondary" : "outline"
        return <Badge variant={variant}>{role}</Badge>
      },
    },
    {
      accessorKey: "recipients",
      header: "Recipients",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Users className="h-3 w-3 text-gray-500" />
          <span>{row.getValue("recipients")}</span>
        </div>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Sent At",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-500" />
          <span className="text-sm">{row.getValue("timestamp")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        const variant = status === "Sent" ? "default" : "secondary"
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle notification sending
    console.log("Notification sent:", notificationForm)
    // Reset form
    setNotificationForm({
      title: "",
      message: "",
      targetRole: "",
    })
  }

  return (
    <DashboardLayout
      role="admin"
      user={{
        name: "Admin User",
        email: "admin@saccosmart.com",
        avatar: "/placeholder.svg?height=32&width=32",
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage and broadcast notifications to users</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sacco-blue hover:bg-sacco-blue/90">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Broadcast Notification</DialogTitle>
                <DialogDescription>Send a notification to selected user groups</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendNotification} className="space-y-4">
                <div>
                  <Label htmlFor="title">Notification Title</Label>
                  <Input
                    id="title"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                    placeholder="Enter notification title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="target-role">Target Audience</Label>
                  <Select
                    value={notificationForm.targetRole}
                    onValueChange={(value) => setNotificationForm({ ...notificationForm, targetRole: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="member">Members Only</SelectItem>
                      <SelectItem value="treasurer">Treasurers Only</SelectItem>
                      <SelectItem value="admin">Admins Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                    placeholder="Enter your notification message"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notification Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-blue">
                {notifications.filter((n) => n.status === "Sent").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Draft Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {notifications.filter((n) => n.status === "Draft").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {notifications.reduce((sum, n) => sum + n.recipients, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {notifications.filter((n) => n.timestamp.includes("2024-01")).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification History</span>
            </CardTitle>
            <CardDescription>View and manage all sent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={notifications} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
