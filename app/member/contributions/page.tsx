"use client"

import { useState, useEffect } from "react"
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
import axios from "axios"

// Add this interface at the top (after imports)
interface Contribution {
  _id?: string
  amount: number
  date: string
  status?: string
  mpesaCode?: string
  method?: string
}

export default function MemberContributions() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Member",
  }

  // Fetch member's contributions from backend
  const fetchContributions = async () => {
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/contribution", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setContributions(res.data)
    } catch (err) {
      setError("Failed to load contributions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContributions()
  }, [])

  // Table columns
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
        const config = statusConfig[value as keyof typeof statusConfig] || statusConfig["Pending"]
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

  // Handle making a contribution
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
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:5000/api/contribution",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast({
        title: "Payment Successful",
        description: `Your contribution of KES ${amount} has been received`,
      })
      setAmount("")
      setIsDialogOpen(false)
      fetchContributions()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to make contribution",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  // Calculate summary cards using backend data
  const total = contributions.reduce((sum, c) => sum + (c.amount || 0), 0)
  const thisMonth = contributions
    .filter((c) => new Date(c.date).getMonth() === new Date().getMonth())
    .reduce((sum, c) => sum + (c.amount || 0), 0)
  const avgMonthly =
    contributions.length > 0
      ? Math.round(
          contributions.reduce((sum, c) => sum + (c.amount || 0), 0) /
            Math.max(1, new Set(contributions.map((c) => new Date(c.date).getMonth())).size)
        )
      : 0

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
                    You will receive an M-Pesa prompt on your registered phone number.
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
              <div className="text-2xl font-bold text-sacco-blue">KES {total.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-green">KES {thisMonth.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current month contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">KES {avgMonthly.toLocaleString()}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last 6 months average</p>
            </CardContent>
          </Card>
        </div>

        {/* Contribution History */}
        <DataTable
          data={contributions}
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
