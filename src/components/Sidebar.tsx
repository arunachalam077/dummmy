import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users, Zap, MessageCircle, Settings, ChevronLeft, ChevronRight, CircleUserRound, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Contacts", icon: Users, path: "/contacts" },
    { name: "Automation", icon: Zap, path: "/automation" },
    { name: "Live Chat", icon: MessageCircle, path: "/live-chat" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const bottomNavItems = [
    { name: "My Profile", icon: CircleUserRound, path: "/profile" },
    { name: "Help", icon: ShieldQuestion, path: "/help" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`
        ${isOpen ? "w-64" : "w-20"}
        flex flex-col
        bg-gradient-to-b from-[#3a3b6e] to-[#7a55ad]
        text-[#ffff]
        min-h-screen
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Sidebar content */}
      <div className="flex justify-between items-center p-4">
        <h1 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>InstaX bot</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#2980b9]"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <nav className="flex-1 px-4 py-6">
        {/* Main Navigation */}
        {navItems.map((item) => (
          <HoverCard key={item.name}>
            <HoverCardTrigger asChild>
              <Link
                to={item.path}
                className={`
                  flex items-center w-full p-2 mb-4 rounded
                  hover:bg-[#2980b9] transition-colors
                  ${isOpen ? "justify-start" : "justify-center"}
                `}
              >
                <item.icon className="h-5 w-5" />
                {isOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            </HoverCardTrigger>
            {!isOpen && (
              <HoverCardContent side="left">
                <span>{item.name}</span>
              </HoverCardContent>
            )}
          </HoverCard>
        ))}
      </nav>

      {/* Bottom Navigation (My Profile & Help) */}
      <div className="px-4 py-4 mt-auto">
        {bottomNavItems.map((item) => (
          <HoverCard key={item.name}>
            <HoverCardTrigger asChild>
              <Link
                to={item.path}
                className={`
                  flex items-center w-full p-2 mb-4 rounded
                  hover:bg-[#2980b9] transition-colors
                  ${isOpen ? "justify-start" : "justify-center"}
                `}
              >
                <item.icon className="h-5 w-5" />
                {isOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            </HoverCardTrigger>
            {!isOpen && (
              <HoverCardContent side="left">
                <span>{item.name}</span>
              </HoverCardContent>
            )}
          </HoverCard>
        ))}
      </div>
    </aside>
  );
}
