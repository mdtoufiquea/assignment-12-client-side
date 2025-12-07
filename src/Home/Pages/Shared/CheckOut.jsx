import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../../Contexts/AuthContexts/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckOut() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [paymentId, setPaymentId] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://assignmetn-12-server-side.vercel.app/scholarships/${id}`)
            .then((res) => res.json())
            .then((data) => setScholarship(data.data));
    }, [id]);

    if (!scholarship) return <p className="text-center mt-10">Loading...</p>;

    // Payment Form
    function PaymentForm() {
        const stripe = useStripe();
        const elements = useElements();

        const handlePayment = async () => {
            try {
                const res = await axios.post("https://assignmetn-12-server-side.vercel.app/create-payment-intent", {
                    amount: scholarship.applicationFees,
                });
                const clientSecret = res.data.clientSecret;

                const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: { card: elements.getElement(CardElement) },
                });

                if (paymentResult.error) {
                    Swal.fire("Error", paymentResult.error.message, "error");
                    return;
                }

                if (paymentResult.paymentIntent.status === "succeeded") {
                    Swal.fire("Success", "Payment Successful!", "success");
                    setPaymentId(paymentResult.paymentIntent.id);
                    setPaymentCompleted(true);
                }
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        };

        return (
            <div className="p-4 bg-white rounded shadow max-w-lg mx-auto space-y-3">
                <h2 className="text-xl font-semibold text-center mb-4">Payment</h2>
                <CardElement className="border p-3 rounded" />
                <button
                    onClick={handlePayment}
                    className="btn btn-primary w-full mt-4"
                    disabled={!stripe}
                >
                    Pay
                </button>
            </div>
        );
    }

    // Applicant Form
    function ApplicantForm() {
        const { register, handleSubmit } = useForm();

        const onSubmit = async (formData) => {
            try {
                const payload = {
                    userId: user._id,
                    userName: user.displayName || user.name,
                    userEmail: user.email,
                    scholarshipId: scholarship._id,
                    universityName: scholarship.universityName,
                    scholarshipCategory: scholarship.scholarshipCategory,
                    subjectCategory: scholarship.subjectCategory,
                    applicantPhone: formData.phone,
                    applicantPhoto: formData.photo?.name || "",
                    applicantVillage: formData.village,
                    applicantDistrict: formData.district,
                    applicantCountry: formData.country,
                    applicantGender: formData.gender,
                    applyingDegree: formData.degree,
                    sscResult: formData.ssc,
                    hscResult: formData.hsc,
                    studyGap: formData.studyGap || "",
                    appliedAt: new Date(),
                    payment: {
                        paymentId,
                        amount: scholarship.applicationFees,
                        status: "succeeded",
                        paidAt: new Date(),
                    },
                };

                const response = await axios.post("https://assignmetn-12-server-side.vercel.app/apply-scholarship", payload);

                if (response.data.success) {
                    Swal.fire("Success", "Scholarship Applied Successfully!", "success");
                }
                navigate('/user-dashboard/my-applications')
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded shadow max-w-lg mx-auto space-y-3">
                <h2 className="text-xl font-semibold text-center mb-4">Applicant Information</h2>

                <input {...register("phone")} placeholder="Phone Number" className="input input-bordered w-full" required />
                <label>Applicant Photo</label>
                <input type="text" {...register("photo")} className="file-input file-input-bordered w-full" required />
                <input {...register("village")} placeholder="Village" className="input input-bordered w-full" required />
                <input {...register("district")} placeholder="District" className="input input-bordered w-full" required />
                <input {...register("country")} placeholder="Country" className="input input-bordered w-full" required />

                <select {...register("gender")} className="select select-bordered w-full" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select {...register("degree")} className="select select-bordered w-full" required>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                </select>

                <input {...register("ssc")} placeholder="SSC Result" className="input input-bordered w-full" required />
                <input {...register("hsc")} placeholder="HSC Result" className="input input-bordered w-full" required />

                <select {...register("studyGap")} className="select select-bordered w-full">
                    <option value="">No Study Gap</option>
                    <option value="1 year">1 year</option>
                    <option value="2+ years">2+ years</option>
                </select>

                <input defaultValue={scholarship.universityName} readOnly className="input input-bordered w-full bg-gray-100" required />
                <input defaultValue={scholarship.scholarshipCategory} readOnly className="input input-bordered w-full bg-gray-100" required />
                <input defaultValue={scholarship.subjectCategory} readOnly className="input input-bordered w-full bg-gray-100" required />

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Apply
                </button>
            </form>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            {!paymentCompleted ? <PaymentForm /> : <ApplicantForm />}
        </Elements>
    );
}
