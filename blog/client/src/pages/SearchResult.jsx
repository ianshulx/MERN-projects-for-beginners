import BlogCard from '@/components/BlogCard'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
        method: 'get',
        credentials: 'include'
    })

    return (
        <>
            <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
                <h4 >Search Result For: {q}  </h4>
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

export default SearchResult