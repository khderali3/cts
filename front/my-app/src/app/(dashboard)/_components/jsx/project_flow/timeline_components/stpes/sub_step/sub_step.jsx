


 
import { parseISO, format } from "date-fns";

 import { ar, enUS } from "date-fns/locale"; // Import necessary locales


import { handleTimelineColler } from "@/app/public_utils/utils";
import { useLocale } from "next-intl";
import { ChangeStatusLogs } from "../../status_change_logs";


import { StepOrSubStepNotes } from "../notes/step_or_sub_step_notes";
import { get_string_allow_process_by, get_string_show_status_log_to_client, get_string_start_process_strategy } from "@/app/(dashboard)/_components/utils/projectflow/utils";

import { ResortStepUpOrDown } from "../resort_step/up_or_down_buttons";




export const SubStepComponent = ({sub_step={}, index=0, reloadComponentMethod}) =>{

    const locale = useLocale(); // Get the current locale
    const currentLocale = locale === "ar" ? ar : enUS;
    const formatDate = (dateString) => {
           if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
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

                    <ResortStepUpOrDown move_to="up" resort_for='sub_step' step_id={sub_step?.step}  sub_step_id={sub_step?.id} reloadComponentMethod={reloadComponentMethod} />

                    <ResortStepUpOrDown move_to="down" resort_for='sub_step' step_id={sub_step?.step}  sub_step_id={sub_step?.id} reloadComponentMethod={reloadComponentMethod} />  
 
 

 
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step ID:</span> 
                        <span className="ms-2 text-secondary">{sub_step?.id && sub_step.id}</span>
                    </div>


 
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step Title:</span> 
                        <span className="ms-2 text-secondary">{sub_step?.sub_step_name && sub_step.sub_step_name}</span>
                    </div>

 
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step Details:</span> 
                        <span className="ms-2 text-muted">{sub_step?.sub_step_description && sub_step.sub_step_description}</span>
                    </div>

                    <div className="mb-2">
                        <span className="fw-bold">Show To Client:</span> 
                        <span className="ms-2 text-muted">{sub_step?.show_to_client ? 'Yes' : 'No'  }</span>
                    </div>


                    <div className="mb-2">
                        <span className="fw-bold">Start Process Strategy:</span> 
                        <span className="ms-2 text-muted">{  get_string_start_process_strategy(sub_step?.start_process_step_strategy)  }</span>
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
                            <span className="ms-2 text-muted">{ get_string_show_status_log_to_client(sub_step?.show_status_log_to_client) }</span>
                        </div>





                    <StepOrSubStepNotes
                     notes={sub_step?.notes || []}
                     notes_for={"sub_step"} 
                     step_or_step_id={sub_step.id} 
                     can_add_note={true}
                    // can_add_note={sub_step?.can_add_note_by_requester || false}



                     />


            </div>
        </div>







    )
}