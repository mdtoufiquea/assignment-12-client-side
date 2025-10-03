import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await axios.get("https://assignmetn-12-server-side.vercel.app/reviews");
                console.log("GET /reviews response:", res.data);
                const arr = Array.isArray(res.data?.data) ? res.data.data : [];
                setReviews(arr);
            } catch (err) {
                console.error("Failed fetching reviews:", err);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);
    console.log(reviews)

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axios.delete(`https://assignmetn-12-server-side.vercel.app/reviews/${id}`);
                console.log("DELETE response:", res.data);

                if (res.data?.deletedCount > 0) {
                    setReviews((prev) => prev.filter((r) => r._id !== id));
                    Swal.fire("Deleted!", "Review has been deleted.", "success");
                } else {
                    Swal.fire("Error", "Failed to delete review", "error");
                }
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete review", "error");
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

            {loading ? (
                <p>Loading...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {reviews.map((rev) => (
                        <div
                            key={rev._id}
                            className="border p-4 rounded shadow hover:shadow-lg transition"
                        >
                            <h3 className="font-bold text-lg">{rev.universityName}</h3>

                            <div className="flex items-center mt-2 mb-2">
                                <img
                                    src={rev.userImage}
                                    alt="Reviewer"
                                    className="w-10 h-10 rounded-full mr-2 object-cover"
                                />
                                <span className="font-semibold">{rev.userName}</span>
                            </div>

                            <p className="text-gray-400 text-xs">
                                {rev.reviewDate
                                    ? new Date(rev.reviewDate).toLocaleDateString()
                                    : "-"}
                            </p>
                            <p className="font-semibold mt-1">Rating: {rev.rating}</p>
                            <p className="mt-2 text-gray-700">{rev.comment}</p>

                            <button
                                onClick={() => handleDelete(rev._id)}
                                className="mt-3 bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReviews;
