import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonials = () => {

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        speed: 800,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    return (
        <div className="overflow-hidden mb-6">
            <h2 className='text-xl md:text-3xl font-bold text-center relative my-2 md:my-10 after:h-1 after:w-1/12 after:bg-zinc-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 mb-4'>Testimonials</h2>


            <Slider {...settings}>
                <div className="">
                    <div className="card mx-2 bg-zinc-600 text-zinc-300">
                        <div className="avatar mx-auto mt-4">
                            <div className="w-24 rounded-full">
                                <img src="https://i.ibb.co/xDbyPMt/demo-user-de.png" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">John Doe</h2>
                            <p>Using this Platform i have got my dream job at Amazon</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="card mx-2 bg-zinc-600 text-zinc-300">
                        <div className="avatar mx-auto mt-4">
                            <div className="w-24 rounded-full">
                                <img src="https://i.ibb.co/xDbyPMt/demo-user-de.png" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">John Doe</h2>
                            <p>Using this Platform i have got my dream job at Amazon</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="card mx-2 bg-zinc-600 text-zinc-300">
                        <div className="avatar mx-auto mt-4">
                            <div className="w-24 rounded-full">
                                <img src="https://i.ibb.co/xDbyPMt/demo-user-de.png" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">John Doe</h2>
                            <p>Using this Platform i have got my dream job at Amazon</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="card mx-2 bg-zinc-600 text-zinc-300">
                        <div className="avatar mx-auto mt-4">
                            <div className="w-24 rounded-full">
                                <img src="https://i.ibb.co/xDbyPMt/demo-user-de.png" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">John Doe</h2>
                            <p>Using this Platform i have got my dream job at Amazon</p>
                        </div>
                    </div>
                </div>
                <div className="mr-4">
                    <div className="card mx-2 bg-zinc-600 text-zinc-300">
                        <div className="avatar mx-auto mt-4">
                            <div className="w-24 rounded-full">
                                <img src="https://i.ibb.co/xDbyPMt/demo-user-de.png" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">John Doe</h2>
                            <p>Using this Platform i have got my dream job at Amazon</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Testimonials;