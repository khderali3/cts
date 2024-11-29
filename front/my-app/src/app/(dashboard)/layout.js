

import Head from "next/head";

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/app/(dashboard)/staff/_components/assets/css/adminlte.css'; // AdminLTE CSS

import Script from 'next/script';
import "@/app/globals.css";


import Footer from "./staff/_components/jsx/footer/footer";
import Nav from "./staff/_components/jsx/nav/nav";
import SideBar from "./staff/_components/jsx/sidebar/sidebar";


export const metadata = {
  title: 'AdminLTE Dashboard',
  description: 'AdminLTE v4 Dashboard Template',
};




export default function Layout({ children }) {



  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       



      </Head>


      <body className="layout-fixed   sidebar-expand-lg bg-body-tertiary">

 
  <div className="app-wrapper">

        <Nav />
        
        <SideBar />

      <main className="app-main ">
      
        {children}
      </main>

      <Footer />


  </div>



        <Script src="http://localhost:3000/js/bootstrap.bundle.min.js" />
        <Script src="http://localhost:3000/js/adminlte.js" />

      </body>
    </html>
  );
}
