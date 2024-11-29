'use client';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 import useVerify from "../hooks/use-verify";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Setup = () => {

    const pathname = usePathname()
    useEffect( () => {
    
      const sections = document.querySelectorAll("section");
      const navLi_a = document.querySelectorAll("nav .container-fluid .navbar-collapse ul li a ");    
      window.onscroll = () => {
        var current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (scrollY  >= sectionTop - 60) {
            current = section.getAttribute("id"); }
        });
      
        navLi_a.forEach((a) => {
          a.classList.remove("active_nav_link");
          if (a.classList.contains(current)) {  
              a.classList.add("active_nav_link");
            }
        });
      };
    
    },[pathname] )  



    useVerify();
    return < ToastContainer/>
} 

export default Setup