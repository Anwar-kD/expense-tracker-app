import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import {useNavigate} from "react-router-dom";
import "../../index.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals} = useGetTransaction();
  const {name, profilePhoto } = useGetUserInfo();

  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType,setTransactionType] = useState("expense");

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction({
        description,
        transactionAmount,
        transactionType
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Expense Tracker</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h2 className="font-semibold">{name}</h2>
              <button 
                onClick={signUserOut}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
            <img 
              src={profilePhoto} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          </div>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-gray-500">Your Balance</h3>
            <h2 className="text-2xl font-bold">${transactionTotals.balance.toFixed(2)}</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="text-gray-500">Income</h3>
            <h2 className="text-2xl font-bold text-green-600">${transactionTotals.income.toFixed(2)}</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="text-gray-500">Expenses</h3>
            <h2 className="text-2xl font-bold text-red-600">${transactionTotals.expenses.toFixed(2)}</h2>
          </div>
        </div>

        {/* Add Transaction Form */}
        <form onSubmit={onsubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Description"
                id="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Amount"
                id="amount"
                value={transactionAmount || ""}
                onChange={(e)=>setTransactionAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType == "expense"}
                  onChange={(e)=>setTransactionType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="expense" className="text-red-500">Expense</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType == "income"}
                  onChange={(e)=>setTransactionType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="income" className="text-green-500">Income</label>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Add Transaction
            </button>
          </div>
        </form>

        {/* Transactions List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Transactions</h3>
          <ul className="space-y-3">
            {transactions.map((transaction, index) => {
              const {description, transactionAmount, transactionType} = transaction;
              return (
                <li key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{description}</h4>
                    <p className={`font-semibold ${transactionType === "expense" ? "text-red-500" : "text-green-500"}`}>
                      ${transactionAmount.toFixed(2)} 
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${transactionType === "expense" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {transactionType}
                      </span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};