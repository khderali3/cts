
import "@/app/(site)/_components/assets/css/bootstrap.min.css"

import "@/app/(site)/_components/assets/css/all.min.css"
import "@/app/(site)/_components/assets/css/style.css"

import "@/app/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Head from "next/head";


import Provider from "@/app/(site)/_components/redux/provider";


import { Nav } from "@/app/(site)/_components/jsx/nav";
import Script from "next/script";
import { Footer } from "@/app/(site)/_components/jsx/footer";
import Setup from "@/app/(site)/_components/utils/setup";

export default function RootLayout({ children }) {


  return (
  

    <html lang="en">
    <Head>

    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />



     </Head>

      
      <body >

        {/* <Provider> 
          <Setup />
        <Nav /> 
          
          {children}
          

          <Footer />

        </Provider>
 */}

<Provider> 
  <Setup />
  <Nav /> 

    {children}  

  {/* <Footer /> */}

  {/* <Footer /> */}
</Provider > 



        {/* <Script src="/js/bootstrap.bundle.min.js"  ></Script > */}
        {/* <Script src={`@/public/js/bootstrap.bundle.min.js`}  ></Script > */}

        <Script src="http://localhost:3000/js/bootstrap.bundle.min.js" />


      </body>
    </html>
  );
}