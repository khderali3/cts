import Link from "next/link"




const Nav = () => {


    return (

        <nav className="app-header navbar navbar-expand bg-body  sticky-top bg-primary-subtle  " data-bs-theme="dark" >


        <div className="container-fluid">
   
  
          <ul className="navbar-nav">
            <li className="nav-item">
  
              <a
                className="nav-link"
                data-lte-toggle="sidebar"
                href="#"
                role="button"
              >
  
                <i className="bi bi-list" />
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
   
              <Link href="/staff" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item d-none d-md-block">
  
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
  
          <ul className="navbar-nav ms-auto">
  
            <li className="nav-item">
              <a className="nav-link" href="#" data-lte-toggle="fullscreen">
                <i
                  data-lte-icon="maximize"
                  className="bi bi-arrows-fullscreen"
                />{" "}
                <i
                  data-lte-icon="minimize"
                  className="bi bi-fullscreen-exit"
                  style={{ display: "none" }}
                />{" "}
              </a>{" "}
            </li>{" "}
   
            <li className="nav-item dropdown user-menu">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  src="/Images/user2-160x160.jpg"
                  className="user-image rounded-circle shadow"
                  alt="User Image"
                />{" "}
                <span className="d-none d-md-inline">Alexander Pierce</span>{" "}
              </a>
              <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
   
  
                <li className="user-header text-bg-primary">
                  <img
                    src="/Images/user2-160x160.jpg"
                    className="rounded-circle shadow"
                    alt="User Image"
                  />
                  <p>
                    Alexander Pierce - Web Developer
                    <small>Member since Nov. 2023</small>
                  </p>
                </li>{" "}
  
                <li className="user-body">
  
                  <div className="row">
                    <div className="col-4 text-center">
                      <a href="#">Followers</a>{" "}
                    </div>
                    <div className="col-4 text-center">
                      <a href="#">Sales</a>{" "}
                    </div>
                    <div className="col-4 text-center">
                      {" "}
                      <a href="#">Friends</a>{" "}
                    </div>
                  </div>{" "}
   
                </li>{" "}
     
                <li className="user-footer">
                  <a href="#" className="btn btn-default btn-flat">
                    Profile
                  </a>{" "}
                  <a href="#" className="btn btn-default btn-flat float-end">
                    Sign out
                  </a>{" "}
                </li>{" "}
  
              </ul>
            </li>{" "}
  
          </ul>{" "}
  
        </div>{" "}
  
      </nav>


    )
}


export default Nav