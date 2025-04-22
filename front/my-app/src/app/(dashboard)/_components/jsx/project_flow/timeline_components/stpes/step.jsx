
 
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


import { get_string_allow_process_by, get_string_step_or_sub_step_show_status_log_to_client_projectFlow, get_string_step_or_sub_step_start_process_strategy_projectFlow } from "@/app/(dashboard)/_components/utils/projectflow/utils";

import { StartOrEndStepOrSubStepProcess } from "../start_end_process_for_step_or_substep/start_end_process";
 

import { ResortStepUpOrDown } from "./resort_step/up_or_down_buttons";

import { ProgressCircle } from "../../progress";





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

                    <div className=" ">
 


                        <button 
                        className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-pill px-3 py-2 shadow-sm mb-4"
                        data-bs-toggle="collapse" 
                        data-bs-target="#step_extra_info"
                        aria-expanded="false"
                        aria-controls="step_extra_info"
                        >
                        <i className="bi bi-info-circle-fill"></i> <span>More Info</span>
                        </button>

                        <div id="step_extra_info" className="collapse "  >  

                            <div className="  ">
                                <Link className="  " href={`/staff/projectFlow/projectFlow/sub_step/${step?.project_flow}/${step?.id}/add_new_sub_step`}>Add Sub-Step</Link>
                            </div>


                             <ResortStepUpOrDown move_to="up" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />
 
                             <ResortStepUpOrDown move_to="down" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />  
 

                             <div className="mb-2">
                                <span className="fw-bold">Show To Client:</span> 
                                <span className="ms-2 text-muted">{step?.show_to_client ? 'Yes' : 'No'  }</span>
                            </div>


                            <div className="mb-2  ">
                                <span className="fw-bold  ">Start Process Strategy: </span> 
                                <span className="ms-2 text-muted ">{get_string_step_or_sub_step_start_process_strategy_projectFlow(step?.start_process_step_strategy)}</span>
                            </div>


                            <div className="mb-2">
                                <span className="fw-bold">Allowed Process By: </span>  
                                <span className="ms-2 text-muted">{get_string_allow_process_by(step?.allowed_process_by)}</span>
                            </div>

                            
                            {step?.allowed_process_by === "specific_staff_group"  &&
                            
                                <div className="mb-2">
                                    <span className="fw-bold">Allowed Process Groups:</span> 
                                    <span className="ms-2 text-muted">[{step?.allowed_process_groups.map(group => group.name).join(", ")}]</span>
                                </div>
                            
                            }




                            <div className  ="mb-2">
                                <span className="fw-bold">Show Status Logs To Client:</span> 
                                <span className="ms-2 text-muted">{ get_string_step_or_sub_step_show_status_log_to_client_projectFlow(step?.show_status_log_to_client) }</span>
                            </div>



                        </div>
                        
                        <hr />


                        <div className="row">

                            <div className="col-md-6"> 
                    
                                <div className="mb-2 ">
                                    <span className="fw-bold  ">Step ID:</span> 
                                    <span className="ms-2 text-secondary ">{step?.id && step?.id}.</span>
                                </div>

                                <div className="mb-2  ">
                                    <span className="fw-bold">Step Title:</span> 
                                    <span className="ms-2 text-secondary">{step?.step_name && step?.step_name}.</span>
                                </div>

                                <div className="mb-2  ">
                                    <span className="fw-bold">Step Details:</span> 
                                    <span className="ms-2 text-muted">{step?.step_description && step?.step_description}</span>
                                </div>
    



                                <div className="mb-2  ">
                                    <span className="fw-bold">Step status:</span> 
                                    <span className="ms-2 text-muted">{step?.project_flow_step_status && step?.project_flow_step_status}</span>
                                </div>

                                <div className="mb-2  ">
                                    <span className="fw-bold">can_requester_start_step:</span> 
                                    {/* <span className="ms-2 text-muted">{step?.can_requester_handle}</span> */}
                                    <span className="ms-2 text-muted">{step?.can_requester_start_step?.toString()}</span>

                                </div>


 

                                <StartOrEndStepOrSubStepProcess action="start_process" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />  

                                <StartOrEndStepOrSubStepProcess action="end_process" resort_for='step' projectflow_id={step?.project_flow} step_id={step?.id} reloadComponentMethod={reloadComponentMethod} />  

                                
                            </div>


                            <div className="col-md-6">
                                <ProgressCircle targetPercentage={step?.step_completed_percentage || 0} />
                            </div>



                        </div>

 
                    </div> 





                {/* Start & End Process Dates */}
                <div className="row">
                    <div className="col-md-6">
                        <span className="fw-bold">Start Process Date:</span> 
                        <span className="ms-2 text-primary">{ step?.start_date_process ? formatDate(step?.start_date_process) :" - " }</span>
                    </div>
                    <div className="col-md-6">
                        <span className="fw-bold">End Process Date:</span> 
                        <span className="ms-2 text-danger">{ step?.end_date_process ? formatDate(step?.end_date_process) :" - " }</span>
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