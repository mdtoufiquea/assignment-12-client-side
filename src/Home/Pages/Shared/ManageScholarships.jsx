import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [editingScholarship, setEditingScholarship] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const degreeOptions = ["Diploma", "Bachelor", "Masters"];
    const subjectOptions = ["Agriculture", "Engineering", "Doctor"];
    const scholarshipCategoryOptions = ["Full fund", "Partial", "Self-fund"];

   

     useEffect(() => {
        fetch("https://assignmetn-12-server-side.vercel.app/scholarships")
          .then((res) => res.json())
          .then((data) => {
            setScholarships(data || []);
            
          })
          .catch(() => {
            setScholarships([]);
           
          });
      }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files && files[0]) {
            setSelectedFile(files[0]);
            console.log("📁 Selected file:", files[0].name);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleEdit = (scholarship) => {
        if (!scholarship || !scholarship._id) {
            Swal.fire("Error!", "Invalid scholarship data", "error");
            return;
        }

        console.log("Editing Scholarship:", scholarship);
        setEditingScholarship(scholarship);
        setFormData({ ...scholarship });
        setSelectedFile(null);
        document.getElementById("edit_modal").showModal();
    };

    const handleUpdate = async (scholarshipId, formValues, file) => {
        console.log("🔄 Updating scholarship with ID:", scholarshipId);

        const formDataObj = new FormData();

        const fieldsToSend = [
            'scholarshipName', 'universityName', 'country', 'city',
            'worldRank', 'subjectCategory', 'scholarshipCategory', 'degree',
            'tuitionFees', 'applicationFees', 'serviceCharge',
            'deadline', 'postDate', 'email'
        ];

        fieldsToSend.forEach(field => {
            if (formValues[field] !== undefined && formValues[field] !== null) {
                formDataObj.append(field, formValues[field]);
            }
        });

        if (file && file instanceof File) {
            formDataObj.append("universityImage", file);
            console.log("File added to FormData:", file.name);
        }

        try {
            const res = await fetch(`https://assignmetn-12-server-side.vercel.app/scholarships/${scholarshipId}`, {
                method: "PUT",
                body: formDataObj,
            });

            console.log("📨 Response status:", res.status);

            const data = await res.json();
            console.log("📨 Server response:", data);

            if (!data.success) {
                throw new Error(data.message || "Update failed");
            }

            setScholarships(prev => {
                const updated = prev.map(sch => {
                    if (sch && sch._id === scholarshipId) {
                        const updatedScholarship = {
                            ...sch,
                            ...data.data,
                            universityImage: data.data?.universityImage || sch?.universityImage
                        };
                        console.log("🔄 Updated scholarship in UI:", updatedScholarship);
                        return updatedScholarship;
                    }
                    return sch;
                });
                return updated;
            });

            Swal.fire({
                title: "Success!",
                text: "Scholarship updated successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            handleCloseModal();

        } catch (err) {
            console.error(" UPDATE ERROR:", err.message);
            Swal.fire("Error!", err.message || "Update failed", "error");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingScholarship && editingScholarship._id) {
            handleUpdate(editingScholarship._id, formData, selectedFile);
        } else {
            Swal.fire("Error!", "No scholarship selected for update", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://assignmetn-12-server-side.vercel.app/scholarships/${id}`, {
                        method: "DELETE",
                    });
                    const data = await res.json();

                    if (data.success) {
                        setScholarships((prev) => {
                            const filtered = prev.filter((item) => item && item._id !== id);
                            return filtered;
                        });
                        Swal.fire("Deleted!", "Scholarship deleted successfully!", "success");
                    } else {
                        Swal.fire("Error!", data.message || "Failed to delete scholarship", "error");
                    }
                } catch (err) {
                    Swal.fire("Error!", "Failed to delete scholarship", "error");
                    console.log(err)
                }
            }
        });
    };

    const handleCloseModal = () => {
        const modal = document.getElementById("edit_modal");
        if (modal) modal.close();
        setFormData({});
        setEditingScholarship(null);
        setSelectedFile(null);
    };

    // if (loading) {
    //     return (
    //         <div className="p-5 flex justify-center items-center h-64">
    //             <span className="loading loading-spinner loading-lg"></span>
    //             <p className="ml-3 text-lg">Loading scholarships...</p>
    //         </div>
    //     );
    // }

    return (
        <div className="p-2 lg:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 lg:mb-6">🎓 Manage Scholarships</h1>

            <div className="flex justify-end mb-3 lg:mb-4">
                <button
                    onClick={scholarships}
                    className="btn btn-sm lg:btn-md btn-outline"
                >
                    <span className="hidden sm:inline">🔄 Refresh</span>
                    <span className="sm:hidden">🔄</span>
                </button>
            </div>

            <div className="md:-ml-0 -ml-14">
                <table className="md:table table-zebra w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-xs sm:text-sm ">Scholarship</th>
                            <th className="text-xs sm:text-sm hidden sm:table-cell ">University</th>
                            <th className="text-xs sm:text-sm">Subject</th>
                            <th className="text-xs sm:text-sm hidden md:table-cell">Degree</th>
                            <th className="text-xs sm:text-sm">Fees</th>
                            <th className="text-xs sm:text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships && scholarships.length > 0 ? (
                            scholarships.map((scholarship) => (
                                scholarship && scholarship._id ? (
                                    <tr key={scholarship._id}>
                                        <td>
                                            <div className="max-w-[120px] sm:max-w-none">
                                                <div className="font-semibold text-xs sm:text-sm truncate">
                                                    {scholarship.scholarshipName || "N/A"}
                                                </div>

                                                <div className="sm:hidden text-xs text-gray-500 mt-1">
                                                    {scholarship.universityName || "N/A"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden sm:table-cell">
                                            <div className="flex items-center gap-2">
                                                {scholarship.universityImage && (
                                                    <img
                                                        src={`https://assignmetn-12-server-side.vercel.app/${scholarship.universityImage}`}
                                                        alt={scholarship.universityName || "University"}
                                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                )}
                                                <span className="text-sm">{scholarship.universityName || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-xs sm:text-sm">
                                                {scholarship.subjectCategory || "N/A"}
                                            </span>
                                        </td>
                                        <td className="hidden md:table-cell">
                                            <span className="text-xs sm:text-sm">
                                                {scholarship.degree || "N/A"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-xs sm:text-sm font-medium">
                                                ${scholarship.applicationFees || "0"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-1 sm:gap-2">
                                                <button
                                                    className="btn btn-info btn-xs sm:btn-sm"
                                                    onClick={() =>
                                                        user
                                                            ? navigate(`/scholarships/${scholarship._id}`)
                                                            : navigate("/login")
                                                    }
                                                    title="View Details"
                                                >
                                                    <FaEye className="text-xs sm:text-sm" />
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-xs sm:btn-sm"
                                                    onClick={() => handleEdit(scholarship)}
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-xs sm:text-sm" />
                                                </button>
                                                <button
                                                    className="btn btn-error btn-xs sm:btn-sm"
                                                    onClick={() => handleDelete(scholarship._id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-xs sm:text-sm" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-3xl sm:text-4xl mb-2">📚</span>
                                        <p className="text-base sm:text-lg font-semibold">No scholarships found</p>
                                        <p className="text-gray-500 text-sm sm:text-base">Add some scholarships to get started</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <dialog id="edit_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg lg:text-xl">Edit Scholarship</h3>
                        <button
                            onClick={handleCloseModal}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">

                        <div className="form-control col-span-1 sm:col-span-2 lg:col-span-1">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Scholarship Name *</span>
                            </label>
                            <input
                                type="text"
                                name="scholarshipName"
                                value={formData.scholarshipName || ""}
                                onChange={handleChange}
                                placeholder="Scholarship Name"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control col-span-1 sm:col-span-2 lg:col-span-1">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">University Name *</span>
                            </label>
                            <input
                                type="text"
                                name="universityName"
                                value={formData.universityName || ""}
                                onChange={handleChange}
                                placeholder="University Name"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control col-span-1 sm:col-span-2">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">University Image</span>
                                {selectedFile && (
                                    <span className="label-text-alt text-green-600 text-xs">
                                          {selectedFile.name}
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                name="universityImage"
                                onChange={handleChange}
                                className="file-input file-input-bordered w-full file-input-sm lg:file-input-md"
                                accept="image/*"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Current: {formData.universityImage ? formData.universityImage.split('/').pop() : 'No image'}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Country *</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                                placeholder="Country"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>


                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">City *</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city || ""}
                                onChange={handleChange}
                                placeholder="City"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">World Rank *</span>
                            </label>
                            <input
                                type="number"
                                name="worldRank"
                                value={formData.worldRank || ""}
                                onChange={handleChange}
                                placeholder="World Rank"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Subject Category *</span>
                            </label>
                            <select
                                name="subjectCategory"
                                value={formData.subjectCategory || ""}
                                onChange={handleChange}
                                className="select select-bordered w-full select-sm lg:select-md"
                                required
                            >
                                <option value="">Select Subject</option>
                                {subjectOptions.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Scholarship Category *</span>
                            </label>
                            <select
                                name="scholarshipCategory"
                                value={formData.scholarshipCategory || ""}
                                onChange={handleChange}
                                className="select select-bordered w-full select-sm lg:select-md"
                                required
                            >
                                <option value="">Select Category</option>
                                {scholarshipCategoryOptions.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Degree *</span>
                            </label>
                            <select
                                name="degree"
                                value={formData.degree || ""}
                                onChange={handleChange}
                                className="select select-bordered w-full select-sm lg:select-md"
                                required
                            >
                                <option value="">Select Degree</option>
                                {degreeOptions.map((degree, index) => (
                                    <option key={index} value={degree}>
                                        {degree}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Tuition Fees ($) *</span>
                            </label>
                            <input
                                type="number"
                                name="tuitionFees"
                                value={formData.tuitionFees || ""}
                                onChange={handleChange}
                                placeholder="Tuition Fees"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Application Fees ($) *</span>
                            </label>
                            <input
                                type="number"
                                name="applicationFees"
                                value={formData.applicationFees || ""}
                                onChange={handleChange}
                                placeholder="Application Fees"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Service Charge ($) *</span>
                            </label>
                            <input
                                type="number"
                                name="serviceCharge"
                                value={formData.serviceCharge || ""}
                                onChange={handleChange}
                                placeholder="Service Charge"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Deadline *</span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline || ""}
                                onChange={handleChange}
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Post Date *</span>
                            </label>
                            <input
                                type="date"
                                name="postDate"
                                value={formData.postDate || ""}
                                onChange={handleChange}
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control col-span-1 sm:col-span-2">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-sm lg:text-base">Email *</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="Email"
                                className="input input-bordered w-full input-sm lg:input-md"
                                required
                            />
                        </div>

                        <div className="form-control col-span-1 sm:col-span-2 flex justify-end gap-2 lg:gap-3 mt-3 lg:mt-4">
                            <button type="submit" className="btn btn-primary btn-sm lg:btn-md">
                                {selectedFile ? "📁 Update" : "Update"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm lg:btn-md"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageScholarships;