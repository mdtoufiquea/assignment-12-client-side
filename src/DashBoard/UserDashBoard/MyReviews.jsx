import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContexts/AuthContext";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [editReview, setEditReview] = useState(null);
    const [formData, setFormData] = useState({ rating: "", comment: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!user?.email) return;
            setLoading(true);
            try {
                const res = await axios.get(`https://assignmetn-12-server-side.vercel.app/reviews/${user.email}`);
                console.log("GET /reviews/:email response:", res.data);
                
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
    }, [user]);

    console.log(reviews)

   
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`https://assignmetn-12-server-side.vercel.app/reviews/${id}`);
                    console.log("DELETE /reviews/:id response:", res.data);
                    if (res.data?.success) {
                        setReviews((prev) => prev.filter((rev) => rev._id !== id));
                        Swal.fire("Deleted!", "Your review has been deleted.", "success");
                    } else {
                        Swal.fire("Error", "Failed to delete review", "error");
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to delete review", "error");
                }
            }
        });
    };

    const handleEdit = (review) => {
        setEditReview(review);
        setFormData({
            rating: review.rating ?? "",
            comment: review.comment ?? "",
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editReview) return;

        try {
            const res = await axios.put(
                `https://assignmetn-12-server-side.vercel.app/reviews/${editReview._id}`,
                {
                    rating: Number(formData.rating), 
                    comment: formData.comment
                }
            );

            console.log("Update response:", res.data);

            if (res.data?.success || res.data?.modifiedCount > 0) {
                Swal.fire("Success", "Review updated successfully", "success");
                setReviews((prev) =>
                    prev.map((rev) =>
                        rev._id === editReview._id
                            ? { ...rev, rating: Number(formData.rating), comment: formData.comment }
                            : rev
                    )
                );
                setEditReview(null);
            } else {
                Swal.fire("Error", "Failed to update review", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update review", "error");
        }
    };


    return (
        <div >
            <h2 className="text-2xl font-bold mb-4 text-center">My Reviews</h2>

            {loading ? (
                <p>Loading...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews found</p>
            ) : (
                <div className="overflow-x-auto -ml-10 md:-ml-0">
                    <table className="table-auto border w-full text-left">
                        <thead>
                            <tr>
                                <th className="border px-1 py-2 text-sm md:text-base lg:text-base ">University</th>
                                <th className="border px-1 py-2 text-sm md:text-base lg:text-base">Comment</th>
                                <th className="border px-1 py-2 text-sm md:text-base lg:text-base">Date</th>
                                <th className="border px-1 py-2 text-sm md:text-base lg:text-base">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((rev) => (
                                <tr key={rev._id}>
                                    <td className="border px-1 py-2 text-sm md:text-base lg:text-base">{rev.universityName}</td>
                                    <td className="border px-1 py-2 text-sm md:text-base lg:text-base">{rev.comment}</td>
                                    <td className="border px-1 py-2 text-sm md:text-base lg:text-base">
                                        {rev.reviewDate ? new Date(rev.reviewDate).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="border px-1 py-2 space-x-2 space-y-2 text-sm md:text-base lg:text-base">
                                        <button
                                            onClick={() => handleEdit(rev)}
                                            className="px-2 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rev._id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editReview && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-2">Edit Review</h3>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                className="w-full border p-2 mb-2"
                                placeholder="Rating (1-5)"
                                required
                            />
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full border p-2 mb-2"
                                placeholder="Comment"
                                required
                            />
                            <div className="flex items-center">
                                <button type="submit" className="bg-blue-500 px-3 py-1 text-white rounded">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditReview(null)}
                                    className="ml-2 bg-gray-500 px-3 py-1 text-white rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
