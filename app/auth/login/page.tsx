"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Building2, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (role: "member" | "admin") => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful",
        description: `Welcome back! Logging in as ${role}.`,
      })

      // Route based on role
      if (role === "member") {
        router.push("/member/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sacco-blue to-sacco-green p-4">
      {/* Back to Home Button */}
      <div className="w-full max-w-md mb-4">
        <Link href="/landing">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-sacco-blue rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-sacco-blue">SaccoSmart</CardTitle>
          <CardDescription>Sign in to your SACCO account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              onClick={() => handleLogin("member")}
              disabled={isLoading}
              className="bg-sacco-blue hover:bg-sacco-blue/90"
            >
              {isLoading ? "Signing in..." : "Login as Member"}
            </Button>
            <Button
              onClick={() => handleLogin("admin")}
              disabled={isLoading}
              variant="outline"
              className="border-sacco-green text-sacco-green hover:bg-sacco-green hover:text-white"
            >
              {isLoading ? "Signing in..." : "Login as Admin"}
            </Button>
          </div>
          <div className="text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-sacco-blue hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/auth/register" className="text-sacco-blue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
