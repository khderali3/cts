

// import OurProductSection from "@/app/(dashboard)/_components/jsx/index_page_components/our_product_section" 

import ProjectTypeSection from "@/app/(dashboard)/_components/jsx/projecttype/projectTypeMin"

const Page = () => {



    return (

        <div> 
        <div className="app-content-header">

 

        </div>

        <div className="app-content">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >



{ /*  start  sections   */}

      <ProjectTypeSection />
 

{ /*  end  sections   */}

          </div>
          

        </div>
      </div>


    )
}

export default Page