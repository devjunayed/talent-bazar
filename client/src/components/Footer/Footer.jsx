import Logo from '../../assets/logo.png';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube} from 'react-icons/fa';
const Footer = () => {
    return (
        <div>
            <footer className="bg-zinc-800 p-10 ">
                <div className='flex gap-4 flex-col md:flex-row justify-between text-white'>
                    <aside className='md:md:w-1/3'>
                        <img className='-ml-4 w-1/2' src={Logo} alt="" />
                        <p className='opacity-50 md:ml-4'>Talent Bazer Ltd.<br />Providing reliable Services since 1992</p>
                    </aside>
                    <aside className='md:w-1/3'>
                        <header className='opacity-50 uppercase font-bold'>Contact</header>
                        <div className='opacity-50'>
                            <p className=''>Address: Somewhere, nowhere, nostreet 0/0</p>
                            <p>Email: someone@example.com</p>
                        </div>
                    </aside>
                    <nav className='md:w-1/3'>
                        <header className="footer-title">Social</header>
                        <div className="opacity-50 grid grid-flow-col gap-4">
                            <div className='flex mt-4 gap-2'>
                                <FaFacebook className='text-3xl'></FaFacebook>
                                <FaInstagram className='text-3xl'></FaInstagram>
                                <FaLinkedinIn className='text-3xl'></FaLinkedinIn>
                                <FaYoutube className='text-3xl'></FaYoutube>
                            </div>
                        </div>
                    </nav>

                </div>
                <div className="divider"></div>
                <aside className='opacity-50 text-white text-center mt-10'>
                    <p>Copyright © 2023 - All right reserved by Talent Bazar Ltd</p>
                </aside>
            </footer>

        </div>
    );
};

export default Footer;