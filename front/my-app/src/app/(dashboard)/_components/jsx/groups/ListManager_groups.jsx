'use client'
import { useState, useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify";

import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";

import { useRouter } from "next/navigation";




export default function ListManagerGroups() {
  const [data, setdata] = useState([]);
	const router = useRouter()

  const [editingItem, setEditingItem] = useState({
	id:null,
	name:'',
  });



  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [customFetch] = useCustomFetchMutation()


  const [addingItem, setAddingItem] = useState(false)

  const [deletingItemId, setDeletingItemId] = useState(null); // Track which item is being deleted
  const [itemIdToDelete, setItemIdToDelete] = useState(null)

  const [editingItemId, setIditingItemId] = useState(null);  


  const handleEditingItem = async (e) => {
	// setAddingItem(true);
	e.preventDefault();
	setIditingItemId(editingItem.id)
	const form = new FormData();

	for (const key in editingItem) {
		if (editingItem.hasOwnProperty(key)) {
			if(key !== 'id') {
				form.append(key, editingItem[key]);
 			}

		}}

	if (editingItem.name && editingItem.name.trim() !== ''){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/${editingItem.id}/`,
		  method: "PUT",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your item been Updated ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`)
		  setEditingItem({
					id:null,
					name:''
				})
		} else{
		  console.log(response)
		  toast.error("Error submitting form 1.");
		}
  
	  } catch (error) {
		console.error("Error submitting form:", error);
		toast.error("Error submitting form2.");
	  } finally{setIditingItemId(null)}

  } else {
	toast.error("Error. all fields are required ");

  }

 
	setIditingItemId(null)

	  
};

 


	const [newItem, setNewItem] = useState({
		name:'',
	})

	const isButtonDisabled = Object.values(newItem).some((value) => value.trim() === "");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewItem((prevState) => ({
			...prevState,
			[name]: value,
		  }));
		}


		const handleChangeEditingItem = (e) => {
			const { name, value } = e.target;
			setEditingItem((prevState) => ({
				...prevState,
				[name]: value,
			  }));
			}



const fetchData = async (pageUrl) => {
	try {
	  const response = await customFetch({
		url: pageUrl,
		method: 'GET', // Only use 'GET' for fetching data
		headers: {
		  'Content-Type': 'application/json',
		}, 
	  });
 
	  if( response && response.data) {
		setdata(response.data)

	  }


	} catch (error) {
	  console.error("Error fetching data:", error);
	}
  };

  useEffect(() => {

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`)
}, []);




const handleaddItem = async (e) => {
	setAddingItem(true);
	e.preventDefault();
	const form = new FormData();

	for (const key in newItem) {
		if (newItem.hasOwnProperty(key)) {
			form.append(key, newItem[key]);
		}}

	if ( newItem.name &&   newItem.name.trim() !== '' ){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`,
		  method: "POST",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your group has been Added ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`)
			setNewItem({
				name:'',
			})
		} else{
		  console.log(response)
		  toast.error("Error submitting form 1.");
		}
  
	  } catch (error) {
		console.error("Error submitting form:", error);
		toast.error("Error submitting form2.");
	  } finally{ setAddingItem(false);}

  } else {
	toast.error("Error. all fields are required ");

  }

  setAddingItem(false);
	  
};



  // Delete item
  const deleteItem = async (id) => {
	setDeletingItemId(id)
	const response = await customFetch({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/${id}/`,
		method: 'DELETE',  
		headers: {
		  'Content-Type': 'application/json',
		}, 
	  });
 
	  if( response && response.data) {
		fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/usersmanagment/group/`);

	  }

	  setDeletingItemId(null)
  };

  return (
    <div className="container  ">
		<hr />
      <h6>Manage List Items Groups</h6>

      {/* Table Display */}
      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
				<th style={{ width: '5%' }}>#</th>
				<th style={{ width: '35%' }}>Group Name</th>
 
				<th style={{ width: '25%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index +1}</td>
              <td>
				 {item.name} 
               </td>
               <td>
                <button
                  className="btn btn-sm btn-primary m-2"
					onClick={() => {
						setEditingItem({
							id:item.id,
							name:item.name
							}
						)
					}}

                  data-bs-toggle="modal"
                  data-bs-target="#editModal_group"
				  style={{ minWidth: '90px' }}
				  >
                  
				  {editingItemId === item.id ? "Editing..." : "Edit"}
                </button>




                <button
                  className="btn btn-sm btn-danger m-2"
					onClick= { () => {
						setItemIdToDelete(item.id)
						setIsModalOpen(true)
					
					}}

				  disabled={deletingItemId === item.id}
				  style={{ minWidth: '90px' }}
				  >
                   {deletingItemId === item.id ? "Deleting " : "Delete"} 

                 </button>

				 <button
                  className="btn btn-sm btn-secondary m-2"
 
 				  style={{ minWidth: '90px' }}
				  onClick={() => router.push(`/staff/groups/${item?.id}`)}

                >
                   Permissions

                 </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>


		{/* form */ }
		<div className="mb-3">

		<form   className="    "     >

          
           
		<div className="mb-3">
			<label htmlFor="name" className="form-label">
			Group Name
			</label>
			<input
				type="text"
				className="form-control"
				id="name"
				name="name"
				value={newItem?.name }
				onChange={handleChange}
			/>
		</div>
 








		<button
			className="btn btn-success mt-2"
			onClick={handleaddItem}
			disabled={isButtonDisabled || addingItem }
		>

			{addingItem ? 'adding...' : 'Add Item'}
		</button>



		</form>


		</div>

		{/* end form */}





      {/* Modal for Editing */}
      <div
        className="modal fade"
        id="editModal_group"
        tabIndex="-1"
        aria-labelledby="editModal_groupLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModal_groupLabel">Edit Item</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>




			<form   className="   modal-body  "     >


					
				<div className="  ">
				<label htmlFor="name" className="form-label">
				Group Name
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					name="name"
					value={editingItem.name}
					onChange={handleChangeEditingItem}


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
                onClick={handleEditingItem}
                data-bs-dismiss="modal"
              >
				{editingItemId  ? "Saveing.." : "Save Changes"}
               </button>
            </div>
          </div>
        </div>
      </div>



	  <CustomModal  
		id="list_manager_group_delete"
		handleSubmit={ () =>   deleteItem(itemIdToDelete)}
		submitting={deletingItemId}
		message={"Are you sure you want to Delete this group ?"}
		operationType = "Delete"
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  









    </div>





  );
}
