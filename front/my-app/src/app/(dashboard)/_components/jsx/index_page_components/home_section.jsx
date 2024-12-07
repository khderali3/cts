'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";





const HomeSection = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [selectedFile, setSelectedFile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


	const [data, setData] = useState({
		home_sec_title: "",
		home_sec_details: "",
		home_sec_title_ar: "",
		home_sec_details_ar: "",
		home_sec_image: null,            
	});



	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		const form = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if(key !== 'home_sec_image') {
					form.append(key, data[key]);
				}
			}}

		if(selectedFile instanceof File  ) {
			form.append("home_sec_image", selectedFile);
		}


    console.log('datadfdfdf', data)
		if (
    // data.home_sec_title.trim() !== '' 
		// && data.home_sec_details.trim() !== ''
		// && data.home_sec_title_ar.trim() !== ''
		// && data.home_sec_details_ar.trim() !== ''
    ( data.home_sec_title && data.home_sec_title.trim() !== '' ) &&
    ( data.home_sec_details &&  data.home_sec_details.trim() !== '') &&
    ( data.home_sec_title_ar &&  data.home_sec_title_ar.trim() !== '' ) &&
    ( data.home_sec_details_ar&&  data.home_sec_details_ar.trim() !== ''  ) 


	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/home/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  setSelectedFile(null)
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/home/`)
        setIsModalOpen(false)
	  
			} else{
			  console.log(response)
			  toast.error("Error submitting form 1.");
			}
	  
		  } catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Error submitting form2.");
		  }

	  } else {
		toast.error("Error. all fields are required ");

	  }
	
	  setSubmitting(false);
		  
	};






	const fetchData = async (pageUrl) => {
		try {
		  const response = await customFetch({
			url: pageUrl,
			method: 'GET', // Only use 'GET' for fetching data
			headers: {
			  'Content-Type': 'application/json',
			}, 
		  });
	 
      if( response && response.data) {

        const filteredData = Object.fromEntries(
          Object.entries(response.data).filter(([key, value]) => value != null)
          ) 

        setData((prevData) => ({
          ...prevData,
          ...filteredData,
        }));

      }

	
	
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  };


	const  handleCanEdit = (e) => {
		e.preventDefault();
		setCanEdit(true)
	}


	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
		  // If the input is a file, update the selectedFile state
		  setSelectedFile(files[0]);
		} else {
		  // If the input is not a file, update the data state
		  setData((prevState) => ({
			...prevState,
			[name]: value,
		  }));
		}
	  };


      useEffect(() => {
    
        fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/home/`)
    
      }, []);

    return (

            
        <div className="container mt-2">
        <h6> Home Section (first Section)  

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="home_sec_title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="home_sec_title"
                name="home_sec_title"
                readOnly={!canEdit}
                value={data?.home_sec_title  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="home_sec_details" className="form-label">
                Details
              </label>
              <input
                type="text"
                className="form-control"
                id="home_sec_details"

                name="home_sec_details"
                readOnly={!canEdit}
                value={data?.home_sec_details  || ""}
                onChange={handleChange}

              />
            </div>




            <div className="mb-3">
              <label htmlFor="home_sec_title_ar" className="form-label">
                Title (Ar)
              </label>
              <input
                type="text"
                 dir="rtl"
                className="form-control text-end"
                id="home_sec_title_ar"
                name="home_sec_title_ar"
                readOnly={!canEdit}
                value={data?.home_sec_title_ar  || ""}
                onChange={handleChange}

              />
            </div>



            <div className="mb-3">
              <label htmlFor="home_sec_details_ar" className="form-label">
                Details (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end "
                dir="rtl"

                id="home_sec_details_ar"
                name="home_sec_details_ar"
                readOnly={!canEdit}
                value={data?.home_sec_details_ar  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="home_sec_image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                id="home_sec_image"
                name="home_sec_image"
                disabled={!canEdit}
                onChange={handleChange}
              />

              {data?.home_sec_image &&  <a href={data?.home_sec_image}>  Current Image  </a> }
             
            </div>




              <div className=" pt-3 mt-3 ">


                    { canEdit === true ?

                      <> 
                      <button type="button" disabled={submitting} 
                      onClick= { () => setIsModalOpen(true)}
                      
                        className="btn btn-primary"
                      >
          
                      {!submitting ? 'Update' : 'Updating...'}
                      </button>


                        <button type="button"  onClick={ () => setCanEdit(false)}    className="  btn  btn-secondary  ms-2">
                          Cancel
                        </button>

                      </>
                        :   

                        <button  onClick={handleCanEdit }   className="  btn  btn-secondary">
                        Edit 
                        </button>
                    }

              </div>
            </form>

          </div>
        </div>
       
        <hr   />





    {/* <CustomModal  id="home_modal" handleSubmit={handleSubmit} submitting={submitting} message={'Are you sure you want to update Data?'} />   */}


    <CustomModal  
		id="home_section_modal"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'home section'Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  







    </div>



    )
}


export default HomeSection