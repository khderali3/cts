
'use client';

import { useDispatch } from "react-redux"
import { useLogoutMutation } from '@/app/(site)/_components/redux/features/authApiSlice';
import { logout as setLogout } from '@/app/(site)/_components/redux/features/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

 

const LogoutLink = () => {

    const locale = useLocale()
    const router = useRouter()
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const t = useTranslations("site.nav"); // this works

      const handleLogout = (event) => {
        event.preventDefault()
        logout()
          .unwrap()
          .then(() => {
            dispatch(setLogout());

            if( locale === "ar" ){
              toast.success('تم تسجيل الخروج بنحاج')

            } else {
              toast.success('you have loged out succusfuly')

            }
            router.push('/')
          })
          .catch( () => {
            console.log('logout failed')
            if( locale === "ar" ){
              toast.success("فشل في تسجيل الخروج")

            } else {
              toast.error('field to logout!')

            }
          })
      };





        return(
          <>
        <a className="bg-focus dropdown-item text-light" href="#" onClick={handleLogout}>
          {/* logout */}
          { t('nav_links.logout')}

        </a>
          </>
        )
}

export default LogoutLink