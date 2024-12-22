'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";


const FooterSocialUrls = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const [data, setData] = useState({
		facebook_url: "",
		youtube_url: "",
		instagram_url: "",
		linkedIn_url: "",
		twitter_url: "",
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

      (  data.facebook_url &&   data.facebook_url.trim() !== '' ) && 
      ( data.youtube_url &&  data.youtube_url.trim() !== '' )  &&
      ( data.instagram_url &&  data.instagram_url.trim() !== '' ) && 
      ( data.linkedIn_url &&  data.linkedIn_url.trim() !== '' )  &&
      ( data.twitter_url &&  data.twitter_url.trim() !== '' )  
	
	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer_social_media/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer_social_media/`)
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
  
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/footer_social_media/`)
  
    }, []);

    return (

            
        <div className="container mt-2">
          		<hr   />

        <h6> Footer social media   

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="facebook_url" className="form-label">
                Facebook Page Url 
              </label>
              <input
                type="text"
                className="form-control"
                id="facebook_url"
                name="facebook_url"
                readOnly={!canEdit}
                value={data?.facebook_url  || ""}
                onChange={handleChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="youtube_url" className="form-label">
                Youtube Page Url 
              </label>
              <input
                type="text"
                className="form-control"
                id="youtube_url"
                name="youtube_url"
                readOnly={!canEdit}
                value={data?.youtube_url  || ""}
                onChange={handleChange}
              />
            </div>




            <div className="mb-3">
              <label htmlFor="instagram_url" className="form-label">
                instagram Page Url 
              </label>
              <input
                type="text"
                className="form-control"
                id="instagram_url"
                name="instagram_url"
                readOnly={!canEdit}
                value={data?.instagram_url  || ""}
                onChange={handleChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="linkedIn_url" className="form-label">
                linkedin Page Url 
              </label>
              <input
                type="text"
                className="form-control"
                id="linkedIn_url"
                name="linkedIn_url"
                readOnly={!canEdit}
                value={data?.linkedIn_url  || ""}
                onChange={handleChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="twitter_url" className="form-label">
                Twitter Page Url 
              </label>
              <input
                type="text"
                className="form-control"
                id="twitter_url"
                name="twitter_url"
                readOnly={!canEdit}
                value={data?.twitter_url  || ""}
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
		id="footer_social_section"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'social URLs' Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  




  

    </div>



    )
}


export default FooterSocialUrls