


 
import { parseISO, format } from "date-fns";

 import { ar, enUS } from "date-fns/locale"; // Import necessary locales


import { handleTimelineColler } from "@/app/public_utils/utils";
import { useLocale } from "next-intl";
import { ChangeStatusLogs } from "../../status_change_logs";


import { StepOrSubStepNotes } from "../notes/step_or_sub_step_notes";


export const SubStepComponent = ({sub_step={}, index=0}) =>{

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



                    {/* Step Title */}
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step ID:</span> 
                        <span className="ms-2 text-secondary">{sub_step?.id && sub_step.id}</span>
                    </div>


                    {/* Step Title */}
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step Title:</span> 
                        <span className="ms-2 text-secondary">{sub_step?.sub_step_name && sub_step.sub_step_name}</span>
                    </div>

                    {/* Step Details */}
                    <div className="mb-2">
                        <span className="fw-bold">Sub Step Details:</span> 
                        <span className="ms-2 text-muted">{sub_step?.sub_step_description && sub_step.sub_step_description}</span>
                    </div>

                    <div className="mb-2">
                        <span className="fw-bold">Sub Step status:</span> 
                        <span className="ms-2 text-muted">{sub_step?.project_flow_sub_step_status && sub_step.project_flow_sub_step_status}</span>
                    </div>




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
                            <h6 className="fw-bold">Change Step Status Logs</h6>
                            <div className="list-group small border rounded p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>
                                { sub_step?.status_logs.map((log) =>  <ChangeStatusLogs key={`sub_status_${log.id}`} log={log} />)}
                            </div>

                        </div> 
                    }


                    <StepOrSubStepNotes
                     notes={sub_step?.notes || []}
                     notes_for={"sub_step"} 
                     step_or_step_id={sub_step.id} 
                    //  can_add_note={sub_step?.allowed_process_by === "client"}
                    can_add_note={sub_step?.can_add_note_by_requester || false}



                     />


            </div>
        </div>







    )
}