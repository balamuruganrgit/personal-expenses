import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:8081/personal_expense");
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <h1>💰 Personal Expense Manager</h1>
      <ExpenseForm refresh={fetchExpenses} />
      <ExpenseList expenses={expenses} refresh={fetchExpenses} />
    </div>
  );
}

export default App;

