'use client'
import { useState, useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify";

import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";






export default function ListManagerFeatureWhyUs() {
  const [data, setdata] = useState([]);
  const [editingItem, setEditingItem] = useState({
	id:null,
	feat_whyus_title:'',
	feat_whyus_title_ar:''
  });



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
			if(key !== 'id') {
				form.append(key, editingItem[key]);
				console.log('key is' , key)
			}

		}}

	if (
		
	(editingItem.feat_whyus_title && editingItem.feat_whyus_title.trim() !== '') &&
	(editingItem.feat_whyus_title_ar && editingItem.feat_whyus_title_ar.trim() !== '')


  ){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/${editingItem.id}/`,
		  method: "PUT",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your item been Updated ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/`)
		  setEditingItem({
					id:null,
					feat_whyus_title:'',
					feat_whyus_title_ar:''
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

//   setAddingItem(false);
	setIditingItemId(null)

	  
};











  const [customFetch] = useCustomFetchMutation()
	const [newItem, setNewItem] = useState({
		feat_whyus_title: '',
		feat_whyus_title_ar:''
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

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/`)
}, []);




const handleaddItem = async (e) => {
	setAddingItem(true);
	e.preventDefault();
	const form = new FormData();

	for (const key in newItem) {
		if (newItem.hasOwnProperty(key)) {
			form.append(key, newItem[key]);
			console.log('apend data is', key, newItem[key] )
		}}

	if (newItem.feat_whyus_title.trim() !== '' 
	&& newItem.feat_whyus_title_ar.trim() !== ''

  ){ 
	try {

		const response = await customFetch({
		  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/`,
		  method: "POST",
		  body: form, // Send FormData as the body
		});
  
		if( response && response.data){
		  toast.success("your item been Added ");
		  fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/`)
			setNewItem({
				feat_whyus_title: '',
				feat_whyus_title_ar:''
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
	  
};



  // Delete item
  const deleteItem = async (id) => {
	setDeletingItemId(id)
	const response = await customFetch({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/${id}`,
		method: 'DELETE', // Only use 'GET' for fetching data
		headers: {
		  'Content-Type': 'application/json',
		}, 
	  });
 
	  if( response && response.data) {
		fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/site/feature_why_us/`);
		setIsModalOpen(false);
	  }

	  setDeletingItemId(null)

  };

  return (
    <div className="container mt-5">
      <h6>Manage List Items Why us</h6>

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
              <td>{item.feat_whyus_title}</td>
              <td className="text-end" >{item.feat_whyus_title_ar}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary m-2"
					onClick={() => {
						setEditingItem({
							id:item.id,
							feat_whyus_title:item.feat_whyus_title,
							feat_whyus_title_ar:item.feat_whyus_title_ar
							}
						)
					}}

                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
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
		<label htmlFor="feat_whyus_title" className="form-label">
		Content
		</label>
		<input
			type="text"
			className="form-control"
			id="feat_whyus_title"
			name="feat_whyus_title"
			value={newItem?.feat_whyus_title  || ""}
			onChange={handleChange}


		/>
		</div>


		<div className="mb-3">
		<label htmlFor="feat_whyus_title_ar" className="form-label">
		Content (Ar)
		</label>
		<input
			type="text"
			className="form-control text-end"
			id="feat_whyus_title_ar"
			dir="rtl"

			name="feat_whyus_title_ar"
			value={newItem?.feat_whyus_title_ar  || ""}
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
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Item</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>




			<form   className="   modal-body  "     >

					
					
				<div className="  ">
				<label htmlFor="feat_whyus_title" className="form-label">
				Content
				</label>
				<input
					type="text"
					className="form-control"
					id="feat_whyus_title"
					name="feat_whyus_title"
					value={editingItem?.feat_whyus_title  || ""}
					onChange={handleChangeEditingItem}


				/>
				</div>


				<div className="mb-3">
				<label htmlFor="feat_whyus_title_ar" className="form-label">
				Content (Ar)  
				</label>
				<input
					type="text"
					className="form-control text-end "
					id="feat_whyus_title_ar"
					dir="rtl"

					name="feat_whyus_title_ar"
					value={editingItem?.feat_whyus_title_ar  || ""}
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
		id="list_manager_why_us"
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
