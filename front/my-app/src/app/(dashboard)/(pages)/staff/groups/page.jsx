 
'use client'
 
 import ListManagerGroups from "@/app/(dashboard)/_components/jsx/groups/ListManager_groups"
 

const Page = () =>  {

 
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


          <h2>Manage Permission Groups</h2>
 

          {/* start section */}
 
          <ListManagerGroups />
 

          {/* end section */}

          </div>


          </div>













        </div>
    )

}




 export default Page 


 