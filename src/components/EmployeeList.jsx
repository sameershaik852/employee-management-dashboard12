export default function EmployeeList({ data, onEdit, onDelete }) {
  const handlePrint = (emp) => {
    const printWindow = window.open("", "", "width=600,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Employee Details</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            img { margin-top: 10px; }
            p { font-size: 14px; }
          </style>
        </head>
        <body>
          <h2>Employee Details</h2>
          <p><b>Name:</b> ${emp.name}</p>
          <p><b>Gender:</b> ${emp.gender}</p>
          <p><b>DOB:</b> ${emp.dob}</p>
          <p><b>State:</b> ${emp.state}</p>
          <p><b>Status:</b> ${emp.active ? "Active" : "Inactive"}</p>
          ${
            emp.image
              ? `<img src="${emp.image}" width="120" />`
              : ""
          }
          <script>
            window.print();
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  if (data.length === 0) {
    return <p>No employees found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>State</th>
          <th>Status</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.gender}</td>
            <td>{e.dob}</td>
            <td>{e.state}</td>
            <td>{e.active ? "Active" : "Inactive"}</td>
            <td>
              {e.image && <img src={e.image} width="40" />}
            </td>
            <td>
              <button onClick={() => onEdit(e)}>Edit</button>
              <button onClick={() => onDelete(e.id)}>Delete</button>
              <button onClick={() => handlePrint(e)}>Print</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
