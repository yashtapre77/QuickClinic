"use client"

import { CalendarDays, Users, TrendingUp, DollarSign, Clock, UserCheck, Activity, Stethoscope } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

// Sample data for the dashboard
const monthlyPatients = [
  { month: "Jan", patients: 45, revenue: 4500 },
  { month: "Feb", patients: 52, revenue: 5200 },
  { month: "Mar", patients: 48, revenue: 4800 },
  { month: "Apr", patients: 61, revenue: 6100 },
  { month: "May", patients: 55, revenue: 5500 },
  { month: "Jun", patients: 67, revenue: 6700 },
  { month: "Jul", patients: 72, revenue: 7200 },
  { month: "Aug", patients: 69, revenue: 6900 },
  { month: "Sep", patients: 58, revenue: 5800 },
  { month: "Oct", patients: 63, revenue: 6300 },
  { month: "Nov", patients: 71, revenue: 7100 },
  { month: "Dec", patients: 76, revenue: 7600 },
]

const genderData = [
  { name: "Female", value: 342, color: "#ff6b9d" },
  { name: "Male", value: 285, color: "#4ecdc4" },
  { name: "Other", value: 23, color: "#45b7d1" },
]

const commonDiseases = [
  { disease: "Hypertension", count: 89 },
  { disease: "Diabetes", count: 76 },
  { disease: "Common Cold", count: 65 },
  { disease: "Migraine", count: 54 },
  { disease: "Arthritis", count: 43 },
  { disease: "Asthma", count: 38 },
]

const ageDistribution = [
  { ageGroup: "0-18", count: 45 },
  { ageGroup: "19-35", count: 156 },
  { ageGroup: "36-50", count: 198 },
  { ageGroup: "51-65", count: 167 },
  { ageGroup: "65+", count: 84 },
]

const recentAppointments = [
  {
    id: 1,
    name: "Sarah Johnson",
    time: "09:00 AM",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  { id: 2, name: "Michael Chen", time: "10:30 AM", status: "completed", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Emily Davis", time: "02:00 PM", status: "upcoming", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Robert Wilson", time: "03:30 PM", status: "upcoming", avatar: "/placeholder.svg?height=32&width=32" },
  {
    id: 5,
    name: "Lisa Anderson",
    time: "04:00 PM",
    status: "cancelled",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function DoctorDashboard() {
  const totalPatients = genderData.reduce((sum, item) => sum + item.value, 0)
  const totalRevenue = monthlyPatients.reduce((sum, item) => sum + item.revenue, 0)
  const avgPatientsPerMonth = Math.round(
    monthlyPatients.reduce((sum, item) => sum + item.patients, 0) / monthlyPatients.length,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="p-5 mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Dr. Smith</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Patients</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients.toLocaleString()}</div>
              <p className="text-xs opacity-90 mt-1">in last year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Monthly Average</CardTitle>
              <CalendarDays className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgPatientsPerMonth}</div>
              <p className="text-xs opacity-90 mt-1">Patients per month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs opacity-90 mt-1">This year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Appointments</CardTitle>
              <UserCheck className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">700</div>
              <p className="text-xs opacity-90 mt-1">cancelled included</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Monthly Patient Frequency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Patient Frequency by Month
              </CardTitle>
              <CardDescription>Number of patients treated each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  patients: {
                    label: "Patients",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPatients}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="var(--color-patients)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-patients)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-600" />
                Gender Distribution
              </CardTitle>
              <CardDescription>Patient demographics by gender</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  female: {
                    label: "Female",
                    color: "#ff6b9d",
                  },
                  male: {
                    label: "Male",
                    color: "#4ecdc4",
                  },
                  other: {
                    label: "Other",
                    color: "#45b7d1",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Common Diseases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-red-600" />
                Most Common Conditions
              </CardTitle>
              <CardDescription>Top diagnosed conditions this year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Cases",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={commonDiseases} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="disease" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Age Distribution
              </CardTitle>
              <CardDescription>Patient age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Patients",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Today's Appointments
            </CardTitle>
            <CardDescription>Recent and upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.name} />
                      <AvatarFallback>
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.name}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "completed"
                        ? "default"
                        : appointment.status === "upcoming"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
