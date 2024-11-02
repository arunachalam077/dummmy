import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Plus, Edit, Trash2, Search, Activity, Database } from 'lucide-react'

export default function MainDashboard() {
  const [csvData, setCsvData] = useState([])
  const [manualQueries, setManualQueries] = useState([])
  const [newQuery, setNewQuery] = useState('')
  const [newResponse, setNewResponse] = useState('')
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false)
  const [activityLog, setActivityLog] = useState([])
  const [activeTab, setActiveTab] = useState('queries')

  const handleCsvUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // In a real application, you would parse the CSV file here
      // For this example, we'll just add a dummy entry
      setCsvData([...csvData, { query: "Sample CSV Query", response: "Sample CSV Response", source: "CSV" }])
    }
  }

  const handleAddManualQuery = () => {
    if (newQuery && newResponse) {
      setManualQueries([...manualQueries, { query: newQuery, response: newResponse, source: "Manual" }])
      setNewQuery('')
      setNewResponse('')
    }
  }

  const handleDelete = (index, source) => {
    if (source === "CSV") {
      setCsvData(csvData.filter((_, i) => i !== index))
    } else {
      setManualQueries(manualQueries.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-100  min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Instagram Automation Dashboard
      </motion.h1>

      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-full">
              <Upload className="mr-2 h-4 w-4" /> Upload CSV
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload CSV File</DialogTitle>
            </DialogHeader>
            <motion.div 
              className="grid place-items-center border-2 border-dashed border-gray-300 rounded-lg p-12"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-700">
                  Drag and drop or click to upload CSV
                </span>
              </label>
              <input
                id="csv-upload"
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleCsvUpload}
              />
            </motion.div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center space-x-2">
          <Switch
            id="automation-mode"
            checked={isAutomationEnabled}
            onCheckedChange={setIsAutomationEnabled}
          />
          <Label htmlFor="automation-mode" className="text-gray-700">
            Automation {isAutomationEnabled ? 'Enabled' : 'Disabled'}
          </Label>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Add Query Manually</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter query"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <Textarea
              placeholder="Enter response"
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
            />
            <Button onClick={handleAddManualQuery} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Add Query
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Queries:</span>
              <span className="text-2xl font-bold">{csvData.length + manualQueries.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CSV Queries:</span>
              <span className="text-2xl font-bold">{csvData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Manual Queries:</span>
              <span className="text-2xl font-bold">{manualQueries.length}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Data Management</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'queries' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('queries')}
              >
                <Database className="mr-2 h-4 w-4" /> Queries
              </Button>
              <Button 
                variant={activeTab === 'activity' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('activity')}
              >
                <Activity className="mr-2 h-4 w-4" /> Activity Log
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {activeTab === 'queries' && (
              <motion.div
                key="queries"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Search queries..." />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Query</TableHead>
                        <TableHead>Response</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...csvData, ...manualQueries].map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.query}</TableCell>
                          <TableCell>{item.response}</TableCell>
                          <TableCell>{item.source}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(index, item.source)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            )}
            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DM Text</TableHead>
                        <TableHead>Sent Response</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLog.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell>{log.dmText}</TableCell>
                          <TableCell>{log.sentResponse}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}``