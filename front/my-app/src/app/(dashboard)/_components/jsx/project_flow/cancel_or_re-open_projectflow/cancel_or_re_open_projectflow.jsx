
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/public_utils/utils";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";


export const CancelProjectFlowOrReOpen = ({projectflow_id=null , projectflow_status='' , reloadComponentMethod=null}) => {

    const submit_url = projectflow_status === "canceled" 
        ?  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/${projectflow_id}/reopen_project_flow/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/${projectflow_id}/cancele_project_flow/`  

 
    const [submiting, setSubmitting] = useState(false)
    const [customFetch] = useCustomFetchMutation();
 
    const handleSubmit = async () => {
        setSubmitting(true)
         try {   
           const response = await customFetch({
             url: submit_url,
             method: "POST",
           });  
           if (response && response.data) {
            if(reloadComponentMethod) {reloadComponentMethod()}
            toast.success('the projectFlow Status has been updated')
           } else {
             toast.error(getErrorMessage(response?.error?.data))
     
           }
         } catch (error) {
           toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
         } finally{setSubmitting(false)}
       };
    





    return (

        <button title={projectflow_status === 'canceled' ? 're-open the projectflow and change status to latest status befaure close it .' : 'tt' } onClick={handleSubmit} disabled={submiting} className="btn btn-sm btn-outline-primary mt-2"  > {projectflow_status === 'canceled' ? 'Re-Open ProjectFlow' : 'Cancel ProjectFlow'  }    </button>


    )
}