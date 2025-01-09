"use client"
import { useState, useEffect } from "react"
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
 import { useRouter } from "next/navigation"


import { useRef } from "react"
const Page = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [customFetch] = useCustomFetchMutation()
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/` 
    const isInitialLoad = useRef(true);
    const router = useRouter()

   const  handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
   }




   const handleEditUser = (user_id) => {
    router.push(`/staff/users/edit_user/${user_id}`)
   }

   const fetchData = async ( fetchUrl) => {
    setLoading(true)
		try {
		  const response = await customFetch({
			url: fetchUrl,
			method: 'GET', // Only use 'GET' for fetching data
			headers: {
			  'Content-Type': 'application/json',
			}, 
		  });
	 
      if (response && response.data ) {
          setData(response.data)
          setLoading(false)
      }

	
		} catch (error) {
		  console.error("Error fetching data:", error);
		} 
	  };



    useEffect(() => {
      if (isInitialLoad.current) {
        isInitialLoad.current = false; // Mark the initial load as complete
        return;
      }

 
      const performSearch = () => {
        const queryParams = new URLSearchParams({
          q: searchQuery.trim(),
        });
  
        // Construct the full URL with query parameters
        const searchUrl = `${baseUrl}?${queryParams.toString()}`;
        fetchData(searchUrl); // Fetch with new search criteria
      };
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 1000); // 3-second delay
  
      return () => clearTimeout(timeoutId);
 
    }, [searchQuery]);




    useEffect(() => {
      
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/`)

    }, []);


    return (

        <div> 
        <div className="app-content-header">


          <div className="container-fluid">


            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Main Index Page </h3>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">
                    <a href="#">Docs</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Site Managment
                  </li>
                </ol>
              </div>
            </div>
          </div>

        </div>

        <div className="app-content">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >



{ /*  start  sections   */}



<div className="  mt-1 mb-5 pb-5 ms-2  me-2 ">
 
 
<div className="row">
<div className="col-12 col-md-6  ">
  <h1 className="mb-2">Users Managmnet</h1>
</div>
<div className="col-12 col-md-6 d-flex justify-content-md-end">
  <button type="button" onClick={ () => router.push('/staff/users/add_user')  }    className="btn btn-outline-secondary">Add a new User</button>
</div>
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
              <label htmlFor="search_words"> Search for users </label>
              <input
                type="text"
                className="form-control  "
                id="search_words"
                placeholder="search here"
                aria-describedby="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
                  <div id="search_wordsHelp" className="form-text">{searchQuery.trim() && `results for : ${searchQuery}` }</div>

            </div>

 

            <div className="col-md-5 col-12 pt-2">

              {/* <UsersSearchInput handleUserIdChange={handleUserIdChange} userId={userId}/> */}
             </div>

          </div>

 

        </form>
      </div>
    </div>
  </div>


  <table className="table table-striped d-none d-md-table ">
    <thead>
      <tr>
        <th scope="col">Email</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Is Staff</th>
        <th scope="col">Is Super User</th>
        <th scope="col"> Edit </th>
      </tr>
    </thead>
    <tbody>
      {data?.map((user_obj) => (
        <tr key={`table_${user_obj.id}`}>
          <td>
 
            {user_obj.email}

          </td>
          <td> {user_obj.first_name}</td>
          <td> {user_obj.last_name} </td>
          <td>{user_obj.is_staff ? 'Yes' : 'No'}</td>
          <td>{user_obj.is_superuser ? 'Yes' : 'No'}</td>
          <td>    
            <a
                href="#"
                className="text-primary "
                title="Edit"
                onClick={(e) => {
                    e.preventDefault(); 
                    handleEditUser(user_obj.id)
                }}
              
                >
                <i className="bi bi-pencil-fill"></i>
            </a>


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

{/*       
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
 */}



  </div>

   
</div>
 



 

{ /*  end  sections   */}

          </div>
          

        </div>
      </div>


    )
}

export default Page