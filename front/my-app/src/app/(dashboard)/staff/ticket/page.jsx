






const Ticket = () => {


    return (

        <div> 
        <div className="app-content-header">


          <div className="container-fluid">


            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Main   Component Title</h3>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">
                    <a href="#">Docs</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Main Sidebar Component
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
                {/* Row for Table Results */}
                <div className="row">
                  <div className="col-12 table-responsive ">
                    <table className="table table-striped  table-bordered  table-sm ">
                      <thead>
                        <tr>
                          <th scope="col">Column 1</th>
                          <th scope="col">Column 2</th>
                          <th scope="col">Column 3</th>
                          <th scope="col">Column 4</th>
                          <th scope="col">Column 5</th>
                          <th scope="col">Column 6</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td>Data 1</td>
                          <td>Data 2</td>
                          <td>Data 3</td>
                          <td>Data 4</td>
                          <td>Data 5</td>
                          <td>Data 6</td>
                        </tr>

                        <tr>
                          <td>Data 1</td>
                          <td>Data 2</td>
                          <td>Data 3</td>
                          <td>Data 4</td>
                          <td>Data 5</td>
                          <td>Data 6</td>
                        </tr>
                        <tr>
                          <td>Data 1</td>
                          <td>Data 2</td>
                          <td>Data 3</td>
                          <td>Data 4</td>
                          <td>Data 5</td>
                          <td>Data 6</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
          </div>




              
              
          </div>
          

        </div>
      </div>


    )
}

export default Ticket