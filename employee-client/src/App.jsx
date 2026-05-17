import React, { useEffect, useState } from 'react'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, searchEmployees } from './api'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import EmployeeDetails from './components/EmployeeDetails'

export default function App() {
  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState(null)

  const fetchAll = async () => {
    try {
      const res = await getEmployees()
      setEmployees(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleAdd = async (data) => {
    try {
      await createEmployee(data)
      setMessage({ type: 'success', text: 'Employee added' })
      fetchAll()
    } catch (err) { setMessage({ type: 'danger', text: 'Add failed' }) }
  }

  const handleUpdate = async (id, data) => {
    try {
      await updateEmployee(id, data)
      setMessage({ type: 'success', text: 'Employee updated' })
      setEditing(null)
      fetchAll()
    } catch (err) { setMessage({ type: 'danger', text: 'Update failed' }) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      setMessage({ type: 'success', text: 'Employee deleted' })
      fetchAll()
    } catch (err) { setMessage({ type: 'danger', text: 'Delete failed' }) }
  }

  const handleSearch = async (keyword) => {
    if (!keyword) return fetchAll()
    try {
      const res = await searchEmployees(keyword)
      setEmployees(res.data.data || [])
    } catch (err) { console.error(err) }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Employee Management</h2>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="row">
        <div className="col-md-7">
          <EmployeeList
            employees={employees}
            onEdit={(e) => setEditing(e)}
            onView={(e) => setSelected(e)}
            onDelete={handleDelete}
            onSearch={handleSearch}
          />
        </div>
        <div className="col-md-5">
          <EmployeeForm
            key={editing ? editing.id : 'new'}
            employee={editing}
            onCancel={() => setEditing(null)}
            onSubmit={(data) => editing ? handleUpdate(editing.id, data) : handleAdd(data)}
          />
          {selected && <EmployeeDetails employee={selected} onClose={() => setSelected(null)} />}
        </div>
      </div>
    </div>
  )
}
