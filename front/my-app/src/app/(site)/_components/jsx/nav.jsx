'use client'


import AuthLinks from "./nav_components/autheLinks";
import Link from "next/link";
import ContactUsButton from "./nav_components/contactUs_button";

import LanguageSwitcherComponent from "./nav_components/languge_switcher";


import { useTranslations, useLocale } from "next-intl";
 
 

import { usePathname } from 'next/navigation';
 
 
export const Nav =  () => {
  const t = useTranslations("site.nav"); // this works
  const locale = useLocale()
  const mypathname = usePathname(); // Get the current pathname
 
 


        return(
            <>

  {/* Header-Begin */}
  <nav className="navbar navbar-expand-lg background-color sticky-top"  dir="ltr" >
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

      <ContactUsButton />


      <LanguageSwitcherComponent />


        <ul className={`navbar-nav   mb-2 mb-lg-0  ms-auto `} >
          <li className="nav-item">
            <Link
              className="nav-link  home p-lg-3 p-4 "

              href="/#home"
            >
              {/* Home */}
              { t('nav_links.home')}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link p-lg-3 p-4 about_us" href="/#about_us" >
              {/* About us */}
              { t('nav_links.about_us')}
            </Link>
          </li>
          
          <li className="nav-item ">        
          <Link 
            className="nav-link  p-lg-3 p-4 product "
            href="/#product"> 
            {/* Products */}
            { t('nav_links.products')}

          </Link>

          </li>

          <li className="nav-item">
            <Link
            className="nav-link  p-lg-3 p-4 services2 "
            href="/#services2"
            >
              {/* Services */}
              { t('nav_links.services')}

            </Link>
          </li>

           <li className="nav-item   ">
            <Link
            className={`nav-link  p-lg-3 p-4    ${mypathname.includes('/tickets') ? 'active' : ''}`}
 
            href="/tickets"
            >

                { t('nav_links.tickets')}  
             

            </Link>
          </li>


      <AuthLinks />

        </ul>
      </div>
    </div>
  </nav>
      </>
)}


