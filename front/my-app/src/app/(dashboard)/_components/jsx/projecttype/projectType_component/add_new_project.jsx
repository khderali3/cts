
import { useState, useRef } from "react"
import { toast } from "react-toastify";
 
import { getErrorMessage } from "@/app/public_utils/utils";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice"

import { useTranslations } from "next-intl";
import { AddFilesComponent } from "./add_project_components/extra_images";



export const AddNewProjectComponent = ({handleReloadFlag=null}) => {
	const t = useTranslations('site.ticket.ticket_details_msgs.ticket_reply_form')

	const [customFetch] = useCustomFetchMutation();

    const [data, setData] = useState({
        project_name:'',
        project_name_hint: "",
        project_description: '',
        project_name_ar: '',
        project_name_hint_ar: '',
        project_description_ar: '',
     })

	 const [isPublished, setIsPublished] = useState(false)
 

	const isButtonDisabled = Object.values(data).some((value) => value.trim() === "");
    const [projectMainImageSelected, setProjectMainImageSelected] = useState(null)
    const mainImagefileInputRef = useRef(null);

	const [filesExtraImages, setFilesExtraImages] = useState([{ id: 1, file: null }]);
    const fileInputRefsExtraImages = useRef([]);


	const [filesAttachment, setFilesAttachment] = useState([{ id: 1, file: null }]);
    const fileInputRefsFilesAttachment = useRef([]);


	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
		  // If the input is a file, update the selectedFile state
		  setProjectMainImageSelected(files[0]);
		} else {
		  // If the input is not a file, update the data state
		  setData((prevState) => ({
			...prevState,
			[name]: value,
		  }));
		}


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


			if (projectMainImageSelected) {
				formData.append("main_image", projectMainImageSelected);
			}

			filesExtraImages.forEach((fileInput) => {
				if (fileInput.file) {
					formData.append("extra_images[]", fileInput.file);
				}
			});

			filesAttachment.forEach((fileInput) => {
				if (fileInput.file) {
					formData.append("attachment[]", fileInput.file);
				}
			});



			formData.append("is_published", isPublished);


 			const response = await customFetch({
			   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/`,
			   method: "POST",
			   body: formData, 
			 });

			if(response && response.data){
				if (mainImagefileInputRef.current) {
					mainImagefileInputRef.current.value = ""; // Reset the file input
				}
 
 
				

				setData({
					project_name:'',
					project_name_hint: "",
					project_description: '',
					project_name_ar: '',
					project_name_hint_ar: '',
					project_description_ar: '',
				 })
				 setIsPublished(false);  // This resets the checkbox to unchecked

				if(handleReloadFlag){handleReloadFlag()}

                setFilesExtraImages([{ id: 1, file: null }]);
                fileInputRefsExtraImages.current.forEach((input) => {
                    if (input) input.value = "";
                });



				setFilesAttachment([{ id: 1, file: null }]);
                fileInputRefsFilesAttachment.current.forEach((input) => {
                    if (input) input.value = "";
                });

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
				<label htmlFor="project_name" className="form-label small">
 				Project Name
				</label>
				<input
					type="text"
					className="form-control form-control-sm "
					id="project_name"
					name="project_name"
					value={data.project_name  || ""}
					onChange={handleChange}
					dir='ltr'


				/>
			</div>


			<div className="mb-3">
				<label htmlFor="project_name_hint" className="form-label small">
                    project Name Hint
				</label>
				<input
					type="text"
					className="form-control  form-control-sm"
					id="project_name_hint"
					name="project_name_hint"
					value={data.project_name_hint  || ""}
					onChange={handleChange}
					dir='ltr'


				/>
			</div>

			<div className="mb-3">
				<label htmlFor="project_description" className="form-label small">
 				Details
				</label>
				<textarea 
					className="form-control  form-control-sm" 
 
					id="project_description"
					name="project_description"
					value={data.project_description  || ""}
					onChange={handleChange}
					dir='ltr'

				>

				</textarea>

			</div>



			
			<div className="mb-3">
				<label htmlFor="project_name_ar" className="form-label small">
 				Project Name (Ar)
				</label>
				<input
					type="text"
					className="form-control   form-control-sm text-end"
					dir="rtl"
					id="project_name_ar"
					name="project_name_ar"
					value={data.project_name_ar  || ""}
					onChange={handleChange}
 				/>
			</div>


			<div className="mb-3">
				<label htmlFor="project_name_hint_ar" className="form-label small">
                Project Name Hint (Ar)
				</label>
				<input
					type="text"
					className="form-control   form-control-sm text-end"
					dir='rtl'
					id="project_name_hint_ar"
					name="project_name_hint_ar"
					value={data.project_name_hint_ar  || ""}
					onChange={handleChange}


				/>
			</div>

			<div className="mb-3">
				<label htmlFor="project_description_ar" className="form-label small">
                    Details (Ar)
				</label>
				<textarea 
					className="form-control   form-control-sm text-end"
					dir='rtl' 
 
					id="project_description_ar"
					name="project_description_ar"
					value={data.project_description_ar  || ""}
					onChange={handleChange}

				>

				</textarea>

			</div>


		<div className="form-check">
			<input
				className="form-check-input small"
				type="checkbox"
	
				id="is_published"
				checked={isPublished}
				onChange={(e) => setIsPublished(e.target.checked)}
			/>
			<label className="form-check-label small " htmlFor="is_published">
				Published
			</label>
		</div>









            <div className="mb-3">
              <label htmlFor="prod_image" className="form-label small">
 				Main Image
              </label>
              <input
                type="file"
                className="form-control   form-control-sm"
                accept="image/*"
                id="prod_image"
                name="prod_image"                
                onChange={handleChange}
				ref={mainImagefileInputRef}
              />
              
            </div>


			<AddFilesComponent 
				custom_id = "extra_images"
				title = "Extra Images"
				filesExtraImages={filesExtraImages} 
				setFilesExtraImages={setFilesExtraImages} 
				fileInputRefsExtraImages={fileInputRefsExtraImages} 
				only_image={true} 
			/>


			<AddFilesComponent 
				custom_id = "attachment"
				title = "Attachments"
				filesExtraImages={filesAttachment} 
				setFilesExtraImages={setFilesAttachment} 
				fileInputRefsExtraImages={fileInputRefsFilesAttachment} 
				only_image={false} 
			/>


 








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