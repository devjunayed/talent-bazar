import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/404.jpg';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Error = () => {
    useDocumentTitle("Talent Bazar | 404 page");
    return (
        <div className='min-h-screen flex justify-center items-center flex-col bg-[#070C20]'>
            <img src={PageNotFound} className='w-1/2' alt="" />
           <Link to="/"> <button className='btn uppercase text-xl  btn-outline border-gray-400 text-white mt-6 px-10'>👈 Go Home</button></Link>
        </div>
    );
};

export default Error;