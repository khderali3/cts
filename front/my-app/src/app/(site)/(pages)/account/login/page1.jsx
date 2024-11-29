
import Link from "next/link";


import LoginForm from "@/app/(site)/_components/forms/LoginForm";
import LogingWithGoogle from "@/app/(site)/_components/jsx/loginpage/loginwithgooglebutton";
// import "@/app/(site)/_components/assets/css/account.css"

export const metadata = {
	title: 'Full Auth | Login',
	description: 'Full Auth login page',
};



const loginPage = () => {



    return <>


{/* <main className="form-signin col-4 py-5">
<h1 className="h3 mb-3 fw-normal">Please login</h1> */}
{/* <LoginForm />


  <Link className="nav-link" href="/account/password-reset" >
            reset password
  </Link>

  <Link className="nav-link" href="/account/register" >
            register a new account
  </Link>


<LogingWithGoogle />
   */}



{}
  <div className="form d-flex align-items-center justify-content-center background-color">
    <form   className="col-lg-4 col-md-6 col-10">
      <h1 className="h3 mb-3 fw-normal text-light text-center">Login Page</h1>
      <div className="form-floating pb-1">
        <input
          type="email"
          className="form-control"
          id="eamil"
          placeholder="email"
          name="email"
        />
        <label htmlFor="new_password">E-mail</label>
      </div>
      <div className="form-floating pb-1">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="password"
          name="password"
        />
        <label htmlFor="new_password">Password</label>
      </div>
      <p className="text-end">
        <a href="#" className="text-light">
          Forgot Password
        </a>
      </p>
      <button className="w-100 btn btn-lg btn-primary m-0" type="submit">
        Login here
      </button>
      <p className="text-center text-light mt-4 mb-2">
        Not a Member?
        <a href="" className="p-1 text-decoration-none">
          Register
        </a>
      </p>
      <p className="or text-muted text-center m-1">
        <span>or</span>
      </p>
      <button className="btn btn-danger w-100  p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          fill="currentColor"
          className="bi bi-google"
          viewBox="0 0 16 16"
        >
          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
        </svg>
        <span className="ms-2">signin with Google</span>
      </button>
      <p className="mt-3 mb-3 text-muted">©CloudTech</p>
    </form>
  </div>





{/* </main> */}



</>   

}


export default loginPage