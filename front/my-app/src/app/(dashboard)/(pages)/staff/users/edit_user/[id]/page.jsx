'use client'

import { useEffect, useState, useRef} from "react"
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';



const Page = () =>  {

  const [customFetch] = useCustomFetchMutation();
 
  const router = useRouter()
 

  const [data, setData] = useState({

 
      "user": {
          "id": null,
          "email": "",
          "first_name": "",
          "last_name": "",
          "is_active": null,
          "is_staff": false,
          "is_superuser": null,
          "is_ticket_priority_support": false,
          "last_login": null
      },
      "profile": {
          "PRF_company": "",
          "PRF_country": null,
          "PRF_city": null,
          "PRF_address": null,
          "PRF_phone_number": null,
          "PRF_image": null
      }
 


  });
  const [isLoading, setIsLoading] = useState(true)


 

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;  // Extract 'checked' for checkboxes
    
    // For checkboxes, use 'checked' instead of 'value'
    const inputValue = type === 'checkbox' ? checked : value;
  
    setData((prevState) => {
      const keys = name.split('.'); // Split the name string into keys (e.g., ['data', 'user', 'email'])
      let updatedState = { ...prevState }; // Clone the state
  
      // Traverse and update the nested object
      let current = updatedState;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }; // Ensure immutability
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = inputValue; // Set the value for checkboxes or other inputs
      
      return updatedState;
    });
  };





  const fetchData = async (pageUrl) => {
    setIsLoading(true);
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

      } else {
         console.log(response) 
         toast.error('no data')
        //  throw new Error('404');  // This will trigger the custom 404 page

        }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{setIsLoading(false);}
    
   };








 
  // Handle form submission

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = new FormData();

  //   // Append text fields to form data

  //   form.append("user.email", formData.email);
  //   form.append("user.first_name", formData.first_name);
  //   form.append("user.last_name", formData.last_name);
  //   form.append("user.password", formData.password);
  //   form.append("user.confirm_password", formData.confirm_password);
  
  //   if (
 
  
  //     (formData.email && formData.email.trim() !== '') && 
  //     (formData.first_name && formData.first_name.trim() !== '') && 
  //     (formData.last_name && formData.last_name.trim() !== '') && 
  //     (formData.password && formData.password.trim() !== '') && 
  //     (formData.confirm_password && formData.confirm_password.trim() !== '')  

  //   ) {
      
  //     if(formData.password !== formData.confirm_password){
  //       toast.error("Passwords do not match. Please try again!");
  //       return;
  //     }


  //   try {
  //     // Send form data using customFetch mutation
  //     const response = await customFetch({
  //       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/`,
  //       method: "POST",
  //       body: form, // Send FormData as the body
  //     });

  //     if (response && response.data) {
 
  //       toast.success("the user has been added succussfuly!");
  //       router.push('/staff/users');  

  //     } else {
  //       toast.error("Failed to submit the request.");
  //       console.log('response', response)
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("Error submitting form.");
  //   }

 
  //     console.log("Form is valid");
  //   } else {

  //     toast.error("all fields are required ");
  //   }

 
  // };













useEffect(() => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/33/`

  fetchData(url) 

}, []);


    return (
 

      <div> 
      <div className="app-content-header  ">


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

      <div className="app-content  ">
 

        <div className="     min-vh-150 bg-white p-3 border rounded  " >


          <h2>Edit user </h2>
 

            <form className="  col-md-10 mb-5 "  >

              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="email" className="form-label small">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    name="user.email"
                    onChange={handleChange}
                    value={data.user.email} // Controlled input

                    type="email"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="email"
                    required
                    maxLength="50"
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="first_name" className="form-label small">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    name="user.first_name"
                    onChange={handleChange}
                    value={data.user.first_name} // Controlled input
  
                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="first_name"
                    required
                    maxLength="50"
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="last_name" className="form-label small">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    name="user.last_name"
                    onChange={handleChange}
                    value={data.user.last_name} // Controlled input

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="last_name"
                    required
                    maxLength="50"
                  />
                </div>



 


                <div className="mb-3 col-md-4">
                  <label htmlFor="Company" className="form-label small">
                    Company  
                  </label>
                  <input
                    name="profile.PRF_company"
                    onChange={handleChange}
                    value={data.profile.PRF_company} // Controlled input

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="Company"
                    required
                    maxLength="50"
                  />
                </div>



                <div className="mb-3 col-md-4">
                  <label htmlFor="country" className="form-label small">
                    Country  
                  </label>
                  <input
                    name="profile.PRF_country"
                    onChange={handleChange}
                    value={data?.profile?.PRF_country ?? ""} // Use empty string if null or undefined

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="country"
                    required
                    maxLength="50"
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="country" className="form-label small">
                    City  
                  </label>
                  <input
                    name="profile.PRF_city"
                    onChange={handleChange}
                    value={data?.profile?.PRF_city ?? ""} // Controlled input

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="City"
                    required
                    maxLength="50"
                  />
                </div>


                <div className="mb-3 col-md-4">
                  <label htmlFor="address" className="form-label small">
                    Address  
                  </label>
                  <input
                    name="profile.PRF_address"
                    onChange={handleChange}
                    value={data?.profile?.PRF_address ?? ""} // Controlled input

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="address"
                    required
                    maxLength="50"
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="phone_number" className="form-label small">
                    Phone Number  
                  </label>
                  <input
                    name="profile.PRF_phone_number"
                    onChange={handleChange}
                    value={data?.profile?.PRF_phone_number ?? ""} // Controlled input

                    type="text"
                    className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                    id="phone_number"
                    required
                    maxLength="50"
                  />
                </div>

  

  
                  <div className="col-12"></div>

                  <div className="row mt-2 "> 

                    <div className="form-check   col-md-3  ms-2">
                      <input
                        className="form-check-input  "
                        type="checkbox"
                        name='user.is_staff'
                        id="is_staff"

                        onChange={handleChange}


                         checked={data.user.is_staff}
                      />
                      <label className="form-check-label small" htmlFor="is_staff">
                        Is Staff
                      </label>
                    </div>

                    <div className="form-check col-md-3   ms-2">
                      <input
                        className="form-check-input  "
                        type="checkbox"
                        name='user.is_superuser'
                        id="is_superuser"
                        onChange={handleChange}
                        checked={data.user.is_superuser}
                      />
                      <label className="form-check-label small" htmlFor="is_superuser">
                        Is SuperUser
                      </label>
                    </div>

                    <div className="form-check col-md-3   ms-2">
                      <input
                        className="form-check-input  "
                        type="checkbox"
                        name='user.is_ticket_priority_support'
                        id="is_ticket_priority_support"
                        onChange={handleChange}
                        checked={data.user.is_ticket_priority_support}
                      />
                      <label className="form-check-label small" htmlFor="is_ticket_priority_support">
                        Is Hi Ticket Priority 
                      </label>
                    </div>



                  </div>
      

              </div>
 

              <button type="submit" className="btn btn-primary btn-sm mt-5"> {/* Added 'btn-sm' for smaller button */}
                Update
              </button>
            </form>


          </div>
          

          </div>
        </div>
    )

}




 export default Page 


 