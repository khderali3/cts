'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import ListManagerFeatureWhyUs from "./whyus_section_component/ListManager_fiature_why_us";




const WyeUsSection = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
	const [selectedFile, setSelectedFile] = useState(null)

	const [data, setData] = useState({
		why_us_title: "",
		why_us_image: "",
		why_us_details: "",
		why_us_title_ar: "",
		why_us_details_ar: "",
	});



	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		const form = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if(key !== 'why_us_image') {
					form.append(key, data[key]);
				}
			}}

		if(selectedFile instanceof File  ) {
			form.append("why_us_image", selectedFile);
		}

		if (

      (  data.why_us_title &&   data.why_us_title.trim() !== '' ) && 
      ( data.why_us_details &&  data.why_us_details.trim() !== '' ) &&
      ( data.why_us_title_ar &&  data.why_us_title_ar.trim() !== '' ) &&
      ( data.why_us_details_ar && data.why_us_details_ar.trim() !== ''  )
	
	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/why_us/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/why_us/`)
			  setIsModalOpen(false)
	  
			} else{
			  console.log(response)
			  toast.error("Error submitting form 1.");
			}
	  
		  } catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Error submitting form2.");
		  } finally{ setSubmitting(false);}

	  } else {
		toast.error("Error. all fields are required ");
    setSubmitting(false);
	  }
	
	 
		  
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
	 
      if (response && response.data ) {
        const filteredData = Object.fromEntries(
          Object.entries(response.data).filter(([key, value]) => value !== null)
          ) 
    
        // setData(filteredData);	
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
  
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/why_us/`)
  
    }, []);

    return (

            
        <div className="container mt-2">
        <h6>Why Us (Third Section)  

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="why_us_title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="why_us_title"
                name="why_us_title"
                readOnly={!canEdit}
                value={data?.why_us_title  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="why_us_details" className="form-label">
                Details
              </label>
              <input
                type="text"
                className="form-control"
                id="why_us_details"
                name="why_us_details"
                readOnly={!canEdit}
                value={data?.why_us_details  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="why_us_title_ar" className="form-label">
                Title (Ar)
              </label>
              <input
                dir="rtl"
                type="text"
                className="form-control text-end"
                id="why_us_title_ar"

                name="why_us_title_ar"
                readOnly={!canEdit}
                value={data?.why_us_title_ar  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="why_us_details_ar" className="form-label">
                Details  (Ar)
              </label>
              <input
                dir="rtl"
                type="text"
                className="form-control text-end"
                id="why_us_details_ar"

                name="why_us_details_ar"
                readOnly={!canEdit}
                value={data?.why_us_details_ar  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="why_us_image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                id="why_us_image"
                name="why_us_image"
                disabled={!canEdit}
                onChange={handleChange}
              />

              {data?.why_us_image &&  <a href={data?.why_us_image}>  Current Image  </a> }
             
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

        <ListManagerFeatureWhyUs />  
       
        <hr   />





    <CustomModal  
		id="why_us_modal"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'Why us section' Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  










    </div>



    )
}


export default WyeUsSection