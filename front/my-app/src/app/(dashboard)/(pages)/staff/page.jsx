


import { useLocale } from "next-intl"

 const HomeStaff = () => {
  const locale = useLocale()

    return ( 



        <div> 
        <div className="app-content-header">

 

        </div>


        <div className="app-content">



          <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >

            


              <div className="container mt-2">
                <div>  
                  {locale === "ar" ? "إدارة تطبيق الويب - شركة كلاود تك سكاي" : " CloudTech Sky - Web Application Managment System"}
                   
                </div>
                {/* Row for Search Form */}
                <div className="row mb-4">
                  <div className="col-12">


                  </div>
                </div>
                {/* Divider (Separation between form and table) */}
                <hr className="my-4" />
                {/* Row for Table Results */}
                <div className="row">

                </div>
          </div>




              
              
          </div>
          

        </div>
      </div>




   
     )
}

export default HomeStaff