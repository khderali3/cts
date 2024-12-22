'use client';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.staff_auth);
  const pathname = usePathname();

  const isActive = (route) => pathname === route;



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

      <div className="sidebar-wrapper overflow-auto   " >
        <nav className="mt-2    scrollarea min-vh-150 "  >


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
                  <li className="nav-item text-light    ">
                    <a href="#" className="  rounded text-light nav-link    "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
                  </li>

                  <li className="nav-item text-light">
                    <a href="#" className="  rounded text-light nav-link  "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
                  </li>

                  <li className="nav-item text-light">
                    <a href="#" className="  rounded text-light nav-link  "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
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
                    <Link href="/staff/main_index/home" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/home') ? 'bg-primary' : ''}   `} />
                    <p>Home Section</p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/about_us" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/about_us') ? 'bg-primary' : ''}   `} />
                    <p>About</p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/why_us" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/why_us') ? 'bg-primary' : ''}   `} />
                    <p>Why Us </p>

                    </Link>
                  </li>



                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_products" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/our_products') ? 'bg-primary' : ''}   `} />
                    <p>Our Products </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_services" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/our_services') ? 'bg-primary' : ''}   `} />
                    <p>Our Services </p>

                    </Link>
                  </li>



                  <li className="nav-item text-light  ">
                    <Link href="/staff/main_index/our_vision" className="   rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/our_vision') ? 'bg-primary' : ''}   `}/>
                    <p>Our Vision </p>

                    </Link>
                  </li>

                  <li className="nav-item text-light    ">
                    <Link href="/staff/main_index/focus" className="    rounded text-light nav-link active "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/focus') ? 'bg-primary' : ''}   `} />
                    <p  >Focus Section </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/our_clients" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/our_clients') ? 'bg-primary' : ''}   `} />
                    <p>Our Clients </p>

                    </Link>
                  </li>


                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/company_if_right" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/company_if_right') ? 'bg-primary' : ''}   `} />
                    <p>Projects Section</p>

                    </Link>
                  </li>



                  <li className="nav-item text-light">
                    <Link href="/staff/main_index/footer" className="  rounded text-light nav-link  "  >
                    <i className={`nav-icon bi bi-circle ${isActive('/staff/main_index/footer') ? 'bg-primary' : ''}   `} />
                    <p>footer</p>

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
                    <Link href="/staff/ticket" className={` rounded text-light nav-link      `}  >
                    <i className={ `nav-icon bi bi-circle    `} />
                    <p>Tickets</p>

                    </Link>
                  </li>

                </ul>









          </ul>

          <ul className="nav sidebar-menu flex-column mr-1 ">
            <li className="nav-item">
                  <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#Project_Managment"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        Project Managment
                        <i className="nav-arrow bi bi-chevron-right  " />
                      </p>
                  </a>
            </li>
                <ul className=" collapse nav ps-2 " id="Project_Managment" >
                  <li className="nav-item text-light">
                    <a href="#" className="  rounded text-light nav-link  "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
                  </li>

                  <li className="nav-item text-light">
                    <a href="#" className="  rounded text-light nav-link  "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
                  </li>

                  <li className="nav-item text-light">
                    <a href="#" className="  rounded text-light nav-link  "  >
                    <i className="nav-icon bi bi-circle" />
                    <p>Dashboard v1</p>

                    </a>
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