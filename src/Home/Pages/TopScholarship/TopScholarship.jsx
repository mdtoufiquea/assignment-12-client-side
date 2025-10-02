import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";

const TopScholarship = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/top-scholarships")
            .then(res => res.json())
            .then(data => setScholarships(data));
    }, []);

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/scholarships/${id}`);
        } else {
            navigate("/login");
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }


    return (
        <div className="md:max-w-10/12 mx-auto mt-2 mb-10 bg-blue-50 rounded-2xl p-2">
            <h2 className="text-2xl font-bold mb-4 text-center">Top Scholarships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scholarships.map((scholarship) => (
                    <div
                        key={scholarship._id}
                        className="card bg-base-100  shadow-sm"
                    >
                        <figure>
                            <img className="w-full h-60 lg:h-110"
                                src={`http://localhost:5000/${scholarship.universityImage.replace(
                                    /\\/g,
                                    "/"
                                )}`}
                                alt={scholarship.universityName}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">
                                University : {scholarship.universityName}
                            </h2>
                            <p className="font-bold text-gray-600">
                                Scholarship Name : {scholarship.scholarshipName}
                            </p>
                            <p className="font-bold text-gray-600">
                                ScholarshipCategory : {scholarship.scholarshipCategory}
                            </p>
                            <div className="flex">
                                <p className="font-bold text-gray-600">
                                    City : {scholarship.city}
                                </p>
                                <p className="font-bold text-gray-600">
                                    &nbsp; Country : {scholarship.country}
                                </p>
                            </div>
                            <p className="font-bold text-gray-600">
                                SubjectCategory : {scholarship.subjectCategory}
                            </p>
                            <p className="font-bold text-gray-600">
                                ApplicationFees : {scholarship.applicationFees}
                            </p>
                            <p className="font-bold text-gray-600">
                                Deadline : {scholarship.deadline}
                            </p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleViewDetails(scholarship._id)} className="btn btn-primary">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link to="/allScholarships" className="btn btn-primary">
                    All Scholarships
                </Link>
            </div>
        </div>
    );
};

export default TopScholarship;
