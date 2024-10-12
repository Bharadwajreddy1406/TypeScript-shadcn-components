import React from 'react';
import { NavbarComponent } from './adminComponents/AdminNavbar';
import { InterviewDashboard } from './adminComponents/interview-dashboard';

const Tempo: React.FC = () => {
    return (
        <>
        <NavbarComponent/>
        <InterviewDashboard/>
        </>
    );
};

export default Tempo;