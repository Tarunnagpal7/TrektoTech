import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button ,Container } from "../components";
import parse from "html-react-parser"
import { useSelector } from "react-redux";

export default function Post(){
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate()
    const [loader,setloader] = useState(true)
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post) setPost(post);
                else navigate('/');
            }).then(()=>setloader(false))
        }
        else navigate('/');
    },[slug,navigate])

    const deletePost =()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status){
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    }

    return !loader? post ? (
        <div className="py-8">
        <Container>

            <div className="w-full mb-6 font-bold uppercase text-center">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
                        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl"
                                />
            </div>
            <div className=" text-lg text-center font-thin first-letter:text-6xl">
                {parse(post.content)}
                </div>
        </Container>
        {isAuthor && (
            <div className=" relative m-10  ">
                <Link to={`/edit-post/${post.$id}`}>
                    <button className="mr-3 bg-green-100 p-3 w-20 hover:bg-gray-50 rounded-3xl font-bold">
                        Edit
                    </button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                </Button>
            </div>
        )}
    </div>
    ) : navigate('all-posts')  :
         <div className=" h-screen grid place-items-center">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
}