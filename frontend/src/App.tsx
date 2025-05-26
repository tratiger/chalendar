import React from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const App: React.FC = () => (
  <div>
    <h1>Chat + Calendar</h1>
    <Calendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
  </div>
);

export default App;

