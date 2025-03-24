'use client';

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";

// import { ProjectFlowNotes } from "@/app/(dashboard)/_components/jsx/project_flow_template/project_comments/projectFlowComments";


import { ProjectFlowNotes } from "@/app/(dashboard)/_components/jsx/project_flow/project_comments/projectFlowComments";





import { parseISO, format } from "date-fns";
  
 
import { useSelector } from "react-redux";
 
import Link from "next/link";

 

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

 
import { useTranslations, useLocale } from "next-intl";

import { ar, enUS } from "date-fns/locale"; // Import necessary locales

// import { Timeline } from "@/app/(dashboard)/_components/jsx/project_flow_template/timeline";

import { Timeline } from "@/app/(dashboard)/_components/jsx/project_flow/timeline";
 


const Page = () => {


    const t_common = useTranslations('common')
    const t = useTranslations('dashboard.ticket')


    const locale = useLocale(); // Get the current locale



    const currentLocale = locale === "ar" ? ar : enUS;



    const { user_id, permissions, is_superuser, is_staff  } = useSelector(state => state.staff_auth);
    const [canReply, setCanReply] = useState(false)


    const {id} = useParams()  

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true); // Loading state


    const [customFetch] = useCustomFetchMutation();

    const router = useRouter()

    const [deletingReplyId, setDeletingReplyId] = useState(null)
    const [isDeletingitem, setIsDeletingitem] = useState(false)
    
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


 



    const [reloadFlag , setReloadFlag] = useState(false)

    const reloadComponentMethod = () => {
      setReloadFlag((prev) => !prev);  
    };
  
  
 



    const formatDate = (dateString) => {
   
        if (dateString) {
            return format(parseISO(dateString), 'dd MMM yyyy - h:mm a', { locale: currentLocale });
        }
    };
 

 
   
      const formatNumber = (number) => {
        const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US"); // Arabic for "ar", fallback to English
        return formatter.format(number);
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
     
          if(response && response.data) {
            setData(response.data)
            console.log('data', response.data)

          } else {
                console.log(response) 
                router.push('/404')
            }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
       };
    


