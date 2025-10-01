import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div>{children}</div>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
        </div>
    );
}

const AppliedScholarshipManage = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [modalType, setModalType] = useState(""); 

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await axios.get("http://localhost:5000/applied-scholarships");
            setApplications(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFeedbackSubmit = async () => {
        if (!feedbackText) return Swal.fire("Error", "Feedback cannot be empty!", "error");
        try {
            await axios.post(`http://localhost:5000/applied-scholarships/${selectedApplication._id}/feedback`, {
                feedback: feedbackText,
            });
            Swal.fire("Success", "Feedback submitted successfully!", "success");
            setFeedbackText("");
            setSelectedApplication(null);
            setModalType("");
            fetchApplications();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleCancelApplication = async (applicationId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
        });
        if (confirm.isConfirmed) {
            try {
                const res = await axios.put(`http://localhost:5000/applied-scholarships/${applicationId}/status`, {
                    status: "Rejected",
                });

                if (res.data.success) {

                    setApplications(prev =>
                        prev.map(app =>
                            app._id === applicationId ? { ...app, status: "Rejected" } : app
                        )
                    );

                    Swal.fire("Cancelled", "Application has been rejected!", "success");
                } else {
                    Swal.fire("Error", "Failed to cancel application!", "error");
                }

            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        }
    };


    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center ml-8">All Applied Scholarships</h1>

            <div className="overflow-x-auto">
                <table className="lg:min-w-full border border-gray-200 table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-2  md:px-4 border text-left hidden md:table-cell">Applicant</th>
                            <th className="py-2 px-2  md:px-4 border text-left">University</th>
                            <th className="py-2 px-2  md:px-4 border text-left hidden md:table-cell">Degree</th>
                            <th className="py-2 px-2  md:px-4 border
                            hidden text-left">Category</th>
                            <th className="py-2 px-2  md:px-4 border text-left">Status</th>
                            <th className="py-2 px-2  md:px-4 border text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(applications) &&
                            applications.map((app) => (
                                <tr key={app._id} className="text-sm md:text-base text-center md:text-left">
                                    <td className="py-2 px-1 md:px-4 border hidden md:table-cell">{app.userName}</td>
                                    <td className="py-2 px-1 md:px-4 border">{app.universityName}</td>
                                    <td className="py-2 px-1 md:px-4 border hidden md:table-cell">{app.applyingDegree}</td>
                                    <td className="py-2 px-1 md:px-4 border hidden">{app.scholarshipCategory}</td>
                                    <td className="py-2 px-1 md:px-4 border">
                                        <span
                                            className={`md:px-2 py-1 rounded text-xs md:text-sm ${app.payment?.status === "succeeded"
                                                    ? "bg-green-200 text-green-800"
                                                    : app.status === "Rejected"
                                                        ? "bg-red-200 text-red-800"
                                                        : "bg-yellow-200 text-yellow-800"
                                                }`}
                                        >
                                            {app.status || app.payment?.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-1 md:px-4 border flex flex-col md:flex-row gap-2 md:gap-1 justify-center items-center">
                                        <button
                                            onClick={() => {
                                                setSelectedApplication(app);
                                                setModalType("details");
                                            }}
                                            className="btn btn-sm btn-info w-full md:w-auto"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedApplication(app);
                                                setModalType("feedback");
                                            }}
                                            className="btn btn-sm btn-warning w-full md:w-auto"
                                        >
                                            Feedback
                                        </button>
                                        <button
                                            onClick={() => handleCancelApplication(app._id)}
                                            className="btn btn-sm btn-error w-full md:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalType === "details" && selectedApplication}
                onClose={() => setModalType("")}
                title="Application Details"
            >
                {selectedApplication && (
                    <div className="space-y-2 text-sm md:text-base">
                        <p><strong>Applicant:</strong> {selectedApplication.userName}</p>
                        <p><strong>Email:</strong> {selectedApplication.userEmail}</p>
                        <p><strong>University:</strong> {selectedApplication.universityName}</p>
                        <p><strong>Degree:</strong> {selectedApplication.applyingDegree}</p>
                        <p><strong>Category:</strong> {selectedApplication.scholarshipCategory}</p>
                        <p><strong>SSC Result:</strong> {selectedApplication.sscResult}</p>
                        <p><strong>HSC Result:</strong> {selectedApplication.hscResult}</p>
                        <p><strong>Village:</strong> {selectedApplication.applicantVillage}</p>
                        <p><strong>District:</strong> {selectedApplication.applicantDistrict}</p>
                        <p><strong>Country:</strong> {selectedApplication.applicantCountry}</p>
                        <p><strong>Gender:</strong> {selectedApplication.applicantGender}</p>
                        <p><strong>Study Gap:</strong> {selectedApplication.studyGap || "None"}</p>
                        <p><strong>Payment Status:</strong> {selectedApplication.payment?.status || "Pending"}</p>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={modalType === "feedback" && selectedApplication}
                onClose={() => setModalType("")}
                title="Provide Feedback"
            >
                <textarea
                    className="textarea textarea-bordered w-full mb-4 resize-none"
                    rows="4"
                    placeholder="Enter feedback here..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
                <button
                    onClick={handleFeedbackSubmit}
                    className="btn btn-primary w-full"
                >
                    Submit Feedback
                </button>
            </Modal>
        </div>


    );
};

export default AppliedScholarshipManage;
