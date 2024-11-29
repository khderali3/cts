// 'use client';

// import { redirect } from 'next/navigation';

// import { useSelector } from 'react-redux';

// export default function RequireAuth({ children }) {
// 	const { isLoading,  isAuthenticated } = useSelector(state => state.auth);


// 	if ( isLoading) {
// 		return ;
// 	}
// 	if (!isAuthenticated ) {
// 		redirect('/account/login');
// 	}

// 	return <>{children}</>;
// }








'use client';

import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function RequireAuthTicket({ children }) {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect only after confirming loading has finished
        redirect('/account/login');
      } else {
        // Set flag to render content after auth check completes
        setShouldRender(true);
      }
    }
  }, [isLoading, isAuthenticated]);

  // Don't render children until auth check is complete
  if (isLoading || !shouldRender) {
    // return null; // You can replace this with a loading spinner if needed
 
    return(
      <div className="form account_form d-flex align-items-center justify-content-center background-color ">
        <h1 className='text-light'> kindly wait ....  </h1>
      </div>
    )
 
 
 
 
  }

  return <>{children}</>;
}
