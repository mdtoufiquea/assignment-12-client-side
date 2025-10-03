import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UsersManage = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetch("https://assignmetn-12-server-side.vercel.app/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);


    const handleRoleChange = (id, role) => {
        fetch(`https://assignmetn-12-server-side.vercel.app/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role }),
        })
            .then(res => res.json())
            .then(() => {
                setUsers(users.map(u => (u._id === id ? { ...u, role } : u)));
            });
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignmetn-12-server-side.vercel.app/users/${id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(() => {
                        setUsers(users.filter(u => u._id !== id));

                        Swal.fire(
                            "Deleted!",
                            "User has been deleted successfully.",
                            "success"
                        );
                    });
            }
        });
    };

    const filteredUsers =
        filter === "all" ? users : users.filter(u => u.role === filter);

    return (
        <div className=" md:p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-bold">Manage Users</h2>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="all">All Users</option>
                    <option value="user">Only Users</option>
                    <option value="moderator">Only Moderators</option>
                    <option value="admin">Only Admins</option>
                </select>
            </div>

         
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg text-sm md:text-base">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 md:p-3 text-left">Name</th>
                            <th className="p-2 md:p-3 text-left">Email</th>
                            <th className="p-2 md:p-3 text-left">Role</th>
                            <th className="p-2 md:p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-2 md:p-3">{user.name}</td>
                                <td className="p-2 md:p-3 break-all">{user.email}</td>
                                <td className="p-2 md:p-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="border rounded-md p-1 w-full md:w-auto"
                                    >
                                        <option value="user">user</option>
                                        <option value="moderator">moderator</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="p-2 md:p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default UsersManage;