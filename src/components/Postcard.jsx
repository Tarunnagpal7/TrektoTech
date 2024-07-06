import service from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function Postcard({ $id, title, featuredImage, content }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-pink-50 shadow-lg rounded-xl sm:h-96 flex flex-col sm:flex-row p-4 hover:border-2">
                <div className="sm:w-1/2 flex justify-center mb-4 sm:mb-0 sm:mr-4">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-xl w-full h-full object-cover" />
                </div>
                <div className="sm:w-1/2 flex flex-col justify-between p-4">
                    <h2 className="font-bold text-xl uppercase mb-10">
                        {title}
                    </h2>
                    <div className="flex-grow">
                        <h3 className="line-clamp-6 font-mono font-semibold">
                            {parse(content)}
                        </h3>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Postcard;
