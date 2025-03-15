

import { useTranslations } from "next-intl"
import { useEffect, useState, useRef } from "react"
import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { toast } from "react-toastify"
import { getErrorMessage } from "@/app/public_utils/utils"

import { AddFilesComponent } from "../add_project_components/extra_images"



export const EditModalComponent = ({ id, onClose , handleReloadFlag=null}) => {

    const t = useTranslations('dashboard.site_managment.our_product.list_manager')
    const [customFetch] = useCustomFetchMutation()
    const [data, setData] = useState({
        project_name:'',
        project_name_hint: "",
        project_description: '',
        project_name_ar: '',
        project_name_hint_ar: '',
        project_description_ar: '',
        main_image: '',
        is_published:false,
     })

     const [projectMainImageSelected, setProjectMainImageSelected] = useState(null)
     const mainImagefileInputRef = useRef(null);

    const [filesExtraImages, setFilesExtraImages] = useState([{ id: 1, file: null }]);
    const fileInputRefsExtraImages = useRef([]);

    const [filesAttachment, setFilesAttachment] = useState([{ id: 1, file: null }]);
    const fileInputRefsFilesAttachment = useRef([]);


     const [isSubmitting, setIsSubmitting] = useState(false)




  const handleSubmit = async (e) => {
    e.preventDefault()

    // const emptyFields = Object.entries(data)
    // .filter(([key, value]) => !value.trim()) // Check for empty values (ignoring spaces)
    // .map(([key]) => key); // Extract field names
  
    // if (emptyFields.length > 0) {
    // toast.error(`Please fill in all fields: ${emptyFields.join(", ")}`)
    // return;
    // }


    const fieldsToCheck = [
        'project_name',
        'project_name_hint',
        'project_description',
        'project_name_ar',
        'project_name_hint_ar',
        'project_description_ar'
    ];

    const emptyFields = Object.entries(data)
        .filter(([key, value]) => fieldsToCheck.includes(key) && !value.trim()) // Check only specified fields
        .map(([key]) => key); // Extract field names

    if (emptyFields.length > 0) {
        toast.error(`Please fill in all fields: ${emptyFields.join(", ")}`);
        return;
    }


    try{
      setIsSubmitting(true)

      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (
          key === "project_name" ||  
          key === "project_name_hint" ||  
          key === "project_description" ||  
          key === "project_name_ar" ||  
          key === "project_name_hint_ar" ||  
          key === "project_description_ar" ||  
          key === "is_published"
        ) {
          formData.append(key, value);
        }
      });


      if (projectMainImageSelected) {
        formData.append("main_image", projectMainImageSelected);
      }

      filesExtraImages.forEach((fileInput) => {
        if (fileInput.file) {
          formData.append("extra_images[]", fileInput.file);
        }
      });

      filesAttachment.forEach((fileInput) => {
        if (fileInput.file) {
          formData.append("attachment[]", fileInput.file);
        }
      });



 


      const response = await customFetch({
         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/${id}/`,
         method: "PUT",
         body: formData, 
       });

      if(response && response.data){
        onClose()
        if(handleReloadFlag){handleReloadFlag()}

        if (mainImagefileInputRef.current) {
          mainImagefileInputRef.current.value = ""; // Reset the file input
        }
 
 
        

        // setData({
        //   project_name:'',
        //   project_name_hint: "",
        //   project_description: '',
        //   project_name_ar: '',
        //   project_name_hint_ar: '',
        //   project_description_ar: '',
        //  })
 
 
          // setFilesExtraImages([{ id: 1, file: null }]);
          // fileInputRefsExtraImages.current.forEach((input) => {
          //     if (input) input.value = "";
          // });



        // setFilesAttachment([{ id: 1, file: null }]);
        //   fileInputRefsFilesAttachment.current.forEach((input) => {
        //       if (input) input.value = "";
        //   });

        toast.success('your data has been submited')
      } else{
        setIsSubmitting(false)
        console.log('response', response)
        if (response?.error?.data) {
          toast.error(getErrorMessage(response.error.data));
        }
      }


    } catch(error){
      console.log('error', error)			
      toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
    } finally{ setIsSubmitting(false) }

  }








     const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === "file") {
          // If the input is a file, update the selectedFile state
          setProjectMainImageSelected(files[0]);
        } else {
          // If the input is not a file, update the data state
          setData((prevState) => ({
          ...prevState,
          [name]: value,
          }));
        }   
      }

  const fetchData = async (pageUrl) => {
    try {
      const response = await customFetch({
      url: pageUrl,
      method: 'GET', // Only use 'GET' for fetching data
      headers: {
        'Content-Type': 'application/json',
      }, 
      });
       if( response && response.data) {
        setData(response.data)
      } else{
        console.log(response)
      }
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    };


  useEffect(() => {

    fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/project_type/${id}`)
  }, [id]);


 
 



  useEffect(() => {
    const modalElement = document.getElementById('editModal_project');
  
    if (modalElement) {
     
      const modalInstance = new window.bootstrap.Modal(modalElement, {
        backdrop: true,  
        keyboard: true,  
      });
  
      modalInstance.show();
  
 
      const handleModalClose = () => {
        if(onClose){
          onClose();  
          document.activeElement?.blur(); 
          document.body.style.overflow = ""; // Restore scrolling
 
        }
      };
  
 
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
  
 
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
        modalInstance.dispose();
        document.body.style.overflow = ""; // Ensure scrolling is restored

      };
    }
  }, [id, onClose]);
   
 

    return (

 
        <div
        className="modal fade  modal-lg   "
        id="editModal_project"
        tabIndex="1"
        aria-labelledby="editModal_projectLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog        ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModal_projectLabel">Edit Project Type</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                // aria-label="Close"
 
              ></button>
            </div>



          <div className="modal-body">


            <form   className=" p-2 "     >

            
              
              <div className="mb-3">
                  <label htmlFor="project_name_edit" className="form-label small">
                  Project Name
                  </label>
                  <input
                      type="text"
                      className="form-control form-control-sm "
                      id="project_name_edit"
                      name="project_name"
                      value={data.project_name  || ""}
                      onChange={handleChange}
                      dir='ltr'


                  />
              </div>




              <div className="mb-3">
                  <label htmlFor="project_name_hint_edit" className="form-label small">
                      project Name Hint
                  </label>
                  <input
                      type="text"
                      className="form-control  form-control-sm"
                      id="project_name_hint_edit"
                      name="project_name_hint"
                      value={data.project_name_hint  || ""}
                      onChange={handleChange}
                      dir='ltr'


                  />
              </div>

              <div className="mb-3">
                  <label htmlFor="project_description_edit" className="form-label small">
                  Details
                  </label>
                  <textarea 
                      className="form-control  form-control-sm" 
                      id="project_description_edit"
                      name="project_description"
                      value={data.project_description  || ""}
                      onChange={handleChange}
                      dir='ltr'
                  >

                  </textarea>

              </div>




              <div className="mb-3">
                  <label htmlFor="project_name_ar_edit" className="form-label small">
                  Project Name (Ar)
                  </label>
                  <input
                      type="text"
                      className="form-control   form-control-sm text-end"
                      dir="rtl"
                      id="project_name_ar_edit"
                      name="project_name_ar"
                      value={data.project_name_ar  || ""}
                      onChange={handleChange}
                  />
              </div>


              <div className="mb-3">
                  <label htmlFor="project_name_hint_ar_edit" className="form-label small">
                  Project Name Hint (Ar)
                  </label>
                  <input
                      type="text"
                      className="form-control   form-control-sm text-end"
                      dir='rtl'
                      id="project_name_hint_ar_edit"
                      name="project_name_hint_ar"
                      value={data.project_name_hint_ar  || ""}
                      onChange={handleChange}


                  />
              </div>

              <div className="mb-3">
                  <label htmlFor="project_description_ar_edit" className="form-label small">
                      Details (Ar)
                  </label>
                  <textarea 
                      className="form-control   form-control-sm text-end"
                      dir='rtl' 

                      id="project_description_ar_edit"
                      name="project_description_ar"
                      value={data.project_description_ar  || ""}
                      onChange={handleChange}

                  >

                  </textarea>

              </div>


              <div className="form-check">
              <input
                  className="form-check-input small"
                  type="checkbox"

                  id="is_published_edit"
                  checked={data?.is_published}
                  // onChange={(e) => setIsPublished(e.target.checked)}
                  onChange={ (e) => {
                    setData((prevState) => ({
                      ...prevState,
                      is_published: e.target.checked,
                      }));
                    }
                  }
              />
              <label className="form-check-label small " htmlFor="is_published_edit">
                  Published
              </label>
              </div>




              <div className="mb-3">
                <label htmlFor="main_image_edit" className="form-label small">
                  Main Image
                </label>
                <input
                  type="file"
                  className="form-control   form-control-sm"
                  accept="image/*"
                  id="main_image_edit"
                  name="main_image"                
                  onChange={handleChange}
                  ref={mainImagefileInputRef}
                />

                {data?.main_image &&  <a href={data?.main_image || '/#'} target="_blank">  current image  </a> }

              </div>


      <AddFilesComponent 
          custom_id = "extra_images_edit_form"
          title = "Extra Images"
          filesExtraImages={filesExtraImages} 
          setFilesExtraImages={setFilesExtraImages} 
          fileInputRefsExtraImages={fileInputRefsExtraImages} 
          only_image={true}
          isEdit_form={true}
          editProject_id={data?.id}
          files_type={"extra_images"}
      />

      <AddFilesComponent 
          custom_id = "attachment_edit"
          title = "Attachments"
          filesExtraImages={filesAttachment} 
          setFilesExtraImages={setFilesAttachment} 
          fileInputRefsExtraImages={fileInputRefsFilesAttachment} 
          only_image={false}
          isEdit_form={true}

          editProject_id={data?.id}
          files_type={"attachment"}
      />



      



     





                </form>

              </div>



 
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
 

              >
                {/* {t('form_edit.cancel')} */}
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                // data-bs-dismiss="modal"
                disabled={isSubmitting}
              >
				{/* {editingItemId  ? t('form_edit.updating') : t('form_edit.update') } */}
                update
              </button>
            </div>
          </div>
        </div>
      </div>
 


    )
}