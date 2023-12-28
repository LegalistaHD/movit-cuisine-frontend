import React, { useState, useEffect } from 'react';
import TableLayout from '../../components/TableLayout';
import styles from '../../styles/TableLayout.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const resetTables = () => {
  const initialTables = new Array(20).fill(null).map((_, index) => ({
    id: `Table ${index + 1}`,
    availability: generateAvailability(), // Generate availability for 7 days
  }));

  if (typeof window !== 'undefined') {
    localStorage.setItem('tables', JSON.stringify(initialTables)); // Store initial tables in localStorage if available
  }

  return initialTables;
};

// Function to generate availability for 7 days
const generateAvailability = () => {
  const availability = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD format

    availability[formattedDate] = {}; // Initialize availability for each date
    for (let hour = 0; hour < 24; hour++) {
      availability[formattedDate][hour.toString().padStart(2, '0')] = 'empty'; // Initialize availability for each hour
    }
  }
  return availability;
};

const BookPage = () => {
  const initialTables = resetTables();

  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleBookTable = () => {
    const updatedTables = tables.map((table) => {
      if (table.id === selectedTable) {
        const currentDate = selectedDate.toISOString().split('T')[0];
        const selectedHour = time.padStart(2, '0');
        const tableStatus = table.availability[currentDate][selectedHour];

        if (tableStatus === 'selected') {
          table.availability[currentDate][selectedHour] = 'booked';
        } else if (tableStatus === 'empty') {
          table.availability[currentDate][selectedHour] = 'booked';
        }
      }
      return table;
    });

    setTables(updatedTables);
    setSelectedTable('');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
  };

  return (
    <div>
      <h1>BOOK YOUR TABLE</h1>
      <div className={styles.tableLayout}>
        {tables.map((table) => (
          <button
            key={table.id}
            className={`${styles.tableButton} ${
              table.availability[selectedDate.toISOString().split('T')[0]][time.padStart(2, '0')]}
            }`}
            onClick={() => handleTableSelect(table.id)}
            disabled={table.availability[selectedDate.toISOString().split('T')[0]][time.padStart(2, '0')] === 'booked'}
          >
            {table.id}
          </button>
        ))}
      </div>
      <div className={styles.credentials}>
        <input className={styles.inputField} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className={styles.inputField} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
        <select
        className={styles.inputField}
        value={time}
        onChange={(e) => handleTimeChange(e.target.value)}
      >
        {[...Array(24)].map((_, index) => {
          const hour = index.toString().padStart(2, '0');
          return (
            <option key={index} value={hour}>
              {hour}:00
            </option>
          );
        })}
      </select>
      </div>
      <button className={styles.bookButton} onClick={handleBookTable}>BOOK</button>
    </div>
  );
};

export default BookPage;
