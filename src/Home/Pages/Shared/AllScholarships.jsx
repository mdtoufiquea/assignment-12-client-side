import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://assignmetn-12-server-side.vercel.app/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data || []);
        setFilteredScholarships(data || []);
      })
      .catch(() => {
        setScholarships([]);
        setFilteredScholarships([]);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredScholarships(scholarships);
      return;
    }

    const filtered = scholarships.filter((scholarship) =>
      scholarship?.universityName?.toLowerCase().includes(value.toLowerCase()) ||
      scholarship?.scholarshipName?.toLowerCase().includes(value.toLowerCase()) ||
      scholarship?.degree?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredScholarships(filtered);
  };

  const handleViewDetails = (id) => {
    if (user) navigate(`/scholarships/${id}`);
    else navigate("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="md:max-w-10/12 mx-auto bg-amber-50 p-2">
      <h1 className="text-2xl font-bold text-center col-span-2 md:pt-5">
        All Scholarships
      </h1>

      <div className="flex justify-center gap-2 my-5">
        <input
          type="text"
          placeholder="Search by Scholarship, University or Degree"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-3 mt-5">
        {filteredScholarships?.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <div key={scholarship._id} className="card bg-base-100 shadow-sm">
              <figure>
                <img
                  className="w-full h-60 object-cover"
                  src={scholarship.universityImage}
                  alt=""
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold">
                  University: {scholarship.universityName}
                </h2>
                <p className="font-bold text-gray-600">
                  Scholarship Name: {scholarship.scholarshipName}
                </p>
                <p className="font-bold text-gray-600">
                  Category: {scholarship.scholarshipCategory}
                </p>
                <div className="flex">
                  <p className="font-bold text-gray-600">
                    City: {scholarship.city}
                  </p>
                  <p className="font-bold text-gray-600">
                    &nbsp;Country: {scholarship.country}
                  </p>
                </div>
                <p className="font-bold text-gray-600">
                  Subject: {scholarship.subjectCategory}
                </p>
                <p className="font-bold text-gray-600">
                  Fees: {scholarship.applicationFees}
                </p>
                <p className="font-bold text-gray-600">
                  Deadline: {scholarship.deadline}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleViewDetails(scholarship._id)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold text-red-500 col-span-2">
            ❌ No scholarships found!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
