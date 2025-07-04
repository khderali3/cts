
'use client'
  
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
export const ButtonProductApplyNow = ({projecttype_id}) => {
	const locale = useLocale()
	const router = useRouter()
 	return (
        <button type="button" className="btn btn-primary ps-4 pe-4"
			onClick={ ()=> {
 				router.push(`/tickets/newticket`);
				}  
			}
			>
			{locale === "ar" ? "اطلب الآن" : "Apply Now"}
 			
        </button>

	)
}

