'use client';

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { parseISO, format } from "date-fns";
import getTicketStatusColor from "@/app/(site)/_components/jsx/tickets/ticket_status_colors";
import AddNewReplayForm from "@/app/(site)/_components/jsx/tickets/ticketReply/addReplay";
import Link from "next/link";

import CloseTicketButton from "@/app/(site)/_components/jsx/tickets/close_ticket/closeTicket";
import ReOpenTicketButton from "@/app/(site)/_components/jsx/tickets/reopen_ticket/reOpenTicket";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl"; // Get the current locale from next-intl
import { ar, enUS } from "date-fns/locale"; // Import necessary locales

import { ProgressCircleDetailsInfo, ProgressCircle } from "@/app/(site)/_components/jsx/projectFlow/progress";
import { ProjectFlowNotes } from "@/app/(site)/_components/jsx/projectFlow/project_comments/projectFlowComments";

import { Timeline } from "@/app/(site)/_components/jsx/projectFlow/timeline";


const Page = () => {

   

    const t = useTranslations('site.ticket')
    const t_common = useTranslations('common')

    const locale = useLocale(); // Get the current locale



    const currentLocale = locale === "ar" ? ar : enUS;



    const formatDate = (dateString) => {
   
        if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
    };
 

 
   
      const formatNumber = (number) => {
        const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US"); // Arabic for "ar", fallback to English
        return formatter.format(number);
      };




    const {project_flow_slug} = useParams()
    

    const [projectDetails, setProjectDetails] = useState({})

    const [loading, setLoading] = useState(true); // Loading state
    const [customFetch] = useCustomFetchMutation();
 
    const [reloadFlag , setReloadFlag] = useState(false)

    const reloadComponentMethod = () => {
      setReloadFlag((prev) => !prev); // Toggle state to trigger a reload
    };

 

    const fetchData = async (pageUrl) => {
        setLoading(true);
        try {
          const response = await customFetch({
            url: pageUrl,
            method: 'GET', // Only use 'GET' for fetching data
            headers: {
              'Content-Type': 'application/json',
            }, 
          });
     
          setProjectDetails(response.data)
 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        finally{
            setLoading(false);
         }

      };
    


 


useEffect(() => {    
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/project_flow/${project_flow_slug}/`
    fetchData(url)
}, [  reloadFlag ]);



    if(!projectDetails){
        return
    }




 
    return (

        
 
<div> 
        <div className=" px-md-5 px-2 mt-2">
            <h6> 
                <Link href='/projectflow'> 
                    ProjectFlow 
                    
                </Link>
                   - ProjectFlow Details
            </h6>
            <hr />
        </div>

 

    <div className="container-fluid   "  >

    <div className=" col-11  border-bottom border-2   my-2   "    >
        <h3 className="text-break  " dir="auto" >{projectDetails?.project_type_name} </h3>
    </div>


    <div className="row d-flex justify-content-between">


        <div className="col-lg-4 col-md-10 d-lg-none d-block   ">
        <div className="dropdown ">
            <div className="container mt-2">

            <button
                className="d-block d-lg-none border-0   border-bottom collapse btn  "
                dir="auto"
                id="toggleButton"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
            >
                 {/* Ticket Details  */}
                 <i className="fa-solid fa-caret-down fs-3 ms-2 me-2" />

  
                ProjectFlow Details
            </button>








            <hr className="d-block" />

            {/* // ticket details on small screen  */}

            <div
                id="collapseExample"
                className="card collapse  toggle-content mt-3  "
            >
 
                <div className="card-body   "     >

                    <div className="p-1 row col-12 ">
                        <div className="col-6  text-muted">
        
                            Project Requester:
                        </div>
                        <div className="col-6">
                            {projectDetails?.project_created_user?.full_name}
                        </div>
                    </div>

                    <div className="p-1 row col-12">
                        <div className="col-6  text-muted">
                            Created: 
                        </div>
                        <div className="col-6">
                            {formatDate( projectDetails?.created_date)}
                        </div> 
                    </div>
                    <div className="p-1 row col-12 ">
                        <div className="col-6  text-muted">
                            Latest activity: 
                        </div>
                        <div className="col-6">
                            {formatDate( projectDetails?.latest_activity)}
                        </div>
                    </div>
                    <hr />

        

                    <div className="p-1 row col-12">

                        <div className="col-6  text-muted">
                            {t_common('ticket_card.id')}
                        </div>
                        <div className="col-6">
                            #{ formatNumber(projectDetails?.id) }
                        </div>
                    </div>

                    <div className="p-1 row col-12">
                        <div className="col-6  text-muted">
                            {t_common('ticket_card.status')}
                        </div>
                        <div className="col-6">

                            <p className={`p-0 m-0    p-1  `}  >
                                { projectDetails?.project_flow_status  }
                            </p>
                            
                        </div>

                    </div>
                    <hr />
                    <div className="p-1 row col-12 d-flex justify-content-start   align-items-center ">
                        <div className="col-6  text-muted">
                            Progress
                        </div>
                        <div className="col-6">

                            <ProgressCircleDetailsInfo  targetPercentage={projectDetails?.steps_completion_percentage || 0} animation_speed={100}/>
        
                        </div>

                    </div>
 
                
                </div> 

            </div>

 

            </div>

            
        </div>
        </div>


        <div className="col-md-7 mb-5   ">

   
        <div className="ticket-prof   mt-3  ">


            <div className=" d-flex  align-items-center mb-5">

                <img

                src={projectDetails?.project_created_user?.PRF_image ? projectDetails.project_created_user.PRF_image : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAswMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QALBABAAICAAUDAgUFAAAAAAAAAAECAxEEEjFBUSEycZGhEyJSYbEUIzNCgf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAiZ13BIrzx5OevkFhEWiZ9JhIAAAAAAAAAAAAAAAAClrxHyre+/SOigLTaZ+PCoAAAJiZjogBpGTtZeJjswTW01BuIrMTHokAAAAAAAAAABlktv0jovedV/diAAACJmIjczqPIJGFuKpHtibfZEcVH6J+oOgUx5KXj8s7nvC4AAJrPLO20TtgvjtqdA1AAAAAAAABEzqJBled2VAAAETOomZ6Q4cuT8S2+3aHTxVtY4iO8uMABUTE6ncdXbhy/iV9fdHVwtuFtrLEdpRXYAAADes7hLPHPZoAAAAAAArf2yspk9sgyAAABz8X7K/LldvE158Xp2nbiUABBpg/y1+Wbbha82XfgHYAigAL4vdLVjj9zYAAAAAABW3SVgHOExqdAAADjz4ZrO6xM1/h2Im0R1mI+ZB5w7bUw268v/JRGLDHj6g5aUm86rDux0jHXlj6kTSI1E1j4lYAAAAF8XWWqmONVXAAAAAAAABnkjuzbzG40xtHLOgQplyRjruevaPK8zqJmekPPyXnJabSC2TNfJ1nUeIZgqGjQAajwmtppO6zqUAOvDxHPPLedW7T5bvNdvD358fr1j0RWqaxM2iOyGuOuo35BcAAAAAAAAABW1eaFgHHxO64rbcL18uOuWvLbo87Nw98XrPrXzCjEOwIAAAAN+En+5MeYZY6WyW1SJl38NwsYvzWndv4BpSneerUEUAAAAAAAAAAAAABhl4XFkneuW3mGF+Bt/peJ+YdwDzP6TN4ifiSOEzfp+70wHnV4LJPWax92+Pgsce+Zs6gEVrFY1WIiP2SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z"}

                width="40" height="40" 
                className="  rounded-circle me-2"
                />


                <div className="d-flex flex-column justify-content-center ">
                    <h6 className="m-0 fs-6 text-muted">{projectDetails?.project_created_user?.full_name}

                    {projectDetails?.project_created_user?.is_staff &&  <span className="badge bg-light text-dark ms-2"> {t_common('staff')} </span> }

                    </h6>
                    <p className="m-0 text-muted"> {formatDate( projectDetails?.created_date)  }</p> 
                </div>


            </div>





            <div className="ticket-details-text" dir="auto" >
             {projectDetails?.details}

                <div className=" pt-3 mt-3 ">
                    {projectDetails?.files?.map(file => {

                        return(
                            <div key={file.id} className=" m-0 p-0 ">
                                <Link href={file.file} className="  m-0 p-0" target="_blank">
                                    <i className="fa fa-file me-2"></i> {file.file_name}
                                </Link>
                            </div>
                            
                        )
                    })}
                </div>

            </div>
            <hr   />
        </div>







<Timeline data={projectDetails} />
 

            <hr />

 





        </div>




        <div className="col-md-5   px-md-2 ">
    
            <div className="card d-md-block d-none">
    









                <div className="card-body  "     >

                    <div className="p-1 row col-12 ">
                        <div className="col-6  text-muted">
        
                            Project Requester:
                        </div>
                        <div className="col-6">
                            {projectDetails?.project_created_user?.full_name}
                        </div>
                    </div>

                    <div className="p-1 row col-12">
                        <div className="col-6  text-muted">
                            Created: 
                        </div>
                        <div className="col-6">
                            {formatDate( projectDetails?.created_date)}
                        </div> 
                    </div>
                    <div className="p-1 row col-12 ">
                        <div className="col-6  text-muted">
                            Latest activity: 
                        </div>
                        <div className="col-6">
                            {formatDate( projectDetails?.latest_activity)}
                        </div>
                    </div>
                    <hr />

        

                    <div className="p-1 row col-12">

                        <div className="col-6  text-muted">
                            {t_common('ticket_card.id')}
                        </div>
                        <div className="col-6">
                            #{ formatNumber(projectDetails?.id) }
                        </div>
                    </div>

                    <div className="p-1 row col-12">
                        <div className="col-6  text-muted">
                            {t_common('ticket_card.status')}
                        </div>
                        <div className="col-6">

                            <p className={`p-0 m-0    p-1  `}  >
                                { projectDetails?.project_flow_status  }
                            </p>
                            
                        </div>

                    </div>
                    <hr />
                    <div className="p-1 row col-12 d-flex justify-content-start   align-items-center ">
                        <div className="col-6  text-muted">
                            Progress
                        </div>
                        <div className="col-6">

                            <ProgressCircleDetailsInfo  targetPercentage={projectDetails?.steps_completion_percentage || 0} animation_speed={100}/>
        
                        </div>

                    </div>
    
    

                </div> 









    {/* end new */}

    
            </div>
 



            <hr />

            {/* {projectDetails?.notes?.map(  note => {
                return( 
                    <div key={note.id} >
                    
                    <div  className="  ">

                    <div className="  d-flex  align-items-center mb-5">
                        <img
                        src={note?.created_user?.PRF_image ? note.created_user.PRF_image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAswMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QALBABAAICAAUDAgUFAAAAAAAAAAECAxEEEjFBUSEycZGhEyJSYbEUIzNCgf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAiZ13BIrzx5OevkFhEWiZ9JhIAAAAAAAAAAAAAAAAClrxHyre+/SOigLTaZ+PCoAAAJiZjogBpGTtZeJjswTW01BuIrMTHokAAAAAAAAAABlktv0jovedV/diAAACJmIjczqPIJGFuKpHtibfZEcVH6J+oOgUx5KXj8s7nvC4AAJrPLO20TtgvjtqdA1AAAAAAAABEzqJBled2VAAAETOomZ6Q4cuT8S2+3aHTxVtY4iO8uMABUTE6ncdXbhy/iV9fdHVwtuFtrLEdpRXYAAADes7hLPHPZoAAAAAAArf2yspk9sgyAAABz8X7K/LldvE158Xp2nbiUABBpg/y1+Wbbha82XfgHYAigAL4vdLVjj9zYAAAAAABW3SVgHOExqdAAADjz4ZrO6xM1/h2Im0R1mI+ZB5w7bUw268v/JRGLDHj6g5aUm86rDux0jHXlj6kTSI1E1j4lYAAAAF8XWWqmONVXAAAAAAAABnkjuzbzG40xtHLOgQplyRjruevaPK8zqJmekPPyXnJabSC2TNfJ1nUeIZgqGjQAajwmtppO6zqUAOvDxHPPLedW7T5bvNdvD358fr1j0RWqaxM2iOyGuOuo35BcAAAAAAAAABW1eaFgHHxO64rbcL18uOuWvLbo87Nw98XrPrXzCjEOwIAAAAN+En+5MeYZY6WyW1SJl38NwsYvzWndv4BpSneerUEUAAAAAAAAAAAAABhl4XFkneuW3mGF+Bt/peJ+YdwDzP6TN4ifiSOEzfp+70wHnV4LJPWax92+Pgsce+Zs6gEVrFY1WIiP2SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z"}

                        width="40" height="40" 
                        className="  rounded-circle me-2"

                        />
                        <div className="d-flex flex-column justify-content-center">

                            {note.note_type === "cloned_from_template" ? "Generated By System" : 
                            
                                <h4 className="m-0 fs-6 text-muted">{note?.created_user?.full_name}  
                                    {note?.created_user?.is_staff &&  <span className="badge bg-light text-dark ms-2">{t_common('staff')}</span> }
                                    
                                
                                </h4>
                            }
                        

                            <p className="m-0 text-muted">{formatDate(note?.created_date)}</p>
                        </div>

                    </div>


                    <div dir="auto" className="ticket-details-text" style={{ whiteSpace: 'pre-line' }}>

                        {note?.note}





                        <div className=" pt-3 mt-3 ">
                            {note?.files?.map(file => {

                            return(
                                <div key={file.id} className=" m-0 p-0 ">
                                    <Link href={file.file} className="  m-0 p-0" target="_blank">
                                    <i className="fa fa-file me-2"></i> {file.file_name}
                                    </Link>
                                </div>

                            )
                            })}
                        </div>




                    
                    </div>
                    <hr />
                    </div>
                    </div>


                )
            })} */}

        <ProjectFlowNotes notes={projectDetails?.notes || []} project_id={projectDetails?.id} />






        </div>

 




 
    </div>
    </div>
    {/* End Ticket Details */}
</div>
 


 

 
    )


 


}


export default Page