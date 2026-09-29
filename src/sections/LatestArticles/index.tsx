import { useEffect, useState } from 'react'

import axios from 'axios';

import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';
import { config } from '../../config/config';
import Loader from '../../components/Loader';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';

export default function LatestArticles() {

    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const loadLatestArticles = ():void => {
        setLoading(true)
        axios.get<Article[]>(`${config.baseUri}/api/articles/load-latest-articles`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setLoading(false)
            setArticles(res.data);
        }).catch(err => {
            setLoading(false)
            console.log(err);
        })
    }

    const truncate = (text: string, limit: number) => {
		if(text.length > 0){
			const words = text.split(' ');
			if (words.length > limit) {
				return words.slice(0, limit).join(' ') + '...';
			}
			return text;
		}else{
			return ''
		}
	}

    const articleImage = (article?: Article) => {
        return article?.featured_image
            ? `${config.baseUri}/storage/featured_images/${article.featured_image}`
            : '/defaults/bg-featured.jpg'
    }

    useEffect(()=>{
        loadLatestArticles()
    },[])


    return (
        <section className='w-full bg-gray py-14 lg:py-20'>
            <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
                <div className='mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <p className='mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-blue-primary'>
                            <Clock3 size={17} aria-hidden='true' />
                            Latest Articles
                        </p>
                        <h2 className='text-3xl font-extrabold text-black-2 md:text-4xl'>
                            Recently Published
                        </h2>
                        <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
                            Fresh S&T stories, announcements, and updates curated for quick reading.
                        </p>
                    </div>

                    <Link
                        to='/archives'
                        className='inline-flex w-fit items-center gap-2 rounded-md bg-[#00aeef] hover:bg-[#15bcf8] transform duration-150 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition'
                    >
                        Browse All
                        <ArrowRight size={17} aria-hidden='true' />
                    </Link>
                </div>

                { loading ? (
                    <Loader height='h-[360px]' />
                ) : articles.length > 0 ? (
                    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                        { articles.map(article => (
                            <Link
                                key={article.id}
                                to={`/dost/${article.slug}`}
                                className='group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-primary hover:shadow-xl'
                            >
                                <div className='relative aspect-[16/10] overflow-hidden bg-gray-100'>
                                    <div
                                        className='h-full w-full transition duration-500 group-hover:scale-105'
                                        style={{
                                            backgroundImage: `url(${articleImage(article)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}>
                                    </div>
                                    <div className='absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-white/95 px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-red-600 shadow-sm'>
                                        {article.category?.title || 'S&T Update'}
                                    </div>
                                </div>

                                <div className='flex flex-1 flex-col p-5 lg:p-6'>
                                    {article.publication_date_readable && (
                                        <p className='mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500'>
                                            <CalendarDays size={15} aria-hidden='true' />
                                            {article.publication_date_readable}
                                        </p>
                                    )}

                                    <h3 className='text-xl font-extrabold leading-snug text-black-2 transition group-hover:text-blue-primary'>
                                        {truncate(article.title || '', 18)}
                                    </h3>

                                    <p className='mt-4 flex-1 text-sm leading-6 text-gray-600'>
                                        {truncate(article.excerpt || '', 24)}
                                    </p>

                                    <span className='mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-blue-primary'>
                                        Read Article
                                        <ArrowRight size={17} aria-hidden='true' />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className='rounded-lg bg-white px-6 py-12 text-center text-gray-700 shadow-sm'>
                        No latest articles available at the moment.
                    </div>
                )}
            </div>
        </section>
    )
}
