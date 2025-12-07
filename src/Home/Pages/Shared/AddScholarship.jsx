import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";


const AddScholarship = () => {
    const { user, loading: userLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        country: "",
        city: "",
        worldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        deadline: "",
        postDate: "",
        posterEmail: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.universityName || !formData.universityImage) {
            return Swal.fire({
                icon: "warning",
                title: "Missing Fields!",
                text: "Please fill all required fields.",
            });
        }

        try {
            const response = await fetch("https://assignmetn-12-server-side.vercel.app/scholarships", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success || result.insertedId) {
                Swal.fire("Success!", "Scholarship added.", "success");

                setFormData({
                    scholarshipName: "",
                    universityName: "",
                    universityImage: "",
                    country: "",
                    city: "",
                    worldRank: "",
                    subjectCategory: "",
                    scholarshipCategory: "",
                    degree: "",
                    tuitionFees: "",
                    applicationFees: "",
                    serviceCharge: "",
                    deadline: "",
                    postDate: "",
                    posterEmail: ""
                })

                navigate("/allscholarships");
            } else {
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Server error occurred.", "error");
        } finally {
            setLoading(false);
        }
    };



    if (userLoading) return <p className="text-center mt-10">Loading...</p>;
    if (user && !["admin", "moderator"].includes(user.role)) return null;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Scholarship Name */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Scholarship Name</label>
                    <input
                        type="text"
                        name="scholarshipName"
                        value={formData.scholarshipName}
                        onChange={handleChange}
                        placeholder="Enter scholarship name"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* University Name */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">University Name</label>
                    <input
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleChange}
                        placeholder="Enter university name"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* University Image URL */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">University Image URL</label>
                    <input
                        type="text"
                        name="universityImage"
                        value={formData.universityImage}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Country */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* City */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* World Rank */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">World Rank</label>
                    <input
                        type="number"
                        name="worldRank"
                        value={formData.worldRank}
                        onChange={handleChange}
                        placeholder="Enter world rank"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Subject Category (Dropdown) */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Subject Category</label>
                    <select
                        name="subjectCategory"
                        value={formData.subjectCategory}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Subject</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>

                {/* Scholarship Category (Dropdown) */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Scholarship Category</label>
                    <select
                        name="scholarshipCategory"
                        value={formData.scholarshipCategory}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                </div>

                {/* Degree (Dropdown) */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Degree</label>
                    <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                    </select>
                </div>

                {/* Tuition Fees */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Tuition Fees</label>
                    <input
                        type="number"
                        name="tuitionFees"
                        value={formData.tuitionFees}
                        onChange={handleChange}
                        placeholder="Enter tuition fees/optional"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Application Fees */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Application Fees</label>
                    <input
                        type="number"
                        name="applicationFees"
                        value={formData.applicationFees}
                        onChange={handleChange}
                        placeholder="Enter application fees"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Service Charge */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Service Charge</label>
                    <input
                        type="number"
                        name="serviceCharge"
                        value={formData.serviceCharge}
                        onChange={handleChange}
                        placeholder="Enter service charge"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Post Date */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Post Date</label>
                    <input
                        type="date"
                        name="postDate"
                        value={formData.postDate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Poster Email */}
                <div className="flex flex-col col-span-2">
                    <label className="mb-1 font-semibold">Poster Email</label>
                    <input
                        type="email"
                        name="posterEmail"
                        value={formData.posterEmail}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border p-2 rounded"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col col-span-2">
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto`}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Scholarship"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholarship;
