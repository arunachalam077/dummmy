import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, ChevronRight, HelpCircle, Key, Lock, Moon, Upload, User } from "lucide-react"

import { useNavigate } from 'react-router-dom';

 



export default function Settings() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('./policy');
  };

  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 e-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 text-foreground">
        <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Settings</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-full inline-flex space-x-1">
              <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
              <TabsTrigger value="account" className="rounded-full">Account</TabsTrigger>
              <TabsTrigger value="automation" className="rounded-full">Automation</TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-full">Notifications</TabsTrigger>
              <TabsTrigger value="security" className="rounded-full">Security</TabsTrigger>
              <TabsTrigger value="billing" className="rounded-full">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24 border-4 border-purple-200 dark:border-purple-700">
                      <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">
                      Change Photo
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input id="businessName" placeholder="Enter your business name" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram Handle</Label>
                      <Input id="instagram" placeholder="@yourusername" className="bg-white dark:bg-gray-700" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Account Integration</CardTitle>
                  <CardDescription>Connect and manage your Instagram accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="Instagram account" />
                        <AvatarFallback>IG</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">@youraccount</p>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-purple-200 dark:border-purple-700">Disconnect</Button>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    <User className="mr-2 h-4 w-4" />
                    Add Another Account
                  </Button>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Manage your API keys for external integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Key</p>
                      <p className="text-sm text-muted-foreground">Last generated 30 days ago</p>
                    </div>
                    <Button variant="outline" className="border-purple-200 dark:border-purple-700">
                      <Key className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                  <Input value="••••••••••••••••" readOnly className="bg-purple-50 dark:bg-purple-900/50" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="automation" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Automation Settings</CardTitle>
                  <CardDescription>Customize your automation rules and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoRespond">Auto-Respond to DMs</Label>
                      <p className="text-sm text-muted-foreground">Automatically respond to new direct messages</p>
                    </div>
                    <Switch id="autoRespond" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="responseDelay">Response Delay (minutes)</Label>
                      <Input id="responseDelay" type="number" placeholder="5" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="autoMessage">Auto-Response Message</Label>
                      <Textarea id="autoMessage" placeholder="Enter your auto-response message here" className="bg-white dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <Upload className="h-4 w-4" />
                    <Label htmlFor="csvUpload">Upload CSV for Bulk Actions</Label>
                    <Input id="csvUpload" type="file" className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById('csvUpload').click()} className="border-purple-200 dark:border-purple-700">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">
                    Save Automation Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotif">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="emailNotif" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotif">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch id="pushNotif" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="dmNotif">DM Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified for new direct messages</p>
                    </div>
                    <Switch id="dmNotif" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="bg-white dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">
                    Update Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your subscription and payment details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div>
                      <p className="font-medium">Current Plan</p>
                      <p className="text-sm text-muted-foreground">Pro Plan - $29.99/month</p>
                    </div>
                    <Button variant="outline" className="border-purple-200 dark:border-purple-700">Upgrade Plan</Button>
                  </div>
                  <div className="flex items-center justify-between p-4  bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm text-muted-foreground">Visa ending in 1234</p>
                    </div>
                    <Button variant="outline" className="border-purple-200 dark:border-purple-700">Update</Button>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Billing History</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between text-sm p-2 bg-purple-50 dark:bg-purple-900/50 rounded">
                        <span>Aug 1, 2023</span>
                        <span>$29.99</span>
                      </li>
                      <li className="flex items-center justify-between text-sm p-2 bg-purple-50 dark:bg-purple-900/50 rounded">
                        <span>Jul 1, 2023</span>
                        <span>$29.99</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <footer className="border-t bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost" size="sm" className="text-sm">
                  Terms of Service
                </Button>
                <Button variant="ghost" size="sm" className="text-sm"onClick={handleClick} >
                  Privacy Policy
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <select className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-3 py-1">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}