


const SideBar = () => {

    return (


        <aside
        className="app-sidebar bg-primary-subtle
        shadow  "
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
  
        <div className="sidebar-wrapper overflow-auto "   >
          <nav className="mt-2    scrollarea min-vh-150 ">
  
  
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
  
                <a href="#" className="nav-link">
  
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Users Managment
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
     
                    <a href="../../index.html" className="nav-link">
          
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
  
                    <a href="../../index2.html" className="nav-link">
  
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
      
                    <a href="../../index3.html" className="nav-link">
            
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v3</p>
                    </a>
                  </li>
                </ul>
              </li>
  
  
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Site Managment
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="../../widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
       
                    <a href="../../widgets/info-box.html" className="nav-link">
       
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../../widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-clipboard-fill" />
                  <p>
                    Ticket Managment
  
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a
                      href="../../layout/unfixed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="nav-icon bi bi-circle" />
                      <p>Default Sidebar</p>
                    </a>{" "}
                  </li>
                  <li className="nav-item">
                    <a
                      href="../../layout/fixed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="nav-icon bi bi-circle" />
                      <p>Fixed Sidebar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="../../layout/layout-custom-area.html"
                      className="nav-link"
                    >
                      <i className="nav-icon bi bi-circle" />
                      <p>
                        Layout <small>+ Custom Area </small>
                      </p>
                    </a>{" "}
                  </li>
                  <li className="nav-item">
                    <a href="../../layout/sidebar-mini.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Sidebar Mini</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="../../layout/collapsed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="nav-icon bi bi-circle" />
                      <p>
                        Sidebar Mini <small>+ Collapsed</small>
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                      <a href="../../layout/logo-switch.html" className="nav-link">
  
                      <i className="nav-icon bi bi-circle" />
                      <p>
                        Sidebar Mini <small>+ Logo Switch</small>
                      </p>
                    </a>{" "}
                  </li>
                  <li className="nav-item">
                    <a href="../../layout/layout-rtl.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Layout RTL</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-tree-fill" />
                  <p>
                    Project Managment
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="../../UI/general.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>General</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../../UI/icons.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Icons</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../../UI/timeline.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Timeline</p>
                    </a>
                  </li>
                </ul>
              </li>
  
  
  
              <li className="nav-item text-center mb-auto  mt-5 w-50 ">
                <div className="form-group   ">
                <label htmlFor="languageSelect" className="form-label text-white mb-0 pb-0">
                  Language
                </label>
                <select
                  id="languageSelect"
                  className="form-select bg-primary-subtle text-white border-0 text-center"
                  aria-label="Language selection"
                  // onChange="location = this.value;"
                >
                  <option value="?lang=en">English</option>
                  <option value="?lang=ar">Arabic</option>
                </select>
              </div>
              </li>
  
  
  
  
  
           </ul>{" "}
            {/*end::Sidebar Menu*/}
          </nav>
        </div>
  
      </aside>
  
  
  

    )
}

export default SideBar