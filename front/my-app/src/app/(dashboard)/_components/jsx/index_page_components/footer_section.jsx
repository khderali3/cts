'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import FooterSocialUrls from "./footer_component/footer_social_media";

const FooterSection = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const [data, setData] = useState({
		about_us_content: "",
		contact_us_email: "",
		contact_us_phone: "",
	});



	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		const form = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
					form.append(key, data[key]);
			}}


		if (

      (  data.about_us_content &&   data.about_us_content.trim() !== '' ) && 
      ( data.contact_us_email &&  data.contact_us_email.trim() !== '' )  &&
      ( data.contact_us_phone &&  data.contact_us_phone.trim() !== '' ) 
	
	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer/`)
			  setIsModalOpen(false)
	  
			} else{
			  console.log(response)
			  toast.error("Error submitting form 1.");
			}
	  
		  } catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Error submitting form2.");
		  } finally{setSubmitting(false);}

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
		const { name, value } = e.target;

		  setData((prevState) => ({
			...prevState,
			[name]: value,
		  }));
	  };


    useEffect(() => {
  
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer/`)
  
    }, []);

    return (

            
        <div className="container mt-2">
          		<hr   />

        <h6> Footer Section (nineth Section)  

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="about_us_content" className="form-label">
                About us 
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_content"
                name="about_us_content"
                readOnly={!canEdit}
                value={data?.about_us_content  || ""}
                onChange={handleChange}
              />
            </div>



            <div className="mb-3">
              <label htmlFor="contact_us_email" className="form-label">
                Contact us Email 
              </label>
              <input
                type="text"
                className="form-control"
                id="contact_us_email"
                name="contact_us_email"
                readOnly={!canEdit}
                value={data?.contact_us_email  || ""}
                onChange={handleChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="contact_us_phone" className="form-label">
                Contact us phone 
              </label>
              <input
                type="text"
                className="form-control"
                id="contact_us_phone"
                name="contact_us_phone"
                readOnly={!canEdit}
                value={data?.contact_us_phone  || ""}
                onChange={handleChange}
              />
            </div>


           
            <div className="mb-3">
              <label htmlFor="about_us_content" className="form-label">
                About us (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end"
                dir="rtl"
                id="about_us_content"
                name="about_us_content"
                readOnly={!canEdit}
                value={data?.about_us_content  || ""}
                onChange={handleChange}
              />
            </div>



            <div className="mb-3">
              <label htmlFor="contact_us_email" className="form-label">
                Contact us Email (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end"
                dir="rtl"

                id="contact_us_email"
                name="contact_us_email"
                readOnly={!canEdit}
                value={data?.contact_us_email  || ""}
                onChange={handleChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="contact_us_phone" className="form-label">
                Contact us phone (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end"
                dir="rtl"

                id="contact_us_phone"
                name="contact_us_phone"
                readOnly={!canEdit}
                value={data?.contact_us_phone  || ""}
                onChange={handleChange}
              />
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





    <CustomModal  
		id="footer_section"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'Footer section' Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  




      <FooterSocialUrls />
  

    </div>



    )
}


export default FooterSection