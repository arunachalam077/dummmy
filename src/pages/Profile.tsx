import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Camera, ChevronDown, Facebook, Globe, Image, Instagram, Lock, LogOut, Moon, Sun, Upload } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase-config';




const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
}


export default function Profile() {
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Assuming '/' is your login page route
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`min-h-screen bg-gray-100 dark:from-gray-900 dark:to-gray-800 ${darkMode ? 'dark' : ''}`}
    >
      <div className="container mx-auto p-6 space-y-8">
        <motion.header
          variants={slideIn}
          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Profile</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">John Doe</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
      variant="ghost" 
      size="sm" 
      className="text-red-600 hover:text-red-700 hover:bg-red-100"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
          </div>
        </motion.header>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div variants={slideIn} className="md:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-100 ">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white">
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivWxEVAPRzMO0VqZVN7TPDgh_LlE6K51Jgw&s" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full bg-white text-purple-600 hover:bg-purple-100">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Change profile picture</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">John Doe</CardTitle>
                    <CardDescription className="text-purple-100">
                      <span className="font-medium">Administrator</span>
                      <span className="mx-2">•</span>
                      <span className="text-green-300">Online</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="personal-info" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3 bg-purple-100 dark:bg-gray-700">
                    <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal-info" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" value="johndoe123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" value="https://johndoe.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center justify-between p-4 bg-purple-100 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Notifications</Label>
                          <p className="text-sm text-muted-foreground">Enable email and push notifications</p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={notificationsEnabled}
                          onCheckedChange={setNotificationsEnabled}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-purple-100 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="darkMode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Toggle dark mode on or off</p>
                        </div>
                        <Switch
                          id="darkMode"
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select Timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time</SelectItem>
                            <SelectItem value="pst">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </TabsContent>
                  <TabsContent value="activity" className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Recent Activity</h3>
                      <ul className="space-y-4">
                        <motion.li
                          variants={fadeIn}
                          className="flex justify-between items-center p-3 bg-purple-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-500 p-2 rounded-full">
                              <LogOut className="h-4 w-4 text-white" />
                            </div>
                            <span>Logged in from new device</span>
                          </div>
                          <span className="text-sm text-muted-foreground">2 hours ago</span>
                        </motion.li>
                        <motion.li
                          variants={fadeIn}
                          className="flex justify-between items-center p-3 bg-purple-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-500 p-2 rounded-full">
                              <Lock className="h-4 w-4 text-white" />
                            </div>
                            <span>Changed password</span>
                          </div>
                          <span className="text-sm text-muted-foreground">3 days ago</span>
                        </motion.li>
                        <motion.li
                          variants={fadeIn}
                          className="flex justify-between items-center p-3 bg-purple-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-500 p-2 rounded-full">
                              <Image className="h-4 w-4 text-white" />
                            </div>
                            <span>Updated profile picture</span>
                          </div>
                          <span className="text-sm text-muted-foreground">1 week ago</span>
                        </motion.li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideIn} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">Pro Plan</div>
                <p className="text-muted-foreground">$29.99/month</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Manage Subscription
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your linked social accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  variants={fadeIn}
                  className="flex items-center justify-between p-3 bg-purple-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <span>Instagram</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  className="flex items-center justify-between p-3 bg-purple-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}