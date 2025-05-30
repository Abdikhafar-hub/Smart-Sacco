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
import { Progress } from "@/components/ui/progress"
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
  CreditCard,
  Plus,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  Mail,
  Upload,
  Smartphone,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminContributions() {
  const [selectedContribution, setSelectedContribution] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isVerificationOpen, setIsVerificationOpen] = useState(false)
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false)
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false)
  const [manualEntryData, setManualEntryData] = useState({
    memberId: "",
    amount: "",
    method: "",
    reference: "",
  })
  const [verificationData, setVerificationData] = useState({
    contributionId: "",
    action: "",
    comments: "",
    adjustedAmount: "",
  })
  const { toast } = useToast()

  const user = {
    name: "Admin User",
    email: "admin@saccosmart.com",
    role: "Admin",
  }

  // Mock data for contribution statistics
  const contributionStats = {
    totalContributions: 2850000,
    monthlyTarget: 500000,
    monthlyActual: 425000,
    pendingVerifications: 15,
    totalMembers: 234,
    activeContributors: 198,
    averageContribution: 12180,
    complianceRate: 84.6,
  }

  // Mock data for charts
  const monthlyTrends = [
    { name: "Jan", target: 450000, actual: 420000 },
    { name: "Feb", target: 450000, actual: 465000 },
    { name: "Mar", target: 500000, actual: 485000 },
    { name: "Apr", target: 500000, actual: 520000 },
    { name: "May", target: 500000, actual: 495000 },
    { name: "Jun", target: 500000, actual: 425000 },
  ]

  const contributionMethods = [
    { name: "M-Pesa", value: 156 },
    { name: "Bank Transfer", value: 42 },
    { name: "Cash", value: 28 },
    { name: "Check", value: 12 },
  ]

  const memberCategories = [
    { name: "Regular", value: 180 },
    { name: "Premium", value: 35 },
    { name: "Student", value: 19 },
  ]

  // Mock pending contributions for verification
  const pendingContributions = [
    {
      id: "TXN001",
      member: "John Doe",
      memberId: "MEM001",
      amount: 5000,
      method: "M-Pesa",
      mpesaCode: "QA12345678",
      phone: "+254712345678",
      timestamp: "2024-01-15 14:30:00",
      status: "Pending",
      contributionType: "Monthly",
      reference: "Monthly contribution - January 2024",
    },
    {
      id: "TXN002",
      member: "Jane Smith",
      memberId: "MEM002",
      amount: 3000,
      method: "Bank Transfer",
      bankRef: "BT789012345",
      phone: "+254723456789",
      timestamp: "2024-01-15 12:15:00",
      status: "Pending",
      contributionType: "Additional",
      reference: "Additional savings contribution",
    },
    {
      id: "TXN003",
      member: "Mike Johnson",
      memberId: "MEM003",
      amount: 7500,
      method: "M-Pesa",
      mpesaCode: "QC11223344",
      phone: "+254734567890",
      timestamp: "2024-01-15 10:45:00",
      status: "Pending",
      contributionType: "Monthly",
      reference: "Monthly contribution - January 2024",
    },
  ]

  // Mock verified contributions
  const verifiedContributions = [
    {
      id: "TXN004",
      member: "Sarah Wilson",
      memberId: "MEM004",
      amount: 4500,
      method: "M-Pesa",
      mpesaCode: "QD55667788",
      phone: "+254745678901",
      timestamp: "2024-01-14 16:20:00",
      verifiedBy: "Admin User",
      verifiedAt: "2024-01-14 16:25:00",
      status: "Verified",
      contributionType: "Monthly",
      reference: "Monthly contribution - January 2024",
    },
    {
      id: "TXN005",
      member: "David Brown",
      memberId: "MEM005",
      amount: 6000,
      method: "Bank Transfer",
      bankRef: "BT456789012",
      phone: "+254756789012",
      timestamp: "2024-01-14 14:10:00",
      verifiedBy: "Admin User",
      verifiedAt: "2024-01-14 14:15:00",
      status: "Verified",
      contributionType: "Monthly",
      reference: "Monthly contribution - January 2024",
    },
  ]

  // Mock rejected contributions
  const rejectedContributions = [
    {
      id: "TXN006",
      member: "Lisa Davis",
      memberId: "MEM006",
      amount: 2500,
      method: "M-Pesa",
      mpesaCode: "QE99887766",
      phone: "+254767890123",
      timestamp: "2024-01-13 11:30:00",
      rejectedBy: "Admin User",
      rejectedAt: "2024-01-13 11:35:00",
      status: "Rejected",
      contributionType: "Monthly",
      reference: "Monthly contribution - January 2024",
      rejectionReason: "Duplicate transaction - already processed",
    },
  ]

  // Mock member contribution summary
  const memberContributions = [
    {
      memberId: "MEM001",
      memberName: "John Doe",
      monthlyTarget: 5000,
      currentMonth: 5000,
      totalContributions: 60000,
      lastContribution: "2024-01-15",
      status: "Current",
      complianceRate: 100,
      contributionHistory: 12,
    },
    {
      memberId: "MEM002",
      memberName: "Jane Smith",
      monthlyTarget: 3000,
      currentMonth: 3000,
      totalContributions: 36000,
      lastContribution: "2024-01-15",
      status: "Current",
      complianceRate: 100,
      contributionHistory: 12,
    },
    {
      memberId: "MEM003",
      memberName: "Mike Johnson",
      monthlyTarget: 7500,
      currentMonth: 0,
      totalContributions: 82500,
      lastContribution: "2023-12-15",
      status: "Overdue",
      complianceRate: 91.7,
      contributionHistory: 11,
    },
  ]

  const pendingColumns = [
    {
      key: "member",
      label: "Member",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.memberId}</p>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "method",
      label: "Method",
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-gray-500">
            {row.mpesaCode && `M-Pesa: ${row.mpesaCode}`}
            {row.bankRef && `Ref: ${row.bankRef}`}
          </p>
        </div>
      ),
    },
    {
      key: "contributionType",
      label: "Type",
      render: (value: string) => (
        <Badge
          className={
            value === "Monthly"
              ? "bg-blue-100 text-blue-800"
              : value === "Additional"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
          }
          variant="secondary"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "timestamp",
      label: "Date & Time",
      sortable: true,
      render: (value: string) => (
        <div>
          <p className="text-sm">{new Date(value).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">{new Date(value).toLocaleTimeString()}</p>
        </div>
      ),
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
          <Button size="sm" variant="outline" onClick={() => viewContributionDetails(row)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            onClick={() => openVerificationDialog(row, "verify")}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Verify
          </Button>
          <Button size="sm" variant="destructive" onClick={() => openVerificationDialog(row, "reject")}>
            <XCircle className="h-3 w-3 mr-1" />
            Reject
          </Button>
        </div>
      ),
    },
  ]

  const verifiedColumns = [
    {
      key: "member",
      label: "Member",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.memberId}</p>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "method",
      label: "Method",
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-gray-500">
            {row.mpesaCode && `M-Pesa: ${row.mpesaCode}`}
            {row.bankRef && `Ref: ${row.bankRef}`}
          </p>
        </div>
      ),
    },
    {
      key: "contributionType",
      label: "Type",
      render: (value: string) => (
        <Badge
          className={
            value === "Monthly"
              ? "bg-blue-100 text-blue-800"
              : value === "Additional"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
          }
          variant="secondary"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "verifiedAt",
      label: "Verified",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="text-sm">{new Date(value).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">by {row.verifiedBy}</p>
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
          <Button size="sm" variant="outline" onClick={() => viewContributionDetails(row)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadReceipt(row.id)}>
            <Download className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  const memberSummaryColumns = [
    {
      key: "memberName",
      label: "Member",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.memberId}</p>
        </div>
      ),
    },
    {
      key: "monthlyTarget",
      label: "Monthly Target",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "currentMonth",
      label: "Current Month",
      sortable: true,
      render: (value: number, row: any) => (
        <div>
          <p className="font-medium">KES {value.toLocaleString()}</p>
          <Progress value={(value / row.monthlyTarget) * 100} className="h-1 mt-1" />
        </div>
      ),
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
      key: "status",
      label: "Status",
      render: (value: string) => {
        const statusConfig = {
          Current: { color: "bg-green-100 text-green-800", icon: CheckCircle },
          Overdue: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
          "Grace Period": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
        }
        const config = statusConfig[value as keyof typeof statusConfig]
        const Icon = config.icon
        return (
          <Badge className={config.color} variant="secondary">
            <Icon className="h-3 w-3 mr-1" />
            {value}
          </Badge>
        )
      },
    },
    {
      key: "complianceRate",
      label: "Compliance",
      sortable: true,
      render: (value: number) => (
        <div className="text-center">
          <p className="font-medium">{value}%</p>
          <Progress value={value} className="h-1 mt-1" />
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => viewMemberHistory(row.memberId)}>
            <Eye className="h-3 w-3 mr-1" />
            History
          </Button>
          <Button size="sm" variant="outline" onClick={() => contactMember(row.memberId)}>
            <Mail className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      ),
    },
  ]

  const viewContributionDetails = (contribution: any) => {
    setSelectedContribution(contribution)
    setIsDetailsOpen(true)
  }

  const openVerificationDialog = (contribution: any, action: string) => {
    setVerificationData({
      contributionId: contribution.id,
      action,
      comments: "",
      adjustedAmount: contribution.amount.toString(),
    })
    setIsVerificationOpen(true)
  }

  const handleVerification = () => {
    const actionText = verificationData.action === "verify" ? "verified" : "rejected"
    toast({
      title: `Contribution ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      description: `Contribution ${verificationData.contributionId} has been ${actionText}`,
      variant: verificationData.action === "verify" ? "default" : "destructive",
    })
    setIsVerificationOpen(false)
    setVerificationData({ contributionId: "", action: "", comments: "", adjustedAmount: "" })
  }

  const bulkVerify = () => {
    toast({
      title: "Bulk Verification",
      description: "Selected contributions have been verified",
    })
  }

  const bulkReject = () => {
    toast({
      title: "Bulk Rejection",
      description: "Selected contributions have been rejected",
      variant: "destructive",
    })
  }

  const downloadReceipt = (contributionId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading receipt for contribution ${contributionId}`,
    })
  }

  const viewMemberHistory = (memberId: string) => {
    toast({
      title: "Member History",
      description: `Viewing contribution history for member ${memberId}`,
    })
  }

  const contactMember = (memberId: string) => {
    toast({
      title: "Contact Member",
      description: `Opening contact options for member ${memberId}`,
    })
  }

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Contribution data has been uploaded successfully",
    })
    setIsBulkUploadOpen(false)
  }

  const handleManualEntry = () => {
    toast({
      title: "Manual Entry Added",
      description: `Contribution of KES ${manualEntryData.amount} has been added for member ${manualEntryData.memberId}`,
    })
    setIsManualEntryOpen(false)
    setManualEntryData({ memberId: "", amount: "", method: "", reference: "" })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Contribution report is being generated...",
    })

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Monthly contribution report has been downloaded successfully",
      })
    }, 2000)
  }

  const sendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: "Contribution reminders have been sent to overdue members",
    })
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contribution Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage member contributions and verification</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsBulkUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline" onClick={handleGenerateReport}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-sacco-blue hover:bg-sacco-blue/90" onClick={() => setIsManualEntryOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Manual Entry
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Contributions"
            value={`KES ${(contributionStats.totalContributions / 1000000).toFixed(1)}M`}
            description="All time contributions"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Monthly Progress"
            value={`${Math.round((contributionStats.monthlyActual / contributionStats.monthlyTarget) * 100)}%`}
            description={`KES ${contributionStats.monthlyActual.toLocaleString()} of ${contributionStats.monthlyTarget.toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatsCard
            title="Pending Verifications"
            value={contributionStats.pendingVerifications.toString()}
            description="Awaiting verification"
            icon={Clock}
          />
          <StatsCard
            title="Active Contributors"
            value={`${contributionStats.activeContributors}/${contributionStats.totalMembers}`}
            description={`${Math.round((contributionStats.activeContributors / contributionStats.totalMembers) * 100)}% participation`}
            icon={CreditCard}
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
                KES {contributionStats.averageContribution.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Per member per month</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-green">{contributionStats.complianceRate}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Members meeting targets</p>
              <Progress value={contributionStats.complianceRate} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                KES {contributionStats.monthlyTarget.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current month target</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((contributionStats.monthlyActual / contributionStats.monthlyTarget) * 100)}%</span>
                </div>
                <Progress value={(contributionStats.monthlyActual / contributionStats.monthlyTarget) * 100} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Contribution Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartCard
                  title=""
                  type="line"
                  data={monthlyTrends.map((item) => ({
                    name: item.name,
                    Target: item.target,
                    Actual: item.actual,
                  }))}
                  dataKey="Actual"
                  xAxisKey="name"
                />
              </div>
            </CardContent>
          </Card>
          <ChartCard
            title="Contribution Methods"
            description="Distribution by payment method"
            type="pie"
            data={contributionMethods}
            dataKey="value"
            xAxisKey="name"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Member Categories"
            description="Distribution by membership type"
            type="pie"
            data={memberCategories}
            dataKey="value"
            xAxisKey="name"
          />
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={sendReminders} className="w-full justify-between bg-orange-600 hover:bg-orange-700">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Contribution Reminders
                </div>
                <span className="text-sm">3 overdue</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Monthly Report
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  M-Pesa Integration Status
                </div>
                <Badge className="bg-green-100 text-green-800" variant="secondary">
                  Active
                </Badge>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Management Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending Verification ({pendingContributions.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({verifiedContributions.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedContributions.length})</TabsTrigger>
            <TabsTrigger value="members">Member Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pending Contribution Verifications</h3>
              <div className="flex space-x-2">
                <Button onClick={bulkVerify} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Bulk Verify
                </Button>
                <Button onClick={bulkReject} variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Bulk Reject
                </Button>
              </div>
            </div>
            <DataTable
              data={pendingContributions}
              columns={pendingColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="verified" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Verified Contributions</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Verified
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Receipts
                </Button>
              </div>
            </div>
            <DataTable
              data={verifiedContributions}
              columns={verifiedColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rejected Contributions</h3>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Rejected
              </Button>
            </div>
            <DataTable
              data={rejectedContributions}
              columns={[
                ...verifiedColumns.slice(0, -2),
                {
                  key: "rejectionReason",
                  label: "Rejection Reason",
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
                    <Button size="sm" variant="outline" onClick={() => viewContributionDetails(row)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  ),
                },
              ]}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Member Contribution Summary</h3>
              <div className="flex space-x-2">
                <Button onClick={sendReminders} variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reminders
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Summary
                </Button>
              </div>
            </div>
            <DataTable
              data={memberContributions}
              columns={memberSummaryColumns}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>
        </Tabs>

        {/* Contribution Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contribution Details - {selectedContribution?.id}</DialogTitle>
              <DialogDescription>Complete contribution information and verification details</DialogDescription>
            </DialogHeader>
            {selectedContribution && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Transaction Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-medium">{selectedContribution.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">KES {selectedContribution.amount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-medium">{selectedContribution.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reference:</span>
                        <span className="font-medium">
                          {selectedContribution.mpesaCode || selectedContribution.bankRef}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{selectedContribution.contributionType}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Member Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">{selectedContribution.member}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Member ID:</span>
                        <span className="font-medium">{selectedContribution.memberId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{selectedContribution.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timestamp:</span>
                        <span className="font-medium">{new Date(selectedContribution.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Reference Note</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedContribution.reference}
                  </p>
                </div>
                {selectedContribution.verifiedBy && (
                  <div>
                    <h4 className="font-semibold mb-3">Verification Details</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-gray-600 dark:text-gray-400">Verified by:</span>{" "}
                        {selectedContribution.verifiedBy}
                      </p>
                      <p>
                        <span className="text-gray-600 dark:text-gray-400">Verified at:</span>{" "}
                        {new Date(selectedContribution.verifiedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {selectedContribution.rejectionReason && (
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">Rejection Reason</h4>
                    <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      {selectedContribution.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Verification Dialog */}
        <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{verificationData.action === "verify" ? "Verify" : "Reject"} Contribution</DialogTitle>
              <DialogDescription>
                {verificationData.action === "verify"
                  ? "Confirm the contribution details and verify the transaction"
                  : "Provide reason for rejecting this contribution"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {verificationData.action === "verify" && (
                <div className="space-y-2">
                  <Label htmlFor="adjustedAmount">Verified Amount (KES)</Label>
                  <Input
                    id="adjustedAmount"
                    type="number"
                    value={verificationData.adjustedAmount}
                    onChange={(e) => setVerificationData({ ...verificationData, adjustedAmount: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">Adjust amount if different from submitted amount</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="comments">
                  {verificationData.action === "verify" ? "Verification Notes" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="comments"
                  placeholder={
                    verificationData.action === "verify"
                      ? "Add any notes for the verification..."
                      : "Provide reason for rejection..."
                  }
                  value={verificationData.comments}
                  onChange={(e) => setVerificationData({ ...verificationData, comments: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVerificationOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleVerification}
                className={
                  verificationData.action === "verify"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {verificationData.action === "verify" ? "Verify Contribution" : "Reject Contribution"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Upload Dialog */}
        <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bulk Upload Contributions</DialogTitle>
              <DialogDescription>Upload multiple contributions from a CSV or Excel file</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop your file here, or click to browse
                </p>
                <Button variant="outline">Choose File</Button>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">File Requirements:</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Supported formats: CSV, Excel (.xlsx)</li>
                  <li>• Required columns: Member ID, Amount, Date, Method, Reference</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Maximum 1000 records per upload</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBulkUploadOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBulkUpload} className="bg-sacco-blue hover:bg-sacco-blue/90">
                Upload Contributions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manual Entry Dialog */}
        <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manual Contribution Entry</DialogTitle>
              <DialogDescription>Add a contribution manually to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID</Label>
                <Input
                  id="memberId"
                  placeholder="Enter member ID (e.g., MEM001)"
                  value={manualEntryData.memberId}
                  onChange={(e) => setManualEntryData({ ...manualEntryData, memberId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter contribution amount"
                  value={manualEntryData.amount}
                  onChange={(e) => setManualEntryData({ ...manualEntryData, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <select
                  id="method"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={manualEntryData.method}
                  onChange={(e) => setManualEntryData({ ...manualEntryData, method: e.target.value })}
                >
                  <option value="">Select payment method</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference/Notes</Label>
                <Textarea
                  id="reference"
                  placeholder="Add any reference notes..."
                  value={manualEntryData.reference}
                  onChange={(e) => setManualEntryData({ ...manualEntryData, reference: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsManualEntryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleManualEntry} className="bg-sacco-blue hover:bg-sacco-blue/90">
                Add Contribution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
