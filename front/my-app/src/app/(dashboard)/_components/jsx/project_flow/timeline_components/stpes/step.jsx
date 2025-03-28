
 
import Link from "next/link";

import { parseISO, format } from "date-fns";

import { useLocale } from "next-intl"; // Get the current locale from next-intl
import { ar, enUS } from "date-fns/locale"; // Import necessary locales

import { SubStepComponent } from "./sub_step/sub_step";

import { handleTimelineColler } from "@/app/public_utils/utils";

import { ChangeStatusLogs } from "../status_change_logs";

// import { StepOrSubStepNotes } from "./notes/step_or_sub_step_notes";

import { StepOrSubStepSingleNote } from "./notes/step_or_sub_step_single_note";
import { StepOrSubStepNotes } from "./notes/step_or_sub_step_notes";


import { get_string_allow_process_by, get_string_show_status_log_to_client, get_string_start_process_strategy } from "@/app/(dashboard)/_components/utils/projectflow/utils";



import { ResortStepUpOrDown } from "./resort_step/up_or_down_buttons";

export const StepComponent = ({ step={}, index=0, reloadComponentMethod }) =>{

    const locale = useLocale(); // Get the current locale
    const currentLocale = locale === "ar" ? ar : enUS;
    const formatDate = (dateString) => {
        if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
    };
 




    return(
 
    
        <div  className="timeline-item-dash d-flex w-100   ">



        <div className={`timeline-icon-dash`} ></div>
            <div className="border border-secondary rounded ms-4 flex-grow-1">
        <div 
                className={`step-number rounded-circle d-flex justify-content-center align-items-center bg-secondary`}
                style={{ 
                position: 'absolute' , 
                // top: '0px', 
                left: '-15px', 
                width: '30px', 
                height: '30px', 
                color: 'white',
 
                fontWeight: 'bold' 
                }}
            >
               {index +1}
        </div>





                <div className="p-3">

                    <div className="row">
                        <div className="col-md-12">

                            <div className="  ">
                                <Link className="  " href={`/staff/projectFlow/projectFlow/sub_step/${step?.project_flow}/${step?.id}/add_new_sub_step`}>Add Sub-Step</Link>
                            </div>





                             <ResortStepUpOrDown move_to="up" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />
 
                             <ResortStepUpOrDown move_to="down" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />  
 





                            <div className="mb-2">
                                <span className="fw-bold  ">Step ID:</span> 
                                <span className="ms-2 text-secondary ">{step?.id && step?.id}.</span>
                            </div>

                            <div className="mb-2">
                                <span className="fw-bold">Step Title:</span> 
                                <span className="ms-2 text-secondary">{step?.step_name && step?.step_name}.</span>
                            </div>

                            <div className="mb-2">
                                <span className="fw-bold">Step Details:</span> 
                                <span className="ms-2 text-muted">{step?.step_description && step?.step_description}</span>
                            </div>
 
                            <div className="mb-2">
                                <span className="fw-bold">Show To Client:</span> 
                                <span className="ms-2 text-muted">{step?.show_to_client ? 'Yes' : 'No'  }</span>
                            </div>


                            <div className="mb-2  ">
                                <span className="fw-bold  ">Start Process Strategy:</span> 
                                <span className="ms-2 text-muted  ">{  get_string_start_process_strategy(step?.start_process_step_strategy)  }</span>
                            </div>




                            <div className="mb-2">
                                <span className="fw-bold">Allowed Process By:</span> 
                                <span className="ms-2 text-muted">{  get_string_allow_process_by(step?.allowed_process_by)  }</span>
                            </div>

                            
                            {step?.allowed_process_by === "specific_staff_group"  &&
                            
                                <div className="mb-2">
                                    <span className="fw-bold">Allowed Process Groups:</span> 
                                    <span className="ms-2 text-muted">[{step?.allowed_process_groups.map(group => group.name).join(", ")}]</span>
                                    </div>
                            
                            }


 


                            <div className  ="mb-2">
                                <span className="fw-bold">Show Status Logs To Client:</span> 
                                <span className="ms-2 text-muted">{ get_string_show_status_log_to_client(step?.show_status_log_to_client) }</span>
                            </div>




                        </div>
 
                    </div> 






                    {step?.status_logs && step.status_logs.length > 0 &&
                        <div   className="mt-3">
                            <h6 className="fw-bold">Change Step Status Logs</h6>
                            <div className="list-group small border rounded p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>

                            {step?.status_logs.map((log) =>  <ChangeStatusLogs key={`step_status_${log.id}`} log={log} />)}
                            </div>
                        </div> 
                    }


                    

                    <StepOrSubStepNotes 
                    notes={step?.notes || []} 
                    notes_for={"step"} 
                    step_or_step_id={step.id}
                    can_add_note={true}
                    // can_add_note={step?.can_add_note_by_requester || false}

                    />



 


        
        

                    { step?.sub_steps &&
                        <> 
                        {/* Sub-steps timeline   */}
                        <div className="position-relative sub-timeline mt-5 ">

                            {step?.sub_steps?.map( (sub_step, index) =>  
                            
                
                            <SubStepComponent
                             key={`sub_step_${sub_step.id}`} 
                             sub_step={sub_step} 
                             index={index} 
                             reloadComponentMethod={reloadComponentMethod} 

                             
                             />
                            
                            
                            
                            )}
                    

                        </div>
                            
                        </>
                    }



                </div>


            </div>
        </div>

                
        
        
        
        
        
        
 





    )
}