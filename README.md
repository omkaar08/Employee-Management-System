# Employee Management System

A full-stack web application for managing employee records with CRUD operations, built with ASP.NET Core Web API and React.js.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Key Components](#key-components)

---

## ✨ Features

### Core Functionality
- ✅ **Create Employee** - Add new employee records with validation
- ✅ **Read Employees** - View all employees or fetch specific employee details
- ✅ **Update Employee** - Modify existing employee information
- ✅ **Delete Employee** - Remove employee records with confirmation
- ✅ **Search Employees** - Search by name, email, department, or designation
- ✅ **Form Validation** - Real-time client-side and server-side validation
- ✅ **Responsive UI** - Bootstrap-based mobile-friendly interface
- ✅ **Error Handling** - Graceful error messages and notifications

### Employee Data Fields
```
- ID (Primary Key)
- First Name (Required)
- Last Name (Required)
- Email (Required, valid format)
- Phone (Optional)
- Department (Required)
- Designation (Required)
- Salary (Non-negative decimal)
- Joining Date (DateTime)
- Active Status (Boolean)
```

---

## 🛠️ Tech Stack

### Backend
- **Language**: C# 10+
- **Framework**: ASP.NET Core 10 Web API
- **ORM**: Entity Framework Core 8.0
- **Database**: SQL Server Express (LocalDB or SQLEXPRESS)
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: NuGet

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 4.4
- **HTTP Client**: Axios 1.4
- **UI Framework**: Bootstrap 5.3
- **Package Manager**: npm
- **Language**: JavaScript/JSX

### Database
- **Platform**: SQL Server Express
- **ORM**: Entity Framework Core with migrations
- **Connection**: Windows Authentication / SQL Server Authentication

---

## 📁 Project Structure

```
employee/
│
├── EmployeeApi/                          # Backend (ASP.NET Core)
│   ├── EmployeeApi.csproj               # Project configuration with NuGet packages
│   ├── Program.cs                       # Application startup, middleware configuration
│   ├── appsettings.json                 # Connection strings and app settings
│   │
│   ├── Models/
│   │   └── Employee.cs                  # Employee entity with validation attributes
│   │
│   ├── Data/
│   │   └── AppDbContext.cs              # Entity Framework DbContext
│   │
│   ├── Controllers/
│   │   └── EmployeesController.cs       # REST API endpoints (GET, POST, PUT, DELETE, Search)
│   │
│   ├── DTOs/
│   │   └── ApiResponse.cs               # Generic API response wrapper
│   │
│   ├── Migrations/
│   │   └── *_InitialCreate.cs          # EF Core migration files
│   │
│   ├── bin/                             # Compiled binaries
│   └── obj/                             # Build artifacts
│
├── employee-client/                     # Frontend (React + Vite)
│   ├── package.json                     # npm dependencies
│   ├── vite.config.js                   # Vite build configuration
│   ├── index.html                       # HTML entry point
│   │
│   ├── src/
│   │   ├── main.jsx                     # React app entry point
│   │   ├── App.jsx                      # Main app component with state management
│   │   ├── api.js                       # Axios HTTP client and API helpers
│   │   ├── App.css                      # Global styles
│   │   │
│   │   └── components/
│   │       ├── EmployeeList.jsx         # Employee table with search and actions
│   │       ├── EmployeeForm.jsx         # Add/Edit form with validation
│   │       └── EmployeeDetails.jsx      # Employee details modal
│   │
│   ├── node_modules/                    # npm packages (generated)
│   └── dist/                            # Production build output (generated)
│
└── README.md                            # This file
```

---

## 🔧 Installation

### Prerequisites

- **.NET SDK 10.0+** - [Download](https://dotnet.microsoft.com/download)
- **SQL Server Express** - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm 9+** - Comes with Node.js

### Clone Repository

```bash
git clone https://github.com/omkaar08/Employee-Management-System.git
cd Employee-Management-System
```

### Backend Setup

```bash
cd EmployeeApi

# Restore NuGet packages
dotnet restore

# Install EF Core CLI tools (if not already installed)
dotnet tool install --global dotnet-ef

# Create and apply database migration
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Frontend Setup

```bash
cd ../employee-client

# Install npm dependencies
npm install
```

---

## 🗄️ Database Setup

### Option 1: SQL Server Express (SQLEXPRESS)

The connection string uses `SQLEXPRESS` by default:

```
Server=.\SQLEXPRESS;Database=EmployeeDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True
```

**No additional setup needed** if SQL Server Express is running.

### Option 2: LocalDB

To use LocalDB instead, update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=EmployeeDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

### Run Migrations

```bash
cd EmployeeApi
dotnet ef database update
```

This creates the `EmployeeDb` database with the `Employees` table.

---

## 🚀 Running the Application

### Terminal 1: Start Backend API

```bash
cd EmployeeApi
dotnet run
```

**Output:**
```
Now listening on: http://localhost:5000
Application started. Press Ctrl+C to shut down.
```

**API Base URL**: `http://localhost:5000/api/employees`
**Swagger UI**: `http://localhost:5000/swagger`

### Terminal 2: Start Frontend (React)

```bash
cd employee-client

# Set backend API URL
$env:VITE_API_URL='http://localhost:5000'  # Windows PowerShell
# or
export VITE_API_URL='http://localhost:5000'  # macOS/Linux

# Start development server
npm run dev
```

**Output:**
```
VITE v4.4.9  ready in 456 ms

➜  Local:   http://localhost:5173/
➜  Press q to quit
```

### Access Application

- 🌐 **Frontend**: http://localhost:5173
- 📚 **Swagger API Docs**: http://localhost:5000/swagger
- 🔌 **API Base**: http://localhost:5000/api/employees

---

## 📚 API Documentation

All endpoints return a structured JSON response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Endpoints

#### 1. Get All Employees
```http
GET /api/employees
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "department": "IT",
      "designation": "Developer",
      "salary": 50000,
      "joiningDate": "2023-01-15",
      "isActive": true
    }
  ]
}
```

#### 2. Get Employee by ID
```http
GET /api/employees/{id}
```
**Example**: `GET /api/employees/1`

#### 3. Create Employee
```http
POST /api/employees
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "department": "HR",
  "designation": "Manager",
  "salary": 60000,
  "joiningDate": "2023-06-01",
  "isActive": true
}
```

#### 4. Update Employee
```http
PUT /api/employees/{id}
Content-Type: application/json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543212",
  "department": "IT",
  "designation": "Senior Developer",
  "salary": 75000,
  "joiningDate": "2023-01-15",
  "isActive": true
}
```

#### 5. Delete Employee
```http
DELETE /api/employees/{id}
```
**Example**: `DELETE /api/employees/1`

#### 6. Search Employees
```http
GET /api/employees/search?keyword={keyword}
```
**Example**: `GET /api/employees/search?keyword=john`

Searches across: FirstName, LastName, Email, Department, Designation

---

## 💻 Usage Guide

### Adding an Employee

1. Open frontend: http://localhost:5173
2. Fill the "Add Employee" form on the right:
   - First Name (required)
   - Last Name (required)
   - Email (required, valid format)
   - Phone (optional)
   - Department (required)
   - Designation (required)
   - Salary (required, ≥ 0)
   - Joining Date (date picker)
3. Click **Save**
4. Success message appears, employee added to table

### Searching Employees

1. Enter search keyword in the search box
2. Click **Search**
3. Table updates to show matching results
4. Leave empty and search to reset

### Editing an Employee

1. Click **Edit** button on any employee row
2. Form populates with employee data
3. Modify fields as needed
4. Click **Save**
5. Employee updated in table

### Deleting an Employee

1. Click **Delete** button on any employee row
2. Confirm the deletion popup
3. Employee removed from database and table

### Viewing Employee Details

1. Click **View** button on any employee row
2. Details panel appears showing all employee information
3. Click **Close** to hide details

---

## 🏗️ Architecture

### Frontend to Backend Flow

```
User Action (React UI)
        ↓
EmployeeList / EmployeeForm Component
        ↓
api.js (Axios HTTP Client)
        ↓
HTTP Request to Backend (GET/POST/PUT/DELETE)
        ↓
EmployeesController
        ↓
Validation (ModelState)
        ↓
AppDbContext (EF Core)
        ↓
SQL Server Database
        ↓
Response back to React
        ↓
State Update (useState)
        ↓
UI Re-render
```

### Data Flow Example (Create Employee)

```
1. User submits form
   ↓
2. EmployeeForm validates locally (required fields, email format)
   ↓
3. axios.post('/api/employees', employeeData)
   ↓
4. Backend EmployeesController.Post() receives request
   ↓
5. ModelState validation (DataAnnotations)
   ↓
6. AppDbContext.Employees.Add(employee)
   ↓
7. SaveChangesAsync() executes SQL INSERT
   ↓
8. Database returns generated ID
   ↓
9. ApiResponse<Employee> with success=true
   ↓
10. React receives response, updates state
   ↓
11. EmployeeList re-renders with new employee
```

---

## 🔑 Key Components

### Backend

#### `Program.cs`
- Configures ASP.NET Core services (Controllers, Swagger, DbContext)
- Adds CORS policy to allow React frontend requests
- Enables Swagger/OpenAPI for API documentation
- Sets up dependency injection

#### `AppDbContext.cs`
- Inherits from `DbContext` (EF Core)
- Contains `DbSet<Employee>` for database table
- Manages database connection and migrations

#### `EmployeesController.cs`
- RESTful endpoints for CRUD operations
- Implements validation using `ModelState`
- Returns `ApiResponse<T>` for consistent responses
- Includes search functionality with LINQ

#### `Employee.cs` Model
- Data validation using attributes:
  - `[Required]` - Field is mandatory
  - `[EmailAddress]` - Valid email format
  - `[Range(0, double.MaxValue)]` - Salary validation

#### `ApiResponse<T>.cs` DTO
- Generic wrapper for all API responses
- Properties: `Success`, `Message`, `Data`
- Ensures consistent API contract

### Frontend

#### `App.jsx`
- Main component with state management (useState)
- Handles API calls using async/await
- Manages CRUD operations and search
- Distributes data to child components

#### `api.js`
- Axios instance configured with base URL
- Export helper functions for each endpoint
- Handles HTTP requests centrally
- Falls back to `http://localhost:5000` if `VITE_API_URL` not set

#### `EmployeeList.jsx`
- Displays employees in Bootstrap table
- Search form with keyword input
- Action buttons (View, Edit, Delete)
- Responsive table layout

#### `EmployeeForm.jsx`
- Form with all employee fields
- Client-side validation:
  - Required field checks
  - Email format validation
  - Salary >= 0 validation
- Trim input values before submission
- Reset form after successful submit

#### `EmployeeDetails.jsx`
- Modal component showing full employee details
- Formatted date display
- Close button

---

## 🔐 Validation

### Client-Side (React)
- Required fields: FirstName, LastName, Email, Department, Designation
- Email format validation
- Salary >= 0
- Real-time error messages

### Server-Side (ASP.NET Core)
- `[Required]` attribute validation
- `[EmailAddress]` attribute validation
- `[Range(0, double.MaxValue)]` for salary
- `ModelState.IsValid` check in controller
- Prevents invalid data from reaching database

---

## 📦 Build & Deployment

### Frontend Production Build
```bash
cd employee-client
npm run build
```
Creates optimized `dist/` folder for deployment.

### Backend Publication
```bash
cd EmployeeApi
dotnet publish -c Release -o ./publish
```
Creates deployment-ready files in `./publish/` folder.

---

## 🐛 Troubleshooting

### Backend Issues

**Error**: `Unable to locate a Local Database Runtime installation`
- **Solution**: Use SQLEXPRESS connection string in `appsettings.json`

**Error**: `The certificate chain was issued by an authority that is not trusted`
- **Solution**: Already handled - `TrustServerCertificate=True` in connection string

**Error**: `dotnet-ef version mismatch`
- **Solution**: `dotnet tool update --global dotnet-ef`

### Frontend Issues

**Error**: `npm ERESOLVE unable to resolve dependency tree`
- **Solution**: Already fixed - using compatible Vite version

**Error**: `VITE_API_URL is not recognized`
- **Solution**: Set environment variable before `npm run dev`:
  ```powershell
  $env:VITE_API_URL='http://localhost:5000'
  npm run dev
  ```

---

## 🎓 Learning Concepts

### For Interview Preparation

**1. REST API Design**
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove)
- Stateless requests
- Structured JSON responses
- Status codes (200, 201, 400, 404, 500)

**2. Entity Framework Core (ORM)**
- Object-relational mapping
- DbContext and DbSet
- LINQ queries
- Migrations for version control
- Relationships and constraints

**3. ASP.NET Core**
- Dependency injection
- Middleware pipeline
- Controllers and routing
- Model validation
- CORS configuration

**4. React Fundamentals**
- Components and JSX
- Hooks: useState, useEffect
- Conditional rendering
- List rendering with keys
- Event handling
- Form handling

**5. Frontend-Backend Communication**
- HTTP requests with Axios
- Async/await patterns
- Error handling
- Loading states
- CORS and preflight requests

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👤 Author

Created as a portfolio project demonstrating full-stack development skills.

**GitHub**: [omkaar08](https://github.com/omkaar08)
**Repository**: [Employee-Management-System](https://github.com/omkaar08/Employee-Management-System)

---

## 📞 Support

For issues or questions, please create an issue on GitHub or contact the author.

---

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Role-based access control (Admin, Manager, Employee)
- [ ] Pagination for employee list
- [ ] Bulk employee import/export (CSV, Excel)
- [ ] Advanced filtering and sorting
- [ ] Department management CRUD
- [ ] Salary reports and analytics
- [ ] Employee leave management
- [ ] Performance reviews
- [ ] Cloud deployment (Azure, AWS)
- [ ] Unit and integration tests
- [ ] Docker containerization

---

**Last Updated**: May 2026  
**Status**: ✅ Fully Functional
