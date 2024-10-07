import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PieChart, BarChart, LineChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'

const technicalKnowledge = [
  { name: 'JavaScript', value: 30 },
  { name: 'React', value: 25 },
  { name: 'Node.js', value: 20 },
  { name: 'Python', value: 15 },
  { name: 'SQL', value: 10 },
]

const fundamentalKnowledge = [
  { name: 'Data Structures', value: 35 },
  { name: 'Algorithms', value: 30 },
  { name: 'System Design', value: 20 },
  { name: 'OOP', value: 15 },
]

const communicationSkills = [
  { skill: 'Leadership', score: 8 },
  { skill: 'Written', score: 7 },
  { skill: 'Presentation', score: 6 },
  { skill: 'Teamwork', score: 9 },
  { skill: 'Verbal', score: 7 },
]

const weeklyPerformance = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 82 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 85 },
  { week: 'Week 5', score: 89 },
  { week: 'Week 6', score: 92 },
]

const proficiencyLevels = [
  { name: 'Problem Solving', value: 75 },
  { name: 'Code Quality', value: 80 },
  { name: 'Debugging', value: 70 },
  { name: 'Testing', value: 65 },
]

const weeklyTrends = [
  { name: 'Mon', productivity: 70, focus: 65, quality: 75 },
  { name: 'Tue', productivity: 75, focus: 70, quality: 80 },
  { name: 'Wed', productivity: 80, focus: 75, quality: 85 },
  { name: 'Thu', productivity: 85, focus: 80, quality: 90 },
  { name: 'Fri', productivity: 90, focus: 85, quality: 95 },
]

const individualGoals = [
  { name: 'Complete React Course', progress: 75 },
  { name: 'Contribute to Open Source', progress: 40 },
  { name: 'Build Portfolio Website', progress: 60 },
  { name: 'Learn GraphQL', progress: 25 },
]

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

export function StudentPerformance() {
  const [activeTab, setActiveTab] = useState('overview')

  const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Pie
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill} dataKey={''}        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 bg-white min-h-screen pt-20"> {/* Added pt-16 for navbar space */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Student Progress Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className={`grid w-full grid-cols-3`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            {/* <TabsTrigger value="goals">Goals</TabsTrigger> */}
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardWrapper>
                <Card className="h-full ">
                  <CardHeader>
                    <CardTitle>Technical Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={technicalKnowledge}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          activeShape={renderActiveShape}
                        >
                          {technicalKnowledge.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Fundamental Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={fundamentalKnowledge}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          activeShape={renderActiveShape}
                        >
                          {fundamentalKnowledge.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Communication Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={communicationSkills}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis />
                        <Radar name="Student" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
            </div>
          </TabsContent>
          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Communication Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={communicationSkills}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis />
                        <Radar name="Student" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Proficiency Levels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={proficiencyLevels}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
            </div>
          </TabsContent>
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Weekly Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weeklyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
              <CardWrapper>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Weekly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="productivity" fill="#8884d8" />
                        <Bar dataKey="focus" fill="#82ca9d" />
                        <Bar dataKey="quality" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardWrapper>
            </div>
          </TabsContent>
          {/* <TabsContent value="goals">
            <CardWrapper>
              <Card>
                <CardHeader>
                  <CardTitle>Individual Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {individualGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{goal.name}</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardWrapper>
          </TabsContent> */}
        </Tabs>
      </div>
    </TooltipProvider>
  )
}





