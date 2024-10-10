import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw } from 'lucide-react'

interface Student {
  id: number
  name: string
  rollNumber: string
  section: string
  year: string
  ipAddress: string
  interviewStatus: 'Not Started' | 'Started' | 'Completed'
}

const sampleStudents: Student[] = [
  { id: 1, name: "John Doe", rollNumber: "A001", section: "A", year: "2023", ipAddress: "192.168.1.1", interviewStatus: "Not Started" },
  { id: 2, name: "Jane Smith", rollNumber: "B002", section: "B", year: "2023", ipAddress: "192.168.1.2", interviewStatus: "Started" },
  { id: 3, name: "Alice Johnson", rollNumber: "C003", section: "A", year: "2022", ipAddress: "192.168.1.3", interviewStatus: "Completed" },
  { id: 4, name: "Bob Williams", rollNumber: "D004", section: "C", year: "2023", ipAddress: "192.168.1.4", interviewStatus: "Started" },
  { id: 5, name: "Charlie Brown", rollNumber: "E005", section: "B", year: "2022", ipAddress: "192.168.1.5", interviewStatus: "Not Started" },
  // Add more sample students to demonstrate scrolling
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 6,
    name: `Student ${i + 6}`,
    rollNumber: `R00${i + 6}`,
    section: String.fromCharCode(65 + (i % 3)),
    year: `202${i % 4}`,
    ipAddress: `192.168.1.${i + 6}`,
    interviewStatus: ['Not Started', 'Started', 'Completed'][i % 3] as 'Not Started' | 'Started' | 'Completed'
  }))
]

export function AdminStudentDashboard() {
  const [students, setStudents] = useState<Student[]>(sampleStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage, setStudentsPerPage] = useState(15)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'ipAddress' | 'interviewStatus'>>({
    name: '',
    rollNumber: '',
    section: '',
    year: '',
  })

  const handleAddStudent = () => {
    setStudents([...students, { 
      ...newStudent, 
      id: students.length + 1, 
      ipAddress: '192.168.1.' + (students.length + 1), 
      interviewStatus: 'Not Started' 
    }])
    setIsAddStudentOpen(false)
    setNewStudent({
      name: '',
      rollNumber: '',
      section: '',
      year: '',
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically parse the CSV file and update the students state
      console.log('CSV file uploaded:', file.name)
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In a real application, you would fetch fresh data here
    setStudents([...sampleStudents])
    setIsLoading(false)
  }

  const filteredStudents = students.filter(student =>
    Object.values(student).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredStudents.length / studentsPerPage); i++) {
    pageNumbers.push(i)
  }

  const getStatusBadge = (status: Student['interviewStatus']) => {
    switch (status) {
      case 'Not Started':
        return <Badge className="bg-yellow-200 text-yellow-800">{status}</Badge>
      case 'Started':
        return <Badge className="bg-blue-200 text-blue-800">{status}</Badge>
      case 'Completed':
        return <Badge className="bg-green-200 text-green-800">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 pt-20  font-sans"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <Input 
          type="text" 
          placeholder="Search students..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <div className="flex items-center space-x-2">
          <Select value={studentsPerPage.toString()} onValueChange={(value) => setStudentsPerPage(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Students per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-md border shadow-sm">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] bg-gray-100">Name</TableHead>
                <TableHead className="bg-gray-100">Roll Number</TableHead>
                <TableHead className="bg-gray-100">Section</TableHead>
                <TableHead className="bg-gray-100">Year</TableHead>
                <TableHead className="bg-gray-100">IP Address</TableHead>
                <TableHead className="bg-gray-100">Interview Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.ipAddress}</TableCell>
                  <TableCell>{getStatusBadge(student.interviewStatus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
            <DialogTrigger asChild>
              <Button>Add New Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rollNumber" className="text-right">Roll Number</Label>
                  <Input id="rollNumber" value={newStudent.rollNumber} onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section" className="text-right">Section</Label>
                  <Input id="section" value={newStudent.section} onChange={(e) => setNewStudent({...newStudent, section: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Year</Label>
                  <Input id="year" value={newStudent.year} onChange={(e) => setNewStudent({...newStudent, year: e.target.value})} className="col-span-3" />
                </div>
              </div>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogContent>
          </Dialog>
          <div className="relative">
            <Input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload}
              className="sr-only"
              id="csv-upload"
            />
            <Label htmlFor="csv-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Upload CSV
            </Label>
          </div>
        </div>
        <div className="flex space-x-2">
          {pageNumbers.map(number => (
            <Button 
              key={number}
              onClick={() => setCurrentPage(number)}
              variant={currentPage === number ? 'default' : 'outline'}
              size="sm"
            >
              {number}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}