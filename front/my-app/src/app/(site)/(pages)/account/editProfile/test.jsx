'use client';

import { useState, useEffect } from "react";
import { useCustomFetchMutation } from "@/app/(site)/_components/redux/features/siteApiSlice";
import { toast } from "react-toastify";

const Page = () => {
  const [canEdit, setCanEdit] = useState(false);
  const [data, setData] = useState({});
  const [customFetch] = useCustomFetchMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    PRF_company: "",
    PRF_country: "",
    PRF_city: "",
    PRF_address: "",
    PRF_phone_number: "",
    PRF_image: null, // Use null for file initially
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all fields to form data
    Object.keys(formData).forEach((key) => {
      if (key === "PRF_image" && formData[key]) {
        form.append(key, formData[key]); // Append the file only if it exists
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      // Send form data using customFetch mutation
      const response = await customFetch({
        url: "http://localhost:8000/api/jwt/profile/",
        method: "POST",
        body: form, // Send FormData as the body
      });

      if (response.data) {
        toast.success("Profile updated successfully!");
        setData(response.data); // Update UI with new data
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Only store the first selected file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCanEdit = (e) => {
    e.preventDefault();
    setCanEdit(true);
  };

  const fetchData = async (pageUrl) => {
    setLoading(true);
    try {
      const response = await customFetch({
        url: pageUrl,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(response.data);

      // Populate formData with fetched data
      setFormData({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        PRF_company: response.data.PRF_company || "",
        PRF_country: response.data.PRF_country || "",
        PRF_city: response.data.PRF_city || "",
        PRF_address: response.data.PRF_address || "",
        PRF_phone_number: response.data.PRF_phone_number || "",
        PRF_image: null, // Don't prefill the file field
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData("http://localhost:8000/api/jwt/profile/");
  }, []);

  return (
    <div className="form d-flex align-items-center justify-content-center background-color vh-100">
      <form className="col-lg-4 col-md-6 col-12" onSubmit={handleSubmit}>
        <h1 className="h3 mt-5 mb-3 fw-normal text-light text-center">
          Update Profile
        </h1>

        <div className="form-floating pb-1">
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="First-Name"
            name="first_name"
            readOnly={!canEdit}
            value={formData.first_name}
            onChange={handleChange}
          />
          <label htmlFor="first_name">First Name</label>
        </div>

        <div className="form-floating pb-1">
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Last-Name"
            name="last_name"
            readOnly={!canEdit}
            value={formData.last_name}
            onChange={handleChange}
          />
          <label htmlFor="last_name">Last Name</label>
        </div>

        <div className="form-floating pb-1">
          <input
            type="text"
            className="form-control"
            id="PRF_country"
            placeholder="Country"
            name="PRF_country"
            readOnly={!canEdit}
            value={formData.PRF_country}
            onChange={handleChange}
          />
          <label htmlFor="PRF_country">Country</label>
        </div>

        <div className="form-floating pb-1">
          <input
            type="text"
            className="form-control"
            id="PRF_city"
            placeholder="City"
            name="PRF_city"
            readOnly={!canEdit}
            value={formData.PRF_city}
            onChange={handleChange}
          />
          <label htmlFor="PRF_city">City</label>
        </div>

        <div className="form-floating pb-1">
          <input
            type="text"
            className="form-control"
            id="PRF_company"
            placeholder="Company"
            name="PRF_company"
            readOnly={!canEdit}
            value={formData.PRF_company}
            onChange={handleChange}
          />
          <label htmlFor="PRF_company">Company</label>
        </div>

        <div className="pb-3 mb-2">
          <label htmlFor="PRF_image" className="form-label text-light">
            Upload New Profile Image
          </label>
          <input
            type="file"
            className="form-control"
            id="PRF_image"
            name="PRF_image"
            accept="image/*"
            disabled={!canEdit}
            onChange={handleChange}
          />
        </div>

        {canEdit ? (
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleCanEdit}
            className="w-100 btn btn-lg btn-danger"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default Page;
