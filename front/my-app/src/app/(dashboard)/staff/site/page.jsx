






const Page = () => {


    return (

        <div> 
        <div className="app-content-header">


          <div className="container-fluid">


            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Main Site Managment</h3>
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

        <div className="app-content">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >

            


              <div className="container mt-2">
                <div> my content dfdfdfdf</div>
                {/* Row for Search Form */}
                <div className="row mb-4">
                  <div className="col-12">


                  <form id="searchForm" className="  row ">

                <div className="col-md-4 mt-2 ">
                  <div className="form-floating  ">
                    <input
                      type="text"
                      className="form-control  form-control-sm  "
                      id="input1"
                      placeholder="Search term"
                    />
                    <label htmlFor="input1 " className="small" >Input 1</label>
                  </div>
                </div>

                <div className="col-md-4 mt-2">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="input2"
                      placeholder="Search term"
                    />
                    <label htmlFor="input2">Input 2</label>
                  </div>
                </div>
                <div className="col-md-4 mt-2">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="input2"
                      placeholder="Search term"
                    />
                    <label htmlFor="input2">Input 2</label>
                  </div>
                </div>

                <div className="col-md-4 mt-2">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="input2"
                      placeholder="Search term"
                    />
                    <label htmlFor="input2">Input 2</label>
                  </div>
                </div>




                <div className="  ">
                  <button type="submit" className="btn btn-primary mt-3">
                    Search
                  </button>
                </div>
              </form>







                  </div>
                </div>
                {/* Divider (Separation between form and table) */}
                <hr className="my-4" />

          </div>




              
              
          </div>
          

        </div>
      </div>


    )
}

export default Page