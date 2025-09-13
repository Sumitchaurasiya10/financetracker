import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchData = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

 const handleDelete = async (id: string) => {
  await api.delete(`/transactions/${id}`);
  fetchData(); // refresh list
};

  useEffect(() => {
  api.get("/transactions")
     .then(res => setTransactions(res.data))
     .catch(err => console.error(err));
}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Transactions</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.type === "expense" ? "-" : "+"}{t.amount}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-2">
                <Link to={`/${t._id}/edit`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => handleDelete(t._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
