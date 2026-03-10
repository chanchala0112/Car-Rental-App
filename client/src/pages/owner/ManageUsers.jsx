import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const dummyList = [
            { id: 1, name: "Amila Perera", email: "amila@example.com", joined: "2023-10-15", status: "Active", phone: "0771234567" },
            { id: 2, name: "Kasun Jayasuriya", email: "kasun@example.com", joined: "2023-10-12", status: "Active", phone: "0712345678" },
            { id: 3, name: "Nimal Siriwardena", email: "nimal@example.com", joined: "2023-10-10", status: "Inactive", phone: "0763456789" },
            { id: 4, name: "Sunil Perera", email: "sunil@example.com", joined: "2023-10-08", status: "Active", phone: "0754567890" },
        ];

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        setUsers([...dummyList, ...registeredUsers]);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);

            // Update local storage if it was a tracked user
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const updatedRegistered = registeredUsers.filter(u => u.id !== id);
            localStorage.setItem('registeredUsers', JSON.stringify(updatedRegistered));
        }
    };

    const toggleStatus = (id) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
        );
        setUsers(updatedUsers);

        // Update local storage if it was a tracked user
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedRegistered = registeredUsers.map(u =>
            u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedRegistered));
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
                <p className="text-slate-500 mt-2">View and manage all registered users on the platform.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-amber-500 outline-none transition-all w-64 shadow-sm"
                        />
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-900">
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Joined Date</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{user.name}</span>
                                                <span className="text-[11px] text-slate-400 italic font-mono">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        {user.joined}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${user.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                                                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                                                }`}
                                        >
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 outline-none">
                                            <button className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                                                📧
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
