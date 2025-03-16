"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { hr } from "date-fns/locale";
import { ButtonProjectApplyNow } from "@/app/(site)/_components/jsx/button_project_apply_now";

const Page = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const locale = useLocale();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/project/${slug}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const jsonData = await res.json();
          setData(jsonData);
          setMainImage(jsonData.main_image);
        } else {
          console.error("Failed to fetch project data. Status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProjectData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="products-info d-flex justify-content-center align-items-center">
        <p className="fs-6 text-light text-center">Loading project...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="products-info d-flex justify-content-center align-items-center">
        <p className="fs-6 text-light text-center">Project not found.</p>
      </div>
    );
  }

  // Combine main image with extra images for the image list
  const allImages = [data.main_image, ...(data.extra_images?.map(img => img.file) || [])];

  return (
    <div className="products-info">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="product-desc w-100 d-flex flex-column justify-content-center align-items-center mt-5">


              
              {/* Main Image */}
              <div className="product-img">
                <img
                  src={mainImage}
                  alt="Main Project Image"
                  className="image_product_dait"
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                />
              </div>



            <div className="mt-3 row g-2 d-flex flex-wrap justify-content-center">
              {allImages.map((image, index) => (
                <div className="col-auto p-2" key={index}>  {/* col-auto prevents forced stretching */}
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className={`img-thumbnail ${image === mainImage ? "border border-3 border-success" : ""}`}
                    onClick={() => setMainImage(image)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </div>







              {/* Project Description */}
              <div className="text mt-5 mb-5 col-md-10 col-12">
                <h2 className="text-light text-bolder col-12 fs-1">
                  {locale === "ar" ? data.project_name_ar : data.project_name}
                  <p>{locale === "ar" ? data.project_name_hint_ar : data.project_name_hint}</p>
                </h2>
                <p className="fs-6 text-light" style={{ whiteSpace: "pre-line" }}>
                  {locale === "ar" ? data.project_description_ar : data.project_description}
                </p>

                {/* Attachment Files Section */}
                {data?.files && data?.files.length > 0 && (
                  
                  <div className="attachments ">
                    <hr />  
                    <p className="text-light  fs-8  mb-0 ">Attachments:</p>
                      {data.files.map((file, index) => (
                          <div key={file.id}>
                            <a href={file.file} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              {/* 📎  */}
                              <i className="fas fa-paperclip me-2"></i> {/* FontAwesome Paperclip Icon */}
                              {file.file_name}  {/* File Icon with Name */}
                            </a>
                          </div> 
                      ))}
                  </div>
                )}


              <div className="d-flex justify-content-center align-items-center"> 
                <ButtonProjectApplyNow />
              </div>


              </div>

            </div>
          </div>
        </div>






      </div>






    </div>
  );
};

export default Page;
