


import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { getErrorMessage } from "@/app/public_utils/utils";

import { useState } from "react";
import { toast } from "react-toastify";


export const StartOrEndStepOrSubStepProcess = ({resort_for='step', action='start_process', projectflow_id=null,   step_id=null, sub_step_id=null, reloadComponentMethod}) =>{

    const [customFetch] = useCustomFetchMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

     

    const submit_url = resort_for === "step" 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/${projectflow_id}/step/${action}/${step_id}/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/step/${step_id}/sub_step/${sub_step_id}/resort/resort_up_down/${action}/`  
 
        


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await customFetch({
                url: submit_url,
                method: 'POST',
            });
            if (response && response.data) {
                toast.info(getErrorMessage(response.data));
                if (reloadComponentMethod) {
                    reloadComponentMethod()
                } else {
                    console.log('reloadComponentMethod is:', reloadComponentMethod)
                }
            } else {
                toast.error("Failed to submit the request.");
                if (response?.error?.data) {
                    toast.error(getErrorMessage(response.error.data));
                }
            }

        } catch(error){
            console.error("Submission Error:", error);
            toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
        } finally{setIsSubmitting(false);}
    }

 
    return(
 
        <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="btn btn-primary btn-sm small m-2 "> {action === 'start_process' ? "Start Process" : "End Process" } </button>
 
    )
}