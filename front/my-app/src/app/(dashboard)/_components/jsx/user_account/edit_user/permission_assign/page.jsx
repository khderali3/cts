
'use client'
import { useState } from "react"
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";


const PermissionAasignOrRemoveSection = ({user_id}) => {

	const [customFetch] = useCustomFetchMutation();
	
	const [canEdit, setCanEdit] = useState(false)
	const [isObjUpdateing, setIsObjUpdateing] = useState(false)

	const [allPermissions, setAllPermissions] = useState([])
	const [userPermissions, setUserPermissions] = useState([])



	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


	const handleChange = (permissionId, isChecked) => {
		if (isChecked) {
			setUserPermissions((prev) => [...prev, permissionId]);
		} else {
			setUserPermissions((prev) => prev.filter((id) => id !== permissionId));
		}
	  };


	const fetchAllPermissions = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/permissions/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			setAllPermissions(response.data);
			console.log('response.data', response.data)
		  } else {
			console.log("Failed to get permission. Please try again.", response);
		
		  }
		} catch (error) {
		  console.error("Error fetching permission:", error);
		}
	  };
	  

	  const fetchUserPermissions = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/permission/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			const permissionsIds = response.data.map((permission) => permission.id);
			setUserPermissions(permissionsIds);

 
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
		userPermissions.map((permission_id) => {
			form.append("permission[]", permission_id);

		})
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/permission/`,
			method: "POST",
			body:form
		  });	  
		  if (response && response.data) {	
			fetchUserPermissions()
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
	fetchAllPermissions()
	fetchUserPermissions()
  
}, []);




	return(

		<div>
		<hr />
		<h6> Edit User Permissions ( Staff User Only) </h6>
		<div> 	  
			<form className="  col-md-10 mb-5 "   >

			<div className="row">
 
 

				<div className="col-12"></div>
				<div className="row mt-2 "> 
 

					{allPermissions.map( (permission) => (
						

						<div key={permission.id} className="form-check col-md-2   ms-2">
							<input
								className="form-check-input"
								type="checkbox"
								name={permission?.name}
								id={`${permission?.id}_permission_id`}
								checked={userPermissions.includes(permission.id)} // Check if ID is in the list
								onChange={(e) => handleChange(permission.id, e.target.checked)}
								disabled={!canEdit}
		
							/>
							<label className="form-check-label small" htmlFor={`${permission?.id}_permission_id`}>
								{permission?.name}
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
	id="edit_user_permission_id"
	handleSubmit={handleSubmit}
	submitting={isObjUpdateing}
	message={"Are you sure you want Update this User Permissions ?"}
	operationType = "Update"
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  





	</div>

	 





	)
}


export default PermissionAasignOrRemoveSection