
import { getLocale } from "next-intl/server";


const Page = async ({ params }) => {
  const locale = await getLocale()
  const { slug } = await params; 
  let data = null;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/project/${slug}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      data = await res.json();
    } else {
      console.error('Failed to fetch product data. Status:', res.status);
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }

  if (!data) {
    return (
        <div className="products-info d-flex justify-content-center align-items-center">
          <p className="fs-6 text-light text-center">project not found or loading...</p>
        </div>
    );
  }

  return (

      <div className="products-info">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="product-desc w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="product-img">
                  <img
                    src={data?.main_image}
                    alt=""
                    className="image_product_dait "
                  />
                </div>
                <div className="text mt-5 mb-5 col-md-10 col-12  "  >
                  <h2 className="text-light text-bolder col-12 fs-1  ">
                    {locale === "ar" ? data?.project_name_ar : data?.project_name}
                    <p>
                      {locale === "ar" ?  data?.project_name_hint_ar : data?.project_name_hint }
                    </p>
                  </h2>
                  <p className="fs-6 text-light" style={{ whiteSpace: 'pre-line' }} >
                  {locale === "ar" ? data?.project_description_ar : data?.project_description}

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Page;
