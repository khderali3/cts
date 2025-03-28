'use client'

import {useState} from "react"

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice";

import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

 
import {  useLocale } from "next-intl";
import { getErrorMessage } from "@/app/public_utils/utils";
import { GroupAasignOrRemove } from "@/app/(dashboard)/_components/jsx/project_flow_template/groups assign/group";


import { useParams } from "next/navigation";


const Page = () =>  {

    const {template_id, step_id} = useParams()
 
    const locale = useLocale()

    const [customFetch] = useCustomFetchMutation();
    const [isSubmiting, setIsSubmiting] = useState(false)
    
    const router = useRouter()

    const [allowedProcessGroups, setAllowedProcessGroups] = useState([])






    const [formData, setFormData] = useState({
      sub_step_name: "",
      sub_step_description: '',
      sub_step_name_ar : '',
      sub_step_description_ar : '',
      show_to_client : true,
      allowed_process_by : '',
        // allowed_process_groups:[],
      start_process_sub_step_strategy : '',
      show_status_log_to_client: '',
    });


   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(name !== "allowed_process_groups"){
      setFormData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,  // Handle checkboxes correctly
        }));
    }
  };

 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.sub_step_name.trim() ||  
      !formData.sub_step_description.trim() ||  
      !formData.sub_step_name_ar.trim() ||  
      !formData.sub_step_description_ar.trim() ||  
      !["inherit_from_project_flow", "auto", "manual"].includes(formData.start_process_sub_step_strategy) ||
      !["any_staff", "specific_staff_group", "client"].includes(formData.allowed_process_by)  ||
      !["inherit_from_project_flow", "yes", "no"].includes(formData.show_status_log_to_client)  

    ) {
      toast.error("All fields are required!");
      return;
    }
  
    try{
      setIsSubmiting(true)
      const form = new FormData();

      for (const key in formData) {
        form.append(key, formData[key]);
      }

      form.append('allowed_process_groups', JSON.stringify(allowedProcessGroups));


      

    const response = await customFetch({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/project_flow_template/steps_template/${step_id}/sub_steps/`,
      method: "POST",
      body: form,  
    });

    if(response && response.data){
      router.push(`/staff/projectFlow/projectFlowTemplate/template_details/${template_id}`)
      toast.success('data has been added succusfuly');

    } else{
      console.log('allowedProcessGroups', allowedProcessGroups)

      console.log(response?.error)
      toast.error(getErrorMessage(response?.error?.data))
    }


    } catch (error){
      console.log(error)
      toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");

    } finally{setIsSubmiting(false)}
  };
  

 
 

    return (
 

      <div> 
      <div className="app-content-header">


      </div>

      <div className="app-content">



        <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >


            <h2>Add New Sub-Step Template</h2>
              <form className="col-md-8 col-12 mb-5" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="sub_step_name" className="form-label small">
                        Sub-Step Name <span className="text-danger">*</span>
                    </label>
                    <input  
                        name="sub_step_name" 
                        onChange={handleChange}
                        className=" form-control form-control-sm " 
                        id="sub_step_name" 
                        maxLength="50"
                        value={formData.sub_step_name}
                    />
                    <div className="form-text fs-8">Enter a name for this Sub-Step.</div>
                </div>


                <div className="mb-3">
                    <label htmlFor="sub_step_description" className="form-label small">
                        Sub-Step Details<span className="text-danger">*</span>
                    </label>
                    <textarea  
                        name="sub_step_description" 
                        onChange={handleChange}
                        className="form-control form-control-sm " 
                        id="sub_step_description" 
                        maxLength="500" // Adjust if needed
                        value={formData.sub_step_description}
                        rows="2"  
                    />
                    <div className="form-text fs-8">Enter a Details for this Sub-Step.</div>
                </div>



                <div className="mb-3">
                    <label htmlFor="sub_step_name_ar" className="form-label small">
                        Sub-Step (Ar) <span className="text-danger">*</span>
                    </label>
                    <input  
                        name="sub_step_name_ar" 
                        onChange={handleChange}
                        className="form-control text-end form-control-sm "
                         
                        id="sub_step_name_ar" 
                        maxLength="50"
                        value={formData.sub_step_name_ar}
                    />
                    <div className="form-text fs-8">Enter a name for this Step in Arabic.</div>
                </div>


                <div className="mb-3">
                    <label htmlFor="sub_step_description_ar" className="form-label small">
                      Sub-Step Details (Ar) <span className="text-danger">*</span>
                    </label>
                    <textarea  
                        name="sub_step_description_ar" 
                        onChange={handleChange}
                        className="form-control text-end form-control-sm " 
                        id="sub_step_description_ar" 
                        maxLength="500" // Adjust if needed
                        value={formData.sub_step_description_ar}
                        rows="2"  
                    />
                    <div className="form-text fs-8">Enter a Details for this Sub-Step in Arabic.</div>
                </div>

 


                <div className="mb-3">
                  <label htmlFor="allowed_process_by" className="form-label small">
                    Allowed Process By
                  </label>
                  <select 
                    className="form-select form-select-sm " 
                    id="allowed_process_by"
                    name="allowed_process_by"   
                    onChange={handleChange}   
                    // defaultValue=""
                    value={formData.allowed_process_by}
              
                  >
                    <option value="" disabled >Select Option</option>  
                    <option value="any_staff">Any Staff</option>
                    <option value="specific_staff_group">Specific Staff Group</option>
                    <option value="client">client</option>

                  </select> 
                  <div className="form-text fs-8">
                    Choose who is allowed to process this  Sub-Step: any staff member, a specific staff group, or the client.
                  </div>
                </div>



              {formData.allowed_process_by === 'specific_staff_group' ?
              
                <div className="mb-3 ps-2 mb-5">

                  <label htmlFor="allowed_process_by" className="form-label small">
                    Select Groups
                  </label>


                  <GroupAasignOrRemove 
                    allowedProcessGroups={allowedProcessGroups} 
                    setAllowedProcessGroups={setAllowedProcessGroups} 
                  />
                </div>              
                : ''
              }





                <div className="mb-3">
                  <label htmlFor="start_process_sub_step_strategy" className="form-label small">
                    Start Process Strategy
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    id="start_process_sub_step_strategy"
                    name="start_process_sub_step_strategy"   
                    onChange={handleChange}   
                    // defaultValue=""
                    value={formData.start_process_sub_step_strategy}
              
                  >
                    <option value="" disabled >Select Option</option> 
                    <option value="inherit_from_project_flow">Inherit From Template</option>
                    <option value="auto">Auto</option>
                    <option value="manual">Manual</option>
                  </select> 
                  <div className="form-text fs-8">
                    Inherit From Template: Uses the predefined process from the project template.
                    Auto: The  Sub-Step starts automatically when the previous step or Sub-Step is complete.
                    Manual: Staff must manually start each Sub-Step.
                  </div>
                </div>



                <div className="mb-3">
                  <label htmlFor="show_status_log_to_client" className="form-label small">
                    Show Status Logs To Client
                  </label>
                  <select 
                    className="form-select form-select-sm " 
                    id="show_status_log_to_client"
                    name="show_status_log_to_client"   
                    onChange={handleChange}   
                    value={formData.show_status_log_to_client}

                  >
                    <option value="" disabled>Select Option</option>
                    <option value="inherit_from_project_flow">Inherit From Template</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select> 
                  <div className="form-text fs-8">
                    Choose whether clients can see Sub-Step status logs.
                  </div>
                </div>




                <div className="form-check mt-2">
                  <input
                    name="show_to_client"   

                    className="form-check-input form-check-input-sm"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.show_to_client}
                    id="show_to_client"
                  />
                  <label className="form-check-label small" htmlFor="show_to_client">
                    Show To Client
                  </label>
                  <div className="form-text fs-8">
                    Choose whether clients can see this Sub-Step.
    
                  </div>

                </div>





                <button
                  type="submit"
                  className="btn btn-sm btn-outline-primary mt-4"
                  disabled={isSubmiting}
                  >
                  Submit
                </button>
              </form>

          </div>
          

          </div>
        </div>
    )

}




 export default Page 


 