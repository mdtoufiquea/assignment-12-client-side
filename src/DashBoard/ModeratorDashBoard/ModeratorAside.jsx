import React, { useState } from 'react';
import { Link } from 'react-router';
import { MoreVertical, X } from "lucide-react";

const ModeratorAside = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <aside
                className={`fixed lg:static h-screen w-50 bg-gray-100 shadow-md p-4 transform transition-transform duration-300 z-40  font-bold
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
            >
                <ul className="space-y-3">
                    <li>
                        <Link
                            to="/moderator-dashBoard"
                            className="block p-2 rounded hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="manage-scholarship"
                            className="block p-2 rounded hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Manage Scholarships
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="all-reviews"
                            className="block p-2 rounded hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            All reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="applied-scholarships"
                            className="block p-2 rounded hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            All applied Scholarship
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="add-scholarship"
                            className="block p-2 rounded hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Add Scholarship
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="flex-1 pt-2">
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-200 p-2 rounded-md shadow"
                    >
                        {isOpen ? <X size={22} /> : <MoreVertical size={22} />}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ModeratorAside;