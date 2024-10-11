import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Upload, Plus, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'

interface Student {
  id: string
  rollNumber: string
  name: string
  branch: string
  year: string
}

export default function AdminStudentManagement() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [studentsPerPage, setStudentsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
    rollNumber: '',
    name: '',
    branch: '',
    year: '',
  })

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      const mockStudents = Array.from({ length: 100 }, (_, i) => ({
        id: (i + 1).toString(),
        rollNumber: `00${i + 1}`.slice(-3),
        name: `Student ${i + 1}`,
        branch: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'][i % 3],
        year: ['2023', '2024', '2025', '2026'][i % 4],
      }))
      setStudents(mockStudents)
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.random().toString(36).substr(2, 9)
    setStudents([...students, { ...newStudent, id }])
    setNewStudent({ rollNumber: '', name: '', branch: '', year: '' })
    setShowAddForm(false)
  }

  const handleView = (id: string) => {
    // Implement view functionality here
    console.log(`Viewing student with id: ${id}`)
  }

  const filteredStudents = students.filter(student =>
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredStudents.length / studentsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 min-h-screen text-gray-800 pt-20"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Student Management</h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search by Roll Number"
            value={searchTerm}
            onChange={handleSearch}
            className="mr-2 bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
          />
          <Search className="text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowAddForm(true)} className="bg-gray-800 text-white hover:bg-gray-700">
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
          <Button className="bg-gray-800 text-white hover:bg-gray-700">
            <Upload className="mr-2 h-4 w-4" /> Upload CSV
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleAddStudent}
            className="mb-6 p-4 bg-white rounded-md shadow-md"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Roll Number"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                required
                className="bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
              />
              <Input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
                className="bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
              />
              <Input
                type="text"
                placeholder="Branch"
                value={newStudent.branch}
                onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
                required
                className="bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
              />
              <Input
                type="text"
                placeholder="Year"
                value={newStudent.year}
                onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                required
                className="bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button type="submit" className="bg-gray-800 text-white hover:bg-gray-700">Add Student</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="text-gray-800 border-gray-800 hover:bg-gray-100">Cancel</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '50vh' }}>
          <div className="overflow-auto h-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-gray-700">Roll Number</TableHead>
                  <TableHead className="text-gray-700">Name</TableHead>
                  <TableHead className="text-gray-700">Branch</TableHead>
                  <TableHead className="text-gray-700">Year</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {currentStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-100"
                    >
                      <TableCell className="text-gray-800">{student.rollNumber}</TableCell>
                      <TableCell className="text-gray-800">{student.name}</TableCell>
                      <TableCell className="text-gray-800">{student.branch}</TableCell>
                      <TableCell className="text-gray-800">{student.year}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center items-center space-x-2">
                            <Button
                            variant="ghost"
                            onClick={() => handleDelete(student.id)}
                            className="p-0 h-8 w-8 rounded-full"
                            >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button
                            onClick={() => navigate(`/view-student`)}
                            className="bg-gray-800 text-white hover:bg-gray-700 px-3 py-1 rounded h-8"
                            >
                            View
                            </Button>
                        </div>
                    </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <Select
          value={studentsPerPage.toString()}
          onValueChange={(value) => {
            setStudentsPerPage(Number(value))
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-300 text-gray-800 focus:border-gray-400 focus:ring-gray-400">
            <SelectValue placeholder="Results per page" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 text-gray-800">
            <SelectItem value="25" className="focus:bg-gray-100">25 per page</SelectItem>
            <SelectItem value="50" className="focus:bg-gray-100">50 per page</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => setCurrentPage(number)}
              variant={currentPage === number ? 'default' : 'outline'}
              className={currentPage === number ? 'bg-gray-800 text-white' : 'text-gray-800 border-gray-300 hover:bg-gray-100'}
            >
              {number}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
            disabled={currentPage === pageNumbers.length}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}