'use client';

import Link from "next/link"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LogoutLink from './nav_component/logoutComponent';

const Nav = () => {
  const { isAuthenticated,loginFirstName, profileImage } = useSelector(state => state.staff_auth);



  useEffect(() => {
    const loadAdminLTEScript = () => {
      const script = document.createElement('script');
      script.src = '/js/adminlte.js';
      script.async = true;
      script.onload = () => {
        console.log('AdminLTE script loaded.');
        if (window.AdminLTE) {
          // Initialize the layout and other components
          window.AdminLTE.layout?.();
          window.AdminLTE.PushMenu?.initialize(); // Initialize sidebar toggle
        }
      };
      script.onerror = () => {
        console.error('Error loading AdminLTE script.');
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    if (isAuthenticated) {
      loadAdminLTEScript();
    }




    // console.log('window.AdminLTE', window.AdminLTE)
    // if (isAuthenticated && window.AdminLTE) {
    //   window.AdminLTE.layout?.();
    //   window.AdminLTE.PushMenu?.initialize(); // Ensure sidebar toggle works
    //   console.log(' window.AdminLTE.PushMenu?.initialize() is run ')
    // }




  }, [isAuthenticated]);  



  return (

    // <nav className="app-header navbar navbar-expand bg-body  sticky-top bg-primary-subtle" data-bs-theme="dark" >
      <nav className={ `app-header navbar navbar-expand bg-body  sticky-top bg-primary-subtle   ${!isAuthenticated && 'not_showing' }`}  data-bs-theme="dark" >


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
              />
            </a>
          </li>
 
          <li className="nav-item dropdown user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                // src="/Images/user2-160x160.jpg"
                src={profileImage ? profileImage : "/Images/def_prof_image.jpg"}

                className="user-image rounded-circle shadow"
                alt="User Image"
              />{" "}
              <span className="d-none d-md-inline">{loginFirstName}</span>{" "}
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
 

              <li className="user-header text-bg-primary">
                <img
                  // src="/Images/user2-160x160.jpg"
                  // src="/Images/def_prof_image.jpg"
                  src={profileImage ? profileImage : "/Images/def_prof_image.jpg"}

                  className="rounded-circle shadow"
                  alt="User Image"
                />
                <p>
                  {loginFirstName}
                  <small>Staff</small>
                </p>
              </li>{" "}

              <li className="user-body">

                <div className="row">
                  <div className=" text-center">
                    <a href="#">Change Password</a>
                  </div>


                </div>
 
              </li>
   
              <li className="user-footer">
                <a href="#" className="btn btn-default btn-flat">
                  Edit Profile
                </a>
                {/* <a href="#" className="btn btn-default btn-flat float-end">
                  Sign out
                </a> */}


                <LogoutLink />






              </li>{" "}

            </ul>
          </li>{" "}

        </ul>{" "}

      </div>{" "}

    </nav>


  )

}


export default Nav