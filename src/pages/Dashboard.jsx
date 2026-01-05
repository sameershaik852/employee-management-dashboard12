import { useEffect, useState } from "react";
import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import Filters from "../components/Filters";

export default function Dashboard({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [editData, setEditData] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    status: ""
  });

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const save = (emp) => {
    const updated = editData
      ? employees.map((e) => (e.id === emp.id ? emp : e))
      : [...employees, emp];

    setEmployees(updated);
    saveEmployees(updated);
    setEditData(null);
  };

  const del = (id) => {
    if (confirm("Delete employee?")) {
      const updated = employees.filter((e) => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.gender || e.gender === filters.gender) &&
      (!filters.status ||
        String(e.active) === filters.status)
  );

  return (
    <div className="dashboard">
      <header>
        <h2>Dashboard</h2>
        <button onClick={onLogout}>Logout</button>
      </header>

      <p>Total Employees: {employees.length}</p>

      <EmployeeForm onSave={save} editData={editData} />

      <Filters setFilters={setFilters} />

      <EmployeeList
        data={filtered}
        onEdit={setEditData}
        onDelete={del}
      />
    </div>
  );
}
