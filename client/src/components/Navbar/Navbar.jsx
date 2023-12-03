import "./Navbar.css";
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        {
            !user &&
            <>
                <li><NavLink to="/login">Login</NavLink></li>
            </>
        }
        {
            user &&
            <>
                <li><NavLink to="/add-jobs">Add Jobs</NavLink></li>
                <li><NavLink to="/my-bid">My Bids</NavLink></li>
                <li><NavLink to="/posted-jobs">My Posted Jobs</NavLink></li>
                <li><NavLink to="/bid-requests">Bid Requests</NavLink></li>
            </>
        }
    </>

    console.log(user);
    return (
        <div className="navbar bg-zinc-800">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to="/" className=""><img className='md:w-1/2' src={Logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu gap-2 text-white menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            {
                user &&
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn  bnt-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="bg-black  text-white mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content  rounded-box w-52">
                            <li><a className="text-xl text-zinc-400">{user.displayName}</a></li>
                            <li><a onClick={userLogOut}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            }
        </div>

    );
};

export default Navbar;