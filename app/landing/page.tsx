"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  CreditCard,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Zap,
  Globe,
  Clock,
  TrendingUp,
  Award,
  HeadphonesIcon,
} from "lucide-react"

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 4000,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = end * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <div ref={countRef} className="text-3xl lg:text-4xl font-bold text-sacco-blue mb-2">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  )
}

// Dashboard Video Component
function DashboardVideo() {
  const [videoError, setVideoError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoError = () => {
    setVideoError(true)
  }

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  // Fallback dashboard mockup component
  const FallbackDashboard = () => (
    <div className="bg-white rounded-xl p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-sacco-blue rounded-lg">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">SaccoSmart Dashboard</h3>
          <p className="text-sm text-gray-600">Member Portal</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="text-sm font-medium">Total Savings</span>
          <span className="font-bold text-green-600">KES 45,000</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">Active Loan</span>
          <span className="font-bold text-blue-600">KES 25,000</span>
        </div>
        <Button className="w-full bg-sacco-blue hover:bg-sacco-blue/90">
          <CreditCard className="h-4 w-4 mr-2" />
          Make Contribution
        </Button>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        {!videoError ? (
          <div className="relative">
            <video
              ref={videoRef}
              className={`w-full h-auto rounded-xl shadow-2xl transition-opacity duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              loop
              muted
              playsInline
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              style={{
                maxWidth: "100%",
                height: "auto",
                aspectRatio: "16/10",
              }}
            >
              <source src="/sacco-dashboard-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sacco-blue"></div>
              </div>
            )}

            {/* Fallback overlay if video fails to load */}
            {!isLoaded && (
              <div className="absolute inset-0 opacity-0">
                <FallbackDashboard />
              </div>
            )}
          </div>
        ) : (
          <FallbackDashboard />
        )}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: CreditCard,
      title: "Easy Contributions",
      description: "Make seamless contributions via M-Pesa integration with instant confirmation and tracking.",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Comprehensive member portal with role-based access for members, treasurers, and administrators.",
    },
    {
      icon: BarChart3,
      title: "Financial Reports",
      description: "Generate detailed financial reports, statements, and analytics with export capabilities.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade security and encryption.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Access your SACCO account anywhere with our fully responsive mobile-friendly platform.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications for contributions, loan approvals, and important SACCO updates.",
    },
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Digital Transformation",
      description: "Transform your traditional SACCO operations into a modern digital platform",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce manual processes and paperwork by up to 80% with automated workflows",
    },
    {
      icon: TrendingUp,
      title: "Increase Growth",
      description: "Attract more members and increase engagement with user-friendly digital services",
    },
    {
      icon: Award,
      title: "Improve Transparency",
      description: "Provide members with real-time access to their financial information and SACCO updates",
    },
  ]

  const testimonials = [
    {
      name: "Mary Wanjiku",
      role: "SACCO Chairperson",
      company: "Umoja SACCO",
      content:
        "SaccoSmart has revolutionized how we manage our SACCO. Our members love the convenience of mobile contributions, and our administrative work has been reduced by 70%.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "John Kamau",
      role: "Treasurer",
      company: "Harambee SACCO",
      content:
        "The financial reporting features are incredible. We can now generate comprehensive reports in minutes instead of days. Our auditing process has never been smoother.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Grace Akinyi",
      role: "SACCO Member",
      company: "Unity SACCO",
      content:
        "I can now make my contributions from anywhere using M-Pesa. The mobile app is so easy to use, and I always know exactly where my money is going.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "KES 5,000",
      period: "/month",
      description: "Perfect for small SACCOs getting started",
      features: [
        "Up to 100 members",
        "Basic contribution management",
        "M-Pesa integration",
        "Basic reporting",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "KES 12,000",
      period: "/month",
      description: "Ideal for growing SACCOs",
      features: [
        "Up to 500 members",
        "Advanced loan management",
        "Custom reporting",
        "SMS notifications",
        "Priority support",
        "Mobile app access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "KES 25,000",
      period: "/month",
      description: "For large SACCOs with complex needs",
      features: [
        "Unlimited members",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Training & onboarding",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-sacco-blue rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-sacco-blue">SaccoSmart</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-sacco-blue transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-sacco-blue transition-colors">
                Benefits
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-sacco-blue transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-sacco-blue transition-colors">
                Pricing
              </a>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-sacco-blue text-sacco-blue hover:bg-sacco-blue hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-sacco-blue hover:bg-sacco-blue/90">Get Started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-sacco-blue">
                  Features
                </a>
                <a href="#benefits" className="block px-3 py-2 text-gray-600 hover:text-sacco-blue">
                  Benefits
                </a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-sacco-blue">
                  Testimonials
                </a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-sacco-blue">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 px-3 pt-2">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full border-sacco-blue text-sacco-blue">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full bg-sacco-blue hover:bg-sacco-blue/90">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/ddkkfumkl/image/upload/v1748609038/sac_ge83b4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                🚀 Trusted by 500+ SACCOs across Kenya
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-shadow-lg">
                Modernize Your SACCO with <span className="text-sacco-green">Digital Excellence</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed text-shadow">
                Transform your SACCO operations with our comprehensive management platform. Enable M-Pesa contributions,
                streamline loan processing, and provide members with 24/7 access to their accounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-sacco-blue hover:bg-white/90 font-semibold px-8 shadow-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-sacco-blue shadow-lg"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sacco-green" />
                  <span className="text-shadow">No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sacco-green" />
                  <span className="text-shadow">30-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sacco-green" />
                  <span className="text-shadow">24/7 support</span>
                </div>
              </div>
            </div>

            {/* Dashboard Video Component */}
            <DashboardVideo />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter end={500} duration={4000} suffix="+" />
              <div className="text-gray-600">SACCOs Served</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={50} duration={4500} suffix="K+" />
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={2.0} duration={5000} decimals={1} prefix="KES " suffix="B+" />
              <div className="text-gray-600">Transactions Processed</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={99.9} duration={4500} decimals={1} suffix="%" />
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything Your SACCO Needs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed specifically for SACCO operations, from member management to financial
              reporting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-sacco-blue/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-sacco-blue" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose SaccoSmart?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of SACCOs that have transformed their operations and improved member satisfaction with our
                platform.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-sacco-green/10 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-sacco-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Contributions</p>
                      <p className="text-2xl font-bold text-green-600">+45%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Processing Time</p>
                      <p className="text-2xl font-bold text-blue-600">-80%</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Member Satisfaction</p>
                      <p className="text-2xl font-bold text-purple-600">95%</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by SACCO Leaders</h2>
            <p className="text-xl text-gray-600">
              See what SACCO administrators and members are saying about SaccoSmart
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-sacco-blue">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your SACCO's size and needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-sacco-blue shadow-xl scale-105" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sacco-blue text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-sacco-green" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-sacco-blue hover:bg-sacco-blue/90" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sacco-blue to-sacco-green">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your SACCO?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of SACCOs already using SaccoSmart to improve their operations and member satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm bg-white"
            />
            <Button size="lg" className="bg-white text-sacco-blue hover:bg-white/90 font-semibold px-8">
              Start Free Trial
            </Button>
          </div>
          <p className="text-white/80 text-sm">
            No credit card required • 30-day free trial • Setup assistance included
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-sacco-blue rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">SaccoSmart</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering SACCOs across Kenya with modern digital solutions for better financial management.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-6">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <span>hello@saccosmart.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 SaccoSmart. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  )
}
