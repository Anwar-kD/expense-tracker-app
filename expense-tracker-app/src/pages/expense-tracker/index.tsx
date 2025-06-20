import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const ExpenseTracker = () => {
  const form = document.getElementById("add-transaction");
  const historiqueDiv = document.getElementById("history");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const nom = form.nom.value;
    const email = form.email.value;

    const nouvelleEntree = document.createElement("div");
    nouvelleEntree.className = "entree";
    nouvelleEntree.innerHTML = `<strong>Nom :</strong> ${nom} <br><strong>Email :</strong> ${email}`;

    historiqueDiv.appendChild(nouvelleEntree);

    form.reset(); // Réinitialiser le formulaire
  });
  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>Expense tracker</h1>
        <div className="balance">
          <h3>Your balance</h3>
          <h2>$0.00</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h3>Income</h3>
            <h2>$0.00</h2>
          </div>
          <div className="expenses">
            <h3>Expenses</h3>
            <h2>$0.00</h2>
          </div>
        </div>
      </div>
      <form className="add-transaction">
        <input type="text" placeholder="Description" required />
        <input type="text" placeholder="amount" required />
        <input type="radio" id="expense" value={"expense"} />
        <label htmlFor="expense">Expense</label>
        <input type="radio" id="income" value={"income"} />
        <label htmlFor="income">income</label>
        <button type="submit"> Add transaction</button>
      </form>
      <div className="history"></div>
    </div>
  );
};
