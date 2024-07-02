import React,{useCallback ,useEffect} from "react";
import { useForm } from "react-hook-form";
import {Button,Input,Select,RTE} from ".."
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({post}){

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
            if(file){
                const filedId = file.$id;
                data.featuredImage = filedId
                const dbPost = await service.createPost({...data, userId : userData.$id});

                if(dbPost){
                    navigate(`/profile`)
                }
            }
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
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}