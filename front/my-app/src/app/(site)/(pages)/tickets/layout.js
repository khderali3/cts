
import RequireAuth from '../../_components/utils/requireAuth';



export default function Layout({ children }) {
	return <RequireAuth>{children}</RequireAuth>;
	// return  <> {children}  </>

}