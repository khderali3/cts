 
'use client'


import { useParams } from 'next/navigation';
import GroupPermissionAasignOrRemoveSection from '@/app/(dashboard)/_components/jsx/groups/group_permission_assign/page';


const Page = () => {
	const {id} = useParams() 
 









    return (
 

		<div> 
		<div className="app-content-header  ">
  
  
		  <div className="container-fluid">
  
  
			<div className="row">
			  <div className="col-sm-6">
				<h3 className="mb-0">Main Index Page </h3>
			  </div>
  
			  <div className="col-sm-6">
				<ol className="breadcrumb float-sm-end">
				  <li className="breadcrumb-item">
					<a href="#">Docs</a>
				  </li>
				  <li className="breadcrumb-item active" aria-current="page">
				  Site Managment
				  </li>
				</ol>
			  </div>
			</div>
		  </div>
  
		</div>
  
		<div className="app-content  ">
   
  
		  <div className="     min-vh-150 bg-white p-3 border rounded  " >
  
  
			<div className="d-flex justify-content-between align-items-center">
			  <h2>Group Permissions </h2>
 			</div>
   
  
			{/* start edit user sections */}
   
  
		<GroupPermissionAasignOrRemoveSection group_id={id}/>
  
  
			{/* end edit user sections */}
  
			</div>
  
  
			</div>
  
  
  
  
  
  
  
  
  
  
  
  
  
		  </div>
	  )
  
}

export default Page