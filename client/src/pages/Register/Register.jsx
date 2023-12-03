import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import RegisterImg from '../../assets/register.svg';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Register = () => {
    const { userRegister, userEmailLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    useDocumentTitle("Talent Bazar | Register");
    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password.length > 5) {
            if (password !== confirmPassword) {
                toast.error('Password does not match!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                userRegister(email, password)
                    .then(result => {
                        const user = result.user;

                        updateProfile(auth.currentUser, {
                            displayName: name,
                            photoURL: photoUrl
                        })
                        if (user) {
                            Swal.fire({
                                title: "Account created successfully",
                                icon: "success",
                                timer: 1500
                            });
                            navigate("/");
                        }
                    })
                    .catch(err => {
                        if(err.code === 'auth/email-already-in-use'){
                            toast.error('Email already in use!', {
                                position: "top-center",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                                theme: "dark",
                            }); 
                        }
                        
                    })
            }
        } else {
            toast.error('Make more stronger password!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }

    }


    const handleEmailLogin = () => {
        console.log('trigerring...');
        userEmailLogin()
            .then(res => {
                const user = res.user;
                if (user) {
                    Swal.fire({
                        title: "Login successfully",
                        icon: "success",
                        timer: 1500
                    });
                    navigate("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left md:w-1/2">
                    <img className='rounded-xl md:w-9/12 md:mx-20' src={RegisterImg} alt="" />
                </div>
                <div className=" md:w-1/2 card flex-shrink-0 md:max-w-xl border py-6 border-zinc-200 shadow-2xl bg-base-100">
                    <h2 className='text-center lg:text-3xl text-xl font-bold '>Register Now</h2>
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className='flex flex-col md:flex-row gap-4 w-full'>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" name='photoUrl' placeholder="photo url" className="input input-bordered" required />
                        </div>
                        <div className='flex md:flex-row flex-col w-full md:gap-4'>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='confirmPassword' placeholder="confirm password " className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary bg-black text-white hover:bg-slate-900 border-none">Register</button>
                            <div className="divider">OR</div>
                            <button onClick={handleEmailLogin} className="btn btn-primary bg-black text-white hover:bg-slate-900 border-none"><FcGoogle className='text-2xl'></FcGoogle>Sign up with google</button>
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;