import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../providers/AuthProvider";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";




const AddJobs = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(new Date());



    useDocumentTitle("Talent Bazar | Post a Job");


    const handlJobSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const category = form.category.value;
        const title = form.title.value;
        const minimumPrice = form.minimumPrice.value;
        const maximumPrice = form.maximumPrice.value;
        const description = form.description.value;
        const day = deadline.getDate().toString().padStart(2, '0');
        const month = (deadline.getMonth() +1).toString().padStart(2, "0");
        const year = deadline.getFullYear();
        const jobDeadline = `${day}/${month}/${year}`;


        const jobsDetail = {
            email,
            title,
            category,
            minimumPrice,
            maximumPrice,
            jobDeadline,
            description
        }


        axios.post('/addJob', jobsDetail)
        .then(res => {
            console.log(res.data);
            if(res?.data){
                Swal.fire({
                    title: "Job post added",
                    icon: "success"
                })
                form.reset();
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
            <h2 className="text-center text-2xl font-bold md:text-5xl my-4 md:my-6">Post a Job</h2>

            <div className="card mx-auto md:my-12 flex-shrink-0 w-full max-w-5xl shadow-2xl">
                <form onSubmit={handlJobSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={user.email} name="email" placeholder="email" className="input input-bordered" readOnly required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job title</span>
                        </label>
                        <input type="text" name="title" placeholder="job title" className="input input-bordered" required />
                    </div>

                    <div className="flex md:flex-row flex-col w-full gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                            </label>
                            <DatePicker minDate={new Date()} dateFormat="dd/MM/yyyy" className="input input-bordered w-full" selected={deadline} onChange={(date) => setDeadline(date)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select name="category" id="" className="input input-bordered">
                                {
                                    options
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col w-full gap-4">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Minimum price</span>
                            </label>
                            <input type="number" name="minimumPrice" placeholder="minimum price" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Maximum price</span>
                            </label>
                            <input type="number" placeholder="maximum price" className="input input-bordered" name="maximumPrice" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name="description" rows="20" cols="20" placeholder="description..." className="input input-bordered h-48 p-4" required ></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary bg-black text-white border-none hover:bg-black">Add job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJobs;