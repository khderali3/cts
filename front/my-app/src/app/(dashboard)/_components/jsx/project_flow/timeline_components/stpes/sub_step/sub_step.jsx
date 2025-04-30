


 
import { parseISO, format } from "date-fns";

 import { ar, enUS } from "date-fns/locale"; // Import necessary locales


import { handleTimelineColler } from "@/app/public_utils/utils";
import { useLocale } from "next-intl";
import { ChangeStatusLogs } from "../../status_change_logs";


import { StepOrSubStepNotes } from "../notes/step_or_sub_step_notes";
import { get_string_allow_process_by, get_string_step_or_sub_step_show_status_log_to_client_projectFlow, get_string_step_or_sub_step_start_process_strategy_projectFlow } from "@/app/(dashboard)/_components/utils/projectflow/utils";

import { ResortStepUpOrDown } from "../resort_step/up_or_down_buttons";

import { StartOrEndStepOrSubStepProcess } from "../../start_end_process_for_step_or_substep/start_end_process";
import Link from "next/link";

import { toast } from "react-toastify";
 
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useState } from "react";
import { getErrorMessage } from "@/app/public_utils/utils";

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";




export const SubStepComponent = ({sub_step={}, projectflow_id, index=0, reloadComponentMethod}) =>{

    const locale = useLocale(); // Get the current locale
    const currentLocale = locale === "ar" ? ar : enUS;
    const formatDate = (dateString) => {
           if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [deleting, setDeleting] = useState(false)
    const [customFetch] = useCustomFetchMutation();
 
 

    const handleDelete = async () => {
      setDeleting(true)
       try {   
         const response = await customFetch({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/step/${sub_step?.step}/sub_step/${sub_step?.id}/`,
          method: "DELETE",
         });  
         if (response && response.data) {
            if(reloadComponentMethod){reloadComponentMethod()}
            toast.success('the object has been deleted')
         } else {
           toast.error(getErrorMessage(response?.error?.data))
   
         }
       } catch (error) {
         toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
       } finally{setDeleting(false)}
     };






    return(
        <div  className="sub-timeline-item d-flex w-100">
            <div className={`small-timeline-icon `}></div>
            <div className="border border-secondary rounded ms-4 flex-grow-1 p-3">


            <div 
                className={`step-number rounded-circle d-flex justify-content-center align-items-center ${handleTimelineColler(sub_step?.project_flow_sub_step_status)}`}
                style={{ 
                position: 'absolute', 
                top: '-5px', 
                left: '-10px', 
                width: '20px', 
                height: '20px', 
                // backgroundColor: '#007bff', 
                color: 'white', 
                fontWeight: 'bold' 
                }}
            >
               {index +1}
            </div>


                        <button 
                            className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2 shadow-sm mb-4"
                            data-bs-toggle="collapse" 
                            data-bs-target={`#step_extra_info_${sub_step?.id}`}
                            aria-expanded="false"
                            aria-controls={`step_extra_info_${sub_step?.id}`}
                            >
                            <i className="bi bi-info-circle-fill"></i> <span>More Info</span>
                        </button>

                        <div id={`step_extra_info_${sub_step?.id}`} className="collapse "  >  
   
                            <ResortStepUpOrDown move_to="up" resort_for='sub_step' step_id={sub_step?.step}  sub_step_id={sub_step?.id} reloadComponentMethod={reloadComponentMethod} />

                            <ResortStepUpOrDown move_to="down" resort_for='sub_step' step_id={sub_step?.step}  sub_step_id={sub_step?.id} reloadComponentMethod={reloadComponentMethod} />  
        
                            <div>
                                <Link href={`/staff/projectFlow/projectFlow/sub_step/${projectflow_id}/${sub_step?.step}/edit_sub_step/${sub_step?.id}`}>Edit</Link>
                            </div>
        

                            <div>
                                <button className="btn btn-sm btn-outline-danger my-2" onClick={() => setIsModalOpen(true)} >Delete</button>
                            </div>



                            <div className="mb-2">
                                <span className="fw-bold">Sub Step ID:</span> 
                                <span className="ms-2 text-secondary">{sub_step?.id && sub_step.id}</span>
                            </div>


                            <div className="mb-2">
                                <span className="fw-bold">Show To Client:</span> 
                                <span className="ms-2 text-muted">{sub_step?.show_to_client ? 'Yes' : 'No'  }</span>
                            </div>


                            <div className="mb-2">
                                <span className="fw-bold">Start Process Strategy:</span> 
                                <span className="ms-2 text-muted">
                                    {  get_string_step_or_sub_step_start_process_strategy_projectFlow(sub_step?.start_process_sub_step_strategy)  }
                                    
                                </span>
                            </div>

                            <div className="mb-2">
                                <span className="fw-bold">Allowed Process By:</span> 
                                <span className="ms-2 text-muted">{  get_string_allow_process_by(sub_step?.allowed_process_by)  }</span>
                            </div>


                            {sub_step?.allowed_process_by === "specific_staff_group"  &&
                                    
                                <div className="mb-2">
                                    <span className="fw-bold">Allowed Process Groups:</span> 
                                    <span className="ms-2 text-muted">[{sub_step.allowed_process_groups.map(group => group.name).join(", ")}]</span>
                                </div>
                                
                            }


                            <div className  ="mb-2">
                                <span className="fw-bold">Show Status Logs To Client:</span> 
                                <span className="ms-2 text-muted">{ get_string_step_or_sub_step_show_status_log_to_client_projectFlow(sub_step?.show_status_log_to_client) }</span>
                            </div>



                        </div>


                        <hr />





 
                        <div className="mb-2">
                            <span className="fw-bold">Sub Step Title:</span> 
                            <span className="ms-2 text-secondary">{sub_step?.sub_step_name && sub_step.sub_step_name}</span>
                        </div>

    
                        <div className="mb-2">
                            <span className="fw-bold">Sub Step Details:</span> 
                            <span className="ms-2 text-muted">{sub_step?.sub_step_description && sub_step.sub_step_description}</span>
                        </div>







 

                        <div className="mb-2">
                            <span className="fw-bold">Sub Step status:</span> 
                            <span className="ms-2 text-muted">{sub_step?.project_flow_sub_step_status && sub_step.project_flow_sub_step_status}</span>
                        </div>


                        <StartOrEndStepOrSubStepProcess disabled_status={sub_step?.can_requester_start_step} action="start_process" resort_for='sub_step' sub_step_id={sub_step?.id} step_id={sub_step?.step} reloadComponentMethod={reloadComponentMethod} />  

                        <StartOrEndStepOrSubStepProcess disabled_status={sub_step?.can_requester_end_step} action="end_process" resort_for='sub_step' sub_step_id={sub_step?.id} step_id={sub_step?.step} reloadComponentMethod={reloadComponentMethod} />  



                        {/* <StartOrEndStepOrSubStepProcess disabled_status={sub_step?.can_requester_start_step} action="start_process" resort_for='sub-step'   step_id={sub_step?.step?.id} reloadComponentMethod={reloadComponentMethod} />  
                               
 
                        <StartOrEndStepOrSubStepProcess disabled_status={sub_step?.can_requester_end_step} action="end_process" resort_for='sub-step'   step_id={sub_step?.step?.id} reloadComponentMethod={reloadComponentMethod} />  
 */}






                        {/* Start & End Process Dates */}
                        <div className="row">
                            <div className="col-md-6">
                                <span className="fw-bold">Start Process Date:</span> 
                                <span className="ms-2 text-primary">{ sub_step?.start_date_process ? formatDate(sub_step?.start_date_process) :" - " }</span>
                            </div>
                            <div className="col-md-6">
                                <span className="fw-bold">End Process Date:</span> 
                                <span className="ms-2 text-danger">{ sub_step?.end_date_process ? formatDate(sub_step?.end_date_process) :" - " }</span>
                            </div>
                        </div>







                    {sub_step?.status_logs && sub_step.status_logs.length > 0 &&
                        <div   className="mt-3">
                            <h6 className="fw-bold">Change Sub-Step Status Logs</h6>
                            <div className="list-group small border rounded p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>

                            {sub_step?.status_logs.map((log) =>  <ChangeStatusLogs key={`step_status_${log.id}`} log={log} />)}
                            </div>
                        </div> 
                    }


                    <StepOrSubStepNotes
                     notes={sub_step?.notes || []}
                     notes_for={"sub_step"} 
                     step_or_step_id={sub_step.id} 
                     can_add_note={true}
                    // can_add_note={sub_step?.can_add_note_by_requester || false}



                     />


            </div>




            <CustomModal  
                id="delete_projectflow_substep_id"
                handleSubmit={handleDelete}
        
                submitting={deleting}
                message={'are you sure you want to delete this sub-step?'}
                showModal={true} 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}

            /> 





        </div>







    )
}