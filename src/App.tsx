import { Routes ,Route} from 'react-router-dom'
import './App.css'

import Tempo from './components/Tempo'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Tempo />} />
      </Routes>
    </>
  )
}

export default App
