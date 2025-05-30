"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, Smartphone, CheckCircle, Clock, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MemberContributions() {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Member",
  }

  // Mock contribution history data
  const contributionHistory = [
    {
      id: "TXN001",
      amount: 5000,
      date: "2024-01-15",
      status: "Confirmed",
      mpesaCode: "QA12345678",
      method: "M-Pesa",
    },
    {
      id: "TXN002",
      amount: 3000,
      date: "2024-01-10",
      status: "Confirmed",
      mpesaCode: "QB87654321",
      method: "M-Pesa",
    },
    {
      id: "TXN003",
      amount: 7000,
      date: "2024-01-05",
      status: "Pending",
      mpesaCode: "QC11223344",
      method: "M-Pesa",
    },
    {
      id: "TXN004",
      amount: 2000,
      date: "2024-01-01",
      status: "Failed",
      mpesaCode: "QD55667788",
      method: "M-Pesa",
    },
  ]

  const columns = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => `KES ${value.toLocaleString()}`,
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        const statusConfig = {
          Confirmed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
          Pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
          Failed: { color: "bg-red-100 text-red-800", icon: XCircle },
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
      key: "mpesaCode",
      label: "M-Pesa Code",
    },
    {
      key: "method",
      label: "Method",
    },
  ]

  const handleContribution = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid contribution amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate M-Pesa STK push
    setTimeout(() => {
      setIsProcessing(false)
      setIsDialogOpen(false)
      setAmount("")
      toast({
        title: "Payment Initiated",
        description: "Please check your phone for M-Pesa prompt and enter your PIN",
      })

      // Simulate payment confirmation after a delay
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: `Your contribution of KES ${amount} has been received`,
        })
      }, 5000)
    }, 2000)
  }

  return (
    <DashboardLayout role="member" user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contributions</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your SACCO contributions and view history</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sacco-blue hover:bg-sacco-blue/90">
                <CreditCard className="h-4 w-4 mr-2" />
                Make Contribution
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Make a Contribution</DialogTitle>
                <DialogDescription>Enter the amount you want to contribute to your SACCO account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">M-Pesa Payment</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You will receive an M-Pesa prompt on your registered phone number: +254712345678
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleContribution}
                  disabled={isProcessing}
                  className="bg-sacco-green hover:bg-sacco-green/90"
                >
                  {isProcessing ? "Processing..." : "Pay with M-Pesa"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-blue">KES 45,000</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-green">KES 8,000</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current month contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">KES 6,250</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last 6 months average</p>
            </CardContent>
          </Card>
        </div>

        {/* Contribution History */}
        <DataTable
          data={contributionHistory}
          columns={columns}
          title="Contribution History"
          searchable={true}
          filterable={true}
          exportable={true}
        />
      </div>
    </DashboardLayout>
  )
}
