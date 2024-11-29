

import Head from "next/head";

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/app/(dashboard)/staff/_components/assets/css/adminlte.css'; // AdminLTE CSS

import Script from 'next/script';
import "@/app/globals.css";




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


      <main className="app-main ">
      
        {children}
      </main>



  </div>



        <Script src="http://localhost:3000/js/bootstrap.bundle.min.js" />
        <Script src="http://localhost:3000/js/adminlte.js" />

      </body>
    </html>
  );
}
