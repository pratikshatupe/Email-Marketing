import React from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#0F0E2A] text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">MailDoll</h2>

          <ul className="space-y-4">
            <li className="bg-blue-600 p-2 rounded">Dashboard</li>
            <li className="hover:text-blue-400 cursor-pointer">Campaigns</li>
            <li className="hover:text-blue-400 cursor-pointer">Email</li>
            <li className="hover:text-blue-400 cursor-pointer">SMS</li>
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">1</h2>
            <p className="text-gray-500">Total Emails</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">2</h2>
            <p className="text-gray-500">Email Campaigns</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">0</h2>
            <p className="text-gray-500">SMS Campaigns</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">0</h2>
            <p className="text-gray-500">Email Groups</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminUsers;