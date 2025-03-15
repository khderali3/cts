'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import getTicketStatusColor from "../../_components/jsx/tickets/ticket_status_colors";
import { useRouter } from 'next/navigation';


import { useCustomFetchMutation } from "../../_components/redux/features/siteApiSlice";
import { useRef } from "react";


import { useTranslations } from "next-intl";

import { ar, enUS } from "date-fns/locale"; // Import necessary locales
import { useLocale } from "next-intl"; // Get the current locale from next-intl



const Page = () => {

  const t = useTranslations('site.ticket')
  const t_common = useTranslations('common')


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





  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/project_flow/`
  const [customFetch] = useCustomFetchMutation();

  const isFetching = useRef(false);
  const isInitialLoad = useRef(true);
  const [data, setData] = useState([]); // Store the ticket data
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [status, setStatus] = useState('all'); // Ticket status state

  const router = useRouter();

  const handleAddRequest = () => {
    router.push('/projectflow/new_projectflow');  
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

    // Skip the effect on the initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Mark the initial load as complete
      return;
    }
  
  
      // Function to perform search after delay
      const performSearch = () => {
        const queryParams = new URLSearchParams({
          search: searchQuery,
          status,
        });
  
        // Construct the full URL with query parameters
        const searchUrl = `${baseUrl}?${queryParams.toString()}`;
        setData([]); // Clear previous data for a new search
        setNextPage(null); // Reset pagination
        fetchData(searchUrl); // Fetch with new search criteria
      };
  
      // Set a timeout to delay the search request
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 1000); // 3-second delay
  
      // Clear timeout if user updates input or status within 3 seconds
      return () => clearTimeout(timeoutId);
    }, [searchQuery, status]);




  const handleScroll = () => {
    if (isFetching.current) return;

    // Check if scrolling has reached the bottom and there is more data to fetch
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
      !loading && 
      nextPage !== null 
  
    ) {
      isFetching.current = true; // Prevents further scroll triggers
      fetchData(nextPage).then(() => {
        isFetching.current = false; // Allow new scroll triggers after fetch completes
      });
  }};
  

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
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
      setSearchQuery(e.target.value);
    };
  
 
    const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };




  return (

    
    <>






      <div className="container mt-1 mb-5 pb-5 ">

      <div className="container mt-2">
        <h6> <Link href='/projectflow'> 
 
            Projects Flow
         </Link>  </h6>
        <hr />
      </div>


    <div className="row">
      <div className="col-12 col-md-6  ">
        <h1 className="mb-2">
          {/* My Requests */}
          My Project Flows
        </h1>
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-md-end">
        <button type="button" onClick={handleAddRequest} className="btn btn-outline-secondary">
          {/* Add a new Request */}
          
          Add a new ProjectFlow

        </button>
      </div>
    </div>


        <hr />
        <div className="d-flex">
          <div className="container mb-3">
            <div
              className="container-fluid"
              style={{ maxWidth: "100%", overflow: "hidden" }}
            >
              <form className="pb-2">
                <div className="row ">
                  <div className="col-md-5 col-12 pt-2">
                    <label htmlFor="search_words"> 
                      {/* Search in Subject / Ticket Body  */}
                      {/* {t('my_tickets.search_aria.label_search_words')} */}
                        Search Per Project Name

                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="search_words"
                      // placeholder="search here"
                      placeholder= {t('my_tickets.search_aria.placeholder_search_words')}


                      aria-describedby="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col-md-4 col-12 pt-2">
                  <label htmlFor="search_words"> 


                    {/* Search Per Ticket Status  */}
 
                    Search Per ProjectFlow Status

                  </label>

                    <select
                      className="form-select rounded-pill"
                      aria-label="Default select example"
                      value={status}
                      onChange={handleStatusChange}
 
                    >
                      <option value={'all'}>
                         all status 
 

                      </option>
                      <option value={'pending'}>
                        pending  
 

                      </option>
                      <option value={'wait_customer_action'}>
                        wait_customer_action
 

                      </option>
                      <option value={'in_progress'}>
                        in_progress
 

                      </option>
                      <option value={'completed'}>
                        completed
 

                      </option>
                      <option value={'canceled'}>
                        canceled
 

                      </option>
                    </select>
                  </div>
                </div>

                {/* <h4 className="text-muted mt-2">{searchQuery && `results for : ${searchQuery}` }</h4> */}
                <h4 className="text-muted mt-2">{searchQuery && `${ t('my_tickets.search_aria.results_label')} : ${searchQuery}` }</h4>


              </form>
            </div>
          </div>
        </div>
        <table className="table table-striped d-none d-md-table ">
          <thead>
            <tr>
              <th scope="col">
                Project Name
              </th>
              <th scope="col">
                {/* ID */}
                ID

              </th>
              <th scope="col">
                {/* Created */}
                Created

              </th>
              <th scope="col">
                {/* Latest activity */}
                 
                    Latest activity 
              </th>
              <th scope="col">
                {/* Status */}
                Status

              </th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((project_flow) => (
              <tr key={`table_${project_flow?.id}`}>
                <td>
                  {/* <Link href="/ticket/">{ticket.ticket_subject}</Link> */}
                  <Link href={`/projectflow/projectflowDetails/${project_flow.project_flow_slug}`} > 
                    {/* {ticket.ticket_subject} */}
                    {project_flow?.project_type_name?.length > 25 
                    ? `${project_flow?.project_type_name?.slice(0, 25)}...` 
                    : project_flow?.project_type_name
                    }  
                  </Link>
                </td>
                {/* <td>#{ticket.id}</td> */}
                <td>#{formatNumber(project_flow?.id)}</td>

                <td>{formatDate(project_flow?.created_date)}</td>
                <td>{formatDate(project_flow?.latest_activity)}</td>
                <td>
                  <span  >
                    {/* {ticket.ticket_status} */}
                    {project_flow?.project_flow_status }
                  </span>
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
          {data?.map((project_flow) => (
            <div className="card mb-3" key={`card_${project_flow.id}`}>
              <div className="card-body">
                <p>
                  <strong>{t('my_tickets.table_list_items.subject')} : </strong> 
 

                  <Link className="ms-2" href={`/projectflow/projectFlowDetails/${project_flow.project_flow_slug}`}>
 
                  {project_flow.project_type_name.length > 25 
                  ? `${project_flow.project_type_name.slice(0, 25)}...` 
                  : project_flow.project_type_name
                  }        
            
                  </Link>




                </p>
                <p>
                  <strong>ID :</strong> #{formatNumber(project_flow?.id)}
                </p>
                <p>
                  <strong>Created : </strong> {formatDate(project_flow?.created_date)}
                </p>
                <p>
                  <strong>Latest activity : </strong>{" "}
                  {formatDate(project_flow?.latest_activity)}
                </p>
                <p>
                  <strong>status : </strong>{" "}
                  <span  >
 
                    {project_flow?.project_flow_status && project_flow?.project_flow_status }
                  </span>
                </p>

 
                
              </div>
            </div>
          ))}
        </div>  

         
      </div>
    </>
  );







};

export default Page;
