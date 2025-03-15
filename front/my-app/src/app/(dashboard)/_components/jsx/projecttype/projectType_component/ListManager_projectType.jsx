'use client'
import { useState, useEffect, useRef } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify";

import CustomModal from "@/app/(dashboard)/_components/jsx/myModal";
import { AddNewProjectComponent } from "./add_new_project";

import { EditModalComponent } from "./edit_project/edit_modal";


import { useTranslations, useLocale } from "next-intl";

import { DeleteButton } from "./delete_project";

export default function ListManagerProjectType() {


    const [selectedItemToEeditId, setSelectedItemToEeditId] = useState(null);




  const [data, setdata] = useState([]);
  const [editingItem, setEditingItem] = useState({
	id:null,
	project_name:'',
	project_name_hint:'',
	project_description:'',
	project_name_ar:'',
	project_name_hint_ar:'',
	project_description_ar:'',
	main_image: '',
	is_published: false,
  });

  const t = useTranslations('dashboard.site_managment.our_product.list_manager')
  const locale = useLocale()

  const [reloadFlag, setReloadFlag] = useState(false)

  const handleReloadFlag = () => {
 	setReloadFlag(!reloadFlag)
	//  setSelectedItemToEeditId(null)
  }

  const isFirstLoad = useRef(true)



  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null);

  const [editSelectedFile, setEditSelectedFile] = useState(null)
  const editFileInputRef = useRef(null);



  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


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

			if(locale === "ar") {
				toast.success("تم تحديث المنتج بنجاح");

			} else {
				toast.success("your item been Updated ");

			}


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
			if(locale === "ar"){
				toast.error("حدث خطأ رقم 1 أثناء تحديث المنتج . يرجى المحاولة مجدداً");

			}else {
				toast.error("Error submitting form 1.");

			}

			
			if (response?.error?.data?.detail) {
				if(response.error.data.detail === "Permission denied for this operation."){
				  if(locale === "ar") {
					toast.error(" لا يوجد لديك صلاحيات للقيام بهذه العملية!");
	  
				  } else {
					toast.error(response.error.data.detail);
				  }
	  
				} 
			  } else {
				toast.error(JSON.stringify(response?.error?.data));
			  }
		}
  
	  } catch (error) {
		console.error("Error submitting form:", error);

		if(locale === "ar"){
			toast.error("حدث خطأ رقم 2 أثناء تحديث المنتج . يرجى المحاولة مجدداً");

		} else {
			toast.error("Error submitting form2.");

		}
	  }

  } else {
	if(locale === "ar"){
		toast.error("كافة الحقول مطلوبة ");

	} else {
		toast.error("Error. all fields are required ");

	}

  }


	setIditingItemId(null)
	editFileInputRef.current.value = "";
	setEditSelectedFile(null)
	  
};











		const [customFetch] = useCustomFetchMutation()


		const handleChangeEditingItem = (e) => {
			const { name, value, type, files } = e.target;
			if (type === "file") {
			  setEditSelectedFile(files[0]);
			} else {
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
	if(isFirstLoad.current){
		isFirstLoad.current = false
		return;
	}

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/`)
}, [reloadFlag]);


useEffect(() => {

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/`)
}, []);





  return (
    <div className="container mt-5">
      <h6>List item Project Type</h6>

      {/* Table Display */}
      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
				<th style={{ width: '5%' }}>#</th>
				<th style={{ width: '35%' }}>Project Name</th>
				<th style={{ width: '35%' }}  >
					Project Name (Ar)
				</th>
				<th style={{ width: '25%' }}>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index +1}</td>
              <td dir='ltr' >{item.project_name}</td>
              <td className="text-end" >{item.project_name_ar}</td>
              <td>
                <button
					className="btn btn-sm btn-primary m-2"
					onClick={	() => setSelectedItemToEeditId(item.id)}
					style={{ minWidth: '75px' }}
                >
                  
				  {editingItemId === item.id ?  t('editing') : t('edit') }
                </button>



				<DeleteButton item_id={item.id} handleReloadFlag={handleReloadFlag}/>  

              </td>
            </tr>
          ))}
        </tbody>
      </table>



	  <AddNewProjectComponent handleReloadFlag={handleReloadFlag} />






	  <CustomModal  
		id="list_manager_Product"
		handleSubmit={ () =>   deleteItem(itemIdToDelete)}
		submitting={deletingItemId}
		message={t('modal_del_msg')}
		operationType = "Delete"
		showModal={true} 
		isModalOpen={isModalOpen}
		setIsModalOpen={setIsModalOpen}

		/>  




		{selectedItemToEeditId && 
		<EditModalComponent
		 id={selectedItemToEeditId}
		 onClose={() => setSelectedItemToEeditId(null)} 
		 handleReloadFlag={ handleReloadFlag }
		 />}



    </div>





  );
}
