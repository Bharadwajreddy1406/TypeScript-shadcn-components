import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Loader2, Play, Square, Trash2, ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'



interface Interview {
  id: number
  name: string
  subject: string
  branch: string
  section: string
  status: string
}

const mockInterviews: Interview[] = [
  { id: 1, name: "Frontend Developer Interview", subject: "JavaScript", branch: "Computer Science", section: "FS", status: "Scheduled" },
  { id: 2, name: "Backend Developer Interview", subject: "Python", branch: "Information Technology", section: "Elite", status: "In Progress" },
  { id: 3, name: "Full Stack Developer Interview", subject: "Java", branch: "Software Engineering", section: "PreFS", status: "Completed" },
  // Add more mock interviews here...
]

const subjects = ["JavaScript", "Python", "Java", "C++", "Ruby"]
const branches = ["Computer Science", "Information Technology", "Software Engineering"]
const sections = ["FS", "Elite", "PreFS"]

export function InterviewDashboard() {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof Interview>("name")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Record<number, Record<string, boolean>>>({})
  const [restartDialogOpen, setRestartDialogOpen] = useState(false)
  const [interviewToRestart, setInterviewToRestart] = useState<Interview | null>(null)

  const handleCreateInterview = (newInterview: Omit<Interview, "id" | "status">) => {
    setInterviews([
      ...interviews,
      { ...newInterview, id: interviews.length + 1, status: "Scheduled" },
    ])
    setIsDialogOpen(false)
  }

  const handleStartInterview = useCallback((id: number) => {
    const interview = interviews.find((i) => i.id === id)
    if (interview && interview.status === "Completed") {
      setInterviewToRestart(interview)
      setRestartDialogOpen(true)
    } else {
      simulateLoading(
        () => {
          setInterviews((interviews) =>
            interviews.map((interview) =>
              interview.id === id
                ? { ...interview, status: "In Progress" }
                : interview
            )
          )
        },
        id,
        "start"
      )
    }
  }, [interviews])

  const handleRestartInterview = () => {
    if (interviewToRestart) {
      simulateLoading(
        () => {
          setInterviews((interviews) =>
            interviews.map((interview) =>
              interview.id === interviewToRestart.id
                ? { ...interview, status: "In Progress" }
                : interview
            )
          )
          setRestartDialogOpen(false)
          setInterviewToRestart(null)
        },
        interviewToRestart.id,
        "start"
      )
    }
  }

  const handleEndInterview = useCallback((id: number) => {
    simulateLoading(
      () => {
        setInterviews((interviews) =>
          interviews.map((interview) =>
            interview.id === id
              ? { ...interview, status: "Completed" }
              : interview
          )
        )
      },
      id,
      "end"
    )
  }, [])

  const handleDeleteInterview = useCallback((id: number) => {
    simulateLoading(
      () => {
        setInterviews((interviews) =>
          interviews.filter((interview) => interview.id !== id)
        )
      },
      id,
      "delete"
    )
  }, [])

  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedInterviews = filteredInterviews.sort((a, b) => {
    if (sortBy === "status") {
      const statusOrder = { Scheduled: 1, "In Progress": 2, Completed: 3 }
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
    }
    return String(a[sortBy]).localeCompare(String(b[sortBy]))
  })

  const paginatedInterviews = sortedInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const pageCount = Math.ceil(sortedInterviews.length / itemsPerPage)

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentPage(1)
      setIsLoading(false)
    }, 1000)
  }

  const handleSort = (value: keyof Interview) => {
    setIsLoading(true)
    setTimeout(() => {
      setSortBy(value)
      setCurrentPage(1)
      setIsLoading(false)
    }, 500)
  }

  const simulateLoading = (callback: () => void, id: number, action: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [action]: true },
    }))
    setTimeout(() => {
      callback()
      setLoadingStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], [action]: false },
      }))
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 min-h-screen text-gray-800 pt-20"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Interview Dashboard</h1>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64 flex">
          <Input
            type="text"
            placeholder="Search interviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 w-full"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Button onClick={handleSearch} className="ml-2">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select onValueChange={handleSort} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="branch">Branch</SelectItem>
              <SelectItem value="section">Section</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Interview
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Interview</DialogTitle>
              </DialogHeader>
              <CreateInterviewForm onSubmit={handleCreateInterview} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '50vh' }}>
          <div className="overflow-auto h-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-gray-700">Name</TableHead>
                  <TableHead className="text-gray-700">Subject</TableHead>
                  <TableHead className="text-gray-700">Branch</TableHead>
                  <TableHead className="text-gray-700">Section</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {paginatedInterviews.map((interview) => (
                    <motion.tr
                      key={interview.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-100"
                    >
                      <TableCell className="text-gray-800">{interview.name}</TableCell>
                      <TableCell className="text-gray-800">{interview.subject}</TableCell>
                      <TableCell className="text-gray-800">{interview.branch}</TableCell>
                      <TableCell className="text-gray-800">{interview.section}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            interview.status === "Scheduled"
                              ? "bg-yellow-200 text-yellow-800"
                              : interview.status === "In Progress"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {interview.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleStartInterview(interview.id)}
                            disabled={interview.status === "In Progress" || loadingStates[interview.id]?.start}
                          >
                            {loadingStates[interview.id]?.start ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleEndInterview(interview.id)}
                            disabled={interview.status !== "In Progress" || loadingStates[interview.id]?.end}
                          >
                            {loadingStates[interview.id]?.end ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteInterview(interview.id)}
                            disabled={loadingStates[interview.id]?.delete}
                          >
                            {loadingStates[interview.id]?.delete ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => navigate(`/interview-student-list`)}
                            className="bg-gray-800 text-white hover:bg-gray-700 px-3 py-1 rounded h-8"
                            >
                            View
                            </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {paginatedInterviews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                      No interviews are present
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <Select
          onValueChange={(value) => setItemsPerPage(Number(value))}
          defaultValue={itemsPerPage.toString()}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-300 text-gray-800 focus:border-gray-400 focus:ring-gray-400">
            <SelectValue placeholder="Interviews per page" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 text-gray-800">
            <SelectItem value="10" className="focus:bg-gray-100">10 per page</SelectItem>
            <SelectItem value="15" className="focus:bg-gray-100">15 per page</SelectItem>
            <SelectItem value="25" className="focus:bg-gray-100">25 per page</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? 'default' : 'outline'}
              className={currentPage === page ? 'bg-gray-800 text-white' : 'text-gray-800 border-gray-300 hover:bg-gray-100'}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage(currentPage < pageCount ? currentPage + 1 : pageCount)}
            disabled={currentPage === pageCount}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={restartDialogOpen} onOpenChange={setRestartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restart Interview</DialogTitle>
            <DialogDescription>
              Are you sure you want to restart this completed interview?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRestartDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRestartInterview}>Restart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

function CreateInterviewForm({ onSubmit }: { onSubmit: (newInterview: Omit<Interview, "id" | "status">) => void }) {
  const [name, setName] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [branch, setBranch] = useState("")
  const [section, setSection] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && selectedSubjects.length > 0 && branch && section) {
      onSubmit({ name, subject: selectedSubjects.join(", "), branch, section })
      setName("")
      setSelectedSubjects([])
      setBranch("")
      setSection("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Interview Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Subjects</Label>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={(checked) => {
                  setSelectedSubjects(
                    checked
                      ? [...selectedSubjects, subject]
                      : selectedSubjects.filter((s) => s !== subject)
                  )
                }}
              />
              <label htmlFor={subject}>{subject}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="branch">Branch</Label>
        <Select onValueChange={setBranch} required>
          <SelectTrigger id="branch">
            <SelectValue placeholder="Select branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="section">Section</Label>
        <Select onValueChange={setSection} required>
          <SelectTrigger id="section">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={!name || selectedSubjects.length === 0 || !branch || !section}
      >
        Create Interview
      </Button>
    </form>
  )
}