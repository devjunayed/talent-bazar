import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const UpdatePost = () => {
    const jobData = useLoaderData();
    const axios = useAxios();
    const navigate = useNavigate();
    console.log(jobData);


    var dateString = jobData?.jobDeadline;
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) -1;
    var year = parseInt(parts[2], 10);
    const [deadline, setDeadline] = useState(new Date(year, month, day));

    useDocumentTitle("Talent Bazar | Update Job");


    const handleUpdateJob = (event) => {
        event.preventDefault();
        const form = event.target;
        const category = form.category.value;
        const title = form.title.value;
        const minimumPrice = form.minimumPrice.value;
        const maximumPrice = form.maximumPrice.value;
        const description = form.description.value;
        const day = deadline.getDate().toString().padStart(2, '0');
        const month = (deadline.getMonth() + 1).toString().padStart(2, "0");
        const year = deadline.getFullYear();
        const jobDeadline = `${day}/${month}/${year}`;


        const jobsDetail = {
            title,
            category,
            minimumPrice,
            maximumPrice,
            jobDeadline,
            description
        }


        axios.patch(`/job/${jobData._id}`, jobsDetail)
            .then(res => {
                console.log(res.data);
                if (res?.data) {
                    Swal.fire({
                        title: "Job updated successfully",
                        icon: "success"
                    })
                    navigate('/posted-jobs');
                }
            })
            .catch(err => console.log(err));

    }


    const options = <>
          <option value="Web Development">Web Development</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Graphics Design">Graphics Design
        </option>
    </>

    return (
        <div>
            <h2 className="text-center text-2xl mt-4 font-bold md:text-5xl my-2 md:my-6">Update Job</h2>

            <div className="card mx-auto md:my-12 flex-shrink-0 w-full max-w-5xl shadow-2xl">
                <form onSubmit={handleUpdateJob} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={jobData.email} name="email" placeholder="email" className="input input-bordered" readOnly required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job title</span>
                        </label>
                        <input type="text" defaultValue={jobData.title} name="title" placeholder="job title" className="input input-bordered" required />
                    </div>

                    <div className="flex w-full flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                            </label>
                            <DatePicker minDate={new Date()} className="input input-bordered w-full"
                                dateFormat="dd/MM/yyyy"
                            selected={deadline} onChange={(date) => setDeadline(date)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select name="category" defaultValue={jobData.category} id="" className="input input-bordered">
                                {
                                    options
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-4">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Minimum price</span>
                            </label>
                            <input type="number" defaultValue={jobData.minimumPrice} name="minimumPrice" placeholder="minimum price" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Maximum price</span>
                            </label>
                            <input type="number" defaultValue={jobData.maximumPrice} placeholder="maximum price" className="input input-bordered" name="maximumPrice" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name="description" defaultValue={jobData.description} rows="20" cols="20" placeholder="description..." className="input input-bordered h-48 p-4" required ></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary bg-black text-white border-none hover:bg-black">Update Job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;