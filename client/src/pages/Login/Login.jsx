import { Link, useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/login.svg';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Login = () => {
    const { userLogin, userEmailLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    useDocumentTitle("Talent Bazar | Login");
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
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
            .catch(err => console.log(err));
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
            <div className="hero-content gap-6 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left md:w-1/2">
                    <img className='rounded-xl w-full md:w-9/12' src={LoginImg} alt="" />
                </div>
                <div className=" md:w-1/2 card flex-shrink-0 md:max-w-xl max-w-3xl border py-6 border-zinc-200 shadow-2xl bg-base-100">
                    <h2 className='text-center lg:text-3xl text-xl font-bold '>Login now</h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        </div>


                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary bg-black text-white hover:bg-slate-900 border-none">Login</button>
                            <div className="divider">OR</div>
                            <button type='button' onClick={handleEmailLogin} className="btn btn-primary bg-black text-white hover:bg-slate-900 border-none"><FcGoogle className='text-2xl'></FcGoogle>Sign in with google</button>
                        </div>
                    </form>
                    <p className='text-center'>Don&rsquo;t an account? <Link to="/register" className='text-blue-600'>Register now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;