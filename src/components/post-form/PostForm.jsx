import React,{useCallback ,useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {Button,Input,Select,RTE} from ".."
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({post}){
    const [loader,setloader] = useState(false);
    const [error , setError] = useState("")

    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues :{
            title: post?.title|| " ",
            slug: post?.$id || " ",
            content: post?.content || " ",
            status : post?.status || "active" 
        }
    });

    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)

    const submit = async(data)=>{
        try{
        setError("")
        setloader(true)
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            if(file){
                service.deleteFile(post.featuredImage);
            }

            const dbPost =await service.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if(dbPost){
                navigate(`/profile`);
            }
        }else{
            const file = await service.uploadFile(data.image[0]);
            console.log(file)
            if(file){
                const filedId = file.$id;
                data.featuredImage = filedId
                const dbPost = await service.createPost({...data, userId : userData.$id});

                if(dbPost){
                    navigate(`/profile`)
                }
            }
        }

        setloader(false)
    }
    catch(error){
        // console.log(error)
         setError("Something went wrong... check the title or content is more than in length that we expected!!")
         setloader(false)
    }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string")
            return value
            .trim()
            .toLowerCase()
            .replace(/\s+/g,"-")

       return "";
    },[])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
  
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className=" "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className=""
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Write Here : "  name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 m-3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className=" "
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full m-3">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                {/* <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                /> */}
                <button type="submit" className=" inline-block rounded bg-pink-100 p-2  border-2 hover:bg-violet-950 hover:text-white border-black m-5">
                    {loader ? 
                     <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
                    : (post ? "Update" : "Submit")   }
                </button>
                {error &&  <p className="text-red-600 m-5 text-center">{error}</p> }
            </div>
        </form>
    );
}