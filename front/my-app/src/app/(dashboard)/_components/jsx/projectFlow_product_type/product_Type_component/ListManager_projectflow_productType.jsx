'use client'
import { useState, useEffect, useRef } from "react";
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify";

  
 
import { AddNewObject } from "./add_new_object";


 
import { EditModalComponent } from "./edit_object/edit_modal";



import { useTranslations, useLocale } from "next-intl";
 

import { DeleteButton } from "./delete_object";




import Link from "next/link";

export default function ListManagerProjectFlowProductType() {


    const [selectedItemToEeditId, setSelectedItemToEeditId] = useState(null);




  const [data, setdata] = useState([]);
 
 

  const t = useTranslations('dashboard.projectFlow.projectType.projectTypeSection')
  const locale = useLocale()

  const [reloadFlag, setReloadFlag] = useState(false)

  const handleReloadFlag = () => {
 	setReloadFlag(!reloadFlag)
   }

  const isFirstLoad = useRef(true)

   

	const [customFetch] = useCustomFetchMutation()

 


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

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/installed_product_type/`)
}, [reloadFlag]);


useEffect(() => {

	fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/projectflow/installed_product_type/`)
}, []);





  return (
    <div className="container mt-5">
      <h6>List item Installed Product Type</h6>

 
		
		<div className="table-responsive">
		<table className="table table-bordered table-sm align-middle text-wrap mt-4 w-100">
			<thead className="table-light">
			<tr>
				<th className="small">#</th>
				<th className="small">Product Type Name</th>
				<th className="small">Product Type Name (Ar)</th>
				<th className="small">Private Note</th>
				<th className="small">{t('actions')}</th>
			</tr>
			</thead>
			<tbody>
			{data && data.length > 0 ? (
				data.map((item, index) => (
				<tr key={item.id}>
					<td className="small">{index + 1}</td>
					<td dir="ltr" className="small">{item.product_name}</td>
					<td className="text-end small">{item.product_name_ar}</td>
					<td className="text-end small">{item.private_note}</td>
					<td className="text-nowrap small">
					<Link
						href="#"
						onClick={(e) => {
						e.preventDefault();
						setSelectedItemToEeditId(item.id);
						}}
						className="text-primary mx-2"
						title="Edit"
					>
						<i className="bi bi-pencil-fill"></i>
					</Link>
					<DeleteButton item_id={item.id} handleReloadFlag={handleReloadFlag} />
					</td>
				</tr>
				))
			) : (
				<tr>
				<td colSpan="5" className="text-center text-muted small py-3">
					No product installed type available
				</td>
				</tr>
			)}
			</tbody>
		</table>
		</div>







	  <AddNewObject handleReloadFlag={handleReloadFlag} />






 

		{selectedItemToEeditId && 
		<EditModalComponent
		 id={selectedItemToEeditId}
		 onClose={() => setSelectedItemToEeditId(null)} 
		 handleReloadFlag={ handleReloadFlag }
		 />}



    </div>





  );
}
