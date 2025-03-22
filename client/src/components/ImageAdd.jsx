
// import  { useState } from "react";
// import { toast } from "react-hot-toast";
// import useUpload from "../../hooks/useUpload";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { AiOutlineClose } from "react-icons/ai";

// const ImageAdd = () => {
//   const [image, setImage] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");

//   const author = useSelector((state) => state.auth.author);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const onUploadProgress = (progressEvent) =>
//     setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));

//   const handleAddTag = () => {
//     if(tags.length > 10) return toast.error("You can not add more than 10 tags");
//     if (!tagInput.trim()) return toast.error("Tag cannot be empty.");
//     if (tags.includes(tagInput.trim())) return toast.error("Tag already exists.");
//     setTags((prev) => [...prev, tagInput.trim()]);
//     setTagInput("");
//   };

//   const handleRemoveTag = (tagToRemove) => {
//     setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
//   };

//   const addPost = async (e) => {
//     e.preventDefault();
//     try {
//       const title = e.target.title.value;
//       const price = e.target.price.value;

//       if (!title || !price) return toast.error("Please fill all the fields.");
//       if (title.trim() === "" || price.trim() === "")
//         return toast.error("Please fill all the fields.");

//       const { public_id, secure_url } = await useUpload({
//         image,
//         onUploadProgress,
//       });

//       if (!public_id || !secure_url) return toast.error("Image upload failed");

//       const res = await axios.post(
//         import.meta.env.VITE_API_URL + "/api/post/create",
//         {
//           title,
//           price,
//           image: secure_url,
//           publicId: public_id,
//           author,
//           tags,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("accessToken"),
//           },
//         }
//       );

//       const data = await res.data;
//       if (data.success) {
//         toast.success(data.message);
//         e.target.reset();
//         setImage(null);
//         setProgress(0);
//         setTags([]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="p-4 bg-[#3B3B3B] mx-3 rounded-2xl shadow-md">
//       <h2 className="text-xl text-white font-bold">Add New Product</h2>
//       <form className="grid grid-cols-1 gap-4 my-4" onSubmit={addPost}>
//         <img
//           src={`${
//             image
//               ? URL.createObjectURL(image)
//               : "https://dummyimage.com/600x400/d4d4d4/3B3B3B&text=No%20Image"
//           }`}
//           alt="Selected"
//           className="w-[350px] h-[25vh] sm:h-[30vh] rounded-lg object-cover"
//         />

//         {/* Progress Bar */}
//         {progress > 0 && (
//           <ProgressBar
//             completed={progress}
//             bgColor="black"
//             transitionTimingFunction="ease-in-out"
//           />
//         )}

//         <div className="flex flex-col">
//           <label htmlFor="image" className="font-bold text-white ">
//             Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             onChange={handleImageChange}
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="title" className="font-bold text-white ">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             required
//              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
//             placeholder="Beautiful Flower"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="price" className="font-bold text-white ">
//             Price
//           </label>
//           <input
//             type="text"
//             name="price"
//             id="price"
//             required
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
//             placeholder="45"
//           />
//         </div>

//         {/* Tag Section */}
//         <div className="flex flex-col">
//           <label htmlFor="tags" className="font-bold text-white ">
//             Tags
//           </label>
//           <div className="flex items-center gap-2 mt-1">
//             <input
//               type="text"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
//               placeholder="Enter a tag"
//             />
//             <button
//               type="button"
//               onClick={handleAddTag}
//                className="w-full inline-flex items-center justify-center rounded-full bg-[#A259FF] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#8a4de6] transition-colors"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {tags.map((tag, index) => (
//               <div
//                 key={index}
//                 className="flex items-center bg-gray-200 text-sm rounded-lg px-3 py-1"
//               >
//                 <span>{tag}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveTag(tag)}
//                   className="ml-2 text-red-500"
//                 >
//                   <AiOutlineClose />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//            className="w-full inline-flex items-center justify-center rounded-full bg-[#A259FF] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#8a4de6] transition-colors"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageAdd;

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useUpload from "../../hooks/useUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineClose } from "react-icons/ai";

const ImageAdd = ({ postToEdit, setPostToEdit, onUpdate }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [initialData, setInitialData] = useState(null);

  const author = useSelector((state) => state.auth.author);



  useEffect(() => {
    if (postToEdit) {
      setInitialData(postToEdit);
      setTags(postToEdit.tags || []);
      setImage(postToEdit.image); // This will be a URL initially
    } else {
      setInitialData(null);
      setTags([]);
      setImage(null);
    }
  }, [postToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onUploadProgress = (progressEvent) =>
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));

  const handleAddTag = () => {
    if (tags.length > 10) return toast.error("You cannot add more than 10 tags");
    if (!tagInput.trim()) return toast.error("Tag cannot be empty.");
    if (tags.includes(tagInput.trim())) return toast.error("Tag already exists.");
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.title.value;
      const price = e.target.price.value;

      if (!title || !price) return toast.error("Please fill all the fields.");
      if (title.trim() === "" || price.trim() === "")
        return toast.error("Please fill all the fields.");

      const token = localStorage.getItem("accessToken");
      if (!token) return toast.error("No access token found.");

      let imageUrl = postToEdit?.image;
      let publicId = postToEdit?.publicId;

      if (image && typeof image !== "string") { // New image uploaded
        const { public_id, secure_url } = await useUpload({
          image,
          onUploadProgress,
        });
        if (!public_id || !secure_url) return toast.error("Image upload failed");
        imageUrl = secure_url;
        publicId = public_id;
      }

      const payload = {
        title,
        price,
        image: imageUrl,
        publicId,
        author,
        tags,
      };

      const url = postToEdit && postToEdit._id
        ? `${import.meta.env.VITE_API_URL}/api/post/edit/${postToEdit._id}`
        : `${import.meta.env.VITE_API_URL}/api/post/create`;

      const method = postToEdit && postToEdit._id ? axios.put : axios.post;

      const res = await method(url, payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        e.target.reset();
        setImage(null);
        setProgress(0);
        setTags([]);
        setPostToEdit(null);
        if (postToEdit && onUpdate) onUpdate(data.data); // Pass updated post back
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="p-4 bg-[#3B3B3B] mx-3 rounded-2xl shadow-md">
      <h2 className="text-xl text-white font-bold">
        {postToEdit ? "Edit Product" : "Add New Product"}
      </h2>
      <form className="grid grid-cols-1 gap-4 my-4" onSubmit={handleSubmit}>
        <img
          src={
            image
              ? typeof image === "string"
                ? image
                : URL.createObjectURL(image)
              : "https://dummyimage.com/600x400/d4d4d4/3B3B3B&text=No%20Image"
          }
          alt="Selected"
          className="w-[350px] h-[25vh] sm:h-[30vh] rounded-lg object-cover"
        />

        {progress > 0 && (
          <ProgressBar
            completed={progress}
            bgColor="black"
            transitionTimingFunction="ease-in-out"
          />
        )}

        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold text-white">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-white">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={postToEdit?.title || ""}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
            placeholder="Beautiful Flower"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold text-white">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            required
            defaultValue={postToEdit?.price || ""}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
            placeholder="45"
          />
        </div>

        {/* Tag Section */}
        <div className="flex flex-col">
          <label htmlFor="tags" className="font-bold text-white">Tags</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
              placeholder="Enter a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="w-full inline-flex items-center justify-center rounded-full bg-[#A259FF] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#8a4de6] transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-sm rounded-lg px-3 py-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-full bg-[#A259FF] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#8a4de6] transition-colors"
        >
          {postToEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ImageAdd;