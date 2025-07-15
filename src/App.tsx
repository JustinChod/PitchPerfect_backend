import React from 'react';
import { SalesDeckForm } from './components/SalesDeckForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <SalesDeckForm />
      </div>
    </div>
  );
}

export default App;