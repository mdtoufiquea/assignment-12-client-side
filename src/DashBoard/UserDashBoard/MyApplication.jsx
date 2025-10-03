import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";

const MyApplication = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [applications, setApplications] = useState([]);
    const [editApp, setEditApp] = useState(null);
    const [reviewApp, setReviewApp] = useState(null);
    const [review, setReview] = useState({ rating: "", comment: "" });

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://assignmetn-12-server-side.vercel.app/applied-scholarships/user/${user.email}`)
                .then((res) => setApplications(res.data.data || []))
                .catch((err) => console.error(err));
        }
    }, [user]);

    const handleCancel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(
                        `https://assignmetn-12-server-side.vercel.app/applied-scholarships/${id}/status`,
                        { status: "Rejected" }
                    );
                    Swal.fire("Cancelled!", "Your application has been cancelled.", "success");
                    setApplications((prev) =>
                        prev.map((app) => (app._id === id ? { ...app, status: "Rejected" } : app))
                    );
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to cancel application", "error");
                }
            }
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `https://assignmetn-12-server-side.vercel.app/applied-scholarships/${editApp._id}`,
                editApp
            );
            Swal.fire("Updated!", "Application updated successfully", "success");
            setApplications((prev) =>
                prev.map((app) => (app._id === editApp._id ? editApp : app))
            );
            setEditApp(null);
        } catch (err) {
            Swal.fire("Error", "Failed to update", "error");
            console.log(err);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                rating: review.rating,
                comment: review.comment,
                reviewDate: new Date(),
                scholarshipName: reviewApp.scholarshipName,
                universityName: reviewApp.universityName,
                universityId: reviewApp.universityId,
                 scholarshipId: reviewApp._id,
                userName: user?.displayName,
                userEmail: user?.email,
                userImage: user?.photoURL || "",
            };
            await axios.post("https://assignmetn-12-server-side.vercel.app/reviews", reviewData);
            Swal.fire("Success", "Review submitted!", "success");
            setReviewApp(null);
            setReview({ rating: "", comment: "" });
        } catch (err) {
            Swal.fire("Error", "Failed to submit review", "error");
            console.log(err);
        }
    };

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/scholarships/${id}`);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="-ml-10  mt-10 lg:-ml-0">
            <h2 className="text-2xl font-bold mb-4 text-center">My Applications</h2>

            {applications.length === 0 ? (
                <p className="text-gray-500">Application not found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto border  w-full text-left min-w-auto ">
                        <thead>
                            <tr>
                                <th className="border px-1 py-2">University</th>
                                <th className="border px-1 py-2 hidden md:hidden lg:table-cell">Address</th>
                                <th className="border px-1 py-2 hidden md:table-cell">Feedback</th>
                                <th className="border px-1 py-2 hidden md:table-cell ">Category</th>
                                <th className="border px-1 py-2 hidden md:table-cell ">Degree</th>
                                <th className="border px-1 py-2 ">Fees</th>
                                <th className="border px-1 py-2">Status</th>
                                <th className="border px-1 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id}>
                                    <td className="border px-1 py-2">{app.universityName}</td>
                                    <td className="border px-1 py-2  hidden md:hidden lg:table-cell ">{app.applicantVillage},{app.applicantDistrict},{app.V}</td>
                                    <td className="border px-1 py-2 hidden md:table-cell">{app.feedback || "-"}</td>
                                    <td className="border px-1 py-2  hidden md:table-cell ">{app.scholarshipCategory}</td>
                                    <td className="border px-1 py-2 hidden md:table-cell">{app.applyingDegree}</td>
                                    <td className="border px-1 py-2">{app.payment.amount}</td>
                                    <td className="border px-1 py-2">{app.status === "Rejected" ? "Rejected" : app.payment.status}</td>
                                    <td className="border px-1 py-2 space-y-2 md:space-y-0 md:flex md:space-x-2 grid
                                   ">
                                        <button
                                            onClick={() => handleViewDetails(app.scholarshipId)}
                                            className="md:px-2 px-1 py-1 bg-blue-500 text-white rounded w-14  md:w-auto"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (app.status !== "pending") {
                                                    Swal.fire(
                                                        "Oops!",
                                                        "You can edit only pending applications.",
                                                        "info"
                                                    );
                                                } else {
                                                    setEditApp(app);
                                                }
                                            }}
                                            className="px-2 py-1 bg-yellow-500 text-white rounded w-14   md:w-auto"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleCancel(app._id)}
                                            disabled={app.status === "Rejected"}
                                            className={`px-2 py-1 rounded text-white  md:w-auto
                                            w-15  
                                            ${app.status === "Rejected"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600"
                                                }`}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setReviewApp(app)}
                                            className="px-2 py-1 bg-green-500 text-white rounded
                                            w-15   
                                            md:w-auto"
                                        >
                                            Add Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {editApp && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-11/12 sm:w-96">
                        <h3 className="text-lg font-bold mb-2">Edit Application</h3>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                value={editApp.degree}
                                onChange={(e) =>
                                    setEditApp({ ...editApp, degree: e.target.value })
                                }
                                className="w-full border p-2 mb-2"
                                placeholder="Degree"
                            />
                            <input
                                type="text"
                                value={editApp.category}
                                onChange={(e) =>
                                    setEditApp({ ...editApp, category: e.target.value })
                                }
                                className="w-full border p-2 mb-2"
                                placeholder="Category"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 px-3 py-1 text-white rounded"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditApp(null)}
                                className="ml-2 bg-gray-500 px-3 py-1 text-white rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {reviewApp && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-11/12 sm:w-96">
                        <h3 className="text-lg font-bold mb-2">Add Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={review.rating}
                                onChange={(e) =>
                                    setReview({ ...review, rating: e.target.value })
                                }
                                className="w-full border p-2 mb-2"
                                placeholder="Rating (1-5)"
                                required
                            />
                            <textarea
                                value={review.comment}
                                onChange={(e) =>
                                    setReview({ ...review, comment: e.target.value })
                                }
                                className="w-full border p-2 mb-2"
                                placeholder="Comment"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-500 px-3 py-1 text-white rounded"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setReviewApp(null)}
                                className="ml-2 bg-gray-500 px-3 py-1 text-white rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplication;
