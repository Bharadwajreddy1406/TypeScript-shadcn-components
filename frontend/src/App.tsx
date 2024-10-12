import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { StudentInterviews } from './components/studentComponents/Student-Interviews';
import { ProfileSection } from './components/studentComponents/Profile';
import { InterviewDashboard } from './components/adminComponents/interview-dashboard';
import { CompletedInterviews } from './components/studentComponents/completed-interviews';
import { StudentPerformance } from './components/studentComponents/Student-Performance';
import Studentlist from './components/adminComponents/Student-list';
import InterviewStudentList from './components/adminComponents/interview-student-list';
import { AdminStudentDashboard } from './components/adminComponents/AdminStudentDashboard';
import { LoginPageComponent } from './components/Login';
import { InterviewComponent } from './components/studentComponents/InterviewComponent';
import axios from 'axios';
import { useAuth } from './Context/AuthContext';
import { Header } from './components/shared/Header';
import { PageNotFound } from './components/shared/PageNotFound';
import { ViewStudent } from './components/adminComponents/ViewStudent';

axios.defaults.baseURL = 'http://localhost:5000/v1';
axios.defaults.withCredentials = true;

function App() {
  const { isLoggedIn, user } = useAuth();
  console.log("opened app");

  return (
    <>
      {isLoggedIn && user?.role && <Header role={user.role as 'admin' | 'student'} />}
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPageComponent />} />
            <Route path="/" element={<Navigate to="/login" />} /> Redirect non-logged-in users to Login
          </>
        ) : (
          <>
            {user?.role === 'admin' ? (
              <>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} /> 
                <Route path="/admin/dashboard" element={<InterviewDashboard />} />
                <Route path="/admin/students" element={<AdminStudentDashboard />} />
                <Route path="/admin/student-list" element={<Studentlist />} />
                <Route path="/admin/interview-student-list" element={<InterviewStudentList />} />
                <Route path="/admin/view-student" element={<ViewStudent />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/student/interviews" />} />
                <Route path="/student/interviews" element={<StudentInterviews />} />
                <Route path="/student/completed-interviews" element={<CompletedInterviews />} />
                <Route path="/student/performance" element={<StudentPerformance />} />
                <Route path="/student/interview" element={<InterviewComponent />} />
                <Route path="/student/profile" element={<ProfileSection />} />
              </>
            )}
            
            <Route path="*" element={<PageNotFound />} /> 
          </>
        )}
      </Routes>
    </>
  );
}

export default App;