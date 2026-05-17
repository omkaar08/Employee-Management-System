import React, { useState } from 'react'

export default function EmployeeList({ employees, onEdit, onView, onDelete, onSearch }) {
  const [q, setQ] = useState('')

  const submitSearch = (e) => {
    e.preventDefault()
    onSearch(q)
  }

  return (
    <div>
      <form className="mb-3 d-flex" onSubmit={submitSearch}>
        <input className="form-control me-2" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button className="btn btn-sm btn-info me-1" onClick={() => onView(emp)}>View</button>
                <button className="btn btn-sm btn-primary me-1" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
