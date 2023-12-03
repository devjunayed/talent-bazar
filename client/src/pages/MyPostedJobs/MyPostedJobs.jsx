import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const MyPostedJobs = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();
    const [postedJobs, setPostedJobs] = useState([]);

    useDocumentTitle("Talent Bazar | My posted jobs");

    useEffect(() => {
        axios.get(`/browseJob?email=${user.email}`)
            .then(res => setPostedJobs(res.data))
            .catch(err => console.log(err));
    }, [axios, user]);

    const handleDelete = (id) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/job/${id}`)
                    .then(res => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your job post has been deleted.",
                                icon: "success"
                            });
                            const remainingJob = postedJobs.filter((item) => item._id !== id);
                            setPostedJobs(remainingJob);
                        }
                    })
                    .catch(err => console.log(err));

            }
        });


    }

    return (
        <div className="my-4 md:m-6">

            {
                postedJobs.length > 0 ?
                    <>
                        <div className="mx-auto overflow-x-scroll">
                            <table className="table  table-zebra md:text-lg">
                                <thead className="bg-black text-zinc-400 md:text-lg ">
                                    <tr>
                                        <th></th>
                                        <th>Job title</th>
                                        <th>category</th>
                                        <th>Deadline</th>
                                        <th>Price Range</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        postedJobs.map((bid, index) => <tr key={bid._id} className="shadow-md">
                                            <th>{index + 1}</th>
                                            <th>{bid.title}</th>
                                            <th>{bid.category}</th>
                                            <td>{bid.jobDeadline}</td>
                                            <td>${bid.minimumPrice} - ${bid.maximumPrice}</td>

                                            <td className="w-1/12"><Link to={`update/${bid._id}`} className="btn btn-primary bg-green-600 border-none btn-sm md:btn-md hover:bg-green-600" >Update</Link></td>

                                            <td className="w-1/12"><button onClick={() => handleDelete(bid._id)} className="btn btn-primary bg-red-600 border-none btn-sm md:btn-md hover:bg-red-600" >Delete</button></td>

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div>
                        <h2 className="text-center my-52 text-2xl md:text-5xl">You haven&rsquo;t post any job</h2>
                    </div>
            }
        </div>
    );
}
export default MyPostedJobs;