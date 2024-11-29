


import ResetPasswordForm from "@/app/(site)/_components/forms/ResetPasswordForm"


export const metadata = {
  title : ' CloudTech Sky |reset password page',
  description : ' CloudTech Sky |reset password page '
}



const resetPassword = () => {

    return <>


<div className="form account_form d-flex align-items-center justify-content-center background-color ">
    <div className="col-lg-4 col-md-6 col-10 ">
    <h1 className="h3 mb-3 mt-5 fw-normal text-light text-center ">reset password Page</h1>

      <ResetPasswordForm />

      </div>
</div>


   
    </>
}


export default resetPassword