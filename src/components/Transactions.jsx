// src/components/Transactions.jsx
import React, { useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      containerId: 101,
      fromDriver: "سائق 1",
      toDriver: "سائق 2",
      date: "2024-01-01"
    }
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">المعاملات</h1>
      <ul className="mt-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="mt-4">
            المعاملة {transaction.id}: الحاوية {transaction.containerId} من{" "}
            {transaction.fromDriver} إلى {transaction.toDriver} بتاريخ{" "}
            {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
