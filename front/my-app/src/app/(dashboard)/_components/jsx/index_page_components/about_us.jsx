'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";





const AboutUsSection = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const [data, setData] = useState({
		about_us_title: "",
		about_us_company_name: "",
		about_us_hint: "",
		about_us_details: "",
		about_us_youtube_url: "", 
    
		about_us_title_ar: "", 
		about_us_company_name_ar: "", 
		about_us_hint_ar: "", 
		about_us_details_ar: "", 


	});



	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();
		const form = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				form.append(key, data[key]);
			}}



		if (data.about_us_title.trim() !== '' 
		&& data.about_us_company_name.trim() !== ''
		&& data.about_us_hint.trim() !== ''
		&& data.about_us_details.trim() !== ''
		&& data.about_us_title_ar.trim() !== ''
		&& data.about_us_company_name_ar.trim() !== ''
		&& data.about_us_hint_ar.trim() !== ''
		&& data.about_us_details_ar.trim() !== ''

	
	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/about_us/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/about_us/`)
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
	 
		  setData(response.data)
	
	
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
  
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/about_us/`)
  
    }, []);

    return (

            
        <div className="container mt-2">
        <h6>About Us (Second Section)  

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="about_us_title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_title"
                name="about_us_title"
                readOnly={!canEdit}
                value={data?.about_us_title  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="about_us_company_name" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_company_name"
                name="about_us_company_name"
                readOnly={!canEdit}
                value={data?.about_us_company_name  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="about_us_hint" className="form-label">
                Hint
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_hint"

                name="about_us_hint"
                readOnly={!canEdit}
                value={data?.about_us_hint  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="about_us_details" className="form-label">
                Details
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_details"

                name="about_us_details"
                readOnly={!canEdit}
                value={data?.about_us_details  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="about_us_youtube_url" className="form-label">
                Youtube Video URL  
              </label>
              <input
                type="text"
                className="form-control"
                id="about_us_youtube_url"

                name="about_us_youtube_url"
                readOnly={!canEdit}
                value={data?.about_us_youtube_url  || ""}
                onChange={handleChange}

              />
            </div>










            <div className="mb-3">
              <label htmlFor="about_us_title_ar" className="form-label">
                Title (Ar)
              </label>
              <input
                type="text"
                 dir="rtl"
                className="form-control text-end"
                id="about_us_title_ar"
                name="about_us_title_ar"
                readOnly={!canEdit}
                value={data?.about_us_title_ar  || ""}
                onChange={handleChange}

              />
            </div>



            <div className="mb-3">
              <label htmlFor="about_us_company_name_ar" className="form-label">
              Company Name (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end "
                dir="rtl"

                id="about_us_company_name_ar"
                name="about_us_company_name_ar"
                readOnly={!canEdit}
                value={data?.about_us_company_name_ar  || ""}
                onChange={handleChange}

              />
            </div>




            <div className="mb-3">
              <label htmlFor="about_us_hint_ar" className="form-label">
              Hint (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end "
                dir="rtl"

                id="about_us_hint_ar"
                name="about_us_hint_ar"
                readOnly={!canEdit}
                value={data?.about_us_hint_ar  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="about_us_details_ar" className="form-label">
              Detials (Ar)
              </label>
              <input
                type="text"
                className="form-control text-end "
                dir="rtl"

                id="about_us_details_ar"
                name="about_us_details_ar"
                readOnly={!canEdit}
                value={data?.about_us_details_ar  || ""}
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
		id="about_us_modal"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'about us section' Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  










    </div>



    )
}


export default AboutUsSection