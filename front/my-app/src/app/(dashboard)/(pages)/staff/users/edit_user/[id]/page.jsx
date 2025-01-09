 'use client'



import MainUserEditInfoSection from "@/app/(dashboard)/_components/jsx/user_account/edit_user/main_user_information_section/main_user_info_sec"

import DepartmentAasignOrRemoveSection from "@/app/(dashboard)/_components/jsx/user_account/edit_user/department_assign/page"

import GroupAasignOrRemoveSection from "@/app/(dashboard)/_components/jsx/user_account/edit_user/group_assign/page";
import PermissionAasignOrRemoveSection from "@/app/(dashboard)/_components/jsx/user_account/edit_user/permission_assign/page";
import DeleteUserButton from "@/app/(dashboard)/_components/jsx/user_account/delete_user/deleteUser";
import { useParams } from 'next/navigation';
import SetNewUserPassword from "@/app/(dashboard)/_components/jsx/user_account/set_new_password/set_password";




const Page = () =>  {

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
            <h2>User Edit</h2>
            <DeleteUserButton  user_id={id}/>
          </div>
 

          {/* start edit user sections */}
 

        <MainUserEditInfoSection user_id={id} />

        <DepartmentAasignOrRemoveSection user_id={id}   />
        <GroupAasignOrRemoveSection user_id={id} />
        <PermissionAasignOrRemoveSection  user_id={id}  /> 

        <SetNewUserPassword user_id={id}/>


          {/* end edit user sections */}

          </div>


          </div>













        </div>
    )

}




 export default Page 


 