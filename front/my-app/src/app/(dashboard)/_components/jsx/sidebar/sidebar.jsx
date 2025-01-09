'use client';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.staff_auth);
  const pathname = usePathname();

  // const isActive = (route) => pathname === route;

  const isActive = (route, isExact=false) => {

    if (isExact) {
      return pathname === route
    } else {
      return  pathname.startsWith(route)
    }
    
  
  };


useEffect(() => {
  

}, [isAuthenticated]);  

  // if(isAuthenticated && isLoading === false){
    return (


      <aside
      className={`app-sidebar bg-primary-subtle shadow  ${!isAuthenticated && 'not_showing' }  collapse show  sidebar    ` }  id="sidebar" 
      data-bs-theme="dark"
      

    >

      <div className="sidebar-brand">


        <a href="../../index.html" className="brand-link">
          {/*begin::Brand Image*/}
          <img
            src="/Images/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image opacity-75 shadow"
          />{" "}
          {/*end::Brand Image*/} {/*begin::Brand Text*/}
          <span className="brand-text fw-light">CloudTech</span>

        </a>

      </div>

      <div className="sidebar-wrapper      " >

        <nav className="mt-2     min-vh-150  "   >
 

          <ul className="nav sidebar-menu flex-column    ">
            <li className="nav-item ">
                  <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#users_managment"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        Users Management
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                  </a>
              </li>
                <ul className=" collapse nav ps-2 " id="users_managment" >

                  <li className="nav-item text-light">
                    <Link href="/staff/users" className={` rounded text-light nav-link ${isActive('/staff/users') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Users </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/departments" className={` rounded text-light nav-link ${isActive('/staff/departments') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Departments </p>

                    </Link>
                  </li>



                  <li className="nav-item text-light">
                    <Link href="/staff/groups" className={` rounded text-light nav-link ${isActive('/staff/groups') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Groups </p>

                    </Link>
                  </li>



  
                </ul>
          </ul>

          <ul className="nav sidebar-menu flex-column  ul_staff  ">
            <li className="nav-item">
                  <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#WebSite_Managment"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        Site Managment
                        <i className="nav-arrow bi bi-chevron-right  " />
                      </p>
                  </a>
              </li>
                <ul className=" collapse nav  ps-2   " id="WebSite_Managment" >




                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/home"  className={` rounded text-light nav-link ${isActive('/staff/main_index/home') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle    `} />
                    <p>Home Section</p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/about_us" className={` rounded text-light nav-link ${isActive('/staff/main_index/about_us') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>About Section</p>

                    </Link>
                  </li>



 



                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/why_us" className={` rounded text-light nav-link ${isActive('/staff/main_index/why_us') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Why Us </p>

                    </Link>
                  </li>



                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_products" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_products') ? ' active_class' : '' }  `} >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Our Products </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_services" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_services') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle    `} />
                    <p>Our Services </p>

                    </Link>
                  </li>



                  <li className="nav-item text-light  ">
                    <Link href="/staff/main_index/our_vision" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_vision') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle  `}/>
                    <p>Our Vision </p>

                    </Link>
                  </li>

                  <li className="nav-item text-light    ">
                    <Link href="/staff/main_index/focus" className={` rounded text-light nav-link ${isActive('/staff/main_index/focus') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p  >Focus Section </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_clients" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_clients') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle   `} />
                    <p>Our Clients </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/company_if_right" className={` rounded text-light nav-link ${isActive('/staff/main_index/company_if_right') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle  `} />
                    <p>Projects Section</p>

                    </Link>
                  </li>



                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/footer" className={` rounded text-light nav-link ${isActive('/staff/main_index/footer') ? ' active_class' : '' }  `}  >
                    <i className={`nav-icon bi bi-circle    `} />
                    <p  >footer</p>

                    </Link>
                  </li>


                </ul>


          </ul>


          <ul className="nav sidebar-menu flex-column   ">
            <li className="nav-item">
                  <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#Ticket_Managment"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        Ticket Managment
                        <i className="nav-arrow bi bi-chevron-right  " />
                      </p>
                  </a>
            </li>

                <ul className=" collapse nav ps-2" id="Ticket_Managment" >

                  <li className="nav-item text-light  ">
                    <Link href="/staff/ticket" className={` rounded text-light nav-link    ${isActive('/staff/ticket', true) ? ' active_class' : '' }     `}  >
                    <i className= 'nav-icon bi bi-circle '  />
                    <p>ALL Tickets</p>

                    </Link>
                  </li>


                  <li className="nav-item text-light  ">
                    <Link href="/staff/ticket/my-tickets" className={` rounded text-light nav-link    ${isActive('/staff/ticket/my-tickets', true) ? ' active_class' : '' }     `}  >
                    <i className= 'nav-icon bi bi-circle '  />
                    <p>My Tickets</p>

                    </Link>
                  </li>


                </ul>

 







          </ul>

 

          <li className=" text-center mb-auto  mt-5 w-50 without_marker  ">
              <div className="form-group   ">
              <label htmlFor="languageSelect" className="form-label text-white mb-0 pb-0">
                Language
              </label>
              <select
                id="languageSelect"
                className="form-select bg-primary-subtle text-white border-0 text-center language_select"
                aria-label="Language selection"
                // onChange="location = this.value;"
              >
                <option value="?lang=en">English</option>
                <option value="?lang=ar">Arabic</option>
              </select>
            </div>
          </li>




        </nav>
      </div>

    </aside>




  )



}

export default SideBar