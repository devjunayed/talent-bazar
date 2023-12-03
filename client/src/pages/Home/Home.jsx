import useDocumentTitle from "../../hooks/useDocumentTitle";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BrowseJobs from "./BrowseJobs";
import Testimonials from "./Testimonials";

const Home = () => {
    useDocumentTitle("Talent Bazar | Home")
    return (
        <div className="">
            <Banner></Banner>
            <AboutUs></AboutUs>
            <BrowseJobs></BrowseJobs>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;