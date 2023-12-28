const AdminPage = ({ isAdmin, handleResetTables }) => {
    return (
      <div>
        <h1>Admin Page</h1>
        {isAdmin && (
          <button onClick={handleResetTables}>Reset Tables</button>
        )}
        {/* Konten lain untuk halaman admin */}
      </div>
    );
  };
  
  export default AdminPage;
  