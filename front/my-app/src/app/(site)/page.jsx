

import React from 'react';
import ImageSlider from './_components/jsx/cursel';
import ProductButton from './_components/jsx/button_product_details';



const Home = async () => {


  let res = ''
  let data= ''
  try {

    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/index/`,
     { cache: 'no-store',}  // Disable caching
    );
    data = await res.json();
  } catch (error) {
    
  }


    return (

        <>
        

  <section id="home" > 
      <div className="home-section">
        <div className="container d-flex justify-content-around align-items-center">
          <div className="text-center text-light">
            <h1>
              {data?.home_section?.home_sec_title }
            </h1>
            <p>
              {data?.home_section?.home_sec_details}
            </p>
          </div>
          <div className="cube">
            <img src={data?.home_section?.home_sec_image} alt="" />
          </div>
        </div>
      </div>
  </section> 







  <section id="about_us"> 

      <div className="about-us-section pt-4 pb-4 d-flex px-md-5 px-4" id="About_us">
        <div className="container-fluid">
          <div className="img ms-n1">
            <img
              src="/Images/S2 who.png"
              alt=""
              className="img-fluid w-100 py-lg-3 mb-lg-1 mb-5"
            />
          </div>
          <div className="content d-lg-flex justify-content-around flex-lg-row flex-md-column align-items-end">
            <div className="text d-flex flex-column">
              <h3 className="mb-lg-1 mb-4">{data?.about_us?.about_us_title}</h3>
              <p className="mb-3 w-100">
                <span>{data?.about_us?.about_us_company_name}</span> 
                {data?.about_us?.about_us_hint}
              </p>

 
                {/* <iframe
                // src="https://www.youtube.com/embed/khCGRsbRW-A?si=MGvNIX8gXGpwbWye"

                src={data.about_us.about_us_youtube_url  }

                title="YouTube video player"
                style={{ border: "none" }}
                frameBorder="0"

                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              /> */}
              

             { data?.about_us?.about_us_youtube_url && 
                              <iframe
                               src={data.about_us.about_us_youtube_url}
                  
                               title="YouTube video player"
                               style={{ border: "none" }}
                               frameBorder="0"
                               // allowFullScreen
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                               // referrerPolicy="strict-origin-when-cross-origin"
                               referrerPolicy="no-referrer"
                             />
            
              }
                

             




            </div>
            <div className="pargh text-light fs-5">
              <p>
                {data?.about_us?.about_us_details}
              </p>
            </div>
          </div>
        </div>
      </div>
  </section>
  




<div className="why-us-section">
  <div className="container-fluid d-lg-flex align-items-lg-center flex-column justify-content-lg-evenly flex-lg-row d-flex justify-content-evenly">
   

   {data?.why_us?.why_us_image ?   
   
    <div className="img text-center">
      <img src={data?.why_us?.why_us_image} alt="" />
    </div>
   
   :  "" }




    <div className="text d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-4 pb-4">{data?.why_us?.why_us_title} </h2>
      <h4 className="mb-4 pb-4">
      {data?.why_us?.why_us_details}
      </h4>

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






 <section id="product"> 

      <div className="products-section" id="Products">
        <div className="container">
          <div className="text text-center">
            <h3 className="fs-1 fw-bolder">{data?.produc_sec?.prd_sec_title}</h3>
            <p className="fw-bold text-light">{data?.produc_sec?.prd_sec_hint }</p>
          </div>


          <div className="row justify-content-center row-cols-auto">
          { data?.products?.map( i => 

            <div  key={i.id}  className="col-lg-3 col-md-4 col-sm-10 mt-3 col-8 ">
              <div className="product-1 p-3  h-100  card ">
              {/* <img src="/Images/services.png" alt="" /> */}
              <img src={i.prod_image} alt=""  className='  card-img-top   img-fluid' 
              style={{ objectFit: "contain", height: "200px" }}
              />


                <div className="  card-body  flex-grow-1 ">
                  <h2 className="text-light fs-4 card-title">
                  {i.prod_name }  <br />
                  {i.prod_name_hint}
                  </h2>
                  {/* <p className="fs-6">
                  {i.prod_details}
                  </p> */}
                  <p className="fs-6 card-text ">
                    {i.prod_details.length > 50 
                      ? `${i.prod_details.slice(0, 50)}...` 
                      : i.prod_details}
                  </p>



                </div>
              <div className="but  text-center mt-auto card-footer  ">
                <ProductButton slug={i.prod_slog} />
              </div>
              </div>
            </div>
              )} 


          </div>


          
        </div>
      </div>



 </section>




  <section id="services2"> 
    <div className="services" >
      <div className="container d-flex justify-content-center align-items-center pt-5">
        <div className="row d-flex align-items-center text-light">
          <div className="text col-lg-6 text-center">
            <h2>{data?.our_services_section?.servic_sec_title }</h2>
            <p>{data?.our_services_section?.servic_sec_sub_title }</p>
          </div>
          <div className="col-lg-6">
            <p className="fs-5 pb-4">
            {data?.our_services_section?.servic_sec_hint }
            </p>
            <div className=" mb-5">
              <ul className="row">
              { data?.services?.map( i =>  <li key={i.id} className=" mb-2  col-md-6 col-12"> {i.service_name}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 




    <div className="vision">
      <div className="container-fluid">
        <div className="text d-flex flex-column align-items-center justify-content-evenly">
          <h3>{data?.our_vision?.our_vision_title }</h3>
          <p> {data?.our_vision?.our_vision_detail } </p>
        </div>
      </div>
    </div>





<div className="focus-section">
  <div className="container-fluid d-flex align-items-center justify-content-around flex-lg-row flex-column">
    <div className="fts d-flex flex-column justify-content-center">
      <h2 className="text-light fs-1 mb-4">{data?.focus_section?.focus_title}</h2>
      <p className="fs-5">{data?.focus_section?.focus_detail}     </p>
    </div>
    <img src={data?.focus_section?.focus_image} alt="" className="vc" />
  </div>
</div>






  <section id="our-client" className=' background-color pt-0 mt-0'> 
      <div className="text text-light text-center pt-5  ">
      {/* <h2>Some Of Our Clients</h2> */}
      <h2>{data?.our_client_sec?.our_client_sec_title}</h2>
      </div>

  <ImageSlider  clients={data?.our_clients} />


  </section> 

  <div className="contact">
  <div className="container text-light d-flex justify-content-center align-items-center flex-column">
      <h3 className="fs-1 pb-4">
      {data?.comp_if_right?.company_if_right_title} 
      </h3>
    <div className="but">
      <button className="text-light py-1 px-3">GET IN TOUCH</button>
    </div>
  </div>
</div>




 


        </>


    )
}

export default Home