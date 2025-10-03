import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../Contexts/AuthContexts/AuthContext';
import Swal from 'sweetalert2';

const ScholarshipDetails = () => {

    const { id } = useParams();
    const {user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);

   

    useEffect(() => {
        fetch(`http://localhost:5000/scholarships/${id}`)
            .then((res) => res.json())
            .then((data) => setScholarship(data.data))
            .catch(() => Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "Failed to load scholarship details",
            }));
    }, [id]);



    if (!scholarship) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }
    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }
    
    if(!user){
         navigate("/login");
    }


    return (
        <div className='md:max-w-10/12 mx-auto bg-amber-50 p-2 '>
            <div
                className="card bg-base-100  shadow-sm"
            >
                <figure>
                    <img
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
                        Degree : {scholarship.degree}
                    </p>
                    <p className="font-bold text-gray-600">
                        ScholarshipCategory : {scholarship.scholarshipCategory}
                    </p>

                    <p className="font-bold text-gray-600">City : {scholarship.city}
                    </p>
                    <p className="font-bold text-gray-600"> Country : {scholarship.country}
                    </p>

                    <p className="font-bold text-gray-600">
                        SubjectCategory : {scholarship.subjectCategory}
                    </p>
                    <p className="font-bold text-gray-600">
                        WorldRank
                        : {scholarship.worldRank
                        }
                    </p>
                    <p className="font-bold text-gray-600">
                        ApplicationFees : {scholarship.applicationFees}
                    </p>
                    <p className="font-bold text-gray-600">
                        TuitionFees : {scholarship.tuitionFees}
                    </p>
                    <p className="font-bold text-gray-600">
                        ServiceCharge
                        : {scholarship.serviceCharge
                        }
                    </p>
                    <p className="font-bold text-gray-600">
                        Postdate : {scholarship.postDate}
                    </p>
                    <p className="font-bold text-gray-600">
                        Deadline : {scholarship.deadline}
                    </p>
                </div>
                <button
                    className="btn btn-success mt-4"
                    onClick={() => navigate(`/checkout/${scholarship._id}`)}
                >
                    Apply Scholarship
                </button>
            </div>
        </div>
    );
};

export default ScholarshipDetails;