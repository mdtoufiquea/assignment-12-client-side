import { useEffect, useState } from "react";
import CountUp from "react-countup";

const StatsCounter = () => {
    const [stats, setStats] = useState({ users: 0, scholarships: 0, applied: 0 });

    useEffect(() => {
        fetch("http://localhost:5000/stats")
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    return (
        <div className="md:max-w-10/12 mx-auto mt-2 mb-10 bg-blue-50 rounded-2xl p-2 md:py-10">
             <h1 className="text-2xl font-bold text-center py-2">Our Some Info</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center ">
            <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
                <p className="text-3xl font-extrabold text-blue-600 mt-2">
                    <CountUp end={stats.users} duration={7} />
                </p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold text-gray-700">Total Scholarships</h2>
                <p className="text-3xl font-extrabold text-green-600 mt-2">
                    <CountUp end={stats.scholarships} duration={7} />
                </p>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold text-gray-700">Applied Scholarships</h2>
                <p className="text-3xl font-extrabold text-purple-600 mt-2">
                    <CountUp end={stats.applied} duration={7} />
                </p>
            </div>
        </div>
        </div>
    );
};

export default StatsCounter;