useEffect(() => {    
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/${id}/get_full_flow/`
    fetchData(url)
}, [ reloadFlag ]);


    return (



        <div  className="container-fluid overflow-hidden w-100 p-0 m-0" > 
            <div className="app-content-header ">
    

    
            </div>
    
            <div className="app-content  bg-white    pt-4 ">
    
    
            
            <div className="   mt-2  ">
                <h6> <Link href='/staff/projectFlow/projectFlow'>
                 {/* Tickets */}
                 ProjectFlow  
                </Link>   - ProjectFlow Details </h6>
                <hr />
            </div>


        <div className="   ">


 

        <div className=" col-11  border-bottom border-2   my-2  ">
            <h3 className="text-break mx-2 " dir="auto">{data?.project_type_name} </h3>
        </div>

        <div className="row d-flex justify-content-between">


            <div className="col-lg-4 col-md-10 d-lg-none d-block    ">
                <div className="dropdown ">
                    <div className="container  ">

                <button
                    className="d-block d-lg-none border-0   border-bottom collapse btn  "
                    id="toggleButton"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    {/* Ticket Details  */}
                    <i className="bi bi-caret-down ms-2 me-2" />
                    {t('ticket_details_msgs.ticket_details_btn')} 
                    
                </button>



                    <hr className="d-block" />
                    <div
                        id="collapseExample"
                        className="card collapse  toggle-content mt-3 "
                    >

                        <div className="card-body">


                            <div className="p-1 row col-12 ">
                                <div className="col-6  text-muted">
                                    Template Name 
                                </div>
                                <div className="col-6">
                                    { data?.template_name ? 'Yes' : 'No'  }
                                </div>
                            </div>


                            <div className="p-1 row col-12 ">
                                <div className="col-6  text-muted">
                                    Steps Process Strategy 
                                </div>
                                <div className="col-6">
                                    { data?.default_start_process_step_or_sub_step_strategy  }
                                </div>
                            </div>
    
    
                            <div className="p-1 row col-12 ">
                                <div className="col-6  text-muted">
                                    Manual Start Mode 
                                </div>
                                <div className="col-6">
                                    { data?.manual_start_mode }
                                </div>
                            </div>


                            <div className="p-1 row col-12 ">
                                <div className="col-6  text-muted">
                                    Manual Start Mode 
                                </div>
                                <div className="col-6">
                                    { data?.auto_start_first_step_after_mount   ? 'Yes' : 'No'  }
                                </div>
                            </div>
    

                        </div>


                    </div>
                    </div>
                </div>


 

                
            </div>


            <div className="col-lg-7  ">


        <div className="ticket-prof   mt-3  ">


            <div className=" d-flex  align-items-center mb-5">

                <img

                src={data?.project_created_user?.PRF_image ? data.project_created_user.PRF_image : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAswMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QALBABAAICAAUDAgUFAAAAAAAAAAECAxEEEjFBUSEycZGhEyJSYbEUIzNCgf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAiZ13BIrzx5OevkFhEWiZ9JhIAAAAAAAAAAAAAAAAClrxHyre+/SOigLTaZ+PCoAAAJiZjogBpGTtZeJjswTW01BuIrMTHokAAAAAAAAAABlktv0jovedV/diAAACJmIjczqPIJGFuKpHtibfZEcVH6J+oOgUx5KXj8s7nvC4AAJrPLO20TtgvjtqdA1AAAAAAAABEzqJBled2VAAAETOomZ6Q4cuT8S2+3aHTxVtY4iO8uMABUTE6ncdXbhy/iV9fdHVwtuFtrLEdpRXYAAADes7hLPHPZoAAAAAAArf2yspk9sgyAAABz8X7K/LldvE158Xp2nbiUABBpg/y1+Wbbha82XfgHYAigAL4vdLVjj9zYAAAAAABW3SVgHOExqdAAADjz4ZrO6xM1/h2Im0R1mI+ZB5w7bUw268v/JRGLDHj6g5aUm86rDux0jHXlj6kTSI1E1j4lYAAAAF8XWWqmONVXAAAAAAAABnkjuzbzG40xtHLOgQplyRjruevaPK8zqJmekPPyXnJabSC2TNfJ1nUeIZgqGjQAajwmtppO6zqUAOvDxHPPLedW7T5bvNdvD358fr1j0RWqaxM2iOyGuOuo35BcAAAAAAAAABW1eaFgHHxO64rbcL18uOuWvLbo87Nw98XrPrXzCjEOwIAAAAN+En+5MeYZY6WyW1SJl38NwsYvzWndv4BpSneerUEUAAAAAAAAAAAAABhl4XFkneuW3mGF+Bt/peJ+YdwDzP6TN4ifiSOEzfp+70wHnV4LJPWax92+Pgsce+Zs6gEVrFY1WIiP2SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z"}

                width="40" height="40" 
                className="  rounded-circle me-2"
                />


                <div className="d-flex flex-column justify-content-center ">
                    <h6 className="m-0 fs-6 text-muted">{data?.project_created_user?.full_name}

                    {data?.project_created_user?.is_staff &&  <span className="badge bg-light text-dark ms-2"> {t_common('staff')} </span> }

                    </h6>
                    <p className="m-0 text-muted"> {formatDate( data?.created_date)  }</p> 
                </div>


            </div>


            <div className="ticket-details-text" dir="auto" >
             {data?.details}

                <div className=" pt-3 mt-3 ">
                    {data?.files?.map(file => {

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






                {/* start template body   */}
                    

                <Timeline data={data} />


                {/* end template body */}
            </div>




            <div className="col-lg-5  ">
                <div className="card   d-lg-block d-none">

                    <div className="card-body">


                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                ProjectFlow ID 
                            </div>
                            <div className="col-6">
                                #{ data?.id }
                            </div>
                        </div>



                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Project Type  
                            </div>
                            <div className="col-6">
                                { data?.project_type_name }
                            </div>
                        </div>

                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                is template cloned 
                            </div>
                            <div className="col-6">
                                { data?.is_template_cloned   ? 'Yes' : 'No'  }
                            </div>
                        </div>

                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                 template cloned name 
                            </div>
                            <div className="col-6">
                                { data?.template_name_cloned_from ?  data?.template_name_cloned_from : '-'  }
                            </div>
                        </div>




                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Steps Process Strategy 
                            </div>
                            <div className="col-6">
                                { data?.default_start_process_step_or_sub_step_strategy  }
                            </div>
                        </div>
 
                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Manual Start Mode 
                            </div>
                            <div className="col-6">
                                { data?.manual_start_mode }
                            </div>
                        </div>



                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Auto Start First Step 
                            </div>
                            <div className="col-6">
                                { data?.auto_start_first_step_after_clone   ? 'Yes' : 'No'  }
                            </div>
                        </div>

 
                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Show Steps To Client 
                            </div>
                            <div className="col-6">
                                { data?.show_steps_to_client   ? 'Yes' : 'No'  }
                            </div>
                        </div>


                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Show Step Status Logs To Client 
                            </div>
                            <div className="col-6">
                                { data?.show_steps_or_sub_steps_status_log_to_client   ? 'Yes' : 'No'  }
                            </div>
                        </div>


                        <div className="p-1 row col-12 ">
                            <Link className="btn btn-light " href={`/staff/projectFlow/projectFlow/step/${data?.id}/add_new_step`}>Add New Step</Link>
                        </div>


                        

                    </div>



                </div>

                <hr />
                <ProjectFlowNotes notes={data?.notes || []} project_id={data?.id} />

            </div>


 


        </div>
        </div>
     
    






    
            </div>

          </div>


 
    )
}


export default Page