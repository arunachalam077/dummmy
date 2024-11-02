import { useState } from 'react'
import { Search, Filter, Plus, Upload, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Contact() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', gender: 'Male', status: 'Active', subscribed: '2023-10-01' },
    { id: 2, name: 'Jane Smith', gender: 'Female', status: 'Inactive', subscribed: '2023-09-15' },
    { id: 3, name: 'Alice Johnson', gender: 'Female', status: 'Active', subscribed: '2023-10-05' },
    { id: 4, name: 'Bob Williams', gender: 'Male', status: 'Active', subscribed: '2023-09-28' },
    { id: 5, name: 'Emma Brown', gender: 'Female', status: 'Inactive', subscribed: '2023-09-20' },
    { id: 6, name: 'Michael Davis', gender: 'Male', status: 'Active', subscribed: '2023-10-03' },
    { id: 7, name: 'Olivia Wilson', gender: 'Female', status: 'Active', subscribed: '2023-09-18' },
    { id: 8, name: 'Daniel Taylor', gender: 'Male', status: 'Inactive', subscribed: '2023-09-25' },
    { id: 9, name: 'Sophia Anderson', gender: 'Female', status: 'Active', subscribed: '2023-10-07' },
    { id: 10, name: 'Ethan Martinez', gender: 'Male', status: 'Active', subscribed: '2023-09-30' },
  ])

  return (
    <div >
      <div className="bg-gray-100 -lg shadow-lg p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
          <div className="space-x-2">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Create New Contact
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600  rounded-full text-white font-bold py-2 px-4 ">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 rounded-full"
              placeholder="Search contacts..."
            />
          </div>
          <Button variant="outline" className="border-gray-300">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${contact.id}`} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.gender}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contact.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {contact.status}
                    </span>
                  </TableCell>
                  <TableCell>{contact.subscribed}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}