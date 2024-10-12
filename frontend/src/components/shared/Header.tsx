import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../adminComponents/AdminNavbar';
import { StudentNavbar } from '../studentComponents/StudentNavbar';

interface HeaderProps {
  role: 'admin' | 'student';
}

export function Header({ role }: HeaderProps) {
  return (
    <>
      {role === 'admin' ? <AdminNavbar /> : <StudentNavbar />}
      <Outlet />
    </>
  );
}