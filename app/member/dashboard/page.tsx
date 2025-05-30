"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { ChartCard } from "@/components/ui/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Banknote, TrendingUp, Calendar, Bell, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function MemberDashboard() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Member",
  }

  const router = useRouter()
  const { toast } = useToast()

  // Quick action handlers
  const handleMakeContribution = () => {
    router.push("/member/contributions")
  }

  const handleApplyForLoan = () => {
    router.push("/member/loans")
  }

  const handleViewStatements = () => {
    router.push("/member/reports")
  }

  const handleDownloadReports = () => {
    toast({
      title: "Download Started",
      description: "Your monthly report is being generated...",
    })
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your report has been downloaded successfully",
      })
    }, 2000)
  }

  // Mock data
  const contributionData = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 7000 },
    { name: "Mar", value: 6000 },
    { name: "Apr", value: 8000 },
    { name: "May", value: 9000 },
    { name: "Jun", value: 7500 },
  ]

  const notifications = [
    {
      id: 1,
      title: "Contribution Confirmed",
      message: "Your KES 5,000 contribution has been confirmed",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Loan Payment Due",
      message: "Your loan payment of KES 3,000 is due in 3 days",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Monthly Statement",
      message: "Your monthly statement is now available",
      time: "3 days ago",
      type: "info",
    },
  ]

  return (
    <DashboardLayout role="member" user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's an overview of your SACCO account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Savings"
            value="KES 45,000"
            description="Your total contributions"
            icon={CreditCard}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Loan"
            value="KES 25,000"
            description="Current loan balance"
            icon={Banknote}
            trend={{ value: -8, isPositive: false }}
          />
          <StatsCard title="Monthly Target" value="80%" description="KES 4,000 of KES 5,000" icon={TrendingUp} />
          <StatsCard title="Next Due Date" value="Dec 15" description="Loan payment due" icon={Calendar} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contribution Progress */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Monthly Contributions"
              description="Your contribution history over the last 6 months"
              type="bar"
              data={contributionData}
              dataKey="value"
              xAxisKey="name"
            />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-between bg-sacco-blue hover:bg-sacco-blue/90"
                onClick={handleMakeContribution}
              >
                Make Contribution
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={handleApplyForLoan}>
                Apply for Loan
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={handleViewStatements}>
                View Statements
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={handleDownloadReports}>
                Download Reports
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contribution Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Contribution Progress</CardTitle>
              <CardDescription>Track your progress towards monthly target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Month</span>
                  <span>KES 4,000 / KES 5,000</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Contributed</p>
                  <p className="font-semibold text-green-600">KES 4,000</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Remaining</p>
                  <p className="font-semibold text-orange-600">KES 1,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <Badge
                      variant={
                        notification.type === "success"
                          ? "default"
                          : notification.type === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
