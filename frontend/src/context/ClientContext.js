import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  const registerClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now(),
      registrationDate: new Date().toISOString().split('T')[0],
      totalAmountDue: Number(clientData.totalAmountDue) || 0,
      installmentPlan: Number(clientData.installmentPlan) || 1,
      financeVerified: false,
      paymentHistory: [],
      balance: Number(clientData.totalAmountDue) || 0,
      paymentStatus: 'Pending'
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updatePayment = (clientId, amount) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? {
        ...client,
        amountPaid: Number(client.amountPaid || 0) + Number(amount),
        paymentHistory: [...(client.paymentHistory || []), {
          amount: Number(amount),
          date: new Date().toISOString().split('T')[0],
          paymentType: 'Installment'
        }],
        balance: Number(client.totalAmountDue) - (Number(client.amountPaid || 0) + Number(amount)),
        paymentStatus: Number(client.amountPaid || 0) + Number(amount) >= Number(client.totalAmountDue) 
          ? 'Paid' 
          : Number(client.amountPaid || 0) + Number(amount) === 0 
            ? 'Pending' 
            : 'Partial'
      } : client
    ));
  };

  const verifyPayment = (clientId) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? {
        ...client,
        financeVerified: true
      } : client
    ));
  };

  const getClientStats = () => {
    const totalPaid = clients.reduce((sum, client) => sum + (Number(client.amountPaid) || 0), 0);
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
      teamMemberStats[member].totalCommission += (Number(client.amountPaid) || 0) * 0.1;
      teamMemberStats[member].clients += 1;
      teamMemberStats[member].totalAmount += (Number(client.amountPaid) || 0);
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
      verifyPayment,
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

export const ClientContextProvider = ClientProvider;
