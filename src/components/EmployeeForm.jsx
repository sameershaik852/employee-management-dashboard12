import { useEffect, useState } from "react";

export default function EmployeeForm({ onSave, editData }) {
  const [form, setForm] = useState({
    id: Date.now(),
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: ""
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const submit = () => {
    if (!form.name || !form.gender || !form.dob || !form.state) {
      alert("Please fill all fields");
      return;
    }
    onSave(form);
    setForm({
      id: Date.now(),
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: ""
    });
  };

  return (
    <div>
      <h3>{editData ? "Edit" : "Add"} Employee</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />

      <input
        placeholder="State"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
        />
        Active
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file || file.size > 200 * 1024) {
            alert("Image must be under 200KB");
            return;
          }
          const reader = new FileReader();
          reader.onload = () =>
            setForm({ ...form, image: reader.result });
          reader.readAsDataURL(file);
        }}
      />

      {form.image && <img src={form.image} width="50" />}

      <button onClick={submit}>Save</button>
    </div>
  );
}
