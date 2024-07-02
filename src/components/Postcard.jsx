import service from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser"
function Postcard({$id,title,featuredImage,content}){

    return(


        <Link to={`/post/${$id}`}>
          <div className="w-full bg-pink-50  shadow-lg rounded-xl sm:h-96 flex flex-col sm:flex-row p-4 hover:border-2  ">
            <div className=" justify-center mb-4 sm:mb-0 sm:mr-4  sm:w-1/2 ">
                  <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-xl w-full h-full  " />
            </div>
            <div>
            <h2 className="font-bold text-xl m-2 uppercase ">
                {title}
            </h2>
            <h3 className=" line-clamp-6 font-mono  font-semibold p-10">
                 {parse(content)}
            </h3>
            </div>
          </div>
        </Link>
    )

}

export default Postcard;