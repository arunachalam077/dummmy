import { useState } from "react"
import { Home, Users, Zap, MessageCircle, Settings, ShoppingBag, UserPlus, BrainCircuit, BarChart2, Camera, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSpring, animated } from "react-spring"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// import Sidebar from '../components/Sidebar'
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ]
  

  const featureCards = [
    { title: "Sell Products in DMs", description: "Automate product sales through direct messages", icon: ShoppingBag },
    { title: "Generate Leads with Stories", description: "Create engaging stories to capture leads", icon: UserPlus },
    { title: "Recognize Questions in DM with AI", description: "Use AI to identify and respond to inquiries", icon: BrainCircuit },
  ]

  const automatedActivities = [
    { name: "Comments", value: 1234, icon: MessageCircle },
    { name: "Story Replies", value: 567, icon: Camera },
    { name: "DMs", value: 890, icon: Send },
  ]

  const statistics = [
    { name: "Total DMs", value: "5,678" },
    { name: "Story Mentions", value: "2,345" },
    { name: "New Followers", value: "1,234" },
    { name: "Posts Engagement", value: "12.5%" },
  ]

  const AnimatedActivity = ({ activity, index }) => {
    const props = useSpring({
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0px)" },
      delay: index * 200,
    })

    const countProps = useSpring({
      from: { value: 0 },
      to: { value: activity.value },
      delay: index * 200,
      config: { duration: 1000 },
    })

    return (
      <animated.div style={props} className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
        <div className="p-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full">
          <activity.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{activity.name}</p>
          <animated.p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            {countProps.value.to((val) => Math.floor(val).toLocaleString())}
          </animated.p>
        </div>
      </animated.div>
    )
  }

  return (
    <div className="flex h-screen  bg-bg-gray-100">
   
      {/* <Sidebar/> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                    className="rounded-full"
                    height={32}
                    width={32}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Feature Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div> */}

          {/* Animated Automated Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Automated Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {automatedActivities.map((activity, index) => (
                  <AnimatedActivity key={activity.name} activity={activity} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* growth graph */}
          
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Your follower count over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  "New follower: @user123",
                  "Product inquiry from @customer456",
                  "Story mention by @influencer789",
                  "Automated DM sent to @lead321",
                ].map((activity, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}