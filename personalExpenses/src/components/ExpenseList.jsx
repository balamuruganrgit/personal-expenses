import { useState } from "react";

function ExpenseList({ expenses, refresh }) {

  const [deletingIds, setDeletingIds] = useState([]);

  const deleteExpense = async (id) => {
    console.log("Attempting to delete expense:", id);
    setDeletingIds((ids) => [...ids, id]);

    try {
      const res = await fetch(`http://localhost:8081/personal_expense/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        console.error('Failed to delete expense', res.status, res.statusText, text);
        return;
      }

      await refresh();
    } catch (err) {
      console.error('Error deleting expense:', err);
    } finally {
      setDeletingIds((ids) => ids.filter((x) => x !== id));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    deleteExpense(id);
  };

  return (
    <div className="card">
      <h2>Expense History</h2>

      <table>
        <thead>
          <tr className="tr">
            <th>Date</th>
            <th>Purpose</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Location</th>
            <th>Payment</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.purpose}</td>
              <td>₹{e.spent_amount}</td>
              <td>{e.merchant_name}</td>
              <td>{e.location}</td>
              <td>{e.payment_method}</td>
              <td>{e.description}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(e.id)} disabled={deletingIds.includes(e.id)}>
                  {deletingIds.includes(e.id) ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;