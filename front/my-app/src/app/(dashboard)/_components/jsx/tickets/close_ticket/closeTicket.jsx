import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useState } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";
import { toast } from "react-toastify";



const CloseTicketButton = ({ticket_id, reloadComponentMethod}) => {
	const [loadingCloseTicket, setloadingCloseTicket] = useState(false); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const [customFetch] = useCustomFetchMutation();



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
			toast.success("the ticket has been closed successfully ");

            reloadComponentMethod()

          } else { 
			toast.error(" error1 with close the ticket ");

			console.log(response) 
		
		}

        } catch (error) {
			toast.error(" error2 with close the ticket ");

          console.error("Error fetching data:", error);
        }
        setloadingCloseTicket(false);
      };
    





	return ( <>
	
	
	<button className={`btn btn-outline-primary w-100 ${loadingCloseTicket && 'disabled'} `}
                      
		onClick= { () => setIsModalOpen(true)}                      
	>

		{loadingCloseTicket ? 'loading..' : 'Close Ticket' }

					  
	</button>
	
	
	
	
	<CustomModal  
	id="close_ticket_modal_id"
	handleSubmit={handleCloseTicket}
	submitting={loadingCloseTicket}
	message={"Are you sure you want to close the ticket?"}
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  
	
	
	</>

	)
}

export default CloseTicketButton