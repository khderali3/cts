'use client';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useVerify from "../../hooks/use-verify";

const StaffSetup = () => {

    useVerify();
    return < ToastContainer/>
} 

export default StaffSetup