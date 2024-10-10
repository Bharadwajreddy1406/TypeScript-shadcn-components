import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Search} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  rollNo: string
  name: string
  ipAddress: string
  status: 'Completed' | 'In Progress'
  score: number | null
}

const mockStudents: Student[] = [
  { rollNo: '001', name: 'John Doe', ipAddress: '192.168.1.1', status: 'In Progress', score: null },
  { rollNo: '002', name: 'Jane Smith', ipAddress: '192.168.1.2', status: 'Completed', score: 85 },
  { rollNo: '003', name: 'Bob Johnson', ipAddress: '192.168.1.3', status: 'In Progress', score: null },
  { rollNo: '004', name: 'Alice Brown', ipAddress: '192.168.1.4', status: 'Completed', score: 92 },
  { rollNo: '005', name: 'Charlie Davis', ipAddress: '192.168.1.5', status: 'In Progress', score: null },
]

export default function InterviewStudentList() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'rollNo' | 'name' | 'score' | 'rollNoAndStatus'>('rollNo')
  const [interviewName, setInterviewName] = useState('Frontend Developer Interview')

  useEffect(() => {
    // Simulating API call to fetch students
    // In a real application, you would fetch data from an API here
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSort = (value: 'rollNo' | 'name' | 'score' | 'rollNoAndStatus') => {
    setSortBy(value)
  }

  const handleRefresh = () => {
    // Simulating refresh action
    // In a real application, you would fetch updated data from an API here
    console.log('Refreshing student list...')
  }

  const filteredStudents = students.filter(student =>
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'rollNo':
        return a.rollNo.localeCompare(b.rollNo)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'score':
        return (b.score || 0) - (a.score || 0)
      case 'rollNoAndStatus':
        if (a.status === b.status) {
          return a.rollNo.localeCompare(b.rollNo)
        }
        return a.status === 'In Progress' ? -1 : 1
      default:
        return 0
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 min-h-screen text-gray-800 pt-20"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Students ({interviewName})
        </h1>
        <Button onClick={handleRefresh} className="bg-gray-800 text-white hover:bg-gray-700">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-full sm:w-64 flex">
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select onValueChange={handleSort} defaultValue={sortBy}>
          <SelectTrigger className="w-[200px] bg-white border-gray-300 text-gray-800 focus:border-gray-400 focus:ring-gray-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rollNo">Roll No</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="score">Score</SelectItem>
            <SelectItem value="rollNoAndStatus">Roll No & Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-gray-700">Roll No</TableHead>
              <TableHead className="text-gray-700">Name</TableHead>
              <TableHead className="text-gray-700">IP Address</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-gray-700">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.rollNo} className="hover:bg-gray-100">
                <TableCell className="text-gray-800">{student.rollNo}</TableCell>
                <TableCell className="text-gray-800">{student.name}</TableCell>
                <TableCell className="text-gray-800">{student.ipAddress}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      student.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-800">{student.score !== null ? student.score : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}