import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useState } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";
import { toast } from "react-toastify";


const ReOpenTicketButton = ({ticket_id, reloadComponentMethod}) => {
    const [loadingReOpenTicket, setloadingReOpenTicket] = useState(false); // Loading state


    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const [customFetch] = useCustomFetchMutation();



	const handleReOpenTicket = async () => {
        setloadingReOpenTicket(true);
        try {
          const response = await customFetch({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/tickets/${ticket_id}/reopen/`,
            method: 'POST', // Only use 'GET' for fetching data
            headers: {
              'Content-Type': 'application/json',
            }, 
          });
     
          if(response && response.data) {
            toast.success("the ticket has been re-opend successfully ");
            
            reloadComponentMethod()

          } else { console.log(response) 

            toast.error(" error1 with re-open the ticket ");

          }

        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error(" error2 with re-open the ticket ");

        }
        setloadingReOpenTicket(false);
      };
    







	return ( <>
	
	
	<button className={`btn btn-outline-primary w-100 ${loadingReOpenTicket && 'disabled'} `}
		onClick= { () => setIsModalOpen(true)}                      
    >

			{loadingReOpenTicket ? 'loading..' : 're-Open the Ticket' }
                        
                        
	</button>

	
	
	
	
	<CustomModal  
	id="re_open_ticket_modal_id"
	handleSubmit={handleReOpenTicket}
	submitting={loadingReOpenTicket}
	message={"Are you sure you want to re-open the ticket?"}
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  
	
	
	</>

	)
}

export default ReOpenTicketButton