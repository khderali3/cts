
'use client'
import { useRouter } from 'next/navigation';




const ContactUsButton = () => {

	const router = useRouter()
	return (
        <button type="button" className="btn btn-primary ps-4 pe-4"
			onClick={ ()=> {
			router.push('/#footer_id');
			}  
			}
			>
			Contact Us
        </button>

	)
}

export default ContactUsButton