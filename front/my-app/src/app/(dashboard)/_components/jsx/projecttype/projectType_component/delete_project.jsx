
"use client"

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { useState } from "react";
import { toast } from "react-toastify";

import { useTranslations, useLocale } from "next-intl";

import { getErrorMessage } from "@/app/public_utils/utils";

export const DeleteButton = ({item_id, handleReloadFlag=null}) => {

	const locale = useLocale()

	const t = useTranslations('dashboard.site_managment.our_product.list_manager')
    const [customFetch] = useCustomFetchMutation()
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
	const [isSubmitting, setIsSubmitting] = useState(false)
 
  const handleDelete = async () => {
 
	try{
		setIsSubmitting(true)
		const response = await customFetch({
		   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/${item_id}/`,
		   method: 'DELETE',  
		   headers: {
			 'Content-Type': 'application/json',
		   }, 
		 });
	
		 if( response && response.data) {
		   if(locale === "ar"){
			   toast.success("تم حذف المنتج بنجاح ");
   
		   } else {
			   toast.success("the item has been deleted");
   
		   }
			setIsModalOpen(false);
			setIsSubmitting(false)
   
			if(handleReloadFlag) {handleReloadFlag()}
   
   
		 } else {
			toast.error("Failed to submit the request.");
			if (response?.error?.data) {
				toast.error(getErrorMessage(response.error.data));
			}
		 }



	} catch(error) {
		console.log(error)			
		toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
		
	} finally{setIsSubmitting(false)}
 
  };









    return(
		<> 
		


        <button
        className="btn btn-sm btn-danger m-2"
          onClick= {() => setIsModalOpen(true)}

        disabled={isSubmitting}
        style={{ minWidth: '75px' }}
      >
        {isSubmitting ? t('deleting') :  t('delete')}
      </button>

	  <CustomModal  
		id={`list_manager_Product${item_id}`}
		handleSubmit={handleDelete}
		submitting={isSubmitting}

		message={t('modal_del_msg')}
		operationType = "Delete"
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  


		
		
		</>
    )
}