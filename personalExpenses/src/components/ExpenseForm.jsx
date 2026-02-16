import { useState } from "react";

function ExpenseForm({ refresh }) {
  const [expense, setExpense] = useState({
    purpose: "",
    spent_amount: "",
    merchant_name: "",
    date: "",
    payment_method: "",
    location: "",
    description: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    //  validation: required fields and amount > 0
    const amountNum = Number(expense.spent_amount);
    const isValid =
      expense.purpose && expense.purpose.trim() &&
      expense.merchant_name && expense.merchant_name.trim() &&
      expense.date &&
      expense.spent_amount !== "" && !Number.isNaN(amountNum) && amountNum > 0;

    if (!isValid) {
      setError("Please fill required fields and enter an amount greater than 0.");
      return;
    }

    setError("");

    try {
      const payload = { ...expense, spent_amount: amountNum };
      const res = await fetch("http://localhost:8081/personal_expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      // refresh the list from parent and then clear form
      await refresh();
      setExpense({
        purpose: "",
        spent_amount: "",
        merchant_name: "",
        date: "",
        payment_method: "",
        location: "",
        description: ""
      });
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  return (
    <form className="card" onSubmit={submitExpense}>
      <h2>Add Expense</h2>

      <input name="purpose" placeholder="Purpose" value={expense.purpose} onChange={handleChange} />
      <input name="spent_amount" type="number" placeholder="Amount" value={expense.spent_amount} onChange={handleChange} />
      <input name="merchant_name" placeholder="Merchant Name" value={expense.merchant_name} onChange={handleChange} />
      <input name="date" type="date" value={expense.date} onChange={handleChange} />
      <input name="payment_method" placeholder="Payment Method" value={expense.payment_method} onChange={handleChange} />
      <input name="location" placeholder="Location" value={expense.location} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={expense.description} onChange={handleChange}></textarea>

      {error && <div className="error" style={{ color: "#b00020", marginTop: 8 }}>{error}</div>}

      <button type="submit" disabled={!expense.purpose || !expense.merchant_name || !expense.date || expense.spent_amount === ""}>Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
