'use client';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitcherComponent from "./sidebar_components/languge_switcher";

import { useTranslations } from "next-intl";

const SideBar = () => {
  const { isLoading, isAuthenticated, permissions, is_superuser } = useSelector(state => state.staff_auth);
  const pathname = usePathname();

 

  const t = useTranslations('dashboard.sidebar')





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
 


          { (permissions?.includes('usersAuthApp.user_managment') || is_superuser) &&
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
                          {/* Users Management */}
                            {t("users_managment.title")}

                          <i className="nav-arrow bi bi-chevron-right" />
                        </p>
                    </a>
                </li>


                  <ul className=" collapse nav ps-2 " id="users_managment" >

                    <li className="nav-item text-light w-100">
                      <Link href="/staff/users" className={` rounded text-light nav-link ${isActive('/staff/users') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("users_managment.users")} </p>

                      </Link>
                    </li>


                    <li className="nav-item text-light w-100">
                      <Link href="/staff/departments" className={` rounded text-light nav-link ${isActive('/staff/departments') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("users_managment.departments")} </p>

                      </Link>
                    </li>



                    <li className="nav-item text-light w-100">
                      <Link href="/staff/groups" className={` rounded text-light nav-link ${isActive('/staff/groups') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("users_managment.groups")} </p>

                      </Link>
                    </li>




                  </ul>
            </ul>          
          
          }

          
          {(permissions?.includes('usersAuthApp.site_managment') || is_superuser)  &&
          
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
                        {t("site_managment.title")} 
                          <i className="nav-arrow bi bi-chevron-right  " />
                        </p>
                    </a>
                </li>
                  <ul className=" collapse nav  ps-2   " id="WebSite_Managment" >




                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/home"  className={` rounded text-light nav-link ${isActive('/staff/main_index/home') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle    `} />
                      <p>{t("site_managment.home_section")} </p>

                      </Link>
                    </li>


                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/about_us" className={` rounded text-light nav-link ${isActive('/staff/main_index/about_us') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("site_managment.about_section")}</p>

                      </Link>
                    </li>



  



                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/why_us" className={` rounded text-light nav-link ${isActive('/staff/main_index/why_us') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("site_managment.why_us")} </p>

                      </Link>
                    </li>



                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/our_products" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_products') ? ' active_class' : '' }  `} >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("site_managment.our_products")} </p>

                      </Link>
                    </li>


                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/our_services" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_services') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle    `} />
                      <p>{t("site_managment.our_services")} </p>

                      </Link>
                    </li>



                    <li className="nav-item text-light w-100 ">
                      <Link href="/staff/main_index/our_vision" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_vision') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle  `}/>
                      <p>{t("site_managment.our_vision")}</p>

                      </Link>
                    </li>

                    <li className="nav-item text-light  w-100  ">
                      <Link href="/staff/main_index/focus" className={` rounded text-light nav-link ${isActive('/staff/main_index/focus') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p  >{t("site_managment.focus_section")} </p>

                      </Link>
                    </li>


                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/our_clients" className={` rounded text-light nav-link ${isActive('/staff/main_index/our_clients') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle   `} />
                      <p>{t("site_managment.our_clients")} </p>

                      </Link>
                    </li>


                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/company_if_right" className={` rounded text-light nav-link ${isActive('/staff/main_index/company_if_right') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle  `} />
                      <p>{t("site_managment.project_section")}</p>

                      </Link>
                    </li>



                    <li className="nav-item text-light w-100">
                      <Link href="/staff/main_index/footer" className={` rounded text-light nav-link ${isActive('/staff/main_index/footer') ? ' active_class' : '' }  `}  >
                      <i className={`nav-icon bi bi-circle    `} />
                      <p  >{t("site_managment.footer")}</p>

                      </Link>
                    </li>


                  </ul>


            </ul>          
            
          
          }



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
                      {t("ticket_managment.title")}
                        <i className="nav-arrow bi bi-chevron-right  " />
                      </p>
                  </a>
            </li>

                <ul className=" collapse nav ps-2" id="Ticket_Managment" >

                  <li className="nav-item text-light w-100 ">
                    <Link href="/staff/ticket" className={` rounded text-light nav-link    ${isActive('/staff/ticket', true) ? ' active_class' : '' }     `}  >
                    <i className= 'nav-icon bi bi-circle '  />
                    <p> {t("ticket_managment.all_tickets")}</p>

                    </Link>
                  </li>


                  <li className="nav-item text-light w-100 ">
                    <Link href="/staff/ticket/my-tickets" className={` rounded text-light nav-link    ${isActive('/staff/ticket/my-tickets', true) ? ' active_class' : '' }     `}  >
                    <i className= 'nav-icon bi bi-circle '  />
                    <p>{t("ticket_managment.my_tickets")}</p>

                    </Link>
                  </li>


                </ul>

 







          </ul>

 

        <LanguageSwitcherComponent />





        </nav>
      </div>

    </aside>




  )



}

export default SideBar