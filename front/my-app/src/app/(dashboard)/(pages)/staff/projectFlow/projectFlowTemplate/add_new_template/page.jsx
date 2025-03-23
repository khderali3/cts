'use client'

import {  useState  } from "react"

import { useCustomFetchMutation } from "@/app/(dashboard)/_components/redux_staff/features/authApiSlice"

import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

import { getErrorMessage } from "@/app/public_utils/utils";



const Page = () =>  {

 
 
  const [customFetch] = useCustomFetchMutation();
  const [isSubmiting, setIsSubmiting] = useState(false)
 
  const router = useRouter()
 

  const [formData, setFormData] = useState({
    template_name: "",
    default_start_process_step_or_sub_step_strategy: '',
    manual_start_mode : '',
    auto_start_first_step_after_clone: true,
    show_steps_to_client: true,
    show_steps_or_sub_steps_status_log_to_client: true,
  });

 

  // Handle input changes for text fields
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,  // Handle checkboxes correctly
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.template_name.trim() ||  
      !["auto", "manual"].includes(formData.default_start_process_step_or_sub_step_strategy) ||   
      !["serialized", "non-serialized"].includes(formData.manual_start_mode)
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


    const response = await customFetch({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/project_flow_template/`,
      method: "POST",
      body: form,  
    });

    if(response && response.data){
      router.push('/staff/projectFlow/projectFlowTemplate')
      toast.success('data has been added succusfuly');

    } else{
      console.log('response?.error', response?.error)
      // toast.error(JSON.stringify(response?.error));
      toast.error(getErrorMessage(response?.error?.data))

    }


    } catch (error){
      console.log('error', error)

      toast.error(getErrorMessage(error.data || error.message) || "Something went wrong");

    } finally{setIsSubmiting(false)}
  };
  

 
 

    return (
 

      <div> 
      <div className="app-content-header">


      </div>

      <div className="app-content">



        <div className="container-fluid  min-vh-150 bg-white p-3 border rounded " >


            <h2>Add New ProjectFlow Template</h2>
              <form className="col-md-8 col-12 mb5" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="template_name" className="form-label small">
                    Template Name <span className="text-danger">*</span>
                  </label>
                  <input  
                    name="template_name" 
                    onChange={handleChange}
                    className="form-control form-control-sm" 
                    id="template_name" 
                    maxLength="50"
                    value={formData.template_name}
                  />
                  <div className="form-text fs-8">Enter a name for this template.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="default_start_process_step_or_sub_step_strategy" className="form-label small">
                    Steps Process Strategy
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    id="default_start_process_step_or_sub_step_strategy"
                    name="default_start_process_step_or_sub_step_strategy"   
                    onChange={handleChange}   
                    // defaultValue=""
                    value={formData.default_start_process_step_or_sub_step_strategy}
              
                  >
                    <option value="" disabled >Select Option</option>  
                    <option value="auto">Auto</option>
                    <option value="manual">Manual</option>
                  </select> 
                  <div className="form-text fs-8">
                    Auto: The next step starts automatically when the previous step is complete. Manual: Staff must manually start each step.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="manual_start_mode" className="form-label small">
                    Manual Start Mode
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    id="manual_start_mode"
                    name="manual_start_mode"   
                    onChange={handleChange}  
                    value={formData.manual_start_mode}
 

                    // defaultValue=''
                  >
                    <option value="" disabled>Select Option</option>
                    <option value="serialized">Serialized</option>
                    <option value="non-serialized">Non-Serialized</option>
                  </select> 
                  <div className="form-text fs-8">
                    Serialized: A step can only start if the previous one is completed.  
                    Non-Serialized: Steps can start in any order.
                  </div>
                </div>
 


                <div className="form-check ">
                  <input
                    name="auto_start_first_step_after_clone"   

                    className="form-check-input small"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.auto_start_first_step_after_clone}
                    id="auto_start_first_step_after_clone"
                  />
                  <label className="form-check-label small" htmlFor="auto_start_first_step_after_clone">
                    Auto Start First Step
                  </label>
                  <div className="form-text fs-8">
                    If enabled, the first step will automatically change to 'In Progress'
                    when the template is cloned (steps and settings are copied) to the project flow.    
                  </div>

                </div>




                <div className="form-check mt-2">
                  <input
                    name="show_steps_to_client"   

                    className="form-check-input small"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.show_steps_to_client}
                    id="show_steps_to_client"
                  />
                  <label className="form-check-label small" htmlFor="show_steps_to_client">
                    Show Steps To Client
                  </label>
                  <div className="form-text fs-8">
                    Choose whether clients can see project steps.
    
                  </div>

                </div>


 

                <div className="form-check mt-2">
                  <input
                    name="show_steps_or_sub_steps_status_log_to_client"   

                    className="form-check-input small"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.show_steps_or_sub_steps_status_log_to_client}
                    id="show_steps_or_sub_steps_status_log_to_client"
                  />
                  <label className="form-check-label small" htmlFor="show_steps_or_sub_steps_status_log_to_client">
                    Show Step Status Logs To Client
                  </label>
                  <div className="form-text fs-8">
                    Choose whether clients can see step status logs.
    
                  </div>

                </div>



                <button
                  type="submit"
                  className="btn-sm btn btn-outline-primary mt-4"
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


 