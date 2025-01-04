'use client'

import { useEffect, useState, useRef} from "react"
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";
import { useRouter, useParams } from 'next/navigation';
import FileList from "@/app/(dashboard)/_components/jsx/tickets/edit_ticket_reply/files_list";  


const Page = () =>  {

  const [customFetch] = useCustomFetchMutation();
 
  const fileInputRefs = useRef([]); // Ref to hold references to file inputs
  const [files, setFiles] = useState([{ id: 1, file: null }]);
  const router = useRouter()
  const { ticket_reply_id } = useParams()  
 
   
 

  const [formData, setFormData] = useState({
    ticket_replay_body: "",
   });




  const fetchTicketDetails = async () => {
    try {
      // Await the customFetch call to get the response
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/ticket_reply/${ticket_reply_id}/`,
        method: "GET",
        // body: formData,  // Use FormData as the body (if needed)
      });
  
      // Check if response and response.data are available
      if (response && response.data) {

        setFormData(response.data);

      } else {
        // Handle the error case if there's no data or an error in the response
        console.log("Failed to get reply details1 :", response);
      }
    } catch (error) {
      // Catch any errors during the fetch operation
      console.error("Error fetching reply details2:", error);
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
      e.preventDefault();
      router.back()
    }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append text fields to form data

    form.append("ticket_replay_body", formData.ticket_replay_body);
 
 

    if (
 
  
      (formData.ticket_replay_body && formData.ticket_replay_body.trim() !== '')   
 
 
    ) {
      
    // // Append each file to the FormData object
    files.forEach((fileInput) => {
      if (fileInput.file) {
        form.append("ticket_reply_files[]", fileInput.file);
      }
    });

     try {
      // Send form data using customFetch mutation
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/ticket_reply/${ticket_reply_id}/`,
        method: "PUT",
        body: form, // Send FormData as the body
      });

      if (response && response.data) {
        // Clear form fields and files on successful submission
        setFormData({
          ticket_replay_body: "",
         });


        setFiles([{ id: 1, file: null }]);
        fileInputRefs.current.forEach((input) => {
          if (input) input.value = ""; // Reset file input value
        });

        toast.success("Your ticket has been added successfully!");

        console.log('ticket_slog', response.data.ticket_slog)
        // router.push('/staff/ticket');  
        router.push(`/staff/ticket/ticketDetails/${response.data.ticket_slug}`)
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


          <h2>Edit Ticket Reply</h2>
          <form className="col-md-8 col-12 mb-5 " >

 
 
            <div className="mb-3">
              <label htmlFor="reply" className="form-label">
                Repsponse  <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="reply"
                rows={6}
                placeholder="Please enter the details of your reply"
                required=""
                // onChange={handleChange}
                name="ticket_replay_body"
                value={formData?.ticket_replay_body}
                onChange={handleChange}


              />
            </div>





                  <FileList ticket_reply_id={ticket_reply_id}/>







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
                name="ticket_reply_files[]"
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


 
          <div className="pt-2">

            <button   className="btn btn-outline-primary" onClick={handleSubmit}>
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


 