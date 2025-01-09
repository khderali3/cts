
'use client'
import { useState } from "react"
  import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";


const SetNewUserPassword = ({user_id}) => {

	const [customFetch] = useCustomFetchMutation();
	
 	const [isObjUpdateing, setIsObjUpdateing] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')


	const isNotEmpty = (value) => value && value.trim() !== '';




	  const handleSubmit = async (e) => {
		e.preventDefault();
		setIsObjUpdateing(true)
		const form = new FormData();

		if(
			(password && password.trim() !== '' ) &&
			(confirmPassword && confirmPassword.trim() !== '' )			  
		){
			
		if(password.length >= 8) {
			if(password === confirmPassword){
				form.append("new_password", password);
				form.append("re_new_password", confirmPassword);

				try {
				const response = await customFetch({
					url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/users/${user_id}/set-password/`,
					method: "POST",
					body:form
				});	  
				if (response && response.data) {	
					toast.success("the user password has been updated successfully");
					setPassword('')
					setConfirmPassword('')

				} else {
					toast.error("Error set password.");
					
					console.log("Failed  1", response);
				}
				} catch (error) {
					toast.error("Error set password.");
					console.log("Failed   2", error);
				} finally{ setIsObjUpdateing(false)}




			} else{
				toast.error("the two Passwords did not match!");

			}

		}else{
			toast.error("Passwords must be at least 8 characters long!");

		}





		} else {
			toast.error("the passwords can't be empty!")
		}
		setPassword('')
		setConfirmPassword('')

	  };



 


	return(

		<div >
			<hr />
 
			<div className="mt-5"> 	  
	

				<button 
				className="btn btn-outline-secondary"
				data-bs-toggle="modal"
				data-bs-target="#SetNewPasswordModal_id" 
				>
				Set New Password
				</button>

			</div>





      {/* Modal for Editing */}
      <div
        className="modal fade"
        id="SetNewPasswordModal_id"
        tabIndex="-1"
        aria-labelledby="SetNewPasswordModal_idLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="SetNewPasswordModal_idLabel">Set New Password</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

			<form   className="   modal-body  "     >
				
				<div className="  ">
				<label htmlFor="password" className="form-label">
				Password
				</label>
				<input
					type="password"
					className="form-control"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="  ">
				<label htmlFor="confirm_password" className="form-label">
				Confirm Password
				</label>
				<input
					type="password"
					className="form-control"
					id="confirm_password"
					name="confirm_password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				</div>
			</form>


            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
				{/* {editingItemId  ? "Saveing.." : "Save Changes"} */}
				Save
               </button>
            </div>
          </div>
        </div>
      </div>












		</div>

	 
 

	)
}


export default SetNewUserPassword