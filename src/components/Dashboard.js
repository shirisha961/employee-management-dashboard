import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import SearchFilter from "./SearchFilter";
import { logout } from "../utils/auth";

const Dashboard = ({ onLogout }) => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({ search: "", gender: "", status: "" });
    const activeCount = employees.filter(emp => emp.active).length;
    const inactiveCount = employees.length - activeCount;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(data);
    }, []);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const addOrUpdateEmployee = (emp) => {
        if (editingEmployee) {
            setEmployees(employees.map(e => e.id === emp.id ? emp : e));
            setEditingEmployee(null);
        } else {
            setEmployees([...employees, { ...emp, id: Date.now() }]);
        }
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure?")) {
            setEmployees(employees.filter(e => e.id !== id));
        }
    };
    const filteredEmployees = employees.filter(e => {
        const nameMatch = e.name
            ?.toLowerCase()
            .includes(filters.search.toLowerCase());

        const genderMatch = filters.gender
            ? e.gender === filters.gender
            : true;

        const statusMatch = filters.status
            ? e.active === (filters.status === "active")
            : true;

        return nameMatch && genderMatch && statusMatch;
    });
    return (
        <div>
            <header>
                <h2>Dashboard</h2>
                <button onClick={() => { logout(); onLogout(); }}>Logout</button>
            </header>

            {/* 🔹 Dashboard Summary Cards */}
            <div className="summary-cards">
                <div className="card">
                    <h3>Total Employees</h3>
                    <p>{employees.length}</p>
                </div>

                <div className="card active">
                    <h3>Active</h3>
                    <p>{activeCount}</p>
                </div>

                <div className="card inactive">
                    <h3>Inactive</h3>
                    <p>{inactiveCount}</p>
                </div>
            </div>

            {/* Modal Form (Add / Edit) */}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <EmployeeForm
                            onSave={(emp) => {
                                addOrUpdateEmployee(emp);
                                setShowModal(false);
                            }}
                            editingEmployee={editingEmployee}
                            onCancel={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}
            <div className="search-actions-row">
                <SearchFilter setFilters={setFilters} />

                <div className="right-buttons">
                    <button
                        className="add-btn"
                        onClick={() => window.print()}
                    >
                        Print
                    </button>

                    <button
                        className="add-btn"
                        onClick={() => {
                            setEditingEmployee(null);
                            setShowModal(true);
                        }}
                    >
                        + Add Employee
                    </button>
                </div>
            </div>

            <EmployeeList
                employees={filteredEmployees}
                onEdit={(emp) => {
                    setEditingEmployee(emp);
                    setShowModal(true);
                }}
                onDelete={deleteEmployee}
            />
        </div>
    );


};

export default Dashboard;
