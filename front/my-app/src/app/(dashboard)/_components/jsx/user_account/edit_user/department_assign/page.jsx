
'use client'
import { useState } from "react"
import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";


const DepartmentAasignOrRemoveSection = ({user_id}) => {

	const [customFetch] = useCustomFetchMutation();
	
	const [canEdit, setCanEdit] = useState(false)
	const [isObjUpdateing, setIsObjUpdateing] = useState(false)
	const [allDepartments, setAllDepartments] = useState([])
	const [userDepartment, setUserDepartment] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


	const handleChange = (departmentId, isChecked) => {
		if (isChecked) {
		  setUserDepartment((prev) => [...prev, departmentId]);
		} else {
		  setUserDepartment((prev) => prev.filter((id) => id !== departmentId));
		}
	  };


	const fetchAllDepartments = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/ticket/departments/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			setAllDepartments(response.data);
			console.log('response.data', response.data)
		  } else {
			console.log("Failed to get departments. Please try again.");
		  }
		} catch (error) {
		  console.error("Error fetching departments:", error);
		}
	  };
	  

	  const fetchUserDepartments = async () => {
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/department/`,
			method: "GET",
		  });	  
		  if (response && response.data) {	
			const departmentIds = response.data.map((department) => department.id);
			setUserDepartment(departmentIds);

 
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
		userDepartment.map((department_id) => {
			form.append("department[]", department_id);

		})
		try {
		  const response = await customFetch({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/department/`,
			method: "POST",
			body:form
		  });	  
		  if (response && response.data) {	
			fetchUserDepartments()
			toast.success("the user Departments has been updated succussfuly!");
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
	fetchAllDepartments()
	fetchUserDepartments()
  
}, []);




	return(

		<div>
		<hr />
		<h6> Edit User Departments </h6>
		<div> 	  
			<form className="  col-md-10 mb-5 "   >

			<div className="row">
 
 

				<div className="col-12"></div>
				<div className="row mt-2 "> 
 

					{allDepartments.map( (department) => (
						

						<div key={department.id} className="form-check col-md-2   ms-2">
							<input
								className="form-check-input  "
								type="checkbox"
								name={department?.department_name}
								id={`${department.id}_department_id`}
								// onChange={handleChange}

								checked={userDepartment.includes(department.id)} // Check if ID is in the list
								onChange={(e) => handleChange(department.id, e.target.checked)}



								disabled={!canEdit}
		
							/>
							<label className="form-check-label small" htmlFor={`${department.id}_department_id`}>
								{department?.department_name}
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
	id="edit_user_department_id"
	handleSubmit={handleSubmit}
	submitting={isObjUpdateing}
	message={"Are you sure you want Update this User Department ?"}
	operationType = "Update"
	showModal={true} 
	isModalOpen={isModalOpen}
	setIsModalOpen={setIsModalOpen}

	/>  





	</div>

	 





	)
}


export default DepartmentAasignOrRemoveSection