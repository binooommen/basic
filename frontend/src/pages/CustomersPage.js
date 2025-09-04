import React, { useState } from 'react';
import CustomersTable from '../components/CustomersTable';
import CustomerView from '../components/CustomerView';

export default function CustomersPage({ token }) {
  const [viewCustomer, setViewCustomer] = useState(null);
  return viewCustomer ? (
    <CustomerView customer={viewCustomer} token={token} onBack={(action) => {
      setViewCustomer(null);
    }} />
  ) : (
    <CustomersTable token={token} onViewCustomer={setViewCustomer} />
  );
}
