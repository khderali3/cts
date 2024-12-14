const Page = async ({ params }) => {



  const { slug } = await params; // No need to use `await` here

  // Fetch product data from the server
  let data = null;



  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/product/${slug}`, {
      // Add cache option to disable caching if needed
      cache: 'no-store',
    });

    // Check if the fetch was successful
    if (res.ok) {
      data = await res.json();
    } else {
      console.error('Failed to fetch product data. Status:', res.status);
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }

  // Check if data is null or undefined to show the fallback message
  if (!data) {
    return (



<div className="products-info d-flex justify-content-center align-items-center">
  <p className="fs-6 text-light text-center">Product not found or loading...</p>
</div>







    );
  }

  return (
    <>
      {/* @format */}
      <div className="products-info">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="product-desc w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="product-img">
                  <img
                    src={data?.prod_image}
                    alt=""
                    className="image_product_dait "
                  />
                </div>
                <div className="text mt-5 mb-5 col-md-10 col-12 text-start">
                  <h2 className="text-light text-bolder col-12 fs-1  ">
                    {data?.prod_name} <p>{data?.prod_name_hint}</p>
                  </h2>
                  <p className="fs-6 text-light" style={{ whiteSpace: 'pre-line' }} >{data?.prod_details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
