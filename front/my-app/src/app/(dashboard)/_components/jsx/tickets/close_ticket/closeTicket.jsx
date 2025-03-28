import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useState } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";
import { toast } from "react-toastify";

import { useTranslations, useLocale } from "next-intl";


const CloseTicketButton = ({ticket_id, reloadComponentMethod, customFlag="customFlag"}) => {
	const [loadingCloseTicket, setloadingCloseTicket] = useState(false); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const [customFetch] = useCustomFetchMutation();
    const t = useTranslations('common.ticket_card.close_ticket')
	const [isSubmitedSuccess, setIsSubmitedSuccess] = useState(false)

	const locale = useLocale()


	const handleCloseTicket = async () => {
        setloadingCloseTicket(true);
        try {
          const response = await customFetch({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/tickets/${ticket_id}/close/`,
            method: 'POST', // Only use 'GET' for fetching data
            headers: {
              'Content-Type': 'application/json',
            }, 
          });
     
          if(response && response.data) {
			setIsSubmitedSuccess(true)
			if(locale === "ar"){
				toast.success("تم اغلاق التذكرة بنجاح");
			} else {
				toast.success("the ticket has been closed successfully ");
			}
            reloadComponentMethod()

          } else { 
			if(locale === "ar"){
				toast.error("هناك خطأ 1 في اغلاق التذكرة");

			} else {
				toast.error(" error1 with close the ticket ");
			}
			console.log(response) 
		
		}

        } catch (error) {
			if(locale === "ar"){
				toast.error("هناك خطأ 2 في اغلاق التذكرة");

			} else {
				toast.error(" error2 with close the ticket ");

			}

          console.error("Error fetching data:", error);
        }
        setloadingCloseTicket(false);
      };
    





	return ( <>
	
	
	<button className={`btn btn-outline-primary w-100 ${loadingCloseTicket || isSubmitedSuccess && 'disabled'} `}
                      
		onClick= { () => setIsModalOpen(true)} 
		disabled={loadingCloseTicket || isSubmitedSuccess}                    
                     
	>

		{/* {loadingCloseTicket ? 'loading..' : 'Close Ticket' } */}
		{loadingCloseTicket || isSubmitedSuccess ? t('btn_close_ticket_loading') : t('btn_close_ticket') }

					  
	</button>
	
	
	
	
	<CustomModal  
	id={`close_ticket_modal_id_${customFlag}`}
	handleSubmit={handleCloseTicket}
	submitting={loadingCloseTicket}
	// message={"Are you sure you want to close the ticket?"}
	message={t('modal_msg')}
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  
	
	
	</>

	)
}

export default CloseTicketButton