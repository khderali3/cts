
'use client';

import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

export default function RequireAuthStaff({ children }) {
  const { isLoading, isAuthenticated } = useSelector(state => state.staff_auth);
  
  const pathname = usePathname();
  const notProtectedPaths = ['/staff/account/login', ];
  const isNotProtected = notProtectedPaths.includes(pathname);

  if (isLoading && !isNotProtected ) {
        return(
          <div className="form account_form d-flex align-items-center justify-content-center   min-vh-100  ">
            <h1 className=' '> kindly wait ....  </h1>
          </div>
        )
   }
  if (!isAuthenticated && !isNotProtected ) {
		redirect('/staff/account/login');
	}

	return <>{children}</>;


}
