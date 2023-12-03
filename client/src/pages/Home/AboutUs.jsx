import AboutUsImg from '../../assets/about-us.jpg';

const AboutUs = () => {
    return (
        <div className="md:mx-10">
            <h2 className='text-xl md:text-3xl font-bold text-center relative my-2 md:my-10 after:h-1 after:w-1/12 after:bg-zinc-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 mb-4'>About Us</h2>
            <div className="card  lg:card-side">
                <figure className='h-1/2'><img className='' src={AboutUsImg} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-zinc-400">&ldquo;Empowering Careers, Enriching Companies: Your Talent, Our Marketplace.&rdquo;</h2>
                    <p>At Talent Bazar, we believe that talent knows no bounds. Our platform is a dynamic marketplace where job seekers and employers converge to create meaningful connections. Unleash your potential or find the perfect candidate – Talent Bazar is your one-stop destination for a brighter, more fulfilling future. Join us in reshaping the landscape of talent acquisition and career advancement.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;