import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const [error, setError] = useState(null)
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const photoFile = e.target.photo.files[0]; 
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log("Firebase User:", user);

                setError('');

                if (photoFile) {
                    const reader = new FileReader();
                    reader.readAsDataURL(photoFile);
                    reader.onload = () => {
                        const photoURL = reader.result;
                        updateProfile(user, {
                            displayName: name,
                            photoURL: photoURL
                        }).then(() => {
                            saveUserToDB(name, email, photoURL);
                        }).catch(err => console.error("Profile Update Error:", err));
                    };
                } else {
                    updateProfile(user, { displayName: name })
                        .then(() => saveUserToDB(name, email, ''))
                        .catch(err => console.error("Profile Update Error:", err));
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };


    const saveUserToDB = (name, email, photo) => {
        const saveUser = { name, email, photo, role: "user" };
        fetch("https://assignmetn-12-server-side.vercel.app/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(saveUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log("User Saved in DB:", data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => navigate('/'));
                }
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log("Google User:", user);
                const saveUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: "user"
                };

                fetch("https://assignmetn-12-server-side.vercel.app/users", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Signup Successfully with Google",
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then(() => {
                                navigate("/")
                            })
                    });

            })
            .catch((error) => {
                console.error("Google SignIn Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            });
    };

    return (
        <div className='grid md:grid-cols-2 max-w-10/12 mx-auto md:mt-40 md:mb-96 lg:mt-10 lg:mb-40'>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:ml-40">
                <h1 className="text-3xl text-center font-bold">Register now!</h1>
                <div className="card-body">
                    <form className="fieldset" onSubmit={handleRegister}>
                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Your Name"
                            name='name'
                            required />
                        <label className="label">Photo</label>
                        <input type="file" className="input" name="photo" accept="image/*" required />
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder=" Your Email"
                            name='email'
                            required />
                        <label className="label">Password</label>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                minlength="6"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                                name='password'
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 6 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">SignUp</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        SignUp with Google
                    </button>
                    <p className='text-red-500'>{error}</p>
                    <Link to='/login'><p className='text-[17px]'>Already you have a account? Please <span className='text-blue-500 font-bold underline'>Login</span></p></Link>

                </div>
            </div>
            <div>
                <img src="https://i.ibb.co.com/9kC4KH6F/register.png" alt="" />
            </div>
        </div>
    );
};

export default Register;