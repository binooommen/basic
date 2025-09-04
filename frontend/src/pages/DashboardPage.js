import React from 'react';

export default function DashboardPage({ customerCount }) {
  return (
    <div className="text-center text-gray-700 text-lg font-medium">
      {customerCount === null ? 'Loading...' : `You have ${customerCount} customer${customerCount === 1 ? '' : 's'}`}
    </div>
  );
}
