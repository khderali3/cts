
import { useState, useRef } from "react"
import { toast } from "react-toastify";
 
import { getErrorMessage } from "@/app/public_utils/utils";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice"

import { useTranslations } from "next-intl";
// import { AddFilesComponent } from "./add_project_components/extra_images";

import { FormSearchInput } from "../../project_flow_template/input_search_templates/page";



export const AddNewObject = ({handleReloadFlag=null}) => {
	const t = useTranslations('site.ticket.ticket_details_msgs.ticket_reply_form')

	const [customFetch] = useCustomFetchMutation();
 
    const [data, setData] = useState({
        product_name:'',
        product_name_ar: "",
        private_note: '',
     })

  


	const isButtonDisabled = Object.values(data).some((value) => value.trim() === "");
 
  

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (e) => {
		const { name, value  } = e.target;
		setData((prevState) => ({
			...prevState,
			[name]: value,
		  }));
 
		}



	const handleSubmit = async (e) => {
		e.preventDefault()

		const emptyFields = Object.entries(data)
		.filter(([key, value]) => !value.trim()) // Check for empty values (ignoring spaces)
		.map(([key]) => key); // Extract field names
	
	  if (emptyFields.length > 0) {
		toast.error(`Please fill in all fields: ${emptyFields.join(", ")}`)
		return;
	  }





		try{
			setIsSubmitting(true)

			const formData = new FormData()

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
              });

  

 			const response = await customFetch({
			   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/installed_product_type/`,
			   method: "POST",
			   body: formData, 
			 });

			if(response && response.data){
  

				setData({
					product_name:'',
					product_name_ar: "",
					private_note: ''
				 })
 

				if(handleReloadFlag){handleReloadFlag()}
 
				toast.success('your data has been submited')
			} else{
				setIsSubmitting(false)
				console.log('response', response)
				if (response?.error?.data) {
					toast.error(getErrorMessage(response.error.data));
				}
			}


		} catch(error){
			console.log(error)			
			toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
		} finally{ setIsSubmitting(false) }

	}








    return ( 

		<div className="mb-3 col-md-10 col-12">

		<form   className="    "     >

 

			<div className="mb-3">
				<label htmlFor="product_name" className="form-label small">
 				Product Type Name
				</label>
				<input
					type="text"
					className="form-control form-control-sm "
					id="product_name"
					name="product_name"
					value={data.product_name  || ""}
					onChange={handleChange}
					dir='ltr'


				/>
			</div>

  
			
			<div className="mb-3">
				<label htmlFor="product_name_ar" className="form-label small">
 				Product Type Name (Ar)
				</label>
				<input
					type="text"
					className="form-control   form-control-sm text-end"
					dir="rtl"
					id="product_name_ar"
					name="product_name_ar"
					value={data.product_name_ar  || ""}
					onChange={handleChange}
 				/>
			</div>

 
 
			
			<div className="mb-3">
				<label htmlFor="private_note" className="form-label small">
 				Private Note
				</label>
				<input
					type="text"
					className="form-control form-control-sm "
					id="private_note"
					name="private_note"
					value={data.private_note  || ""}
					onChange={handleChange}
					dir='ltr'


				/>
			</div>
 
 




 



		<button
			className="btn btn-success mt-2"
			onClick={handleSubmit}
			disabled={isButtonDisabled || isSubmitting }
 		>

			{/* {addingItem ? t('form_add.adding_item') : t('form_add.add_item')} */}
			Add Item
		</button>



		</form>


		</div>  


 









    )
}