// TableLayout.jsx
import React from 'react';
import styles from '../styles/TableLayout.module.css';

const TableLayout = ({ tables, onTableSelect }) => {
  return (
    <div className={styles.tableLayout}>
      {tables.map((table) => (
        <button
          key={table.id}
          className={`${styles.tableButton} ${table.status === 'selected' && styles.selected} ${table.status === 'booked' && styles.booked}`}
          onClick={() => onTableSelect(table.id)}
          disabled={table.status === 'booked'}
        >
          {table.id}
        </button>
      ))}
    </div>
  );
};

export default TableLayout;
