'use client'

import { useEffect, useState, useRef} from "react"
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';



const Page = () =>  {

  const [customFetch] = useCustomFetchMutation();
 

  const router = useRouter()
 

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "", 
   });


 


  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append text fields to form data

    form.append("user.email", formData.email);
    form.append("user.first_name", formData.first_name);
    form.append("user.last_name", formData.last_name);
    form.append("user.password", formData.password);
    form.append("user.confirm_password", formData.confirm_password);
  
    if (
 
  
      (formData.email && formData.email.trim() !== '') && 
      (formData.first_name && formData.first_name.trim() !== '') && 
      (formData.last_name && formData.last_name.trim() !== '') && 
      (formData.password && formData.password.trim() !== '') && 
      (formData.confirm_password && formData.confirm_password.trim() !== '')  

    ) {
      
      if(formData.password !== formData.confirm_password){
        toast.error("Passwords do not match. Please try again!");
        return;
      }


    try {
      // Send form data using customFetch mutation
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/`,
        method: "POST",
        body: form, // Send FormData as the body
      });

      if (response && response.data) {
 
        toast.success("the user has been added succussfuly!");
        router.push('/staff/users');  

      } else {
        toast.error("Failed to submit the request.");
        console.log('response', response)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
    }

 
      console.log("Form is valid");
    } else {

      toast.error("all fields are required ");
    }

 
  };













useEffect(() => {
 
 
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


          <h2>Add a new user</h2>
 

            <form className="col-md-8 col-12 mb-5" onSubmit={handleSubmit}>


              <div className="mb-3 col-md-6">
                <label htmlFor="email" className="form-label small">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={formData.email} // Controlled input

                   type="email"
                  className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                  id="email"
                  required
                  maxLength="50"
                />
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="first_name" className="form-label small">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name} // Controlled input
 
                  type="text"
                  className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                  id="first_name"
                  required
                  maxLength="50"
                />
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="last_name" className="form-label small">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name} // Controlled input

                  type="text"
                  className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                  id="last_name"
                  required
                  maxLength="50"
                />
              </div>



              <div className="mb-3 col-md-6">
                <label htmlFor="password" className="form-label small">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password} // Controlled input

                  type="password"
                  className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                  id="password"
                  required
                  maxLength="50"
                />
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="confirm_password" className="form-label small">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  name="confirm_password"
                  onChange={handleChange}
                  value={formData.confirm_password} // Controlled input

                  type="password"
                  className="form-control form-control-sm" // Added 'form-control-sm' for smaller input
                  id="confirm_password"
                  required
                  maxLength="50"
                />
              </div>


              <button type="submit" className="btn btn-primary btn-sm"> {/* Added 'btn-sm' for smaller button */}
                Submit
              </button>
            </form>


          </div>
          

          </div>
        </div>
    )

}




 export default Page 


 