import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContexts/AuthContext';

const ModeratorInformation = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    if (!user) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold">No admin logged in</p>
            </div>
        );
    }

    return (
        <div>
            {user.photoURL ? (
                <img
                    className="mx-auto rounded-full md:w-70 mt-20"
                    src={user.photoURL}
                    alt={user.displayName || "Admin"}
                />
            ) : (
                <div className="mx-auto rounded-full md:w-70 h-70 mt-20 bg-gray-300 flex items-center justify-center">
                    <span>No Photo</span>
                </div>
            )}
            <h1 className="md:text-xl font-bold text-center pt-10">
                Name: {user.displayName || "N/A"}
            </h1>
            <h1 className="md:text-xl font-bold text-center py-1">
                Email: {user.email || "N/A"}
            </h1>
            <h1 className="md:text-xl font-bold text-center py-1">
                Role: {user.role || "N/A"}
            </h1>
        </div>
    );
};

export default ModeratorInformation;