
import Link from "next/link";



export const Footer = async () => {

	let social_data = ''
	let footer_data = ''

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
        
        <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-2 mx-auto ">
        <h5>About Us</h5>
        <p>
		 
		 {/*  
          Cloud Tech Sky provides top-notch IT and network solutions for your
          business needs.
		*/  }

		  {footer_data?.about_us_content}



        </p>
      </div>
      <div className="col-md-2 mx-auto">
        <h5>Quick Links</h5>
        <ul className="footer-links ps-2">
          <li>
            <Link className="text-light" href="/#home">
              Home
            </Link>
          </li>

          <li>
            <Link className="text-light" href="/#about_us">
              About us
            </Link>
          </li>


          <li>
            <Link className="text-light" href="/#product">
              Products
            </Link>
          </li>
          <li>
            <Link className="text-light" href="/#services2">
              Services
            </Link>
          </li>

          <li>
            <a className="text-light" href="/tickets">
              Support
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-2 mx-auto">
        <h5>Contact Us</h5>
       {/*  <p>Email: info@cloudtechsky.com</p>  */  }


	   <p>Email:  {footer_data?.contact_us_email} </p> 

       { /*  <p>Phone: +123 456 7890  </p> */  } 

	   <p>Phone:{footer_data?.contact_us_phone}  </p>

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
    © 2020 Copyright:
    <a className="text-white" href="https://mdbootstrap.com/" />
  </div>
</footer>

        
        </>
    )
}

