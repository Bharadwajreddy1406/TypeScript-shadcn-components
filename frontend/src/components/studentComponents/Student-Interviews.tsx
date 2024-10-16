import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'

interface Interview {
  id: string
  title: string
  subject: string
  topic: string
  status: 'ready' | 'scheduled' | 'completed'
}

export function StudentInterviews() {
  console.log("opened student interviews");
  const [interviews, setInterviews] = useState<Interview[]>([
    { id: '1', title: 'Interview -01', subject: 'Python', topic: 'Lambda Functions', status: 'ready' },
    { id: '2', title: 'Interview -02', subject: 'Java', topic: 'Polymorphism', status: 'scheduled' },
    // { id: '3', title: 'Interview -03', subject: 'C', topic: 'Pointers', status: 'completed' },
    { id: '4', title: 'Interview -04', subject: 'Python', topic: 'Lambda Functions', status: 'ready' },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const navigate = useNavigate();

  const refreshInterviews = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setInterviews([...interviews])
      setIsRefreshing(false)
    }, 2000)
  }

  const startInterview = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/student/interview')
    }, 2000)
  }

  // Sort interviews so that 'ready' ones come first
  const sortedInterviews = [...interviews].sort((a, b) => {
    if (a.status === 'ready' && b.status !== 'ready') return -1;
    if (a.status !== 'ready' && b.status === 'ready') return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 pt-20 pb-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900">Your Interviews</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Refresh</span>
          <Button
            onClick={refreshInterviews}
            variant="outline"
            size="icon"
            className="rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {sortedInterviews.map((interview, index) => (
          <motion.div
            key={interview.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gray-100">
                <div className="flex flex-row justify-between items-center">
                  <CardTitle className="text-xl font-semibold">{interview.title}</CardTitle>
                  <Button
                    onClick={startInterview}
                    variant={interview.status === 'ready' ? 'default' : 'secondary'}
                    size="sm"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    disabled={interview.status !== 'ready'}
                  >
                    {interview.status === 'ready' ? 'Start Interview' : 
                     interview.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-row justify-between items-center">
                  <div className='flex flex-col gap-4 '>
                  <p className="text-gray-600"><b>Subject</b>: {interview.subject}</p>
                  <p className="text-gray-600"><b>Topic</b>: {interview.topic}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    interview.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                    interview.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-lg font-semibold">Loading interview...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}