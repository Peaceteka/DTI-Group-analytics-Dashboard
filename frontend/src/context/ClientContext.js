import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  const registerClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now(),
      registrationDate: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updatePayment = (clientId, amount) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? {
        ...client,
        amountPaid: amount,
        paymentStatus: amount > 0 ? 'Paid' : 'Pending'
      } : client
    ));
  };

  const getClientStats = () => {
    const totalPaid = clients.reduce((sum, client) => sum + (client.amountPaid || 0), 0);
    const totalCommission = totalPaid * 0.1;
    const teamMemberStats = {};

    clients.forEach(client => {
      const member = client.teamMember || client.registeredBy;
      if (!teamMemberStats[member]) {
        teamMemberStats[member] = {
          totalCommission: 0,
          clients: 0,
          totalAmount: 0
        };
      }
      teamMemberStats[member].totalCommission += (client.amountPaid || 0) * 0.1;
      teamMemberStats[member].clients += 1;
      teamMemberStats[member].totalAmount += (client.amountPaid || 0);
    });

    return {
      totalPaid,
      totalCommission,
      teamMemberStats
    };
  };

  return (
    <ClientContext.Provider value={{
      clients,
      registerClient,
      updatePayment,
      getClientStats
    }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};
