
import HomeSection from "@/app/(dashboard)/_components/jsx/index_page_components/home_section"
import AboutUsSection from "@/app/(dashboard)/_components/jsx/index_page_components/about_us"
import WyeUsSection from "@/app/(dashboard)/_components/jsx/index_page_components/why_us_section" 




const Page = () => {



    return (

        <div> 
        <div className="app-content-header">


          <div className="container-fluid">


            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Main Index Page </h3>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">
                    <a href="#">Docs</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Site Managment
                  </li>
                </ol>
              </div>
            </div>
          </div>

        </div>

        <div className="app-content">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >



{ /*  start  sections   */}

			<HomeSection   />
			<AboutUsSection   />
      <WyeUsSection />
              
{ /*  end  sections   */}

          </div>
          

        </div>
      </div>


    )
}

export default Page