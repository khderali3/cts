
'use client'
import { useState } from "react"
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";


const GroupAasignOrRemoveSection = ({user_id}) => {

	const [customFetch] = useCustomFetchMutation();
	
	const [canEdit, setCanEdit] = useState(false)
	const [isObjUpdateing, setIsObjUpdateing] = useState(false)

	const [allGroups, setAllGroups] = useState([])
	const [userGroups, setUserGroups] = useState([])



	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


	const handleChange = (groupsId, isChecked) => {
		if (isChecked) {
			setUserGroups((prev) => [...prev, groupsId]);
		} else {
			setUserGroups((prev) => prev.filter((id) => id !== groupsId));
		}
	  };


	const fetchAllGroups = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			setAllGroups(response.data);
			console.log('response.data', response.data)
		  } else {
			console.log("Failed to get groups. Please try again.", response);
		
		  }
		} catch (error) {
		  console.error("Error fetching departments:", error);
		}
	  };
	  

	  const fetchUserGroups = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/group/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			const groupIds = response.data.map((group) => group.id);
			setUserGroups(groupIds);

 
		  } else {
			console.log("Failed to get departments. Please try again.");
		  }
		} catch (error) {
		  console.error("Error fetching departments:", error);
		}
	  };




	  const handleSubmit = async (e) => {
		e.preventDefault();
		setIsObjUpdateing(true)
		const form = new FormData();
		userGroups.map((group_id) => {
			form.append("group[]", group_id);

		})
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/group/`,
			method: "POST",
			body:form
		  });	  
		  if (response && response.data) {	
			fetchUserGroups()
			toast.success("the user Groups has been updated succussfuly!");
			setCanEdit(false)
 
		  } else {
			toast.error("Error submitting form.");
			
			console.log("Failed to update user 1", response);
		  }
		} catch (error) {
			toast.error("Error submitting form.");			
			console.log("Failed to update user 2");
		} finally{ setIsObjUpdateing(false)}
	  };




useEffect(() => {
	fetchAllGroups()
	fetchUserGroups()
  
}, []);




	return(

		<div>
		<hr />
		<h6> Edit User Groups ( Staff User Only) </h6>
		<div> 	  
			<form className="  col-md-10 mb-5 "   >

			<div className="row">
 
 

				<div className="col-12"></div>
				<div className="row mt-2 "> 
 

					{allGroups.map( (group) => (
						

						<div key={group.id} className="form-check col-md-2   ms-2">
							<input
								className="form-check-input"
								type="checkbox"
								name={group?.name}
								id={`${group?.id}_group_id`}
								checked={userGroups.includes(group.id)} // Check if ID is in the list
								onChange={(e) => handleChange(group.id, e.target.checked)}
								disabled={!canEdit}
		
							/>
							<label className="form-check-label small" htmlFor={`${group?.id}_group_id`}>
								{group?.name}
							</label>
						</div>
					) )}
 



				</div>


			</div>

 
			</form>

			{ canEdit ?
		
			<> 
			<button  
			// onClick={ handleSubmit }
			onClick={setIsModalOpen}
			style={{ width: '75px' }}  className="btn btn-primary btn-sm "
			disabled={isObjUpdateing}
			
			>  
			{isObjUpdateing ? 'Updating..' : 'Update' }     
			</button>



			<button onClick={()=> setCanEdit(false)} style={{ width: '75px' }}   className="btn btn-secondary btn-sm  ms-2 ">  
			Cancel
			</button>
			</>


			:  
			
			<button onClick={()=> setCanEdit(true)} style={{ width: '75px' }}   className="btn btn-outline-primary btn-sm  ">  
			Edit
			</button>

			}



		</div>



	<CustomModal  
	id="edit_user_group_id"
	handleSubmit={handleSubmit}
	submitting={isObjUpdateing}
	message={"Are you sure you want Update this User Groups ?"}
	operationType = "Update"
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  





	</div>

	 





	)
}


export default GroupAasignOrRemoveSection