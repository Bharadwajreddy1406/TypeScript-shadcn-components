import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface Interview {
  id: string
  name: string
  status: 'Completed' | 'In Progress' | 'Not Attended'
  score?: number
}

const mockInterviews: Interview[] = [
  { id: '1', name: 'Frontend Developer Interview', status: 'Completed', score: 85 },
  { id: '2', name: 'Backend Developer Interview', status: 'In Progress' },
  { id: '3', name: 'Full Stack Developer Interview', status: 'Not Attended' },
  { id: '4', name: 'DevOps Engineer Interview', status: 'Completed', score: 92 },
  { id: '5', name: 'UI/UX Designer Interview', status: 'Not Attended' },
]

export function ViewStudent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const attendanceBarRef = useRef<HTMLDivElement>(null)

  const studentName = "John Doe"
  const studentDetails = {
    rollNo: "Student ID",
    year: "3rd Year",
    branch: "Computer Science",
    section: "A"
  }

  const attendancePercentage = 75
  const overallPerformance = [
    { name: 'Completed', value: 60 },
    { name: 'In Progress', value: 20 },
    { name: 'Not Attended', value: 20 },
  ]

  const filteredInterviews = mockInterviews.filter(interview =>
    interview.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = attendanceBarRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setHoverPosition({ x, y })
    }
  }

  return (
    <div className="container mx-auto p-6 min-h-screen pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{studentName}</h1>
          <div className="p-6 bg-white rounded shadow-md">
            <p><strong>Roll No:</strong> {studentDetails.rollNo}</p>
            <p><strong>Year:</strong> {studentDetails.year}</p>
            <p><strong>Branch:</strong> {studentDetails.branch}</p>
            <p><strong>Section:</strong> {studentDetails.section}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Overall Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={overallPerformance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {overallPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#4CAF50', '#2196F3', '#F44336'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Attendance</h2>
        <div 
          ref={attendanceBarRef}
          className="relative h-8 bg-gray-200 rounded-full overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${attendancePercentage}%` }}
            transition={{ duration: 1 }}
          />
          <AnimatePresence>
            {isHovering && (
              <motion.div 
                className="absolute bg-black text-white px-2 py-1 rounded text-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ 
                  left: `${hoverPosition.x}px`, 
                  top: `${hoverPosition.y +20}px`,
                  zIndex: 999,
                }}
              >
                {attendancePercentage}%
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interviews</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search interviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm border px-3 py-2 rounded-md"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '400px', overflowY: 'auto' }}>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 text-lg">Interview Name</th>
                <th className="text-left p-3 text-lg">Status</th>
                <th className="text-left p-3 text-lg">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.map((interview) => (
                <tr key={interview.id} className="border-t border-gray-200">
                  <td className="p-3">{interview.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        interview.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : interview.status === "In Progress"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {interview.status}
                    </span>
                  </td>
                  <td className="p-3">{interview.score || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
