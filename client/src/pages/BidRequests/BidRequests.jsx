import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./BidRequests.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";



const BidRequests = () => {
    const { user } = useContext(AuthContext);
    const [bidRequests, setBidRequests] = useState([]);
    const axios = useAxios();
    useDocumentTitle("Talent Bazar | Bid Requests");
    useEffect(() => {
        axios.get(`/appliedJobs?email=${user.email}&isRecruiter=true`)
            .then(res => {
                setBidRequests(res.data);
            })
    }, [axios, user]);


    const handleAccept = (id) => {
        console.log(id);
        axios.patch(`/changeStatus/${id}`, { status: "progress" })
            .then(res => {
                if (res.data) {
                    const updatedBidRequests = bidRequests.map((bid) =>
                        bid._id === id ? { ...bid, status: "progress" } : bid
                    );
                    setBidRequests(updatedBidRequests);
                }
            })
            .catch(err => console.log(err));
    }
    const handleReject = (id) => {
        axios.patch(`/changeStatus/${id}`, { status: "rejected" })
        .then(res => {
            if (res.data) {
                const updatedBidRequests = bidRequests.map((bid) =>
                    bid._id === id ? { ...bid, status: "rejected" } : bid
                );
                setBidRequests(updatedBidRequests);
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <div className="my-4 md:m-6">

            {
                bidRequests.length > 0 ?
                    <>
                        <div className="mx-auto overflow-x-scroll">
                            <table className="table  table-zebra md:text-lg">
                                <thead className="bg-black text-zinc-400 md:text-lg ">
                                    <tr>
                                        <th></th>
                                        <th>Job title</th>
                                        <th>Email</th>
                                        <th>Deadline</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        bidRequests.map((bid, index) => <tr key={bid._id} className="shadow-md">
                                            <th>{index + 1}</th>
                                            <th>{bid.title}</th>
                                            <th>{bid.jobSeekerEmail}</th>
                                            <td>{bid.jobDeadline}</td>
                                            <td>${bid.bidAmount}</td>
                                            <td>

                                                <div className="text-center flex flex-col gap-2">

                                                    <ProgressBar percent={bid.status === 'progress' && 50 || bid.status === 'completed' && 100}>
                                                        <Step>
                                                            {({ accomplished, index }) => (
                                                                <div
                                                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    {index + 1}
                                                                </div>
                                                            )}
                                                        </Step>
                                                        <Step>
                                                            {({ accomplished, index }) => (
                                                                <div
                                                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    {index + 1}
                                                                </div>
                                                            )}
                                                        </Step>
                                                        <Step>
                                                            {({ accomplished, index }) => (
                                                                <div
                                                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                                                >
                                                                    {index + 1}
                                                                </div>
                                                            )}
                                                        </Step>
                                                    </ProgressBar>
                                                    {
                                                        bid.status === "pending"
                                                        && <p className="text-gray-400">Pending</p>
                                                    }
                                                    {
                                                        bid.status === "progress"
                                                        && <p className="text-yellow-600">In Progress</p>
                                                    }
                                                    {
                                                        bid.status === "completed"
                                                        && <p className="text-green-600">Completed</p>
                                                    }
                                                    {
                                                        bid.status === "rejected"
                                                        && <p className="text-red-600">Rejected</p>
                                                    }
                                                </div>

                                            </td>

                                            <td className="w-1/12"><button disabled={bid.status === "pending" ? false : true} onClick={() => handleAccept(bid._id)} className="btn btn-primary btn-sm md:btn-md bg-green-600 border-none hover:bg-green-600"  >Accept</button></td>

                                            <td className="w-1/12"><button disabled={bid.status === "pending" ? false : true} onClick={() => handleReject(bid._id)} className="btn btn-primary btn-sm md:btn-md bg-red-600 border-none hover:bg-red-600" >Reject</button></td>



                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div>
                        <h2 className="text-center my-52 text-2xl md:text-5xl">You don&rsquo;t have any bid requests</h2>
                    </div>
            }
        </div>
    );
};

export default BidRequests;