import React from 'react'

export default function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Employee Details</h5>
        <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Joining Date:</strong> {new Date(employee.joiningDate).toLocaleDateString()}</p>
        <p><strong>Active:</strong> {employee.isActive ? 'Yes' : 'No'}</p>
        <button className="btn btn-sm btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
