import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './InstitutionCalendar.css'; 

const InstitutionCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [events, setEvents] = useState([]); // For other institution events

  useEffect(() => {
    // Fetch holidays and events data (replace with your actual API calls or data source)
    const fetchHolidays = async () => {
      try {
        const response = await fetch('/api/holidays'); // Your API endpoint for holidays
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // Your API endpoint for events
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchHolidays();
    fetchEvents();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD

      if (holidays.find(holiday => holiday.date === formattedDate)) {
        return 'holiday'; // Add the 'holiday' class
      }

      if (events.find(event => event.date === formattedDate)) {
        return 'event'; // Add the 'event' class
      }
    }
    return null;
  };


  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().slice(0, 10);
      const holiday = holidays.find(h => h.date === formattedDate);
      const event = events.find(e => e.date === formattedDate);

      return (
        <div>
          {holiday && <div className="holiday-label">{holiday.name}</div>}
          {event && <div className="event-label">{event.name}</div>}
        </div>
      );
    }
    return null;
  };


  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="institution-calendar">
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName} // Apply CSS classes to tiles
        tileContent={tileContent} // Add content to tiles (holiday/event names)
      />
    </div>
  );
};

export default InstitutionCalendar;