import { useEffect } from "react";


const CustomModal = ( { id, handleSubmit, submitting,
     message="Are you sure you want to update Data?",
     isModalOpen,
     setIsModalOpen,
     operationType='Update'
     } ) => {


      useEffect(() => {

        // When modal is open, listen for clicks outside the modal to close it
        const modalElement = document.getElementById(id);
        const modalDialog = modalElement ? modalElement.querySelector('.modal-dialog') : null;
    
        // Function to close the modal if click happens outside the modal-dialog
        const handleClickOutside = (event) => {
          if (modalElement && !modalDialog.contains(event.target)) {
            setIsModalOpen(false);  // Close modal if clicked outside
          }
        };
    
        if (isModalOpen) {
          // Add event listener when modal is open
          document.addEventListener('click', handleClickOutside);
        } else {
          // Remove event listener when modal is closed
          document.removeEventListener('click', handleClickOutside);
        }
    


        if (isModalOpen) {
          const modalElement = document.getElementById(id);
          if (modalElement) {
            const modalInstance = new window.bootstrap.Modal(modalElement);
            modalInstance.show();
          }
        }

        return () => {
          // Clean up the event listener on unmount
          document.removeEventListener('click', handleClickOutside);
        };
      }, [isModalOpen, id]);




    return (



        <div
        className="modal fade"
        // id="confirmationModal"
        id={id}
        tabIndex={-1}
        // aria-labelledby="confirmationModalLabel"
        aria-labelledby={`${id}Label`}

        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            {/* <h5 className="modal-title" id="confirmationModalLabel"> */}
            <h5 className="modal-title" id={`${id}Label`}>



                Confirm Submission
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=> setIsModalOpen(false)}
              />
            </div>
            <div className="modal-body">
                {message}
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=> setIsModalOpen(false)}
              >
                Cancel
              </button>
              {/* Use data-bs-dismiss="modal" and form submission happens automatically */}
              <button
                type="button"
                className={ `btn ${ operationType === "Delete" ?  "btn-danger":  "btn-primary"  }` }
                data-bs-dismiss="modal"
                onClick={handleSubmit}
                disabled={submitting}
              >
    
                {
                  operationType === "Delete" 
                  ? ( !submitting ? 'Yes, Delete' : 'Deleting...') 
                  
                  : ( !submitting ? 'Yes, Update' : 'Updating...')
                }
             
              </button>
            </div>
          </div>
        </div>
      </div>
    
    



    )
}



export default CustomModal