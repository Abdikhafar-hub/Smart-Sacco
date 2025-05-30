"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { ChartCard } from "@/components/ui/chart-card"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, Banknote, TrendingUp, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  const user = {
    name: "Admin User",
    email: "admin@saccosmart.com",
    role: "Admin",
  }

  // Mock data
  const contributionsOverTime = [
    { name: "Jan", value: 150000 },
    { name: "Feb", value: 180000 },
    { name: "Mar", value: 165000 },
    { name: "Apr", value: 220000 },
    { name: "May", value: 195000 },
    { name: "Jun", value: 240000 },
  ]

  const loanStatusData = [
    { name: "Active", value: 45 },
    { name: "Pending", value: 12 },
    { name: "Completed", value: 78 },
    { name: "Defaulted", value: 5 },
  ]

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Made contribution",
      amount: "KES 5,000",
      time: "2 hours ago",
      type: "contribution",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Applied for loan",
      amount: "KES 50,000",
      time: "4 hours ago",
      type: "loan",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Loan payment",
      amount: "KES 3,000",
      time: "6 hours ago",
      type: "payment",
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "Profile updated",
      amount: "-",
      time: "1 day ago",
      type: "profile",
    },
  ]

  const activityColumns = [
    {
      key: "user",
      label: "User",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      sortable: true,
    },
    {
      key: "amount",
      label: "Amount",
      render: (value: string) => (value !== "-" ? value : "-"),
    },
    {
      key: "time",
      label: "Time",
      sortable: true,
    },
    {
      key: "type",
      label: "Type",
      render: (value: string) => {
        const colors = {
          contribution: "bg-green-100 text-green-800",
          loan: "bg-blue-100 text-blue-800",
          payment: "bg-purple-100 text-purple-800",
          profile: "bg-gray-100 text-gray-800",
        }
        return (
          <Badge className={colors[value as keyof typeof colors]} variant="secondary">
            {value}
          </Badge>
        )
      },
    },
  ]

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Overview of your SACCO management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="1,234"
            description="Active SACCO members"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Total Savings"
            value="KES 2.4M"
            description="All member contributions"
            icon={CreditCard}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Outstanding Loans"
            value="KES 850K"
            description="Active loan portfolio"
            icon={Banknote}
            trend={{ value: -3, isPositive: false }}
          />
          <StatsCard
            title="Monthly Growth"
            value="12.5%"
            description="Member growth rate"
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Contributions Over Time"
            description="Monthly contribution trends"
            type="line"
            data={contributionsOverTime}
            dataKey="value"
            xAxisKey="name"
          />
          <ChartCard
            title="Loan Status Distribution"
            description="Current loan portfolio breakdown"
            type="pie"
            data={loanStatusData}
            dataKey="value"
            xAxisKey="name"
          />
        </div>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              System Alerts
            </CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">5 Overdue Loan Payments</h4>
                  <p className="text-sm text-red-600 dark:text-red-300">Total amount: KES 45,000</p>
                </div>
                <Badge variant="destructive">High Priority</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">12 Pending Loan Applications</h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Awaiting approval</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                  Medium Priority
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">System Backup Completed</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">Last backup: 2 hours ago</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                  Info
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <DataTable
          data={recentActivities}
          columns={activityColumns}
          title="Recent System Activity"
          searchable={true}
          filterable={true}
          exportable={true}
          pageSize={5}
        />
      </div>
    </DashboardLayout>
  )
}
