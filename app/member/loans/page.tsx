"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Banknote,
  Plus,
  Eye,
  Download,
  Calculator,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MemberLoans() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanReason, setLoanReason] = useState("")
  const [repaymentTerm, setRepaymentTerm] = useState("")
  const [calculatorAmount, setCalculatorAmount] = useState("")
  const [calculatorTerm, setCalculatorTerm] = useState("")
  const { toast } = useToast()

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Member",
  }

  // Mock loan data
  const activeLoans = [
    {
      id: "LOAN001",
      amount: 50000,
      disbursedAmount: 50000,
      balance: 32000,
      interestRate: 12,
      term: "12 months",
      monthlyPayment: 4500,
      nextDueDate: "2024-02-15",
      status: "Active",
      disbursedDate: "2024-01-15",
      purpose: "Business expansion",
    },
    {
      id: "LOAN002",
      amount: 25000,
      disbursedAmount: 25000,
      balance: 8000,
      interestRate: 10,
      term: "6 months",
      monthlyPayment: 4500,
      nextDueDate: "2024-02-10",
      status: "Active",
      disbursedDate: "2023-09-10",
      purpose: "Emergency medical",
    },
  ]

  const loanHistory = [
    {
      id: "LOAN003",
      amount: 30000,
      disbursedAmount: 30000,
      balance: 0,
      interestRate: 12,
      term: "8 months",
      status: "Completed",
      disbursedDate: "2023-01-15",
      completedDate: "2023-09-15",
      purpose: "Home improvement",
    },
    {
      id: "LOAN004",
      amount: 15000,
      disbursedAmount: 0,
      balance: 0,
      interestRate: 0,
      term: "6 months",
      status: "Rejected",
      appliedDate: "2022-12-01",
      rejectedDate: "2022-12-05",
      purpose: "Personal use",
      rejectionReason: "Insufficient contribution history",
    },
  ]

  const loanApplications = [
    {
      id: "LOAN005",
      amount: 75000,
      term: "18 months",
      status: "Pending",
      appliedDate: "2024-01-20",
      purpose: "Vehicle purchase",
    },
  ]

  const paymentHistory = [
    {
      id: "PAY001",
      loanId: "LOAN001",
      amount: 4500,
      date: "2024-01-15",
      type: "Monthly Payment",
      status: "Paid",
      method: "M-Pesa",
    },
    {
      id: "PAY002",
      loanId: "LOAN002",
      amount: 4500,
      date: "2024-01-10",
      type: "Monthly Payment",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: "PAY003",
      loanId: "LOAN001",
      amount: 4500,
      date: "2024-02-15",
      type: "Monthly Payment",
      status: "Due",
      method: "Pending",
    },
  ]

  const loanLimit = {
    maximum: 100000,
    available: 68000,
    used: 32000,
    basedOn: "3x monthly contributions",
  }

  const activeLoansColumns = [
    {
      key: "id",
      label: "Loan ID",
      sortable: true,
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "balance",
      label: "Balance",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "monthlyPayment",
      label: "Monthly Payment",
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "nextDueDate",
      label: "Next Due",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const statusConfig = {
          Active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
          Pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
          Completed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
          Rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
          Overdue: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
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
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => viewLoanDetails(row.id)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadStatement(row.id)}>
            <Download className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  const paymentColumns = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "loanId",
      label: "Loan ID",
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const colors = {
          Paid: "bg-green-100 text-green-800",
          Due: "bg-yellow-100 text-yellow-800",
          Overdue: "bg-red-100 text-red-800",
        }
        return (
          <Badge className={colors[value as keyof typeof colors]} variant="secondary">
            {value}
          </Badge>
        )
      },
    },
    {
      key: "method",
      label: "Method",
    },
  ]

  const handleLoanApplication = () => {
    if (!loanAmount || !loanReason || !repaymentTerm) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsApplicationOpen(false)
      setLoanAmount("")
      setLoanReason("")
      setRepaymentTerm("")
      toast({
        title: "Application Submitted",
        description: "Your loan application has been submitted for review",
      })
    }, 1000)
  }

  const calculateLoan = () => {
    if (!calculatorAmount || !calculatorTerm) return null

    const principal = Number.parseFloat(calculatorAmount)
    const months = Number.parseInt(calculatorTerm)
    const monthlyRate = 0.12 / 12 // 12% annual rate

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    }
  }

  const calculation = calculateLoan()

  const viewLoanDetails = (loanId: string) => {
    toast({
      title: "Loan Details",
      description: `Viewing details for loan ${loanId}`,
    })
  }

  const downloadStatement = (loanId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading statement for loan ${loanId}`,
    })
  }

  return (
    <DashboardLayout role="member" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Loans</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your loan applications and track repayments</p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calculator className="h-4 w-4 mr-2" />
                  Loan Calculator
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Loan Calculator</DialogTitle>
                  <DialogDescription>Calculate your monthly payments and total interest</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calc-amount">Loan Amount (KES)</Label>
                    <Input
                      id="calc-amount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calc-term">Repayment Term (months)</Label>
                    <Select onValueChange={setCalculatorTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {calculation && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold">Calculation Results:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Monthly Payment</p>
                          <p className="font-bold text-blue-600">KES {calculation.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Total Interest</p>
                          <p className="font-bold text-orange-600">KES {calculation.totalInterest.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600 dark:text-gray-400">Total Payment</p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            KES {calculation.totalPayment.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCalculatorOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-sacco-blue hover:bg-sacco-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply for Loan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Apply for a Loan</DialogTitle>
                  <DialogDescription>Fill out the form below to submit your loan application</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount (KES)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      max={loanLimit.available}
                    />
                    <p className="text-xs text-gray-500">Available limit: KES {loanLimit.available.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Repayment Term</Label>
                    <Select onValueChange={setRepaymentTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select repayment term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Purpose of Loan</Label>
                    <Textarea
                      id="reason"
                      placeholder="Describe the purpose of your loan"
                      value={loanReason}
                      onChange={(e) => setLoanReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Note:</strong> Loan applications are subject to approval based on your contribution
                      history and SACCO policies.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApplicationOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleLoanApplication} className="bg-sacco-green hover:bg-sacco-green/90">
                    Submit Application
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Loan Limit Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Your Loan Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Maximum Limit</p>
                <p className="text-2xl font-bold text-sacco-blue">KES {loanLimit.maximum.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{loanLimit.basedOn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                <p className="text-2xl font-bold text-green-600">KES {loanLimit.available.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Currently Used</p>
                <p className="text-2xl font-bold text-orange-600">KES {loanLimit.used.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Utilization</p>
                <Progress value={(loanLimit.used / loanLimit.maximum) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((loanLimit.used / loanLimit.maximum) * 100)}% used
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Loans</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="history">Loan History</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeLoans.length > 0 ? (
              <>
                {/* Active Loans Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Outstanding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        KES {activeLoans.reduce((sum, loan) => sum + loan.balance, 0).toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Across {activeLoans.length} loans</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        KES {activeLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0).toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total monthly obligation</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Due Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        {new Date(
                          Math.min(...activeLoans.map((loan) => new Date(loan.nextDueDate).getTime())),
                        ).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Earliest payment due</p>
                    </CardContent>
                  </Card>
                </div>

                <DataTable
                  data={activeLoans}
                  columns={activeLoansColumns}
                  title="Active Loans"
                  searchable={true}
                  filterable={false}
                  exportable={true}
                />
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Active Loans</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You don't have any active loans at the moment.
                  </p>
                  <Button onClick={() => setIsApplicationOpen(true)} className="bg-sacco-blue hover:bg-sacco-blue/90">
                    Apply for Your First Loan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications">
            {loanApplications.length > 0 ? (
              <div className="space-y-4">
                {loanApplications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{application.id}</h3>
                            <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{application.purpose}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Amount</p>
                              <p className="font-semibold">KES {application.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Term</p>
                              <p className="font-semibold">{application.term}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Applied</p>
                              <p className="font-semibold">{new Date(application.appliedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Loan Application</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this loan application? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No, Keep Application</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                  Yes, Cancel Application
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Pending Applications</h3>
                  <p className="text-gray-600 dark:text-gray-400">You don't have any pending loan applications.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <DataTable
              data={loanHistory}
              columns={[
                { key: "id", label: "Loan ID", sortable: true },
                {
                  key: "amount",
                  label: "Amount",
                  sortable: true,
                  render: (value: number) => `KES ${value.toLocaleString()}`,
                },
                { key: "purpose", label: "Purpose" },
                {
                  key: "disbursedDate",
                  label: "Disbursed",
                  sortable: true,
                  render: (value: string) => (value ? new Date(value).toLocaleDateString() : "N/A"),
                },
                {
                  key: "status",
                  label: "Status",
                  render: (value: string) => {
                    const statusConfig = {
                      Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
                      Rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
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
              ]}
              title="Loan History"
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>

          <TabsContent value="payments">
            <DataTable
              data={paymentHistory}
              columns={paymentColumns}
              title="Payment History"
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
