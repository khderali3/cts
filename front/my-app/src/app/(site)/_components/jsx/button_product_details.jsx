
"use client"; // Add this line at the top of the file

import { useRouter } from 'next/navigation';

const ProductButton = ({ slug }) => {
  const router = useRouter();


  const handleMoreDetails = () => {
    if(slug) {
    // Navigate to the product page with the given slug
    console.log("id clicked")
    router.push(`/product/${slug}`);
    } else {
      console.log('clicket without slug')
    }

  }
  return (
    <button onClick={handleMoreDetails} className="btn btn-primary">
      More Detailse
    </button>
  );
};

export default ProductButton;