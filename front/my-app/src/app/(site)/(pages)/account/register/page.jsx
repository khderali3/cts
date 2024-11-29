

import RegisterForm from "@/app/(site)/_components/forms/RegisterForm";



export const metadata = {
	title: 'ClouTech Sky | Register',
	description: 'ClouTech Sky register page',
};



const registerPage = () => {



    return <>

<div className="form account_form d-flex align-items-center justify-content-center background-color ">
    <div className="col-lg-4 col-md-6 col-10 ">
    <h1 className="h3 mb-3 mt-5 fw-normal text-light text-center ">Register Page</h1>

      <RegisterForm />

    </div>
</div>



    
    </>
}


export default registerPage