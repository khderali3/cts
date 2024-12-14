'use client'
import { useState, useEffect, useRef } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify";

import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";






export default function ListManagerProduct() {
  const [data, setdata] = useState([]);
  const [editingItem, setEditingItem] = useState({
	id:null,
	prod_name:'',
	prod_name_hint:'',
	prod_details:'',
	prod_name_ar:'',
	prod_name_hint_ar:'',
	prod_details_ar:'',
	prod_image: ''
  });

  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null);

  const [editSelectedFile, setEditSelectedFile] = useState(null)
  const editFileInputRef = useRef(null);



  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


  const [addingItem, setAddingItem] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null); // Track which item is being deleted

  const [editingItemId, setIditingItemId] = useState(null);  
  const [itemIdToDelete, setItemIdToDelete] = useState(null)


  const handleEditingItem = async (e) => {
	// setAddingItem(true);
	e.preventDefault();
	setIditingItemId(editingItem.id)
	const form = new FormData();

	for (const key in editingItem) {
		if (editingItem.hasOwnProperty(key)) {
			if(key !== 'id' && key !== 'prod_image') {
				form.append(key, editingItem[key]);
			}

		}}

	if(editSelectedFile instanceof File  ) {
		form.append("prod_image", editSelectedFile);
	}

	if (
		
	(editingItem.prod_name && editingItem.prod_name.trim() !== '') &&
	(editingItem.prod_name_hint && editingItem.prod_name_hint.trim() !== '') &&
	(editingItem.prod_details && editingItem.prod_details.trim() !== '')&&
	(editingItem.prod_name_ar && editingItem.prod_name_ar.trim() !== '')&&
	(editingItem.prod_name_hint_ar && editingItem.prod_name_hint_ar.trim() !== '')&&
	(editingItem.prod_details_ar && editingItem.prod_details_ar.trim() !== '')


  ){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/${editingItem.id}/`,
		  method: "PUT",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your item been Updated ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/`)
		  setEditingItem({
			id:null,
			prod_name:'',
			prod_name_hint:'',
			prod_details:'',
			prod_name_ar:'',
			prod_name_hint_ar:'',
			prod_details_ar:'',
			})
		} else{

		  toast.error("Error submitting form 1.");
		}
  
	  } catch (error) {
		console.error("Error submitting form:", error);
		toast.error("Error submitting form2.");
	  }

  } else {
	toast.error("Error. all fields are required ");

  }


	setIditingItemId(null)
	editFileInputRef.current.value = "";
	setEditSelectedFile(null)
	  
};











  const [customFetch] = useCustomFetchMutation()
	const [newItem, setNewItem] = useState({
		prod_name:'',
		prod_name_hint:'',
		prod_details:'',
		prod_name_ar:'',
		prod_name_hint_ar:'',
		prod_details_ar:'',
	})

	const isButtonDisabled = Object.values(newItem).some((value) => value.trim() === "");

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
		  // If the input is a file, update the selectedFile state
		  setSelectedFile(files[0]);
		} else {
		  // If the input is not a file, update the data state
		  setNewItem((prevState) => ({
			...prevState,
			[name]: value,
		  }));
		}


		}


		const handleChangeEditingItem = (e) => {
			// const { name, value } = e.target;
			// setEditingItem((prevState) => ({
			// 	...prevState,
			// 	[name]: value,
			//   }));

			const { name, value, type, files } = e.target;

			if (type === "file") {
			  // If the input is a file, update the selectedFile state
			  setEditSelectedFile(files[0]);
			} else {
			  // If the input is not a file, update the data state
			  setEditingItem((prevState) => ({
				...prevState,
				[name]: value,
			  }));
			}


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

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/`)
}, []);




const handleaddItem = async (e) => {
	setAddingItem(true);
	e.preventDefault();
	const form = new FormData();

	for (const key in newItem) {
		if (newItem.hasOwnProperty(key)) {
			form.append(key, newItem[key]);
		}}


	if(selectedFile instanceof File  ) {
		form.append("prod_image", selectedFile);
	}






	if (

		(newItem.prod_name && newItem.prod_name.trim() !== '') &&
		(newItem.prod_name_hint && newItem.prod_name_hint.trim() !== '') &&
		(newItem.prod_details && newItem.prod_details.trim() !== '') &&
		(newItem.prod_name_ar && newItem.prod_name_ar.trim() !== '') &&
		(newItem.prod_name_hint_ar && newItem.prod_name_hint_ar.trim() !== '') &&
		(newItem.prod_details_ar && newItem.prod_details_ar.trim() !== '') 
  ){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/`,
		  method: "POST",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your item been Added ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/`)
			setNewItem({
				prod_name:'',
				prod_name_hint:'',
				prod_details:'',
				prod_name_ar:'',
				prod_name_hint_ar:'',
				prod_details_ar:'',
			})
			

		} else{
		  console.log(response)
		  toast.error("Error submitting form 1.");
		}
  
	  } catch (error) {
		console.error("Error submitting form:", error);
		toast.error("Error submitting form2.");
	  }

  } else {
	toast.error("Error. all fields are required ");

  }

	setAddingItem(false);
	fileInputRef.current.value = "";
	setSelectedFile(null)
};



  // Delete item
  const deleteItem = async (id) => {
	setDeletingItemId(id)
	const response = await customFetch({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/${id}`,
		method: 'DELETE',  
		headers: {
		  'Content-Type': 'application/json',
		}, 
	  });
 
	  if( response && response.data) {
		fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/product/`);
		setIsModalOpen(false);

	  }

	  setDeletingItemId(null)



  };

  return (
    <div className="container mt-5">
      <h6>Manage List Products</h6>

      {/* Table Display */}
      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
				<th style={{ width: '5%' }}>#</th>
				<th style={{ width: '35%' }}>Content</th>
				<th style={{ width: '35%' }}  >
				Content (Ar)
				</th>
				<th style={{ width: '25%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index +1}</td>
              <td>{item.prod_name}</td>
              <td className="text-end" >{item.prod_name_ar}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary m-2"
					onClick={() => {
						setEditingItem({
							id:item.id,
							prod_name:item.prod_name,
							prod_name_hint: item.prod_name_hint,
							prod_details:item.prod_details,
							prod_name_ar:item.prod_name_ar,
							prod_name_hint_ar:item.prod_name_hint_ar,
							prod_details_ar:item.prod_details_ar,
							prod_image:item.prod_image,
							
							}
						)
					}}

                  data-bs-toggle="modal"
                  data-bs-target="#editModal_product"
				  style={{ minWidth: '75px' }}
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
				  style={{ minWidth: '75px' }}
                >
                  {deletingItemId === item.id ? "Deleting " : "Delete"}
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
				<label htmlFor="prod_name" className="form-label">
				Product Name
				</label>
				<input
					type="text"
					className="form-control"
					id="prod_name"
					name="prod_name"
					value={newItem?.prod_name  || ""}
					onChange={handleChange}


				/>
			</div>


			<div className="mb-3">
				<label htmlFor="prod_name_hint" className="form-label">
				Product Name 'hint'
				</label>
				<input
					type="text"
					className="form-control"
					id="prod_name_hint"
					name="prod_name_hint"
					value={newItem?.prod_name_hint  || ""}
					onChange={handleChange}


				/>
			</div>

			<div className="mb-3">
				<label htmlFor="prod_details" className="form-label">
				Product Details
				</label>
				<textarea 
					className="form-control" 
					rows="3"
					id="prod_details"
					name="prod_details"
					value={newItem?.prod_details  || ""}
					onChange={handleChange}

				>

				</textarea>

			</div>



			
			<div className="mb-3">
				<label htmlFor="prod_name_ar" className="form-label">
				Product Name (Ar)
				</label>
				<input
					type="text"
					className="form-control text-end"
					dir="rtl"
					id="prod_name_ar"
					name="prod_name_ar"
					value={newItem?.prod_name_ar  || ""}
					onChange={handleChange}


				/>
			</div>


			<div className="mb-3">
				<label htmlFor="prod_name_hint_ar" className="form-label">
				Product Name 'hint' (Ar)
				</label>
				<input
					type="text"
					className="form-control text-end"
					dir='rtl'
					id="prod_name_hint_ar"
					name="prod_name_hint_ar"
					value={newItem?.prod_name_hint_ar  || ""}
					onChange={handleChange}


				/>
			</div>

			<div className="mb-3">
				<label htmlFor="prod_details_ar" className="form-label">
				Product Details (Ar)
				</label>
				<textarea 
					className="form-control text-end"
					dir='rtl' 
					rows="3"
					id="prod_details_ar"
					name="prod_details_ar"
					value={newItem?.prod_details_ar  || ""}
					onChange={handleChange}

				>

				</textarea>

			</div>



            <div className="mb-3">
              <label htmlFor="prod_image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                id="prod_image"
                name="prod_image"                
                onChange={handleChange}
				ref={fileInputRef}
              />
              {newItem?.prod_image &&  <a href={newItem?.prod_image}>  Current Image  </a> }
             
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
        className="modal fade modal-lg "
        id="editModal_product"
        tabIndex="-1"
        aria-labelledby="editModal_productLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog   ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModal_productLabel">Edit Item</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>




			<form   className="   modal-body    "     >

			
			<div className="mb-3">
				<label htmlFor="prod_name" className="form-label">
				Product Name
				</label>
				<input
					type="text"
					className="form-control"
					id="prod_name"
					name="prod_name"
					value={editingItem?.prod_name  || ""}
					onChange={handleChangeEditingItem}


				/>
			</div>





			<div className="mb-3">
				<label htmlFor="prod_name_hint" className="form-label">
				Product Name 'hint'
				</label>
				<input
					type="text"
					className="form-control"
					id="prod_name_hint"
					name="prod_name_hint"
					value={editingItem?.prod_name_hint  || ""}
					onChange={handleChangeEditingItem}


				/>
			</div>

			<div className="mb-3">
				<label htmlFor="prod_details" className="form-label">
				Product Details
				</label>
				<textarea 
					className="form-control" 
					rows="3"
					id="prod_details"
					name="prod_details"
					value={editingItem?.prod_details  || ""}
					onChange={handleChangeEditingItem}

				>

				</textarea>

			</div>



			
			<div className="mb-3">
				<label htmlFor="prod_name_ar" className="form-label">
				Product Name (Ar)
				</label>
				<input
					type="text"
					className="form-control text-end"
					dir="rtl"
					id="prod_name_ar"
					name="prod_name_ar"
					value={editingItem?.prod_name_ar  || ""}
					onChange={handleChangeEditingItem}


				/>
			</div>


			<div className="mb-3">
				<label htmlFor="prod_name_hint_ar" className="form-label">
				Product Name 'hint' (Ar)
				</label>
				<input
					type="text"
					className="form-control text-end"
					dir='rtl'
					id="prod_name_hint_ar"
					name="prod_name_hint_ar"
					value={editingItem?.prod_name_hint_ar  || ""}
					onChange={handleChangeEditingItem}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="prod_details_ar" className="form-label">
				Product Details (Ar)
				</label>
				<textarea 
					className="form-control text-end"
					dir='rtl' 
					rows="3"
					id="prod_details_ar"
					name="prod_details_ar"
					value={editingItem?.prod_details_ar  || ""}
					onChange={handleChangeEditingItem}

				>

				</textarea>

			</div>



            <div className="mb-3">
              <label htmlFor="prod_image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                id="prod_image"
                name="prod_image"                
                onChange={handleChangeEditingItem}
				ref={editFileInputRef}
              />
              {editingItem?.prod_image &&  <a href={editingItem?.prod_image}>  Current Image  </a> }
             
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
		id="list_manager_Product"
		handleSubmit={ () =>   deleteItem(itemIdToDelete)}
		submitting={deletingItemId}
		message={"Are you sure you want to Delete this item ?"}
		operationType = "Delete"
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  









    </div>





  );
}
