'use client';

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import ListManagerProduct from "./our_product_section_component/ListManager_product";



const OurProductSection = () => {
	const [canEdit, setCanEdit] = useState(false)
	const [customFetch] = useCustomFetchMutation()
	const [submitting, setSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


	const [data, setData] = useState({
		prd_sec_title: "",
		prd_sec_hint: "",
		prd_sec_title_ar: "",
		prd_sec_hint_ar: "",
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

      (  data.prd_sec_title &&   data.prd_sec_title.trim() !== '' ) && 
      ( data.prd_sec_hint &&  data.prd_sec_hint.trim() !== '' ) &&
      ( data.prd_sec_title_ar &&  data.prd_sec_title_ar.trim() !== '' ) &&
      ( data.prd_sec_hint_ar && data.prd_sec_hint_ar.trim() !== ''  )
	
	  ){ 
		try {
			// Send form data using customFetch mutation
			const response = await customFetch({
			  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product_sec/`,
			  method: "POST",
			  body: form, // Send FormData as the body
			});
	  
			if( response && response.data){
			  setCanEdit(false)
			  toast.success("your data has been updated ");
			  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product_sec/`)
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
		  }))

	  };


    useEffect(() => {
  
      fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product_sec/`)
  
    }, []);

    return (

            
        <div className="container mt-2">
        <h6>Product Section (Fourth Section)  

        </h6>
        {/* Row for Search Form */}
        <div className="row my-4 py-4 px-4 border">
          <div className="col-12">

            <form   className="  row "     >


            
           
            <div className="mb-3">
              <label htmlFor="prd_sec_title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="prd_sec_title"
                name="prd_sec_title"
                readOnly={!canEdit}
                value={data?.prd_sec_title  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="prd_sec_hint" className="form-label">
                Details
              </label>
              <input
                type="text"
                className="form-control"
                id="prd_sec_hint"
                name="prd_sec_hint"
                readOnly={!canEdit}
                value={data?.prd_sec_hint  || ""}
                onChange={handleChange}


              />
            </div>


            <div className="mb-3">
              <label htmlFor="prd_sec_title_ar" className="form-label">
                Title (Ar)
              </label>
              <input
                dir="rtl"
                type="text"
                className="form-control text-end"
                id="prd_sec_title_ar"

                name="prd_sec_title_ar"
                readOnly={!canEdit}
                value={data?.prd_sec_title_ar  || ""}
                onChange={handleChange}

              />
            </div>


            <div className="mb-3">
              <label htmlFor="prd_sec_hint_ar" className="form-label">
                Details  (Ar)
              </label>
              <input
                dir="rtl"
                type="text"
                className="form-control text-end"
                id="prd_sec_hint_ar"

                name="prd_sec_hint_ar"
                readOnly={!canEdit}
                value={data?.prd_sec_hint_ar  || ""}
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

        <ListManagerProduct />  
       
        <hr   />





    <CustomModal  
		id="our_product_section"
		handleSubmit={handleSubmit}
		submitting={submitting}
		message={"Are you sure you want to update 'Our Product Section' Data?"}
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  










    </div>



    )
}


export default OurProductSection