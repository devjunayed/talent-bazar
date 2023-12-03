import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const JobDetail = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isEligible, setIsEligible] = useState(false);
    const [isExpired, setIsExpired] = useState(true);
    const axios = useAxios();
    const id = useLoaderData();

    useDocumentTitle("Talent Bazar | Job Detail")

    useEffect(() => {
        axios.get(`/browseJob/${id}`)
            .then(res => {
                setData(res.data);
                var parts = res.data.jobDeadline.split("/");
                var day = parseInt(parts[0]);
                var month = parseInt(parts[1]);
                var year = parseInt(parts[2]);
                var currentDate = new Date();

                if (user.email === res.data.email) {
                    setIsEligible(false);
                    setIsExpired(false);
                } else if (currentDate <= new Date(year, month - 1, day, 23, 59, 0)) {
                    setIsExpired(false);
                    setIsEligible(true);
                }
            })
            .catch(err => console.log(err));
    }, [axios, id, user.email]);


    const handlePlaceBid = (event) => {
        event.preventDefault();
        const form = event.target;
        const recruiterEmail = form.recruiterEmail.value;
        const jobSeekerEmail = form.jobSeekerEmail.value;
        const bidAmount = form.bidAmount.value;
        const coverLetter = form.coverLetter.value;

        const jobData = {
            jobId: data._id,
            title: data.title,
            category: data.category,
            description: data.description,
            jobDeadline: data.jobDeadline,
            minimumPrice: data.minimumPrice,
            maximumPrice: data.maximumPrice,
            status: "pending",
            recruiterEmail,
            jobSeekerEmail,
            bidAmount,
            coverLetter,
        };

        if (bidAmount > data.maximumPrice) {
            toast.error("Out of budget", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        } else {
            axios.post("/apply", jobData)
                .then(res => {
                    if (res.data.acknowledged) {
                        Swal.fire({
                            title: "Applied Successfully",
                            icon: "success",
                            timer: 1500
                        });
                        navigate("/my-bid");
                    }
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }



    }


    return (
        <div>
            <div className="card w-full md:w-2/3 mx-auto my-4  shadow-xl">
                <div className="card-body">
                    <h2 className="text-xl md:text-3xl font-bold text-left">{data.title}</h2>
                    <div className="flex flex-col md:flex-row">
                        <p className="text-zinc-400">Recruiter Email: {data.email}</p>
                        <p className="text-zinc-400 text-left md:text-right">Category: {data.category}</p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <p className="text-zinc-400">Price Range: ${data.minimumPrice} - ${data.maximumPrice}</p>
                        <p className="text-zinc-400 text-left md:text-right">Deadline: {data.jobDeadline}</p>
                    </div>
                    <span className="divider -my-2"></span>
                    <p>{data.description}</p>
                    <span className="divider"></span>
                    <div className="card flex-shrink-0 w-full  md:shadow-2xl bg-base-100">
                        <h2 className="text-center mt-4 text-xl font-bold md:text-3xl">Place your bid</h2>
                        <form className="md:card-body" onSubmit={handlePlaceBid}>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Recruiter Email</span>
                                    </label>
                                    <input type="email" name="recruiterEmail" readOnly defaultValue={data.email} placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">My Email</span>
                                    </label>
                                    <input type="email" name="jobSeekerEmail" readOnly defaultValue={user.email} placeholder="email" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Bid amount</span>
                                    </label>
                                    <input type="number" name="bidAmount" defaultValue={data.maximumPrice} placeholder="amount" className="input input-bordered" required />
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Deadline</span>
                                    </label>
                                    <input type="text" readOnly defaultValue={data.jobDeadline} placeholder="email" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Cover Letter</span>
                                </label>
                                <textarea type="text" name="coverLetter" placeholder="Write cover letter here..." className="resize-none h-48 pt-2 input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={!isEligible} className={`btn btn-primary bg-black border-none hover:bg-zinc-700 ${isExpired && "bg-red-600"}`} >{isExpired ? "Date Expire" : "Bid on the project"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;