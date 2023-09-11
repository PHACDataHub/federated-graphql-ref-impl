// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomLayout from './layout/Layout';
import DataTable from './components/Table';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <CustomLayout>
              <DataTable />
            </CustomLayout>
          }
          path="/page1"
        />
        <Route
          element={
            <CustomLayout>
              <p>Page 2</p>
            </CustomLayout>
          }
          path="/page2"
        />
        <Route
          element={
            <CustomLayout>
              <h1>Page 3</h1>
            </CustomLayout>
          }
          path="/page3"
        />
      </Routes>
    </Router>
  );
};

export default App;