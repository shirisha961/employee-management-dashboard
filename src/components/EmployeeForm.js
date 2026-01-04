import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, editingEmployee, onCancel }) => {
    const [employee, setEmployee] = useState({
        name: "", gender: "", dob: "", state: "", active: true, image: ""
    });

    useEffect(() => {
        if (editingEmployee) setEmployee(editingEmployee);
    }, [editingEmployee]);

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => setEmployee({ ...employee, image: reader.result });
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(employee);
        setEmployee({ name: "", gender: "", dob: "", state: "", active: true, image: "" });
    };

    return (
        <div className="addeditform">
            <form onSubmit={handleSubmit}>
                <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>

                <input required placeholder="Full Name"
                    value={employee.name}
                    onChange={e => setEmployee({ ...employee, name: e.target.value })} />

                <select required value={employee.gender}
                    onChange={e => setEmployee({ ...employee, gender: e.target.value })}>
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <input type="date" required value={employee.dob}
                    onChange={e => setEmployee({ ...employee, dob: e.target.value })} />

                <select required value={employee.state}
                    onChange={e => setEmployee({ ...employee, state: e.target.value })}>
                    <option value="">State</option>
                    <option>Telangana</option>
                    <option>AP</option>
                    <option>Delhi</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                </select>
                <div className="file-upload">
                    <label className="file-label">
                        Choose File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            hidden
                        />
                    </label>

                    <span className="file-name">
                        {employee.image ? "File selected" : "No file chosen"}
                    </span>
                </div>

                {employee.image && <img src={employee.image} alt="" width="60" />}

                <div className="checkbox-row">
                    <label htmlFor="active">Active</label>
                    <input
                        id="active"
                        type="checkbox"
                        checked={employee.active}
                        onChange={e =>
                            setEmployee({ ...employee, active: e.target.checked })
                        }
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        Save
                    </button>

                    <button
                        type="button"
                        className="save-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
