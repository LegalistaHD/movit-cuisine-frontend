// pages/Admin/index.js
import AdminPage from './AdminPage';
import PrivateRoute from '../../components/PrivateRoute';

const Index = ({ isAdmin, handleResetTables }) => {
  return (
    <PrivateRoute>
      <div>
        <AdminPage />
        {isAdmin && (
          <button onClick={handleResetTables}>Reset Tables</button>
        )}
      </div>
      </PrivateRoute>
    );
  };
  
  export default Index;