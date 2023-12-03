import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const MyBid = () => {
    const { user } = useContext(AuthContext);
    const [myBid, setMyBid] = useState([]);
    const [checked, setChecked] = useState(false);
    const axios = useAxios();
    useDocumentTitle("Talent Bazar | My Bids");
    useEffect(() => {
        if (checked) {
            axios.get(`/appliedJobs?email=${user.email}&sort=${checked}`)
                .then(res => {
                    setMyBid(res.data);
                })
        } else {
            axios.get(`/appliedJobs?email=${user.email}`)
                .then(res => {
                    setMyBid(res.data);
                })
        }

    }, [axios, user, checked]);

    const handleComplete = (id) => {
        axios.patch(`/changeStatus/${id}`, { status: "completed" })
            .then(res => {
                if (res.data) {
                    const updatedBidRequests = myBid.map((bid) =>
                        bid._id === id ? { ...bid, status: "completed" } : bid
                    );
                    setMyBid(updatedBidRequests);
                }
            })
            .catch(err => console.log(err));
    }
    console.log(checked);
    return (
        <div className="my-4 md:m-6">

            {
                myBid.length > 0 ?
                    <>
                        <div className="mx-auto overflow-x-scroll">
                            <div className="justify-end flex mb-4 gap-2 mr-6">
                                <label htmlFor="checkbox" className="font-bold">Sort By Status </label>
                                <input type="checkbox" defaultChecked={checked} id="checkbox" onChange={() => setChecked(!checked)} className="text-2xl" />
                            </div>
                            <table className="table  table-zebra md:text-lg">
                                <thead className="bg-black text-zinc-400 md:text-lg ">
                                    <tr>
                                        <th></th>
                                        <th>Job title</th>
                                        <th>Category</th>
                                        <th>Email</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Complete</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        myBid.map((bid, index) => <tr key={bid._id} className="shadow-md">
                                            <th>{index + 1}</th>
                                            <th>{bid.title}</th>
                                            <th>{bid.category}</th>
                                            <td>{bid.recruiterEmail}</td>
                                            <td>{bid.jobDeadline}</td>
                                            <td>
                                                {bid.status === "pending" &&
                                                    <p className="text-gray-400 font-bold">Pending</p>}

                                                {bid.status === "progress" &&
                                                    <p className="text-yellow-600 font-bold">In Progress</p>}

                                                {bid.status === "completed" &&
                                                    <p className="text-green-600 font-bold">Completed</p>}

                                                {bid.status === "rejected" &&
                                                    <p className="text-red-600 font-bold">Rejected</p>}
                                            </td>
                                            <td><button onClick={() => handleComplete(bid._id)} className="btn btn-primary btn-sm md:btn-md bg-black border-none hover:bg-zinc-800" disabled={bid.status === "progress" ? false : true}>Complete</button></td>

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div>
                        <h2 className="text-center my-52 text-2xl md:text-5xl">You haven&rsquo;t applied to any job</h2>
                    </div>
            }
        </div>
    );
};

export default MyBid;