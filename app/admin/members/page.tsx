"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { ChartCard } from "@/components/ui/chart-card"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  UserPlus,
  FileText,
  Mail,
  Phone,
  Edit,
  UserCheck,
  Send,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminMembers() {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isApprovalOpen, setIsApprovalOpen] = useState(false)
  const [isBulkMessageOpen, setIsBulkMessageOpen] = useState(false)
  const [approvalData, setApprovalData] = useState({
    memberId: "",
    action: "",
    comments: "",
  })
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationalId: "",
    address: "",
    membershipType: "",
    initialContribution: "",
  })
  const [bulkMessage, setBulkMessage] = useState({
    subject: "",
    message: "",
    recipients: "all",
  })
  const { toast } = useToast()

  const user = {
    name: "Admin User",
    email: "admin@saccosmart.com",
    role: "Admin",
  }

  // Mock data for member statistics
  const memberStats = {
    totalMembers: 1247,
    activeMembers: 1156,
    pendingApproval: 23,
    inactiveMembers: 68,
    newThisMonth: 45,
    membershipGrowth: 8.2,
    averageContribution: 12500,
    retentionRate: 94.5,
  }

  // Mock data for charts
  const memberGrowthTrends = [
    { name: "Jan", new: 32, total: 1102 },
    { name: "Feb", new: 28, total: 1130 },
    { name: "Mar", new: 35, total: 1165 },
    { name: "Apr", new: 41, total: 1206 },
    { name: "May", new: 38, total: 1244 },
    { name: "Jun", new: 45, total: 1289 },
  ]

  const membershipTypes = [
    { name: "Regular", value: 980 },
    { name: "Premium", value: 156 },
    { name: "Student", value: 89 },
    { name: "Senior", value: 22 },
  ]

  const ageDistribution = [
    { name: "18-25", value: 145 },
    { name: "26-35", value: 456 },
    { name: "36-45", value: 389 },
    { name: "46-55", value: 178 },
    { name: "56+", value: 79 },
  ]

  const memberStatusDistribution = [
    { name: "Active", value: 1156 },
    { name: "Inactive", value: 68 },
    { name: "Suspended", value: 12 },
    { name: "Pending", value: 23 },
  ]

  // Mock pending member applications
  const pendingMembers = [
    {
      id: "APP001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+254712345678",
      nationalId: "12345678",
      membershipType: "Regular",
      appliedDate: "2024-01-15",
      initialContribution: 5000,
      status: "Pending",
      documents: ["ID Copy", "Passport Photo"],
      referredBy: "Jane Smith (MEM002)",
    },
    {
      id: "APP002",
      firstName: "Mary",
      lastName: "Johnson",
      email: "mary.johnson@email.com",
      phone: "+254723456789",
      nationalId: "87654321",
      membershipType: "Premium",
      appliedDate: "2024-01-14",
      initialContribution: 15000,
      status: "Pending",
      documents: ["ID Copy", "Passport Photo", "Income Statement"],
      referredBy: "Self Registration",
    },
  ]

  // Mock active members
  const activeMembers = [
    {
      id: "MEM001",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@email.com",
      phone: "+254734567890",
      nationalId: "11223344",
      membershipType: "Regular",
      joinDate: "2023-06-15",
      status: "Active",
      totalContributions: 75000,
      currentBalance: 82500,
      lastContribution: "2024-01-15",
      loanBalance: 25000,
      complianceRate: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "MEM002",
      firstName: "David",
      lastName: "Brown",
      email: "david.brown@email.com",
      phone: "+254745678901",
      nationalId: "55667788",
      membershipType: "Premium",
      joinDate: "2023-03-20",
      status: "Active",
      totalContributions: 120000,
      currentBalance: 135000,
      lastContribution: "2024-01-14",
      loanBalance: 0,
      complianceRate: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "MEM003",
      firstName: "Lisa",
      lastName: "Davis",
      email: "lisa.davis@email.com",
      phone: "+254756789012",
      nationalId: "99887766",
      membershipType: "Regular",
      joinDate: "2023-09-10",
      status: "Active",
      totalContributions: 45000,
      currentBalance: 48000,
      lastContribution: "2023-12-15",
      loanBalance: 15000,
      complianceRate: 85,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock inactive members
  const inactiveMembers = [
    {
      id: "MEM004",
      firstName: "Robert",
      lastName: "Taylor",
      email: "robert.taylor@email.com",
      phone: "+254767890123",
      nationalId: "44556677",
      membershipType: "Regular",
      joinDate: "2022-11-05",
      status: "Inactive",
      totalContributions: 35000,
      currentBalance: 38000,
      lastContribution: "2023-08-15",
      loanBalance: 0,
      complianceRate: 45,
      inactiveSince: "2023-09-01",
      reason: "Non-payment of contributions",
    },
  ]

  const pendingColumns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {row.firstName[0]}
              {row.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{`${row.firstName} ${row.lastName}`}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "membershipType",
      label: "Type",
      render: (value: string) => (
        <Badge
          className={
            value === "Premium"
              ? "bg-purple-100 text-purple-800"
              : value === "Student"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
          }
          variant="secondary"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "initialContribution",
      label: "Initial Contribution",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "appliedDate",
      label: "Applied",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          {value}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => viewMemberDetails(row)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            onClick={() => openApprovalDialog(row, "approve")}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => openApprovalDialog(row, "reject")}>
            <XCircle className="h-3 w-3 mr-1" />
            Reject
          </Button>
        </div>
      ),
    },
  ]

  const activeColumns = [
    {
      key: "name",
      label: "Member",
      sortable: true,
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.avatar || "/placeholder.svg"} alt={`${row.firstName} ${row.lastName}`} />
            <AvatarFallback>
              {row.firstName[0]}
              {row.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{`${row.firstName} ${row.lastName}`}</p>
            <p className="text-sm text-gray-500">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "membershipType",
      label: "Type",
      render: (value: string) => (
        <Badge
          className={
            value === "Premium"
              ? "bg-purple-100 text-purple-800"
              : value === "Student"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
          }
          variant="secondary"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "currentBalance",
      label: "Balance",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "totalContributions",
      label: "Total Contributions",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "lastContribution",
      label: "Last Contribution",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "complianceRate",
      label: "Compliance",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{value}%</span>
          <div
            className={`h-2 w-12 rounded-full ${
              value >= 90 ? "bg-green-200" : value >= 70 ? "bg-yellow-200" : "bg-red-200"
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                value >= 90 ? "bg-green-600" : value >= 70 ? "bg-yellow-600" : "bg-red-600"
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge className="bg-green-100 text-green-800" variant="secondary">
          <CheckCircle className="h-3 w-3 mr-1" />
          {value}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => viewMemberDetails(row)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" onClick={() => editMember(row.id)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => contactMember(row.id)}>
            <Mail className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      ),
    },
  ]

  const inactiveColumns = [
    ...activeColumns.slice(0, -1),
    {
      key: "inactiveSince",
      label: "Inactive Since",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "reason",
      label: "Reason",
      render: (value: string) => (
        <p className="text-sm text-red-600 max-w-xs truncate" title={value}>
          {value}
        </p>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => viewMemberDetails(row)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" onClick={() => reactivateMember(row.id)} className="bg-green-600 hover:bg-green-700">
            <UserCheck className="h-3 w-3 mr-1" />
            Reactivate
          </Button>
          <Button size="sm" variant="outline" onClick={() => contactMember(row.id)}>
            <Phone className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      ),
    },
  ]

  const viewMemberDetails = (member: any) => {
    setSelectedMember(member)
    setIsDetailsOpen(true)
  }

  const openApprovalDialog = (member: any, action: string) => {
    setApprovalData({
      memberId: member.id,
      action,
      comments: "",
    })
    setIsApprovalOpen(true)
  }

  const handleMemberApproval = () => {
    const actionText = approvalData.action === "approve" ? "approved" : "rejected"
    toast({
      title: `Member ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      description: `Member application ${approvalData.memberId} has been ${actionText}`,
      variant: approvalData.action === "approve" ? "default" : "destructive",
    })
    setIsApprovalOpen(false)
    setApprovalData({ memberId: "", action: "", comments: "" })
  }

  const handleMemberRegistration = () => {
    toast({
      title: "Member Registered",
      description: `New member ${registrationData.firstName} ${registrationData.lastName} has been registered successfully`,
    })
    setIsRegistrationOpen(false)
    setRegistrationData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationalId: "",
      address: "",
      membershipType: "",
      initialContribution: "",
    })
  }

  const editMember = (memberId: string) => {
    toast({
      title: "Edit Member",
      description: `Opening edit form for member ${memberId}`,
    })
  }

  const contactMember = (memberId: string) => {
    toast({
      title: "Contact Member",
      description: `Opening contact options for member ${memberId}`,
    })
  }

  const reactivateMember = (memberId: string) => {
    toast({
      title: "Member Reactivated",
      description: `Member ${memberId} has been reactivated successfully`,
    })
  }

  const suspendMember = (memberId: string) => {
    toast({
      title: "Member Suspended",
      description: `Member ${memberId} has been suspended`,
      variant: "destructive",
    })
  }

  const deleteMember = (memberId: string) => {
    toast({
      title: "Member Deleted",
      description: `Member ${memberId} has been permanently deleted`,
      variant: "destructive",
    })
  }

  const bulkApprove = () => {
    toast({
      title: "Bulk Approval",
      description: "Selected member applications have been approved",
    })
  }

  const bulkReject = () => {
    toast({
      title: "Bulk Rejection",
      description: "Selected member applications have been rejected",
      variant: "destructive",
    })
  }

  const sendBulkMessage = () => {
    toast({
      title: "Messages Sent",
      description: `Bulk message sent to ${bulkMessage.recipients} members`,
    })
    setIsBulkMessageOpen(false)
    setBulkMessage({ subject: "", message: "", recipients: "all" })
  }

  const exportMembers = () => {
    toast({
      title: "Export Started",
      description: "Member data export is being prepared for download",
    })
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Member Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage SACCO members, applications, and membership data</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsBulkMessageOpen(true)}>
              <Send className="h-4 w-4 mr-2" />
              Bulk Message
            </Button>
            <Button variant="outline" onClick={exportMembers}>
              <Download className="h-4 w-4 mr-2" />
              Export Members
            </Button>
            <Button className="bg-sacco-blue hover:bg-sacco-blue/90" onClick={() => setIsRegistrationOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={memberStats.totalMembers.toString()}
            description="All registered members"
            icon={Users}
            trend={{ value: memberStats.membershipGrowth, isPositive: true }}
          />
          <StatsCard
            title="Active Members"
            value={memberStats.activeMembers.toString()}
            description={`${Math.round((memberStats.activeMembers / memberStats.totalMembers) * 100)}% of total`}
            icon={UserCheck}
            trend={{ value: 2.1, isPositive: true }}
          />
          <StatsCard
            title="Pending Approval"
            value={memberStats.pendingApproval.toString()}
            description="Awaiting verification"
            icon={Clock}
          />
          <StatsCard
            title="New This Month"
            value={memberStats.newThisMonth.toString()}
            description="Recent registrations"
            icon={TrendingUp}
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-blue">
                KES {memberStats.averageContribution.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per member per month</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Retention Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-green">{memberStats.retentionRate}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">12-month retention</p>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: `${memberStats.retentionRate}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inactive Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{memberStats.inactiveMembers}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round((memberStats.inactiveMembers / memberStats.totalMembers) * 100)}% of total
              </p>
              <Button size="sm" className="mt-2" variant="outline">
                <Mail className="h-3 w-3 mr-1" />
                Send Reactivation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartCard
                  title=""
                  type="line"
                  data={memberGrowthTrends.map((item) => ({
                    name: item.name,
                    "New Members": item.new,
                    "Total Members": item.total,
                  }))}
                  dataKey="New Members"
                  xAxisKey="name"
                />
              </div>
            </CardContent>
          </Card>
          <ChartCard
            title="Membership Types"
            description="Distribution by membership category"
            type="pie"
            data={membershipTypes}
            dataKey="value"
            xAxisKey="name"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Age Distribution"
            description="Members by age group"
            type="bar"
            data={ageDistribution}
            dataKey="value"
            xAxisKey="name"
          />
          <ChartCard
            title="Member Status"
            description="Current member status breakdown"
            type="pie"
            data={memberStatusDistribution}
            dataKey="value"
            xAxisKey="name"
          />
        </div>

        {/* Member Management Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Members ({activeMembers.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval ({pendingMembers.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({inactiveMembers.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Members</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Bulk Message
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <DataTable
              data={activeMembers}
              columns={activeColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pending Member Applications</h3>
              <div className="flex space-x-2">
                <Button onClick={bulkApprove} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Bulk Approve
                </Button>
                <Button onClick={bulkReject} variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Bulk Reject
                </Button>
              </div>
            </div>
            <DataTable
              data={pendingMembers}
              columns={pendingColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="inactive" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Inactive Members</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Reactivation Campaign
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Inactive
                </Button>
              </div>
            </div>
            <DataTable
              data={inactiveMembers}
              columns={inactiveColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Member Acquisition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">New members this month</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+15% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">2.3%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly churn rate</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-red-600 mr-1 rotate-180" />
                    <span className="text-sm text-red-600">-0.5% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average member engagement</p>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">KES 125K</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average member LTV</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8% vs last quarter</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Member Activity Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Advanced Analytics Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed member activity analytics and insights will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Member Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Member Details - {selectedMember?.id}</DialogTitle>
              <DialogDescription>Complete member information and account history</DialogDescription>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.firstName} />
                    <AvatarFallback className="text-lg">
                      {selectedMember.firstName?.[0]}
                      {selectedMember.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMember.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge
                        className={
                          selectedMember.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : selectedMember.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                        variant="secondary"
                      >
                        {selectedMember.status}
                      </Badge>
                      <Badge
                        className={
                          selectedMember.membershipType === "Premium"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }
                        variant="secondary"
                      >
                        {selectedMember.membershipType}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Member ID:</span>
                        <span className="font-medium">{selectedMember.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{selectedMember.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>National ID:</span>
                        <span className="font-medium">{selectedMember.nationalId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Join Date:</span>
                        <span className="font-medium">
                          {selectedMember.joinDate ? new Date(selectedMember.joinDate).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Balance:</span>
                        <span className="font-medium">KES {selectedMember.currentBalance?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Contributions:</span>
                        <span className="font-medium">KES {selectedMember.totalContributions?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Balance:</span>
                        <span className="font-medium">KES {selectedMember.loanBalance?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Rate:</span>
                        <span className="font-medium">{selectedMember.complianceRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedMember.documents && (
                  <div>
                    <h4 className="font-semibold mb-3">Documents</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.documents.map((doc: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMember.referredBy && (
                  <div>
                    <h4 className="font-semibold mb-3">Referral Information</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMember.referredBy}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Member
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Member Registration Dialog */}
        <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Member</DialogTitle>
              <DialogDescription>Add a new member to the SACCO system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={registrationData.firstName}
                    onChange={(e) => setRegistrationData({ ...registrationData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={registrationData.lastName}
                    onChange={(e) => setRegistrationData({ ...registrationData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input
                    id="nationalId"
                    value={registrationData.nationalId}
                    onChange={(e) => setRegistrationData({ ...registrationData, nationalId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipType">Membership Type</Label>
                  <Select
                    value={registrationData.membershipType}
                    onValueChange={(value) => setRegistrationData({ ...registrationData, membershipType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={registrationData.address}
                  onChange={(e) => setRegistrationData({ ...registrationData, address: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialContribution">Initial Contribution (KES)</Label>
                <Input
                  id="initialContribution"
                  type="number"
                  value={registrationData.initialContribution}
                  onChange={(e) => setRegistrationData({ ...registrationData, initialContribution: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRegistrationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMemberRegistration} className="bg-sacco-blue hover:bg-sacco-blue/90">
                Register Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Approval Dialog */}
        <Dialog open={isApprovalOpen} onOpenChange={setIsApprovalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{approvalData.action === "approve" ? "Approve" : "Reject"} Member Application</DialogTitle>
              <DialogDescription>
                {approvalData.action === "approve"
                  ? "Approve this member application and grant access to SACCO services"
                  : "Reject this member application and provide a reason"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comments">
                  {approvalData.action === "approve" ? "Approval Notes" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="comments"
                  placeholder={
                    approvalData.action === "approve"
                      ? "Add any notes for the approval..."
                      : "Provide reason for rejection..."
                  }
                  value={approvalData.comments}
                  onChange={(e) => setApprovalData({ ...approvalData, comments: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsApprovalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleMemberApproval}
                className={
                  approvalData.action === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }
              >
                {approvalData.action === "approve" ? "Approve Member" : "Reject Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Message Dialog */}
        <Dialog open={isBulkMessageOpen} onOpenChange={setIsBulkMessageOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Bulk Message</DialogTitle>
              <DialogDescription>Send a message to multiple members at once</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select
                  value={bulkMessage.recipients}
                  onValueChange={(value) => setBulkMessage({ ...bulkMessage, recipients: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active Members Only</SelectItem>
                    <SelectItem value="inactive">Inactive Members Only</SelectItem>
                    <SelectItem value="pending">Pending Applications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={bulkMessage.subject}
                  onChange={(e) => setBulkMessage({ ...bulkMessage, subject: e.target.value })}
                  placeholder="Enter message subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={bulkMessage.message}
                  onChange={(e) => setBulkMessage({ ...bulkMessage, message: e.target.value })}
                  placeholder="Enter your message..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBulkMessageOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendBulkMessage} className="bg-sacco-blue hover:bg-sacco-blue/90">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
