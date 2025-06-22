import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionType,setTransactionType] = useState("");


  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    addTransaction({
        description : description,
        transactionAmount : amount,
        transactionType: isExpense ? "expense" : "income"
  })
    //let isExpense: Boolean , isIncome: Boolean;

    const form = document.querySelector(".add-transaction") as HTMLFormElement;
    const historiqueDiv = document.querySelector(".history") as HTMLDivElement;
    const balanceOutput = document.querySelector(".balance") as HTMLHeadingElement;
    const incomeOutput = document.querySelector(".income") as HTMLHeadingElement;
    const expensesOutput = document.querySelector(".expenses") as HTMLHeadingElement;

    const descriptionInput = form.querySelector('#description') as HTMLInputElement;
    const amountInput = form.querySelector('#amount') as HTMLInputElement;
    const isExpenseInput = form.querySelector('#expense') as HTMLInputElement | null;
    const isIncomeInput = form.querySelector('#income') as HTMLInputElement | null;

    const description = descriptionInput.value;
    const amount = amountInput.value;
// if (isExpenseInput?.checked) {
//   const newExpenses = expenses + Number(amount);
//   setExpenses(newExpenses);
//   setBalance(income - newExpenses);
//   isExpense = true;
//   const newBlance = income - newExpenses;
//   balanceOutput.textContent = String(newBlance);
//   expensesOutput.textContent = String(newExpenses);
// }
// else if (isIncomeInput?.checked) {
//   const newIncome = income + Number(amount);
//   setIncome(newIncome);
//   setBalance(newIncome - expenses);
//   isExpense = false;
//   const newBlance = newIncome - expenses;
//   balanceOutput.textContent = String(newBlance);
//   incomeOutput.textContent = String(newIncome);
// }



    // const nouvelleEntree = document.createElement("div");
    // nouvelleEntree.className = "entree";
    // nouvelleEntree.innerHTML = `<strong>Description :</strong> ${description} <br><strong>Amount :</strong> ${amount} ${isExpense ? "expense" : "income"}`;

    // historiqueDiv.appendChild(nouvelleEntree);

    form.reset(); // Réinitialiser le formulaire
  };
  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>Expense tracker</h1>
        <div >
          <h3>Your balance</h3>
          <h2 className="balance">$0.00</h2>
        </div>
        <div className="summary">
          <div >
            <h3>Income</h3>
            <h2 className="income">$0.00</h2>
          </div>
          <div >
            <h3>Expenses</h3>
            <h2 className="expenses">$0.00</h2>
          </div>
        </div>
      </div>
      <form onSubmit={onsubmit}  className="add-transaction">
        <input type="text" placeholder="Description" id="description" onChange={(e)=>setDescription(e.target.value)} required />
        <input type="text" placeholder="amount" id="amount" onChange={(e)=>setAmount(Number(e.target.value))} required />
        <input type="radio" id="expense" value="expense" checked={transactionType == "expense"} onChange={(e)=>setTransactionType(e.target.value)}/>
        <label htmlFor="expense">Expense</label>
        <input type="radio" id="income" value="income" checked={transactionType == "income"} onChange={(e)=>setTransactionType(e.target.value)}/>
        <label htmlFor="income">income</label>
        <button type="submit"> Add transaction</button>
      </form>
      <div className="history"></div>
    </div>
  );
};
