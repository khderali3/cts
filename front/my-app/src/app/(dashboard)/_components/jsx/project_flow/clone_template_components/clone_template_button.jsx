import { useState, useEffect } from "react";

import { FormSearchInput } from "./input_list_of_templates"

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"
import { getErrorMessage } from "@/app/public_utils/utils";

import { toast } from "react-toastify";

export const ButtonCloneTemplate= ({project_id, reloadComponentMethod}) => {

  const [templateId, setTemplateId] = useState('');  

  const [customFetch] = useCustomFetchMutation();
  const [isSubmitting, setIsSubmitting] = useState(false)



  const handleTemplateChange = (selectedValue) => {
    if(selectedValue){
      setTemplateId(selectedValue);
    }else{
      setTemplateId('');
    } 
 
  };


  const handleSubmit = async (e) => {

    e.preventDefault()
    if(templateId === ''){
      toast.error('please select Template to Clone');
      return
    }
    setIsSubmitting(true);

    try {
      const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/projectflow/clone_project_flow_template/${templateId}/${project_id}/`,
        method: "POST",
        body: {}
      });

      if(response && response.data) {
        setTemplateId('')
        toast.success('the project has been cloned a template successfully.')
        if(reloadComponentMethod) {reloadComponentMethod()}
      } else {
          toast.error("Failed to submit the request.");
          if (response?.error?.data) {
              toast.error(getErrorMessage(response.error.data));
          }
        }

    } catch (error) {
        console.error("Submission Error:", error);
        toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");
    } finally {
        setIsSubmitting(false);
    }
  };



 




    return ( <>
    
    <button 
    className="btn btn-light btn-sm small"
    data-bs-toggle="modal"
    data-bs-target="#cloneTemplate_id"
    
    
    > 
            clone template
    </button>

 


    <div
        className="modal fade   "
        id="cloneTemplate_id"
        tabIndex="-1"
        aria-labelledby="cloneTemplateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog   ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cloneTemplateLabel">Clone Template</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>




			<form   className="modal-body"     >

			
			<div className="mb-3">
        <FormSearchInput 
          handleobjectIdChange={handleTemplateChange}
          objectId={templateId}
          ph={'Select Template'}
          lable={'Select Template'}

        />
			</div>

 

			</form>






            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
              Clone
              </button>
            </div>
          </div>
        </div>
      </div>





    </>

    )
}