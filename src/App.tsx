import { Routes ,Route} from 'react-router-dom'
import './App.css'
import { InterviewDashboard } from './components/interview-dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<InterviewDashboard />} />
      </Routes>
    </>
  )
}

export default App
