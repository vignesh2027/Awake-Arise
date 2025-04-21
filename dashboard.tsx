"use client"

import { useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  LineChart,
  Menu,
  Moon,
  MoreHorizontal,
  PieChart,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you would apply the theme change to the document
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashify
            </h1>
          ) : (
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              D
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400`}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Products</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Users className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Customers</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Orders</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <LineChart className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Analytics</span>}
            </Button>
          </div>

          <Separator className="my-4 bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-1">
            <p
              className={`text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ${isSidebarOpen ? "" : "text-center"}`}
            >
              {isSidebarOpen ? "SETTINGS" : "⚙️"}
            </p>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Settings className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Settings</span>}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Help Center</span>}
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-gray-100 dark:bg-gray-800 border-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="outline" size="icon" className="text-gray-700 dark:text-gray-300">
              <Calendar className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="text-gray-700 dark:text-gray-300 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <Button variant="outline" size="icon" className="text-gray-700 dark:text-gray-300" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Welcome back, here's what's happening with your store today.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 lg:mt-0">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Revenue"
                value="$45,231.89"
                change="+20.1%"
                trend="up"
                description="Compared to last month"
                icon={DollarSign}
              />

              <StatsCard
                title="New Customers"
                value="2,420"
                change="+12.5%"
                trend="up"
                description="Compared to last month"
                icon={Users}
              />

              <StatsCard
                title="Active Orders"
                value="1,210"
                change="-3.4%"
                trend="down"
                description="Compared to last month"
                icon={ShoppingCart}
              />

              <StatsCard
                title="Conversion Rate"
                value="3.8%"
                change="+2.2%"
                trend="up"
                description="Compared to last month"
                icon={LineChart}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue for the current year</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Data</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <RevenueChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Sales by Category</CardTitle>
                    <CardDescription>Top performing product categories</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Data</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <CategoryChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </div>
                  <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={order.customerAvatar || "/placeholder.svg"} alt={order.customerName} />
                            <AvatarFallback>
                              {order.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.customerName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Order #{order.id} • {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "success"
                                : order.status === "Processing"
                                  ? "warning"
                                  : "default"
                            }
                          >
                            {order.status}
                          </Badge>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ${order.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Top Products</CardTitle>
                    <CardDescription>Best selling products this month</CardDescription>
                  </div>
                  <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change, trend, description, icon: Icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 dark:text-gray-400">{title}</div>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${trend === "up" ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{value}</div>
        <div className="flex items-center text-sm">
          <span
            className={`flex items-center ${trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {change}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Revenue Chart Component
function RevenueChart() {
  // This would be a real chart in a production app
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute inset-0 flex items-end justify-between px-4">
        {Array.from({ length: 12 }).map((_, i) => {
          const height = Math.random() * 70 + 30
          return (
            <div key={i} className="relative group">
              <div
                className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t-md transition-all duration-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500"
                style={{ height: `${height}%` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 -mb-6 text-xs text-center text-gray-500 dark:text-gray-400">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
              </div>
            </div>
          )
        })}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-0 flex flex-col justify-between py-4 text-xs text-gray-500 dark:text-gray-400">
        <div>$50k</div>
        <div>$40k</div>
        <div>$30k</div>
        <div>$20k</div>
        <div>$10k</div>
        <div>$0</div>
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-b border-gray-200 dark:border-gray-800 w-full"></div>
        ))}
      </div>
    </div>
  )
}

// Category Chart Component
function CategoryChart() {
  // This would be a real chart in a production app
  const categories = [
    { name: "Electronics", value: 35, color: "bg-blue-500 dark:bg-blue-600" },
    { name: "Clothing", value: 25, color: "bg-purple-500 dark:bg-purple-600" },
    { name: "Home & Kitchen", value: 20, color: "bg-green-500 dark:bg-green-600" },
    { name: "Books", value: 15, color: "bg-yellow-500 dark:bg-yellow-600" },
    { name: "Other", value: 5, color: "bg-gray-500 dark:bg-gray-600" },
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="relative w-48 h-48 mx-auto">
        <PieChart className="w-full h-full text-gray-300 dark:text-gray-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">65%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Electronics</div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${category.color} mr-2`}></div>
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">{category.name}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.value}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Sample data for recent orders
const recentOrders = [
  {
    id: "1234",
    customerName: "Sarah Johnson",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2 mins ago",
    amount: 125.99,
    status: "Completed",
  },
  {
    id: "1235",
    customerName: "Michael Chen",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    date: "15 mins ago",
    amount: 74.5,
    status: "Processing",
  },
  {
    id: "1236",
    customerName: "Emily Rodriguez",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    date: "1 hour ago",
    amount: 249.99,
    status: "Completed",
  },
  {
    id: "1237",
    customerName: "David Kim",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    date: "3 hours ago",
    amount: 32.5,
    status: "Pending",
  },
]

// Sample data for top products
const topProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    sales: 1423,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 249.99,
    sales: 986,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Premium Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    sales: 879,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 199.99,
    sales: 654,
    image: "/placeholder.svg?height=32&width=32",
  },
]
