import { Routes ,Route} from 'react-router-dom'
import './App.css'
import { StudentInterviews } from './components/Student-Interviews'
import { ProfileSection } from './components/Profile'
import { NavbarComponent } from './components/navbar'
import { InterviewDashboard } from './components/interview-dashboard'
import { CompletedInterviews } from './components/completed-interviews'
import { StudentPerformance } from './components/Student-Performance'
function App() {

  return (
    <>
      <Routes>
        <Route element={<NavbarComponent />}>
          <Route path='/' element={<InterviewDashboard />} />
          <Route path='/profile' element={<ProfileSection />} />
          <Route path='/interviews' element={<StudentInterviews/>} />
          <Route path='/completed-interviews' element={<CompletedInterviews/>} />
          <Route path='/student-performance' element={<StudentPerformance/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
