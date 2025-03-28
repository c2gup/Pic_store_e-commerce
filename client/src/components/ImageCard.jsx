const ImageCard = ({ id, img, title, price, author, icon1, icon2,tags }) => {
      return (
        <div className="rounded-2xl bg-[#3B3B3B] shadow-lg  ">
          <div className="w-full h-[400px]  ">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover rounded-t-lg  transition-all ease-linear duration-300 transform cursor-pointer"
            />
          </div>
          <p className=" text-white bg-[#2B2B2B] w-fit px-5 p-1  rounded-full text-sm mt-3">
            {"@" + author.charAt(0).toUpperCase() + author.slice(1)}
          </p>
          <div className="flex justify-between p-3 items-center mt-2">
            <div>
              <h3 className="text-lg text-[#ffff] font-semibold">{title}</h3>
              <p className="text-gray-400">Price : ${price}</p>
            </div>
            <div className="flex gap-5 justify-center  items-center">
              {icon1}
              {icon2}
            </div>
           


                {/* Tags Section */}
      {/* {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )} */}
          </div>
        </div>
      );
    };
    
    export default ImageCard;
    