
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CompletedInterviews() {
  const interviews = [
    { id: 1, title: "Interview -01", topic: "Python", score: 90 },
    { id: 2, title: "Interview -01", topic: "Python", score: 90 },
    { id: 3, title: "Interview -01", topic: "Python", score: 90 },
    { id: 4, title: "Interview -01", topic: "Python", score: 90 },
    { id: 5, title: "Interview -01", topic: "Python", score: 90 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Completed Interviews</h1>
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {interviews.map((interview) => (
          <motion.div key={interview.id} variants={itemVariants}>
            <Card className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{interview.title}</h2>
                    <p className="text-sm text-muted-foreground">Topic: {interview.topic}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs sm:text-sm font-medium text-secondary-foreground">
                      Score: {interview.score}
                    </span>
                    <Button
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                    >
                      <span className="mr-2">View Analysis</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}