




export const Footer = () => {



    return (


        <>
        
 
  {/* Start Footer Section */}
  <div className="footer background-color  ">
    <div className="foot-back background-image" />
    <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
      <div className="intro">
        <ul className="text-light d-flex flex-column justify-content-center">
          <li className="active mb-4">Home</li>
          <li className="mb-4">Product</li>
          <li className="mb-4">About us</li>
          <li className="mb-4">Contact</li>
        </ul>
      </div>
      <div className="mo-map">
        <div className="map text-light mb-5">
          <h4>We are headquartered in:</h4>
          <p className="ms-3 mt-3">building, street, area, city, contry</p>
          <p className="ms-3 mt-3">building, street, area, city, contry</p>
        </div>
        <div className="map text-light mt-5">
          <h4>You can also reach us by email:</h4>
          <p className="ms-3 mt-3">Cloudtech@gmailcom</p>
          <p className="ms-3 mt-3">+963 999 999 999</p>
        </div>
      </div>
      <div className="contac">
        <p className="text-light mb-5">
          <span>Cloud Tech</span> is a leading company in the field of
          technology and IT solutions.
        </p>
        <div className="form text-light d-flex flex-column justify-content-around">
          <form action="" className="d-flex flex-column">
            <label htmlFor="" className="mb-4 ms-1">
              your feedback:
            </label>
            <textarea
              name=""
              id=""
              rows={2}
              placeholder="Message Here"
              defaultValue={""}
            />
          </form>
          <button className="mt-4 w-25 ms-1 p-1">Submite</button>
        </div>
      </div>
    </div>
  </div>
  {/* End Footer Section */}



        
        </>
    )
}

