'use client'
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";






const DeleteUserButton = ({user_id}) => {
	const route = useRouter()
	const [customFetch] = useCustomFetchMutation();
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async ( ) => {
		setIsDeleting(true);
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/`,
			method: 'DELETE',
			headers: {
			  'Content-Type': 'application/json',
			},
		  });
	  
		  if (response && response.data) {
			toast.success('the user has been deleted successfully!')
			route.push('/staff/users');
		  } else {
			toast.error('error 1 with delete user!')
			console.log('error1', response)
		  }
		} catch (error) {
		  toast.error('error 2 with delete user!')
	
		  console.error("Error 2 deleting user:", error);
		} finally {
		  setIsDeleting(false);
		}
	  };
	  
	
	

	return (
		<> 
		<a
			href="#"
			
			className={`text-danger`} 

			title="Delete"
			onClick={ (e) => {
				e.preventDefault(); 
				setIsModalOpen(true)

				
			} }                                 
		>
			<i className="bi bi-trash-fill"></i>
		</a>


		<CustomModal  
		id="delete_user_id"
		handleSubmit={ handleDelete}
		submitting={isDeleting}
		message={"Are you sure you want to Delete this User ?"}
		operationType = "Delete"
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  

	</>
		
	)
 
}

export default DeleteUserButton