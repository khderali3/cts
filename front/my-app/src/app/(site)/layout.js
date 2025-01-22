
 
import "@/app/(site)/_components/assets/css/org_bootstrap.min.css"

// import "@/app/(site)/_components/assets/css/bootstrap.rtl.min.css"


import "@/app/(site)/_components/assets/css/all.min.css"
import "@/app/(site)/_components/assets/css/style.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@/app/globals.css";




 





import Head from "next/head";


import Provider from "@/app/(site)/_components/redux/provider";


import { Nav } from "@/app/(site)/_components/jsx/nav";
import Script from "next/script";
import { Footer } from "@/app/(site)/_components/jsx/footer";
import Setup from "@/app/(site)/_components/utils/setup";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

 

export default  async function   RootLayout({ children }) {

  const locale = await getLocale();
  const messages = await getMessages();


  const bootstrapCSS = locale === "ar" ? "http://localhost:3000/css/bootstrap.rtl.min.css" : "http://localhost:3000/css/bootstrap.min.css";

 


  return (
  
     
    <html 
    // lang="en"
    lang={locale}
    dir={ locale === "ar" ? "rtl" : " ltr"}
    // dir= "auto" 
    >


    <Head>

    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />

         {/* Preload the correct bootstrap CSS file based on locale   */}
        {/* <link rel="preload" href={bootstrapCSS} as="style" />
        <link rel="stylesheet" href={bootstrapCSS} /> */}

        {/* Additional custom CSS files */}

        {/* <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/globals.css" /> */}
 
              {/* src > app > (site) > pages > layout.jsx */}

     </Head>

      
      <body >

  <NextIntlClientProvider messages={messages}>
    <Provider> 
      <Setup />
      <Nav /> 

      <div className="custom_min_vh_100   "> 



        {children}  


      </div>
      <Footer />
    </Provider > 

 

  </NextIntlClientProvider>

        {/* <Script src="/js/bootstrap.bundle.min.js"  ></Script > */}
        {/* <Script src={`@/public/js/bootstrap.bundle.min.js`}  ></Script > */}

        <Script src="http://localhost:3000/js/bootstrap.bundle.min.js" />



      </body>
    </html>

   
  );
}



