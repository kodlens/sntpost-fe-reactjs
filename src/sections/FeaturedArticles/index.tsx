import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config/config";
import type { Article } from "../../types/article";
import Loader from "../../components/Loader";
import './index.css'
import { ArrowRight, Newspaper } from "lucide-react";


const FeaturedArticles: React.FC = () => {

    const [articles, setArticles] = useState<Article[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const loadArticles = () =>  {
        setLoading(true)
        axios.get(`${config.baseUri}/api/articles/load-featured-articles`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setArticles(res.data)
            setLoading(false)
        }).catch(err =>{
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

        loadArticles()
        
    }, []);



    return (
        <section id="snt-updates" className="relative bg-white py-14 lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-blue-primary">
                            <Newspaper size={17} aria-hidden="true" />
                            Featured Articles
                        </p>
                        <h2 className="text-3xl font-extrabold text-black-2 md:text-4xl">
                            S&T Updates
                        </h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                            Latest science, technology, and innovation stories from DOST and the S&T community.
                        </p>
                    </div>

                    <Link
                        to="/archives"
                        className="inline-flex w-fit items-center gap-2 rounded-md border bg-[#00aeef] hover:bg-[#15bcf8] transform duration-150 px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition text-white"
                    >
                        View Archives
                        <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>

                { loading ? (
                    <Loader height="h-[420px]" />
                ) : articles && articles.length > 0 ? (
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <Link
                            to={`/dost/${articles[0].slug}`}
                            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-[360px] overflow-hidden md:h-[520px]">
                                <div
                                    className="h-full w-full transition duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${articleImage(articles[0])})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>
                                </div>
                                <div className="absolute left-5 top-5 rounded-md bg-red-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                                    Lead Story
                                </div>
                            </div>
                            <div className="p-6 lg:p-8">
                                <p className="font-extrabold uppercase tracking-wide text-blue-primary">
                                    {articles[0].category?.title || 'S&T Update'}
                                </p>
                                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-black-2 md:text-4xl">
                                    {truncate(articles[0].title || '', 24)}
                                </h3>
                                <p className="mt-4 text-base leading-7 text-gray-700">
                                    {truncate(articles[0].excerpt || '', 100)}
                                </p>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-blue-primary">
                                    Read Article
                                    <ArrowRight size={17} aria-hidden="true" />
                                </span>
                            </div>
                        </Link>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {articles.slice(1, 5).map((article) => (
                                <Link
                                    key={article.id}
                                    to={`/dost/${article.slug}`}
                                    className="group grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-primary hover:shadow-lg sm:grid-cols-[160px_1fr] lg:grid-cols-[190px_1fr]"
                                >
                                    <div
                                        className="h-48 w-full transition duration-500 group-hover:scale-105 sm:h-full"
                                        style={{
                                            backgroundImage: `url(${articleImage(article)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-extrabold uppercase tracking-wide text-red-600">
                                            {article.category?.title || 'Featured'}
                                        </p>
                                        <h3 className="mt-2 text-lg font-extrabold leading-snug text-black-2 group-hover:text-blue-primary">
                                            {truncate(article.title || '', 18)}
                                        </h3>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            {truncate(article.excerpt || '', 16)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg bg-gray px-6 py-12 text-center text-gray-700">
                        No featured articles available at the moment.
                    </div>
                )}
            </div>
        </section>
    )

}

export default FeaturedArticles;
