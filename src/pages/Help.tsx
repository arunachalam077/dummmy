"use client"

import { useState } from "react"
import { Search, ChevronRight, MessageCircle, HelpCircle, Book, Users, Send, Play, Home, FileQuestion, Phone, Instagram } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [issueType, setIssueType] = useState("")
  const [description, setDescription] = useState("")

  const helpCategories = [
    {
      title: "Getting Started",
      icon: Book,
      items: ["Account Setup", "Dashboard Overview", "First Automation"],
    },
    {
      title: "DM Automation",
      icon: Send,
      items: ["Creating Templates", "Scheduling Messages", "Bulk Messaging"],
    },
    {
      title: "Account Management",
      icon: Users,
      items: ["Adding Multiple Accounts", "Switching Between Accounts", "Account Security"],
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      items: ["Common Errors", "API Limits", "Account Restrictions"],
    },
  ]

  const faqs = [
    { 
      question: "How do I upload a CSV file?", 
      answer: "To upload a CSV file, go to the 'Import' section in your dashboard. Click on 'Upload CSV' and select your file. Make sure your CSV follows our template format for successful import.",
      tags: ["CSV Upload", "Getting Started"] 
    },
    { 
      question: "What are the best practices for DM automation?", 
      answer: "For effective DM automation: 1) Personalize your messages, 2) Avoid spammy content, 3) Respect rate limits, 4) Test your campaigns with a small group first, and 5) Monitor your engagement rates regularly.",
      tags: ["DM Automation", "Best Practices"] 
    },
    { 
      question: "How can I avoid getting my account flagged?", 
      answer: "To avoid account flags: 1) Don't exceed daily limits, 2) Avoid repetitive content, 3) Engage naturally with your audience, 4) Use a gradual warm-up period for new accounts, and 5) Comply with the platform's terms of service.",
      tags: ["Account Security", "Best Practices"] 
    },
    { 
      question: "What's the difference between bulk and drip campaigns?", 
      answer: "Bulk campaigns send messages to many recipients at once, while drip campaigns send messages over time based on user actions or schedules. Drip campaigns are often more personalized and can lead to better engagement.",
      tags: ["DM Automation", "Campaigns"] 
    },
  ]

  const tutorials = [
    {
      title: "CSV Upload Guide",
      
      duration: "5 minutes"
    },
    {
      title: "DM Automation Walkthrough",
      
      duration: "10 minutes"
    },
    {
      title: "Account Security Best Practices",
     
      duration: "7 minutes"
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { name, email, issueType, description })
    // Reset form fields
    setName("")
    setEmail("")
    setIssueType("")
    setDescription("")
  }

  return (
    <div className="mx-auto p-6 bg-gray-100  min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Instagram className="h-8 w-8 text-purple-600 mr-2" />
          <h1 className="text-4xl font-bold text-center text-purple-600">Help Center</h1>
        </div>

        <Tabs defaultValue="home" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 rounded-full bg-white p-1 shadow-lg">
            {[
              { value: "home", icon: Home, label: "Home" },
              { value: "faq", icon: FileQuestion, label: "FAQs" },
              { value: "tutorials", icon: Play, label: "Tutorials" },
              { value: "contact", icon: Phone, label: "Contact" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        
          {/* Search Bar */}
          <div className="relative mb-8 mt-4">
            <Input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          </div>

          <TabsContent value="home">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-purple-100">
                    <CardTitle className="flex items-center">
                      <category.icon className="mr-2 h-5 w-5" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-purple-100 text-black">
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription className="text-black">Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {faqs.map((faq, index) => (
                  <Accordion key={index} type="single" collapsible className="mb-4">
                    <AccordionItem value={`faq-${index}`}>
                      <AccordionTrigger className="text-purple-700 hover:text-purple-900">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-2">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700">{tag}</Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials">
            <Card className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-purple-100 text-black">
                <CardTitle>Interactive Tutorials & Guides</CardTitle>
                <CardDescription className="text-black">Step-by-step walkthroughs for key features</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {tutorials.map((tutorial) => (
                  <Button key={tutorial.title} variant="outline" className="h-auto py-4 flex flex-col items-center justify-center bg-purple-100 text-black hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    <Play className="mb-2 h-6 w-6" />
                    <span className="font-bold">{tutorial.title}</span>
                    <span className="text-sm mt-1">{tutorial.description}</span>
                    <span className="text-xs mt-2">Duration: {tutorial.duration}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-purple-100 text-black">
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription className="text-black">Get help from our support team</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      placeholder="Your Name" 
                      className="rounded-full" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input 
                      placeholder="Your Email" 
                      type="email" 
                      className="rounded-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <select 
                      className="w-full p-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      required
                    >
                      <option value="">Select Issue Type</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Issue</option>
                      <option value="billing">Billing Issue</option>
                    </select>
                    <textarea
                      placeholder="Describe your issue..."
                      className="w-full p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">
                      Submit Support Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-purple-100 text-black">
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription className="text-black">Connect with other users and share tips</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">Join our community forum to ask questions, share your experiences, and learn from other users.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4">Visit Community Forum</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Live Chat Widget */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-600">Live Chat Support</DialogTitle>
              <DialogDescription className="text-gray-600">
                Chat with our support team for immediate assistance.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-gray-600">Live chat functionality would be implemented here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}