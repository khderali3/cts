
import { StepComponent } from "./timeline_components/stpes/step";



export const Timeline = ({ data = {} }) => {


 

    return(
 




<div className="container-fluid py-5 px-1 mx-1 px-md-5 ">
  <h2 className="text-center  border-bottom pb-2 mb-4">
    ProjectFlow Template Timeline
  </h2>

  <div className="position-relative timeline d-flex flex-column align-items-start ">

    {data?.steps?.map(( step, index) => 


        <StepComponent key={`step_${step.id}`}  step={step} index={index} />

        

    )}
 
 

  </div>
</div>




 








    )
}
 
 