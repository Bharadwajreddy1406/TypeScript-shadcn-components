import { Routes ,Route} from 'react-router-dom'
import './App.css'

import { ProfileSection } from './components/Profile'
import { NavbarComponent } from './components/navbar'
import { InterviewDashboard } from './components/interview-dashboard'
function App() {

  return (
    <>
      <Routes>
        <Route element={<NavbarComponent />}>
          <Route path='/' element={<InterviewDashboard />} />
          <Route path='/profile' element={<ProfileSection />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
