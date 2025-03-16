
'use client'
import { useRouter } from 'next/navigation';
 

export const ButtonProjectApplyNow = () => {
 
	const router = useRouter()
	return (
        <button type="button" className="btn btn-primary ps-4 pe-4"
			onClick={ ()=> {
				router.push('/projectflow/new_projectflow');
				}  
			}
			>
 			Apply Now
        </button>

	)
}

