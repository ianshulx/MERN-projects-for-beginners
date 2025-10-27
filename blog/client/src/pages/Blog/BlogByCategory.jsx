import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";

const BlogByCategory = () => {
    const { category } = useParams()
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`, {
        method: 'get',
        credentials: 'include'
    }, [category])

    if (loading) return <Loading />
    return (
        <>
            <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
                <BiCategory />
                <h4  >   {blogData && blogData.categoryData?.name}</h4>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {blogData && blogData.blog.length > 0
                    ?
                    blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
                    :
                    <div>Data Not Found.</div>
                }
            </div>
        </>
    )
}

export default BlogByCategory