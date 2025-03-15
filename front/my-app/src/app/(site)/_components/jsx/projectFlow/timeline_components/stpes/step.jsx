




import { ProgressCircle } from "@/app/(site)/_components/jsx/projectFlow/progress";
import { useEffect } from "react";


import { parseISO, format } from "date-fns";

import { useLocale } from "next-intl"; // Get the current locale from next-intl
import { ar, enUS } from "date-fns/locale"; // Import necessary locales

import { SubStepComponent } from "./sub_step/sub_step";

import { handleTimelineColler } from "@/app/public_utils/utils";

import { ChangeStatusLogs } from "../status_change_logs";

// import { StepOrSubStepNotes } from "./notes/step_or_sub_step_notes";

import { StepOrSubStepSingleNote } from "./notes/step_or_sub_step_single_note";
import { StepOrSubStepNotes } from "./notes/step_or_sub_step_notes";



export const StepComponent = ({ step={}, index=0 }) =>{

    const locale = useLocale(); // Get the current locale
    const currentLocale = locale === "ar" ? ar : enUS;
    const formatDate = (dateString) => {
        if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
    };
 
    return(
 
    
        <div  className="timeline-item d-flex w-100   ">



        <div className={`timeline-icon`} ></div>
            <div className="border border-secondary rounded ms-4 flex-grow-1">


        <div 
                className={`step-number rounded-circle d-flex justify-content-center align-items-center  ${handleTimelineColler(step?.project_flow_step_status)}`}
                style={{ 
                position: 'absolute', 
                top: '-5px', 
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
                        <div className="col-md-6">


                            {/* Step id */}
                            <div className="mb-2">
                                <span className="fw-bold">Step ID:</span> 
                                <span className="ms-2 text-secondary">{step?.id && step?.id}.</span>
                            </div>





                            {/* Step Title */}
                            <div className="mb-2">
                                <span className="fw-bold">Step Title:</span> 
                                <span className="ms-2 text-secondary">{step?.step_name && step?.step_name}.</span>
                            </div>

                            {/* Step Details */}
                            <div className="mb-2">
                                <span className="fw-bold">Step Details:</span> 
                                <span className="ms-2 text-muted">{step?.step_description && step?.step_description}</span>
                            </div>

                            {/* Step status */}
                            <div className="mb-2">
                                <span className="fw-bold">Step status:</span> 
                                <span className="ms-2 text-muted">{step?.project_flow_step_status && step?.project_flow_step_status}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ProgressCircle targetPercentage={step?.step_completed_percentage || 0} />
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
                    // can_add_note={step?.allowed_process_by === "client"}
                    can_add_note={step?.can_add_note_by_requester || false}

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