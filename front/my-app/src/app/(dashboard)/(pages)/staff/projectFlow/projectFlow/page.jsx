'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
 
 import { formatDistanceToNow, parseISO } from "date-fns";

import { useRouter } from 'next/navigation';


// import { useCustomFetchMutation } from "../../_components/redux/features/siteApiSlice";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useRef } from "react";

 
 
import { useLocale } from "next-intl";
import { ar, enUS } from "date-fns/locale"; // Import necessary locales
import UsersSearchInputGlopal from "@/app/(dashboard)/_components/jsx/input_search_users/page";

import { getprojectStatusBadgeColors } from "@/app/public_utils/utils";
import { useSelector } from "react-redux";



const Page = () => {



  const { permissions, is_superuser, is_staff  } = useSelector(state => state.staff_auth);

  const hasPermissionToCreateNewProjectFlowBehalfClient = () => {
    if (is_superuser || (permissions?.includes('usersAuthApp.projectflow_create_behalf_client') && is_staff)) {
        return true
    }
      return false
  }




 
  const locales = { ar, en: enUS }; // Map of supported locales
  const locale = useLocale(); // Get the current locale

  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US"); // Arabic for "ar", fallback to English
    return formatter.format(number);
  };

   const formatDate = (dateString) => {
     const dateFnsLocale = locales[locale] || enUS; // Map to date-fns locale, fallback to English
      if (dateString) {
       return formatDistanceToNow(parseISO(dateString), {
         addSuffix: true,
         locale: dateFnsLocale,
       });
     }
   };



  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/`
  const [customFetch] = useCustomFetchMutation();

  const isFetching = useRef(false);
  const isInitialLoad = useRef(true);
  const [data, setData] = useState([]); // Store the ticket data
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(true); // Loading state

  const [searchProjectType_NameQuery, setSearchProjectType_NameQuery] = useState(''); // Search query state
  const [status, setStatus] = useState('all');  
  const [userId, setUserId] = useState('all');  
  const [projectId, setProjectId] = useState('');   

  const handleUserIdChange = (selectedValue) => {
    if(selectedValue){
      setUserId(selectedValue);
    } else{
      setUserId('all');
    }
    
    console.log(selectedValue); // This will now log the selected user ID
  };
 
  const router = useRouter();

 
  const [reloadFlag , setReloadFlag] = useState(false)

 
 

 
  const handleAddNewProjectFlow = () => {
    router.push('/staff/projectFlow/projectFlow/add_new_projectFlow');  
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
 
      if(response && response.data ){

        setNextPage(response.data.next_page_url);
        // setData(prevData => [...prevData, ...response.data.results]);
   
        const newData = response.data.results;
  
        // Merge existing data with new data and remove duplicates based on ticket.id
        setData(prevData => {
          const combinedData = [...prevData, ...newData];
          const uniqueData = combinedData.reduce((acc, current) => {
            // Check if the ticket.id is already in the accumulator
            const isDuplicate = acc.find(item => item.id === current.id);
            if (!isDuplicate) {
              acc.push(current);
            }
            return acc;
          }, []);
          
          return uniqueData;
  
  
        });

  
      } else {
        console.log(response)
      }
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };


 


  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Mark the initial load as complete
      return;
    }
      const performSearch = () => {
        const queryParams = new URLSearchParams({
          ProjectType_Name: searchProjectType_NameQuery,
          status: status,
          userId : userId,
          projectId : projectId

        });
  
        // Construct the full URL with query parameters
        const searchUrl = `${baseUrl}?${queryParams.toString()}`;
        setData([]); // Clear previous data for a new search
        setNextPage(null); // Reset pagination
        fetchData(searchUrl); // Fetch with new search criteria
      };
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 1000); // 3-second delay
  
      return () => clearTimeout(timeoutId);
  }, [searchProjectType_NameQuery, status, userId, projectId]);




useEffect(() => {
  console.log('reload  Component is changed to ', reloadFlag)
}, [reloadFlag]);



const handleScroll = () => {
  if (isFetching.current) return;

  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
    !loading && 
    nextPage !== null 

  ) {
    isFetching.current = true; 
    fetchData(nextPage).then(() => {
      isFetching.current = false; 
    });
}};
  






  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

    };
  }, [loading, nextPage]); // Dependencies: loading and nextPage
  



 
  useEffect(() => {
    if (isFetching.current) return;
    fetchData(baseUrl).then(() => {
      isFetching.current = false; // Allow new featch  after fetch completes
      
    });
  }, [ ]);



    const handleSearchChange = (e) => {
      setSearchProjectType_NameQuery(e.target.value);
    };
  
  


    return (

        <div> 
        <div className="app-content-header">



        </div>

        <div className="app-content  ">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >



{ /*  start  sections   */}

            <div className="  mt-1 mb-5 pb-5 ms-2  me-2 ">
            
              

                <div className="row align-items-center">
                  <div className="col-12 col-md-6 text-md-start">
                    <h1 className="mb-2">ProjectFlows</h1>
                  </div>

                {hasPermissionToCreateNewProjectFlowBehalfClient() && 
                
                  <div className="col-12 col-md-6   text-md-end">
                    <button
                      type="button"
                      onClick={handleAddNewProjectFlow}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Add New ProjectFlow
                    </button>
                  </div>
                
                }






                </div>





              <hr />
              <div className=" ">
                <div className="  mb-3">
                  <div
                    className="container-fluid"
                    
                  >
                    <form className="pb-2">
                      <div className="row ">
            


                        <div className="col-md-5 col-12 pt-2">
                          <label htmlFor="ProjectType_Name" className="form-label small"> 
                            Name
                        
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm  "
                            id="ProjectType_Name"
                            placeholder='Search by template name  '
                            aria-describedby="ProjectType_Name"
                            value={searchProjectType_NameQuery}
                            onChange={handleSearchChange}
                          />
                        </div>
            

                        <div className="col-md-5 col-12 pt-2">
                          <label htmlFor="status" className="form-label small">  
                            ProjectFlow Status
                          </label>

                          <select
                            className="form-select form-select-sm "
                            aria-label="Default select example"
                            value={status}
                            onChange={ (e) => setStatus(e.target.value)}
                            id="status"

                          >

            

                            <option value={'all'}> all </option>
                            <option value={'pending'}>pending</option>
                            <option value={'wait_customer_action'}>wait_customer_action</option>
                            <option value={'in_progress'}>in_progress</option>
                            <option value={'completed'}>completed</option>
                            <option value={'canceled'}>canceled</option>
                          </select>
                        </div>





                        <div className="col-md-5 col-12 pt-2  small">
            
                          <UsersSearchInputGlopal 
                                handleUserIdChange={handleUserIdChange}
                                userId={userId}
                                ph={'Select ProjectFlow User'}
                                lable={'Select ProjectFlow User'}
                            />


                        </div>



                        <div className="col-md-5 col-12 pt-2">
                          <label htmlFor="projectId" className="form-label small"> 
                            Project ID
                        
                          </label>


                          <div className="input-group input-group-sm small mb-2  ">
            
                            {/* <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Username" /> */}

                            <input
                            type="text"
                            className="form-control form-control-sm  "
                            id="projectId"
                            placeholder='Search by Project ID' 
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                          />



                          </div>



            
                        </div>


            


            



                      </div>

                      <h4 className="text-muted mt-2 fs-6">{searchProjectType_NameQuery && `Search for template name : ${searchProjectType_NameQuery}` }</h4>


                    </form>
                  </div>
                </div>
              </div>


              <table className="table table-sm small table-striped d-none d-md-table">
                <thead>
                  <tr>
                    <th scope="col">ProjectType Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Created</th> 
                    <th scope="col">Latest Activity</th>
                    <th scope="col">Status</th>
                    <th scope="col">User</th>

                  </tr>
                </thead>
                <tbody>

                  {data?.map((obj) => (
                    <tr key={`table_${obj.id}`}>


                      <td>
                        <Link href={`/staff/projectFlow/projectFlow/projectFlowDetails/${obj.id}`}  >
                          {obj?.project_type_name.length > 25 
                          ? `${obj?.project_type_name.slice(0, 25)}...` 
                          : obj?.project_type_name
                          }        
                        
                        </Link>


                      </td>
                      <td>{`#${obj?.id}`}</td>
                      <td>{formatDate(obj?.created_date)}</td>
                      <td>{formatDate(obj?.latest_activity)}</td>
                      <td>

                        <span className={` ${getprojectStatusBadgeColors(obj?.project_flow_status)}  `}>
                          {/* {ticket.ticket_status} */}
                          {obj?.project_flow_status && obj.project_flow_status}
                        </span>





                        {/* {obj?.project_flow_status} */}
                        
                        
                        </td>
                      <td>
                        {obj?.project_user?.full_name.length > 15 
                          ? `${obj?.project_user?.full_name.slice(0, 15)}...` 
                          : obj?.project_user?.full_name 
                        }
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Loading Indicator */}
              {loading && (
                <div className="text-center mt-4">
                  <p>
                    {locale === "ar" ? "جاري تحميل المحتوى..." : " Loading data..." }
                  
                  
                  </p>
                </div>
              )}



              {/* Card View for smaller screens */}

            
            
            
            


                <div className="d-block d-md-none">
                  {data?.map((obj) => (
                  <div className="card mb-3" key={`card_${obj?.id}`}>
                    <div className="card-body">

                      <p>
                        <strong>ProjectType Name : </strong> 
                          <Link href={`/staff/projectFlow/projectFlow/projectFlowDetails/${obj.id}`}  >
                            {obj?.project_type_name.length > 25 
                            ? `${obj?.project_type_name.slice(0, 25)}...` 
                            : obj?.project_type_name
                            }        
                          
                          </Link>
                      </p>




                      <p>
                        <strong>ID : </strong>  {`#${obj?.id}`}           
                      </p>
                      
                      <p>
                        <strong>Created : </strong> {formatDate(obj?.created_date)}
                      </p>
            
                      
                      <p>
                        <strong>Latest Activity : </strong> {formatDate(obj?.latest_activity)}
                      </p>
            
                      <p>
                        <strong>Status : </strong> 
                        
                        <span className={` ${getprojectStatusBadgeColors(obj?.project_flow_status)}  `}>
                          {/* {ticket.ticket_status} */}
                          {obj?.project_flow_status && obj.project_flow_status}
                        </span>



                        
                        {/* {obj?.project_flow_status} */}



                      </p>

                      <p>
                        <strong>User : </strong>
                          {obj?.project_user?.full_name.length > 15 
                            ? `${obj?.project_user?.full_name.slice(0, 15)}...` 
                            : obj?.project_user?.full_name 
                          }         
                      </p>


                    </div>
                  </div>
                ))}  
              </div>

              
            </div>
 
  

          </div>
          

        </div>
      </div>


    )


}

export default Page