
import { useState, useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import Link from "next/link";
import { toast } from "react-toastify";

import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";


const FileList = ({ticket_reply_id } ) => {

	const [files, setFiles] = useState([])
	const [customFetch] = useCustomFetchMutation();
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

	const [fileIdToDelete, setFileIdToDelete] = useState(null)
	const [loadingDelete , setloadingDelete] = useState(false); // Loading state




	const handleDelete = async (file_id) => {
		setloadingDelete(true)
		try {
		  // Await the customFetch call to get the response
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/ticket_reply/files/${file_id}/`,
			method: "DELETE",
			// body: formData,  // Use FormData as the body (if needed)
		  });
	  
		  // Check if response and response.data are available
		  if (response && response.data) {
	
			toast.success('the file deleted successfuly!')
			setFileIdToDelete(null)
			fetchfiles()
	
		  } else {
			// Handle the error case if there's no data or an error in the response
			console.log("Failed to get data1 ", response);
			toast.error('error with delete file1!')

		  }
		} catch (error) {
		  // Catch any errors during the fetch operation
		  console.error("Error fetching data2:", error);
		  toast.error('error with delete file2!')

		} finally {
			setloadingDelete(false); // Stop loading spinner
 
		  }
	  };
	  
	


	const fetchfiles = async () => {
		try {
		  // Await the customFetch call to get the response
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/ticket_reply/${ticket_reply_id}/files/`,
			method: "GET",
			// body: formData,  // Use FormData as the body (if needed)
		  });
	  
		  // Check if response and response.data are available
		  if (response && response.data) {
	
			setFiles(response.data);
	
		  } else {
			// Handle the error case if there's no data or an error in the response
			console.log("Failed to get data1 ", response);
		  }
		} catch (error) {
		  // Catch any errors during the fetch operation
		  console.error("Error fetching data2:", error);
		}
	  };
	  
	



useEffect(() => {
    
	fetchfiles()
}, []);



    return (
        <div className="mb-3">
            <label className="form-label">Attached Files</label>
            <ul className="list-group  ">
                {files.map((file) => (
					<li
					key={file.id}
					className="list-group-item d-flex justify-content-between align-items-start mb-2 flex-wrap ps-2"
					>
						<span className=" ">
							<Link
							href={file.ticket_replay_file}
							target="_blank"
							rel="noopener noreferrer"
							className="text-decoration-none"
							>
							 {file.ticket_replay_file_name} 
							</Link>
						</span>
						<button
							type="button"
							className="btn btn-outline-danger btn-sm   mt-md-0   ms-auto"
							onClick= { () => {
								setFileIdToDelete(file?.id)
								setIsModalOpen(true)
							}}
						>
					       {loadingDelete && fileIdToDelete === file.id ?  'Deleting...' : 'Delete' }  
					</button>
					</li>
		
		

                ))}
            </ul>



	<CustomModal  
	id="delete_ticket_modal_id"
	handleSubmit={() => handleDelete(fileIdToDelete)}
	submitting={loadingDelete}
	message={"Are you sure you want to delete this file ?"}
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}
	operationType="Delete"

	/>  




        </div>
    );
};

export default FileList;
