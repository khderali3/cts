
import Link from "next/link";


import LoginForm from "@/app/(site)/_components/forms/LoginForm";
import LogingWithGoogle from "@/app/(site)/_components/jsx/loginpage/loginwithgooglebutton";
import "@/app/(site)/_components/assets/css/account.css"



export const metadata = {
	title: 'Full Auth | Login',
	description: 'Full Auth login page',
};



const loginPage = () => {

    return <>
  <div className="registration-form d-flex align-items-center justify-content-center background-color min-vh-100 ">
    <div className="col-lg-4 col-md-6 col-10 ">
    <h1 className="h3   fw-normal text-light text-center ">Login Page</h1>

  <LoginForm />

      <p className="text-center text-light mt-4 mb-2">
          Not a Member?
          <a href="/account/register" className="p-1 text-decoration-none">
            Register
          </a>
      </p>

      <p className="or text-muted text-center m-1">
        <span className="text-mute">or</span>
      </p>


      <LogingWithGoogle />

      <p className="mt-3   text-muted">©CloudTech</p> 





  </div>

  </div>



{/* 
  <Link className="nav-link" href="/account/password-reset" >
            reset password
  </Link>

  <Link className="nav-link" href="/account/register" >
            register a new account
  </Link>




<LogingWithGoogle />
   */}







    
    </>
}


export default loginPage