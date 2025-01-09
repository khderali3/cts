import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useState } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const DeleteTicketButton = ({ticket_id, customFlag="customFlag"}) => {
	const [loadingDeleteTicket, setloadingDeleteTicket] = useState(false); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const [customFetch] = useCustomFetchMutation();
	const router = useRouter()


	const handleDelteTicket = async () => {
        setloadingDeleteTicket(true);
        try {
          const response = await customFetch({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/tickets/${ticket_id}/`,
            method: 'DELETE', // Only use 'GET' for fetching data
            headers: {
              'Content-Type': 'application/json',
            }, 
          });
     
          if(response && response.data) {
			router.push('/staff/ticket')
			toast.success("the ticket has been deleted successfully ");


          } else { 
			toast.error(" error1 with delete the ticket ");

			console.log(response) 
		
		}

        } catch (error) {
			toast.error(" error2 with delete the ticket ");

          console.error("error2 with delete the ticket:", error);
        }
        setloadingDeleteTicket(false);
      };
    





	return ( <>
	
	
	<button className={`btn btn-outline-danger w-100 ${loadingDeleteTicket && 'disabled'} `}
                      
		onClick= { () => setIsModalOpen(true)}                      
	>

		{loadingDeleteTicket ? 'loading..' : 'Delete Ticket' }

					  
	</button>
	
	
	
	
	<CustomModal  
	id={`delete_ticket_modal_id_${customFlag}`}
	handleSubmit={handleDelteTicket}
	submitting={loadingDeleteTicket}
	message={"Are you sure you want to delete this ticket ?"}
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}
	operationType="Delete"

	/>  
	
	
	</>

	)
}

export default DeleteTicketButton