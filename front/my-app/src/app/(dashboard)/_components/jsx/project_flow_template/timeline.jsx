
import { toast } from "react-toastify";
import { StepComponent } from "./timeline_components/stpes/step";



export const Timeline = ({ data = {}, reloadComponentMethod=null }) => {


 

    return(
 




<div className="container-fluid py-5 px-1 mx-1 px-md-2 ">
  <h2 className="text-center  border-bottom pb-2 mb-4">
    Project Flow Template Timeline
  </h2>

  <div className="position-relative timeline-dash d-flex flex-column align-items-start ">

    {data?.steps?.map(( step, index) => 

        
        <StepComponent key={`step_${step.id}`}  step={step} index={index} reloadComponentMethod={reloadComponentMethod}/>

        

    )}
 
 

  </div>
</div>




 








    )
}
 
 