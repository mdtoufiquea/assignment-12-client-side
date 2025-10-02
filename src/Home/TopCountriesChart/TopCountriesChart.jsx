import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopCountriesChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/scholarship-stats")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className="bg-blue-50 shadow-lg max-w-6xl mx-auto  rounded-2xl p-4 md:max-w-10/12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-700 text-center">
                🌍 Scholarships by Country
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default TopCountriesChart;
