const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: "20px" }}>
                            No employees found
                        </p>
                    ) : (
                        <>
                            {employees.map((emp, index) => (
                                <tr key={emp.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {emp.image && <img src={emp.image} width="40" />}
                                    </td>
                                    <td>{emp.name}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.dob}</td>
                                    <td>{emp.state}</td>
                                    <td>{emp.active ? "Active" : "Inactive"}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => onEdit(emp)}>Edit</button>
                                        <button className="delete-btn" onClick={() => onDelete(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </>

                    )}

                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
