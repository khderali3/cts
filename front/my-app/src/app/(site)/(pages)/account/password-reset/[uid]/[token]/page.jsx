

import PasswordResetConfirmForm from "@/app/(site)/_components/forms/PasswordResetConfirmForm";


export const metadata = {
	title: 'CloudTECH SKY | Password Reset Confirm',
	description: 'CloudTECH sky password reset confirm page',
};


const  resetPasswordConfirm = async ( { params } ) => {

    const {uid, token} = await params



    return (
        <>
        
        <div className="registration-form d-flex align-items-center justify-content-center background-color min-vh-100 ">
        <div className="col-lg-4 col-md-6 col-10 ">


        <PasswordResetConfirmForm  uid={uid} token={token} />


        </div>
        </div>



        </>
    )
}

export default resetPasswordConfirm
