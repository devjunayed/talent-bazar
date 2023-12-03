import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import AddJobs from "../pages/AddJobs/AddJobs";
import PrivateRoutes from "./PrivateRoutes";
import JobDetail from "../pages/JobDetail/JobDetail";
import MyBid from "../pages/MyBid/MyBid";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import BidRequests from "../pages/BidRequests/BidRequests";
import UpdatePost from "../pages/UpdatePost/UpdatePost";



export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/add-jobs",
                element: <PrivateRoutes>
                    <AddJobs></AddJobs>
                </PrivateRoutes>
            },
            {
                path: "/jobs/:id",
                element: <PrivateRoutes>
                    <JobDetail></JobDetail>
                </PrivateRoutes>,
                loader: ({ params }) => params.id
            },
            {
                path: "/my-bid",
                element: <PrivateRoutes>
                    <MyBid></MyBid>
                </PrivateRoutes>,

            },
            {
                path: "/posted-jobs",
                element: <PrivateRoutes>
                    <MyPostedJobs></MyPostedJobs>
                </PrivateRoutes>
            },
            {
                path: "/bid-requests",
                element: <PrivateRoutes>
                    <BidRequests></BidRequests>
                </PrivateRoutes>
            },
            {
                path: "/posted-jobs/update/:id",
                element: <PrivateRoutes>
                    <UpdatePost></UpdatePost>
                </PrivateRoutes>,
                loader: ({ params }) => fetch(`https://talent-bazar.vercel.app/browseJob/${params.id}`)

            }
        ]
    }
])