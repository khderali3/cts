
import Link from "next/link";

import {getLocale, getTranslations} from 'next-intl/server';


export const Footer = async () => {

	let social_data = ''
	let footer_data = ''
  const local = await getLocale()
  const t = await getTranslations("site.footer"); // this works

	try {

		const res_social = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/social/`,
		 { cache: 'no-store',}  // Disable caching
		);
		

		if( res_social  && res_social.ok){
			social_data = await res_social.json();
		} else {
			console.log('err1', res_social)
		}
	  } catch (error) {
		console.log('err2', error)

	  }



	  try {

		const res_footer = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/footer/`,
		 { cache: 'no-store',}  // Disable caching
		);
		

		if( res_footer  && res_footer.ok){
			footer_data = await res_footer.json();
		} else {
			console.log('err1', res_footer)
		}
	  } catch (error) {
		console.log('err2', error)

	  }





    return (


        <>
        
        <footer  id="footer_id">
  <div className="container">
    <div className="row">
      <div className="col-md-2 mx-auto ">
        <h5>
          {/* About Us */}
          { t('about_us')}
        </h5>
        <p>
		 
		 {/*  
          Cloud Tech Sky provides top-notch IT and network solutions for your
          business needs.
		*/  }

		  {/* {footer_data?.about_us_content} */}

      {local === "ar"  ? footer_data?.about_us_content_ar : footer_data?.about_us_content}




        </p>
      </div>
      <div className="col-md-2 mx-auto">
        <h5>
          {/* Quick Links */}
          {/* quick_links_name */}
          {t('quick_links_name')}
        </h5>
        <ul className="footer-links ps-2">
          <li>
            <Link className="text-light" href="/#home">
              {/* Home */}
              {t('quick_links.home')}
            </Link>
          </li>

          <li>
            <Link className="text-light" href="/#about_us">
              {/* About us */}
              {t('quick_links.about_us')}

            </Link>
          </li>


          <li>
            <Link className="text-light" href="/#product">
              {/* Products */}
              {t('quick_links.products')}

            </Link>
          </li>
          <li>
            <Link className="text-light" href="/#services2">
              {/* Services */}
              {t('quick_links.services')}

            </Link>
          </li>

          <li>
            <a className="text-light" href="/tickets">
              {/* Support */}
              {t('quick_links.tickets')}

            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 mx-auto">
        <h5>
          {/* Contact Us */}
          { t('contact_us')}

        </h5>
       {/*  <p>Email: info@cloudtechsky.com</p>  */  }


	   <p>
      {/* Email:   */}
      { t('email')} : {footer_data?.contact_us_email} 
      </p> 

       { /*  <p>Phone: +123 456 7890  </p> */  } 

	   <p>
      {/* Phone: */}
      {t('phone')} : {footer_data?.contact_us_phone}  </p>

        <ul className="footer-social">
          <li>
            <a className="text-light" href={social_data?.facebook_url}>
			 
              <i className="fab fa-facebook" />
			  
            </a>
          </li>
          <li>
            <a className="text-light"  href={social_data?.twitter_url}>
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a className="text-light" href={social_data?.linkedIn_url}>
              <i className="fab fa-linkedin" />
            </a>
          </li>
          <li>
            <a className="text-light" href={social_data?.instagram_url} >
              <i className="fab fa-instagram" />
            </a>
          </li>
		  
          <li>
            <a className="text-light" href={social_data?.youtube_url} >
              <i className="fab fa-youtube" />
            </a>
          </li>

        </ul>
      </div>
    </div>
  </div>
  <div
    className="text-center p-3"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
  >
    {/* © 2020 Copyright  */}
    {/* © 2020 CloudeTech Sky. All rights reserved. */}

    {t('copyright')}

    <a className="text-white" href="https://mdbootstrap.com/" />
  </div>
</footer>

        
        </>
    )
}

