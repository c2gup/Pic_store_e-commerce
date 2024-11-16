import React, { useState } from "react";
import toast from "react-hot-toast";
import useUpload from "../../hooks/useUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

const ImageAdd = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const author = useSelector((state) => state.auth.author);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onUploadProgress = (progressEvent) =>
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.title.value;
      const price = e.target.price.value;

      if (!title || !price) return toast.error("Please fill all the fields.");
      if (title.trim === "" || price.trim === "")
        return toast.error("Please fill all the feilds");

      const { public_id, secure_url } = await useUpload({
        image,
        onUploadProgress,
      });

      if (!public_id || !secure_url) return toast.error("Image upload failed");

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/post/create",
        {
          title,
          price,
          image: secure_url,
          publicId: public_id,
          author,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      const data = await res.data;
      if (data.success == true) {
        toast.success(data.message);
        e.target.reset();
        setImage(null);
        setProgress(0);
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-5 bg-white mx-9 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold">Add New Product</h2>
      <form className="gird grid-cols-1 gap-2 my-4" onSubmit={addPost}>
        <img
          src={`${
            image
              ? URL.createObjectURL(image)
              : "https://dummyimage.in/600x400/d4d4d4/ffffff?text=No%20Image"
          }`}
          alt="this picture"
          className="w-[350px] h-[25vh] sm:h-[30vh] rounded-lg object-cover"
        />

        {/* Show a progress bar */}

        {progress > 0 && (
          <ProgressBar
            completed={progress}
            bgColor="black"
            transitionTimingFunction="ease-in-out"
          />
        )}

        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="rounded-lg border outline-none px-3 py-1 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="Beautiful Flower"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            required
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="45"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-3 bg-black font-semibold text-white rounded-lg mt-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ImageAdd;
