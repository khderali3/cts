


import ChangePasswordForm from '@/app/(site)/_components/forms/ChangePasswordForm';
import "@/app/(site)/_components/assets/css/account.css"


export const metadata = {
	title: 'CloudTech Sky | Change Passwod',
	description: 'CloudTech Sky  Change Passwod',
};




const changePassword = ( ) => {


    return (
        <>
        
        <div className="form account_form d-flex align-items-center justify-content-center background-color ">
        <div className="col-lg-4 col-md-6 col-10 ">
        <h1 className="h3 mb-3 mt-0 fw-normal text-light text-center ">Change password</h1>


            <ChangePasswordForm />

            </div>

        </div>



        </>
    )
}

export default changePassword
