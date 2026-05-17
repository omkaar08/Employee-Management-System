using EmployeeApi.Data;
using EmployeeApi.DTOs;
using EmployeeApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Employee>>>> Get()
        {
            var items = await _context.Employees.ToListAsync();
            return Ok(new ApiResponse<IEnumerable<Employee>> { Success = true, Data = items });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Employee>>> Get(int id)
        {
            var item = await _context.Employees.FindAsync(id);
            if (item == null)
                return NotFound(new ApiResponse<Employee> { Success = false, Message = "Employee not found" });
            return Ok(new ApiResponse<Employee> { Success = true, Data = item });
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Employee>>> Post([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<Employee> { Success = false, Message = "Validation failed", Data = employee });

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = employee.Id }, new ApiResponse<Employee> { Success = true, Message = "Employee added successfully", Data = employee });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Employee>>> Put(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id)
                return BadRequest(new ApiResponse<Employee> { Success = false, Message = "Id mismatch" });

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<Employee> { Success = false, Message = "Validation failed" });

            var existing = await _context.Employees.FindAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse<Employee> { Success = false, Message = "Employee not found" });

            existing.FirstName = employee.FirstName;
            existing.LastName = employee.LastName;
            existing.Email = employee.Email;
            existing.Phone = employee.Phone;
            existing.Department = employee.Department;
            existing.Designation = employee.Designation;
            existing.Salary = employee.Salary;
            existing.JoiningDate = employee.JoiningDate;
            existing.IsActive = employee.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<Employee> { Success = true, Message = "Employee updated successfully", Data = existing });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var existing = await _context.Employees.FindAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse<object> { Success = false, Message = "Employee not found" });

            _context.Employees.Remove(existing);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<object> { Success = true, Message = "Employee deleted successfully" });
        }

        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<IEnumerable<Employee>>>> Search([FromQuery] string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                var all = await _context.Employees.ToListAsync();
                return Ok(new ApiResponse<IEnumerable<Employee>> { Success = true, Data = all });
            }

            keyword = keyword.ToLower();
            var results = await _context.Employees.Where(e =>
                e.FirstName.ToLower().Contains(keyword) ||
                e.LastName.ToLower().Contains(keyword) ||
                e.Email.ToLower().Contains(keyword) ||
                e.Department.ToLower().Contains(keyword) ||
                e.Designation.ToLower().Contains(keyword)
            ).ToListAsync();

            return Ok(new ApiResponse<IEnumerable<Employee>> { Success = true, Data = results });
        }
    }
}
