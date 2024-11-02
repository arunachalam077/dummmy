import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

interface Contact {
  _id: string;
  username: string;
  senderId: string;
  createdAt: string;
  name?: string;
  profile_pic?: string;
}

interface Message {
  _id: string;
  senderId: string;
  recipientId: string;
  message: string;
  response: string;
  Timestamp: string;
}

const API_BASE_URL = 'https://fbef-117-247-96-193.ngrok-free.app';

// Helper function for formatting timestamps
const formatMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return !isNaN(date.getTime()) 
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';
};

export default function LiveChat() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/contacts`);
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else if (typeof response.data === 'string') {
          setContacts([{
            _id: '1',
            username: response.data,
            senderId: '1',
            createdAt: new Date().toISOString()
          }]);
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/messages`);
        
        if (Array.isArray(response.data)) {
          const filteredMessages = response.data.filter((msg: Message) => 
            msg.senderId === selectedContact.senderId || 
            msg.recipientId === selectedContact.senderId
          );
          
          const sortedMessages = filteredMessages.sort((a, b) => 
            new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
          );

          setMessages(sortedMessages);
          scrollToBottom();
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!selectedContact || !newMessage.trim() || sendingMessage) {
      return;
    }
  
    try {
      setSendingMessage(true);
      
      const messageData = {
        senderId: selectedContact.senderId,
        recipientId: selectedContact.senderId,
        message: newMessage.trim(),
        Timestamp: new Date().toISOString()
      };
  
      const response = await axios.post(`${API_BASE_URL}/textmessage`, messageData);
      
      if(response.data) {
        // Add the new message to messages
       
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };
  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
 const formatMessageDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (!isNaN(date.getTime())) {
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  }
  return '';
};

const shouldShowDate = (messages: Message[], currentIndex: number) => {
  if (currentIndex === 0) return true;
  
  const currentDate = new Date(messages[currentIndex].Timestamp).toDateString();
  const prevDate = new Date(messages[currentIndex - 1].Timestamp).toDateString();
  
  return currentDate !== prevDate;
};

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Contact List */}
      <div className="w-1/4 border-r bg-white p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => handleContactSelect(contact)}
                className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 mb-2 ${
                  selectedContact?.senderId === contact.senderId ? 'bg-gray-100' : ''
                }`}
              >
                {contact.profile_pic ? (
                  <img
                    src={contact.profile_pic}
                    alt={contact.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                    {contact.username[0].toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <div className="font-medium">{contact.username}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center">
                {selectedContact.profile_pic ? (
                  <img
                    src={selectedContact.profile_pic}
                    alt={selectedContact.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                    {selectedContact.username[0].toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <div className="font-medium">{selectedContact.username}</div>
                  <div className="text-sm text-gray-500">Online</div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="flex flex-col space-y-4">
              {messages.length === 0 ? (
  <div className="text-center text-gray-500 mt-4">
    No messages yet
  </div>
) : (
  <div className="flex flex-col space-y-4">
    {messages.map((message, index) => (
      <div key={message._id}>
        {/* Date Header - Only show when date changes */}
        {shouldShowDate(messages, index) && (
          <div className="flex justify-center my-4">
            <div className="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
              {formatMessageDate(message.Timestamp)}
            </div>
          </div>
        )}

        {/* Message content */}
        <div className={`flex ${
          message.senderId === selectedContact?.senderId 
            ? 'justify-start' 
            : 'justify-end'
        } mb-2`}>

          {message.message && (

          
          <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
            message.senderId === selectedContact?.senderId 
              ? 'bg-white shadow-sm' 
              : 'bg-blue-500 text-white'
          }`}>
            <p className="break-words">{message.message}</p>
            <div className={`text-xs mt-1 ${
              message.senderId === selectedContact?.senderId 
                ? 'text-gray-500' 
                : 'text-white opacity-70'
            }`}>
              {formatMessageTime(message.Timestamp)}
            </div>
          </div>
           )}
        </div>
           
        {/* Response message */}
        {message.response && (
          <div className="flex justify-end mb-2">
            <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-[70%]">
              <p className="break-words">{message.response}</p>
              <div className="text-xs opacity-75 mt-1">
                {formatMessageTime(message.Timestamp)}
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={sendingMessage}
                />
                <Button 
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sendingMessage}
                  className={`${
                    newMessage.trim() && !sendingMessage 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-300'
                  } text-white`}
                >
                  {sendingMessage ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
}