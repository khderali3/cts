

import React from 'react';
import ImageSlider from './_components/jsx/cursel';
import ProductButton from './_components/jsx/button_product_details';


const Home = async () => {


  let res = ''
  let data= ''

  try {
    // res = await fetch("http://127.0.0.1:8000/api/site/index/");
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/index/`);

    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`);
    data = await res.json();
  } catch (error) {
    
  }


    return (

        <>
        
  {/* Landing Page - begin */}
  <section id="home"> 

    <div className="landing background-color">
      <div className="img background-image" />
      <div className="container d-flex justify-content-around align-items-center">
        <div className="text-center text-light">
        {/* <h1>A different approach in the field of technology</h1> */}
        <h1>{data?.home_section?.home_sec_title }</h1>

         
        {/* <p>We proudly provide you with a fast &amp; distinguished service.</p> */}
        <p>{data?.home_section?.home_sec_details}</p>



        </div>
        <div className="cube">
        {/* <img src="/Images/laptop first sc.png" alt="" /> */}
        <img src={data?.home_section?.home_sec_image} alt="" />



        </div>
      </div>
    </div>
  </section> 


  {/* Landing Page - begin */}


  {/* Start Section 2 */}
  <section id="about_us"> 

  <div className="section-2 pt-4 pb-4 d-flex px-md-5 px-4" >
    <div className="container-fluid">
      <div className="img ms-n1">
        <img
          src="/Images/S2_who.png"
          alt=""
          className="img-fluid w-100 py-lg-3 mb-lg-1 mb-5"
        />
      </div>
      <div className="content d-lg-flex justify-content-around flex-lg-row flex-md-column " >
        <div className="text d-flex flex-column">
        {/* <h3 className="mb-lg-1 mb-4">who we are?</h3> */}
        <h3 className="mb-lg-1 mb-4">{data?.about_us?.about_us_title}</h3>



          {/* <p className="mb-lg-0 w-100">
            <span>Cloud Tech</span> is a leading company in the field of
            technology and IT solutions.
          </p> */}

          <p className="mb-lg-0 w-100">
            <span>{data?.about_us?.about_us_company_name}</span>  {data?.about_us?.about_us_hint} </p>
        </div>


        <div className="pargh text-light">
          {/* <p>
            we have provided a remarkable service for a big slide of the
            companies, agencies, banks, trademarks, global plus local
            organizations and VIP customers successfully since the company
            launch till now, we and our customers are so satisfied, relief and
            proud with the results and work done.
          </p> */}

          <p>   {data?.about_us?.about_us_details}     </p>



        </div>
      </div>
    </div>
  </div>
  </section>
  
  {/* End Section 2 */}
  {/* Start-section-3 */}
  <div className="section-3 background-color">
    <div className="srv background-image" />
    <div className="container-fluid d-lg-flex align-items-lg-center flex-column justify-content-lg-evenly flex-lg-row d-flex justify-content-evenly">
      <div className="img text-center">

      {/* <img src="/Images/CLOUD TECH sky White.png" alt="" /> */}

      <img src={data?.why_us?.why_us_image} alt="" />


      </div>
      <div className="border-img">
       
      </div>
      <div className="text d-flex flex-column align-items-center justify-content-center">

      {/* <h2 className="mb-4 pb-4">Why Us?</h2> */}
      <h2 className="mb-4 pb-4"> {data?.why_us?.why_us_title} </h2>
        
        {/* <h4 className="mb-4 pb-4">
          Lorem ipsum dolor sit amet consectetur. Diam mattis odio ornare
          facilisi Eu:
        </h4> */}

      <h4 className="mb-4 pb-4">  {data?.why_us?.why_us_details}      </h4>


        {/* <ul className="tog1">
          <li className="mb-2">Lorem ipsum dolor sit amet</li>
          <li className="mb-2">Lorem ipsum dolor sit amet</li>
          <li className="mb-2">Lorem ipsum dolor sit amet</li>
          <li className="mb-2">Lorem ipsum dolor sit amet</li>
          <li className="mb-2">Lorem ipsum dolor sit amet</li>
        </ul> */}

        <ul className=" tog1 row ">
           { data?.feature_whayus?.map( i =>  <li key={i.id} className="mb-2 col-md-6 col-12"> {i.feat_whyus_title}</li>)} 
        </ul>


        <div className="but text-center mt-5">
          <button>GET IN TOUCH</button>
            <i className="fa-solid fa-arrow-right text-light" />
        </div>
      </div>
    </div>
  </div>
  {/* End-section-3 */}
  {/* Start Products Section*/}

 <section id="product"> 

  
 <div className="products pt--0 pd-md-0" >
    <div className="container-fluid">
      <div className="text pt-4 text-center">
        {/* <h3 className="fs-1 fw-bolder">Our products</h3> */}
        <h3 className="fs-1 fw-bolder"> {data?.produc_sec?.prd_sec_title}</h3>


        {/* <p className="fw-bold text-light">High quality, reasonable prices</p> */}
        <p className="fw-bold text-light">{data?.produc_sec?.prd_sec_hint }</p>


      </div>      
      <div className="content d-flex flex-wrap align-items-center justify-content-evenly">


      { data?.products?.map( i =>  
      
           
        <div className="product-1 p-1" key={i.id}>
          <img src="/Images/services.png" alt="" />
          <div className="text p-2">
            <h2 className="text-light">
              {i.prod_name } <br /> {i.prod_name_hint}
            </h2>
            <p className="fs-6 mt-2">  {i.prod_details_hint}  </p>
          </div>
          <div className="but p-2 text-center">
            {/* <button onClick={handleMoreDetails(i.prod_slog)}>More Details</button> */}
            <ProductButton slug={i.prod_slog} />
          </div>
        </div>

        )} 



        {/*         
        <div className="product-1 p-1">
          <img src="/Images/services.png" alt="" />
          <div className="text p-2">
            <h2 className="text-light">
              Microwave Links Equipment <br /> (From A to Z)
            </h2>
            <p className="fs-6 mt-2">
              Lorem ipsum dolor sit amet consectetur. Diam mattis odio ornare
              facilisi Eu etiam suspendisse habitasse venenatis mi eleifend
              scelerisque
            </p>
          </div>
          <div className="but p-2 text-center">
            <button>More Details</button>
          </div>
        </div> */}






      </div>
    </div>
  </div>

 </section>



  {/* End Products Section */}
  {/* Start Services Section */}

  <section id="services"> 

  <div className="pack">
    <div className="serv background-image" />
    <div className="container-fluid d-flex align-items-center justify-content-evenly flex-lg-row flex-column">
      <div className="ft d-flex flex-column justify-content-evenly text-center justify-content-lg-center">
      {/* <h2>Our Services</h2> */}

      <h2>{data?.our_services_section?.servic_sec_title }</h2>

        
        {/* <p> the Best in the markets</p> */}
        <p> {data?.our_services_section?.servic_sec_sub_title }</p>


      </div>
      <div className="text-11  ">
        {/* <h3> We are committed to give the perfect scenarios of the following: </h3> */}
        <h3> {data?.our_services_section?.servic_sec_hint }</h3>


        {/* <ul className="list-1">
          <li>Surveillance Systems</li>
          <li>Monitoring Systems</li>
          <li>Storage Solutions</li>
          <li>Asymmetric &amp; Symmetric DSL</li>
          <li>Fiber Connections</li>
          <li>Microwave Link installation</li>
        </ul>
 */}

        <ul className="list-1">
        { data?.feature_whayus?.map( i =>  <li key={i.id} className=" "> {i.feat_whyus_title}</li>)}
        </ul>




      </div>
    </div>
  </div>

  </section> 

  {/* End Services Section */}
  {/* Start vision */}

  <div className="visi">
    <div className="container-fluid">
      <div className="text d-flex flex-column align-items-center justify-content-evenly">
      {/* <h3>Our Vision</h3> */}
      <h3>{data?.our_vision?.our_vision_title }</h3>


{/* 
        <p>
          is to reach our goals of providing the best IT services to our
          clients. We see our business as one of the top-performing IT companies
          in the industry that can acknowledge client problems.
        </p> */}

        <p> {data?.our_vision?.our_vision_detail }    </p>


      </div>
    </div>
  </div>
  {/* End Vision */}
  {/* Start Foc Section */}
  <div className="pack">
    <div className="serv background-image" />
    <div className="container-fluid d-flex align-items-center justify-content-around flex-lg-row flex-column">
      <div className="fts d-flex flex-column justify-content-center">
        {/* <h2 className="text-light fs-1 mb-4">We'll stay focus</h2> */}

        <h2 className="text-light fs-1 mb-4">{data?.focus_section?.focus_title}</h2>

        
        {/* <p className="fs-5">
          resolving our customer’s issues by conducting consultation and
          providing solutions, which requires our full focus.
        </p> */}

        <p className="fs-5"> {data?.focus_section?.focus_detail} </p>


      </div>
      {/* <img src="/Images/foces.png" alt="" className="vc" /> */}
      <img src= {data?.focus_section?.focus_image} alt="" className="vc" />

    </div>
  </div>
  {/* End Foc Section */}
  {/* Start some of our clients section */}

  <section id="our-client" className=' background-color pt-0 mt-0'> 
      <div className="text text-light text-center pt-5  ">
      {/* <h2>Some Of Our Clients</h2> */}
      <h2>{data?.our_client_sec?.our_client_sec_title}</h2>
      </div>
  {/* <div className="clients background-color" >
    <div className="container-fluid">
      <div className="text text-light text-center p-3">
        <h2>Some Of Our Clients</h2>
      </div>
      <div
        id="carouselExampleInterval"
        className="carousel slide d-flex"
        data-bs-ride="carousel"
      >

        <div className="carousel-inner d-flex w-100 text-center">
          <div className="carousel-item active" data-bs-interval={3000}>
            <img
              src="/Images/QNB_Logo.png"
              className="d-inline ms-4"
              alt="..."
            />
            <img
              src="/Images/DHL.png"
              alt=""
              className=" d-inline w-25 ms-4"
            />
            <img
              src="/Images/emmatell.png"
              alt=""
              className="w-25 d-inline ms-4"
            />
            <img src="/Images/pronet.png" alt="" className=" ms-4" />
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img src="/Images/ByblosBank.png" className="ms-4" alt="..." />
            <img src="/Images/HARAM.png" className="ms-4" alt="..." />
            <img src="/Images/jica.png" className="ms-4" alt="..." />
            <img src="/Images/KINGDOM.png" className="ms-4" alt="..." />
          </div>
          <div className="carousel-item ">
            <img
              src="/Images/samanet-logo.png"
              className="ms-4"
              alt="..."
            />
            <img src="/Images/Layer 1.png" className="ms-4" alt="..." />
            <img
              src="/Images/الائتمان الأهلي.png"
              className="ms-4"
              alt="..."
            />
            <img src="/Images/الشام.png" className="ms-4" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
 
 */}


  <ImageSlider  clients={data?.our_clients} />



  </section> 
  {/* End some of our clients section */}
  {/* Start touch Section */}
  <div className="touch w-100 background-color">
    <div className="touch-b background-image" />
    <div className="container-fluid d-flex flex-column justify-content-evenly align-items-center text-center">
      {/* <h3 className="fs-1">
        Want to know if CloudTech is the right fit for your project?
      </h3> */}

        <h3>{data?.comp_if_right?.company_if_right_title} </h3>

      <div className="but pt-0 mt-0">
        <button className="text-light pb-1 px-3">Apply Now!</button>
      </div>
    </div>
  </div>





  {/* End touch Section */}

 


  {/* <Script  src="http://localhost:3000/js/active_navbar_links.js" /> */}

      





        </>


    )
}

export default Home