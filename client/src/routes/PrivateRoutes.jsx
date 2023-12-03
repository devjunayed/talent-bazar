import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);

    
    if(loading){
        return <div className=" flex justify-center my-12">
            <span className="loading"></span>
        </div>
    }
    if(user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};
PrivateRoutes.propTypes = {
    children: PropTypes.node
}
export default PrivateRoutes;