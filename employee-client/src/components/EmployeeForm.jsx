import React, { useEffect, useState } from 'react'

const empty = { firstName: '', lastName: '', email: '', phone: '', department: '', designation: '', salary: 0, joiningDate: new Date().toISOString().slice(0,10), isActive: true }

export default function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [form, setForm] = useState(employee || empty)
  const [errors, setErrors] = useState({})

  useEffect(() => setForm(employee || empty), [employee])

  const validate = () => {
    const e = {}
    const firstName = (form.firstName || '').toString().trim()
    const lastName = (form.lastName || '').toString().trim()
    const email = (form.email || '').toString().trim()
    const department = (form.department || '').toString().trim()
    const designation = (form.designation || '').toString().trim()

    if (!firstName) e.firstName = 'First name is required'
    if (!lastName) e.lastName = 'Last name is required'
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email is invalid'
    if (!department) e.department = 'Department is required'
    if (!designation) e.designation = 'Designation is required'
    if (Number(form.salary) < 0) e.salary = 'Salary must be >= 0'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return

    // Trim string fields before submitting
    const payload = {
      ...form,
      firstName: (form.firstName || '').toString().trim(),
      lastName: (form.lastName || '').toString().trim(),
      email: (form.email || '').toString().trim(),
      phone: (form.phone || '').toString().trim(),
      department: (form.department || '').toString().trim(),
      designation: (form.designation || '').toString().trim(),
      salary: Number(form.salary || 0),
      joiningDate: new Date(form.joiningDate)
    }

    onSubmit(payload)
    setForm(empty)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{employee ? 'Edit Employee' : 'Add Employee'}</h5>
        <form onSubmit={submit}>
          <div className="mb-2">
            <input className="form-control" placeholder="First name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
            {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
          </div>

          <div className="mb-2">
            <input className="form-control" placeholder="Last name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
            {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}
          </div>

          <div className="mb-2">
            <input className="form-control" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            {errors.email && <div className="text-danger small">{errors.email}</div>}
          </div>

          <div className="mb-2">
            <input className="form-control" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>

          <div className="mb-2">
            <input className="form-control" placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
            {errors.department && <div className="text-danger small">{errors.department}</div>}
          </div>

          <div className="mb-2">
            <input className="form-control" placeholder="Designation" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} />
            {errors.designation && <div className="text-danger small">{errors.designation}</div>}
          </div>

          <div className="mb-2">
            <input type="number" className="form-control" placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
            {errors.salary && <div className="text-danger small">{errors.salary}</div>}
          </div>

          <div className="mb-2">
            <input type="date" className="form-control" value={form.joiningDate} onChange={e => setForm({...form, joiningDate: e.target.value})} />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setForm(empty); onCancel && onCancel() }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
