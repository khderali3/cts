'use client';

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";

import { ProjectFlowNotes } from "@/app/(dashboard)/_components/jsx/project_flow_template/project_comments/projectFlowComments";

import { parseISO, format } from "date-fns";
  
 
import { useSelector } from "react-redux";
 
import Link from "next/link";

 

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

 
import { useTranslations, useLocale } from "next-intl";

import { ar, enUS } from "date-fns/locale"; // Import necessary locales

import { Timeline } from "@/app/(dashboard)/_components/jsx/project_flow_template/timeline";

 


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
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/project_flow_template/${id}/get_full_flow/`
    fetchData(url)
}, [ reloadFlag ]);


    return (



        <div  className="container-fluid overflow-hidden w-100 p-0 m-0" > 
            <div className="app-content-header ">
    

    
            </div>
    
            <div className="app-content  bg-white    pt-4 ">
    
    
            
            <div className="   mt-2  ">
                <h6> <Link href='/staff/projectFlow/projectFlowTemplate/'>
                 {/* Tickets */}
                 Project Flow Template 
                </Link>   - Template Details </h6>
                <hr />
            </div>


        <div className="   ">


 

        <div className=" col-11  border-bottom border-2   my-2  ">
            <h3 className="text-break mx-2 " dir="auto">{data?.template_name} </h3>
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
                                    { data?.auto_start_first_step_after_clone   ? 'Yes' : 'No'  }
                                </div>
                            </div>
    

                        </div>






                    </div>
                    </div>
                </div>
            </div>


            <div className="col-lg-7  ">
                {/* start template body   */}
                    

                <Timeline data={data} reloadComponentMethod={reloadComponentMethod} />


                {/* end template body */}
            </div>




            <div className="col-lg-5  ">
                <div className="card   d-lg-block d-none">

                    <div className="card-body">


                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Template ID 
                            </div>
                            <div className="col-6">
                                #{ data?.id }
                            </div>
                        </div>



                        <div className="p-1 row col-12 ">
                            <div className="col-6  text-muted">
                                Template Name 
                            </div>
                            <div className="col-6">
                                { data?.template_name }
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
                            <Link className="btn btn-light " href={`/staff/projectFlow/projectFlowTemplate/step/${data?.id}/add_new_step`}>Add New Step</Link>
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