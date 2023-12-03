import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
const axiosSecure = axios.create({
    baseURL: "https://talent-bazar.vercel.app",
    withCredentials: true
})

const useAxios = () => {
    const { userLogOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, err => {
            console.log('error in interceptor', err.response);
            if (err.response.status === 401 || err.response.status === 403) {
                userLogOut()
                    .then(() => {
                        navigate("/login");
                    })
                    .catch(err => console.log(err));
            }
        })
    }, [userLogOut, navigate]);


    return axiosSecure;
};

export default useAxios;