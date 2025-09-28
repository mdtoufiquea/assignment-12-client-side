import React, { useState } from "react";
import Swal from "sweetalert2";

const AddScholarship = () => {
    const [formData, setFormData] = useState({
        scholarshipName: "",
        universityName: "",
        universityImage: null,
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
        email: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        for (const key in formData) {
            dataToSend.append(key, formData[key]);
        }

        try {
            const res = await fetch("http://localhost:5000/scholarships", {
                method: "POST",
                body: dataToSend, 
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: result.message,
                });

                setFormData({
                    scholarshipName: "",
                    universityName: "",
                    universityImage: null,
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
                    email: "",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: result.message,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: err.message,
            });
        }
    };

    return (
        <div className="min-h-screen md:py-10">
            <div className="mx-auto bg-white p-2 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    🎓 Add Scholarship Information
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                   
                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Scholarship Name
                        </label>
                        <input
                            type="text"
                            required
                            name="scholarshipName"
                            value={formData.scholarshipName}
                            onChange={handleChange}
                            placeholder="Enter Scholarship Name"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                   
                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            University Name
                        </label>
                        <input
                            type="text"
                            required
                            name="universityName"
                            value={formData.universityName}
                            onChange={handleChange}
                            placeholder="Enter University Name"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            University Image/Logo
                        </label>
                        <input
                            type="file"
                            required
                            name="universityImage"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
                        />
                        <small className="text-gray-500">
                            (Upload image to imgbb, don’t paste link)
                        </small>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            University Country
                        </label>
                        <input
                            type="text"
                            required
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            University City
                        </label>
                        <input
                            type="text"
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            University World Rank
                        </label>
                        <input
                            type="number"
                            required
                            name="worldRank"
                            value={formData.worldRank}
                            onChange={handleChange}
                            placeholder="Enter World Rank"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Subject Category
                        </label>
                        <select
                            name="subjectCategory"
                            required
                            value={formData.subjectCategory}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
                        >
                            <option value="">Select Category</option>
                            <option>Agriculture</option>
                            <option>Engineering</option>
                            <option>Doctor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Scholarship Category
                        </label>
                        <select
                            name="scholarshipCategory"
                            required
                            value={formData.scholarshipCategory}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
                        >
                            <option value="">Select Category</option>
                            <option>Full fund</option>
                            <option>Partial</option>
                            <option>Self-fund</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">Degree</label>
                        <select
                            name="degree"
                            required
                            value={formData.degree}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
                        >
                            <option value="">Select Degree</option>
                            <option>Diploma</option>
                            <option>Bachelor</option>
                            <option>Masters</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Tuition Fees (optional)
                        </label>
                        <input
                            type="number"
                            required
                            name="tuitionFees"
                            value={formData.tuitionFees}
                            onChange={handleChange}
                            placeholder="Enter Tuition Fees"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Application Fees
                        </label>
                        <input
                            type="number"
                            required
                            name="applicationFees"
                            value={formData.applicationFees}
                            onChange={handleChange}
                            placeholder="Enter Application Fees"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Service Charge
                        </label>
                        <input
                            type="number"
                            required
                            name="serviceCharge"
                            value={formData.serviceCharge}
                            onChange={handleChange}
                            placeholder="Enter Service Charge"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            required
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-gray-600">
                            Scholarship Post Date
                        </label>
                        <input
                            type="date"
                            required
                            name="postDate"
                            value={formData.postDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-bold text-gray-600">
                            Posted User Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
                        >
                            ➕ Add Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;
