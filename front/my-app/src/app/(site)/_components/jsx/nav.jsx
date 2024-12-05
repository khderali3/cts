
import AuthLinks from "./nav_components/autheLinks";
import Link from "next/link";



export const Nav = () => {



        return(
            <>

  {/* Header-Begin */}
  <nav className="navbar navbar-expand-lg background-color sticky-top">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img src="/Images/CLOUD TECH sky White horizontal.png" alt="" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa-solid fa-bars-staggered" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <button type="button" className="btn btn-primary ps-4 pe-4">
          Contact Us
        </button>
        <div className="Eng p-2 d-none d-lg-block">
          <i className="fa-solid fa-globe" />
          <span>English</span>
        </div>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link  home p-lg-3 p-4 "

              href="/#home"
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link p-lg-3 p-4 about_us" href="/#about_us" >
              About us
            </Link>
          </li>
          
          <li className="nav-item ">
            

          <Link 
            className="nav-link  p-lg-3 p-4 product "
          
          href="/#product"> 
            Products
          </Link>

          </li>
          <li className="nav-item">
            <Link
            className="nav-link  p-lg-3 p-4 services2 "

            href="/#services2"
           
            >
              Services
            </Link>
          </li>



          
          {/* <li className="nav-item">
            <Link className="nav-link p-lg-3 p-4" href="/#">
              Support
              
            </Link>
          </li>
 */}



    <li className="  nav-item dropdown">
    
    
      <Link 
      className="nav-link dropdown-toggle  p-lg-3 p-4" href="/#"

        id="navbarDropdownMenuLink2"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">


          Support
          
        </Link>

      <ul
        className="bg-focus dropdown-menu dropdown-menu-end background-color w-25"
        aria-labelledby="navbarDropdownMenuLink2"
      >

        <li>

            <Link className="bg-focus dropdown-item text-light" href="/tickets"> 
              Tickets
            </Link>



        </li>
        <li>
          <a className="bg-focus dropdown-item text-light" href="/#">
              Projects
            </a>
        </li>

      </ul>
    </li>






      <AuthLinks />


        </ul>


      </div>
    </div>



  </nav>


            
            
            </>
        )


}


