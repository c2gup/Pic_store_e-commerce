const ImageCard = ({ id, img, title, price, author, icon1, icon2,tags }) => {
      return (
        <div className="rounded-2xl bg-[#3B3B3B] shadow-lg p-2">
          <div className="w-full h-[400px] p-5  ">
            <img
              src={img}
              alt={title}
              className="w-full h-full rounded-xl hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer"
            />
          </div>
          <p className="font-semibold text-white bg-black w-fit px-5 py-1 rounded-full text-sm mt-3">
            {"@" + author.charAt(0).toUpperCase() + author.slice(1)}
          </p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <h3 className="text-lg text-[#ffff] font-semibold">{title}</h3>
              <p className="text-[#ffff]">Price : ${price}</p>
            </div>
            <div className="flex gap-5 justify-center items-center">
              {icon1}
              {icon2}
            </div>
           


                {/* Tags Section */}
      {tags && tags.length > 0 && (
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
      )}
          </div>
        </div>
      );
    };
    
    export default ImageCard;
    