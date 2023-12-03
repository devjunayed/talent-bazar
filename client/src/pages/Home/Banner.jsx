import bannerImg from '../../assets/bannerImg.jpg';

const Banner = () => {
    return (
        <div className="hero min-h-[50vh] md:min-h-[80vh]" style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="w-11/12 hero-content justify-start text-left text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-2xl md:text-5xl font-bold">Discover Your Dream Job with Ease</h1>
                    <p className="mb-5">Unlock Your Career Potential: Seamless Job Discovery, Instant Applications. Talent Bazar - Elevate Your Professional Journey, Regardless of Your Field!</p>
                    <button className="btn btn-outline border-white hover:text-gray-200 hover:border-gray-200 hover:bg-none text-white">Browse Job</button>
                </div>
            </div>

        </div>
    );
};

export default Banner;