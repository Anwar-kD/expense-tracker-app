import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

// Define a type for a transaction
interface Transaction {
  id: string;
  description: string;
  transactionAmount: number;
  transactionType: string;
  createdAt: any; // Firebase Timestamp
}

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = () => {
    if (!userID) return;

    const q = query(
      transactionsRef,
      where("userID", "==", userID),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      setTransactions(items);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getTransactions();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userID]); // Rerun when userID is available

  return { transactions, getTransactions };
};
