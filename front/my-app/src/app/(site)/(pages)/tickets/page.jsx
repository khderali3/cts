'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import getTicketStatusColor from "../../_components/jsx/tickets/ticket_status_colors";
import { useRouter } from 'next/navigation';


import { useCustomFetchMutation } from "../../_components/redux/features/siteApiSlice";
import { useRef } from "react";



const Page = () => {

  const formatDate = (dateString) => {
    if (dateString) {
        return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    }
  };


  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket/`
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
    router.push('/tickets/newticket');  
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






      <div className="container mt-1">

      <div className="container mt-2">
        <h6> <Link href='/tickets'> Tickets </Link>  </h6>
        <hr />
      </div>


    <div className="row">
      <div className="col-12 col-md-6  ">
        <h1 className="mb-2">My Requests</h1>
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-md-end">
        <button type="button" onClick={handleAddRequest} className="btn btn-outline-secondary">Add a new Request</button>
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
                    <label htmlFor="search_words"> Search in Subject / Ticket Body </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="search_words"
                      placeholder="search here"
                      aria-describedby="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col-md-4 col-12 pt-2">
                  <label htmlFor="search_words"> Search Per Ticket Status </label>

                    <select
                      className="form-select rounded-pill"
                      aria-label="Default select example"
                      value={status}
                      onChange={handleStatusChange}
 
                    >
                      <option value={'all'}>all status</option>
                      <option value={'open'}>Open</option>
                      <option value={'wait_customer_reply'}>wait_customer_reply</option>
                      <option value={'replied_by_staff'}>replied_by_staff</option>
                      <option value={'replied_by_customer'}>replied_by_customer</option>
                      <option value={'solved'}>solved</option>
                    </select>
                  </div>
                </div>

                <h4 className="text-muted mt-2">{searchQuery && `results for : ${searchQuery}` }</h4>


              </form>
            </div>
          </div>
        </div>
        <table className="table table-striped d-none d-md-table">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">ID</th>
              <th scope="col">Created</th>
              <th scope="col">Latest activity</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((ticket) => (
              <tr key={`table_${ticket.id}`}>
                <td>
                  {/* <Link href="/ticket/">{ticket.ticket_subject}</Link> */}
                  <Link href={`/tickets/ticketDetails/${ticket.ticket_slog}`}  >{ticket.ticket_subject}</Link>


                </td>
                <td>#{ticket.id}</td>
                <td>{formatDate(ticket.ticket_created_date)}</td>
                <td>{formatDate(ticket.latest_activity)}</td>
                <td>
                  <span className={`badge ${getTicketStatusColor(ticket.ticket_status)}`}>
                    {ticket.ticket_status}
                  </span>
                </td>
                <td>
                  <Link href="/#">Re open ticket </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-4">
            <p>Loading data...</p>
          </div>
        )}



        {/* Card View for smaller screens */}
          <div className="d-block d-md-none">
          {data.map((ticket) => (
            <div className="card mb-3" key={`card_${ticket.id}`}>
              <div className="card-body">
                <p>
                  <strong>Subject:</strong> {ticket.ticket_subject}
                </p>
                <p>
                  <strong>ID:</strong> #{ticket.id}
                </p>
                <p>
                  <strong>Created:</strong> {formatDate(ticket.ticket_created_date)}
                </p>
                <p>
                  <strong>Latest activity:</strong>{" "}
                  {formatDate(ticket.latest_activity)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${getTicketStatusColor(ticket.ticket_status)}`}>
                    {ticket.ticket_status}
                  </span>
                </p>
                <p>
                  <strong>Actions:</strong> re-open
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
