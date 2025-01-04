'use client'

import { useEffect, useState, useRef} from "react"
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";
import { useRouter, useParams } from 'next/navigation';
import FileList from "@/app/(dashboard)/_components/jsx/tickets/edit_ticket/files_list";

const Page = () =>  {

  const [customFetch] = useCustomFetchMutation();
  const [departments, setDepartments] = useState([])

  const fileInputRefs = useRef([]); // Ref to hold references to file inputs
  const [files, setFiles] = useState([{ id: 1, file: null }]);
  const router = useRouter()
  const { ticket_id } = useParams()  
 
  const [isSubmiting, setIsSubmittin] = useState(false)
   
 

  const [formData, setFormData] = useState({
    ticket_department: "",
    ticket_subject: "",
    ticket_body: "",
  });




  const fetchTicketDetails = async () => {
    try {
      // Await the customFetch call to get the response
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/tickets/get_ticket_by_id/${ticket_id}/`,
        method: "GET",
        // body: formData,  // Use FormData as the body (if needed)
      });
  
      // Check if response and response.data are available
      if (response && response.data) {

        setFormData(response.data);

      } else {
        // Handle the error case if there's no data or an error in the response
        console.log("Failed to get ticket details ", response);
      }
    } catch (error) {
      // Catch any errors during the fetch operation
      console.error("Error fetching ticket details:", error);
    }
  };
  






 

  const fetchDepartments = async () => {
    try {
      // Await the customFetch call to get the response
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/departments/`,
        method: "GET",
        // body: formData,  // Use FormData as the body (if needed)
      });
  
      // Check if response and response.data are available
      if (response && response.data) {

        setDepartments(response.data);
      } else {
        // Handle the error case if there's no data or an error in the response
        console.log("Failed to get departments. Please try again.");
      }
    } catch (error) {
      // Catch any errors during the fetch operation
      console.error("Error fetching departments:", error);
    }
  };
  





  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    // Handler to add a new file input
    const handleAddMore = (e) => {
      e.preventDefault();
      setFiles([...files, { id: files.length + 1, file: null }]);
    };

    // Handler to remove the last file input
    const handleDeleteLast = (e) => {
        e.preventDefault();
        // Only remove if there are more than one file inputs
        if (files.length > 1) {
        setFiles(files.slice(0, -1));
        }
    };
  
  
    // Handler to update the file state when a file is selected
    const handleFileChange = (e, id) => {
        const updatedFiles = files.map((file) =>
        file.id === id ? { ...file, file: e.target.files[0] } : file
        );
        setFiles(updatedFiles);
    };



    const handleCancel = async (e) => {
      e.preventDefault()
      router.back();
    }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittin(true)
    const form = new FormData();

    // Append text fields to form data

    form.append("ticket_subject", formData.ticket_subject);
    form.append("ticket_body", formData.ticket_body);
    form.append("ticket_department", formData.ticket_department);
 

    if (
 
  
      (formData.ticket_subject && formData.ticket_subject.trim() !== '') && 
      (formData.ticket_body && formData.ticket_body.trim() !== '')  &&
      (formData.ticket_department && String(formData.ticket_department).trim() !== '')
 
    ) {
      
    // // Append each file to the FormData object
    files.forEach((fileInput) => {
      if (fileInput.file) {
        form.append("ticket_files[]", fileInput.file);
      }
    });

     try {
      // Send form data using customFetch mutation
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/tickets/${ticket_id}/`,
        method: "PUT",
        body: form, // Send FormData as the body
      });

      if (response && response.data) {
        // Clear form fields and files on successful submission
        setFormData({
          ticket_department: "",
          ticket_subject: "",
          ticket_body: "",
        });


        setFiles([{ id: 1, file: null }]);
        fileInputRefs.current.forEach((input) => {
          if (input) input.value = ""; // Reset file input value
        });

        toast.success("Your ticket has been added successfully!");

        console.log('ticket_slog', response.data.ticket_slog)
        // router.push('/staff/ticket');  
        router.push(`/staff/ticket/ticketDetails/${response.data.ticket_slog}`)
      } else {
        toast.error("Failed to submit the request.");
        console.log('response', response)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
    } finally{    setIsSubmittin(false) }

      
      console.log("Form is valid");
    } else {

      toast.error("all fields are required ");
      setIsSubmittin(false)
    }

 


  };













useEffect(() => {

  fetchDepartments()
  fetchTicketDetails()

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


          <h2>Edit Ticket</h2>
          <form className="col-md-8 col-12 mb5 " >

            <div className="mb-3">
              <label htmlFor="requestType" className="form-label">
                Please select target department
              </label>


                <select 
                  className="form-select" 
                  id="requestType"
                  name="ticket_department"  // Correct place for name
                  onChange={handleChange}  // Handle the change event
                  value={formData.ticket_department || ""} // Set value based on formData

                >

                <option disabled   value=''> Select Department</option>
                  {departments?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.department_name}
                    </option>
                  ))}
                </select>



            </div>


            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject <span className="text-danger">*</span>
              </label>
              <input  
              name="ticket_subject" 
              onChange={handleChange}
              value={formData.ticket_subject}

              className="form-control" 
              id="subject" required="" 
              maxLength="50" 

              />
            </div>


            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={6}
                placeholder="Please enter the details of your request, and our staff will respond as soon as possible."
                required=""
                // onChange={handleChange}
                name="ticket_body"
                value={formData.ticket_body}
                onChange={handleChange}


              />
            </div>





                  <FileList ticket_id={ticket_id}/>







        {/* Render file inputs dynamically */}
        {files.map((fileInput, index) => (
        <div className="card  p-2 m-2 shadow-sm border rounded" key={fileInput.id}>
            <div className="form-group">
            <div className="mb-3">
                <label 
                htmlFor={`fileInput-${fileInput.id}`} 
                className="form-label fw-bold me-2"
                >
                Upload File {index + 1}
                </label>
                <input
                type="file"
                className="form-control-file"
                id={`fileInput-${fileInput.id}`}
                onChange={(e) => handleFileChange(e, fileInput.id)}
                name="ticket_files[]"
                ref={(el) => (fileInputRefs.current[index] = el)} // Assign ref to each input
                />
            </div>
            
            {/* Only show the "Add More" and "Delete" buttons for the last file input */}
            {index === files.length - 1 && (
                <div className="row pt-0 mt-0">
                    <div className="col-12 col-md-auto">
                        <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mb-2 mb-md-0 me-md-2 btn-sm  "
                        onClick={handleAddMore}
                        >
                        <i className="fa fa-plus me-2"></i> {/* Font Awesome icon */}
                        Add More
                        </button>
                    </div>
                    <div className="col-12 col-md-auto">
                        <button
                        type="button"
                        className="btn btn-outline-danger w-100 btn-sm "
                        onClick={handleDeleteLast}
                        disabled={files.length <= 1} // Disable if only one input left
                        >
                        <i className="fa fa-trash me-2"></i> {/* Font Awesome icon */}
                        Delete
                        </button>
                    </div>

                    
                </div>
            )}
            </div>
        </div>
        ))}


 
            {/* <button type="submit" className="btn btn-outline-primary btn-flexible" disabled={isSubmiting}>
            { isSubmiting && ( <span className="spinner-border spinner-border-sm me-2"></span> ) }  

              Submit 
            </button> */}


            <div className="pt-2">

              <button  className="btn btn-outline-primary " onClick={handleSubmit}>
                { isSubmiting && ( <span className="spinner-border spinner-border-sm me-2"></span> ) }  

                  Submit
                </button>
                <button   className="btn btn-outline-secondary ms-2" onClick={handleCancel}>
                  Cancel
                </button>

            </div>



          </form>
          </div>
          

          </div>
        </div>
    )

}




 export default Page 


 