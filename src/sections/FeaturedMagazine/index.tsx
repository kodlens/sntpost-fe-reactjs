import { useEffect, useState } from 'react'


import '../FeaturedMagazine/index.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Magazine } from '../../types/magazine';
import { config } from '../../config/config';
import Loader from '../../components/Loader';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

export default function FeaturedMagazine() {

    const [magazine, setMagazine] = useState<Magazine>()
    const [loading, setLoading] = useState<boolean>(false)

    const loadFeaturedMagazine = ():void => {
        setLoading(true)
        axios.get<Magazine>(`${config.baseUri}/api/magazines/load-featured-magazine`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setLoading(false)
            setMagazine(res.data);
        })
    }
    //feautred journal will be followed

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

    useEffect(()=>{
        loadFeaturedMagazine()
    },[])


    return (
        <section className="w-full bg-[#0098D1] py-14 lg:py-20">
            {loading ? (
                <Loader height="h-[420px]" />
            ) : magazine ? (
                <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="relative flex items-center justify-center px-8 py-4 lg:px-12">
                            <div className="absolute bottom-8 h-10 w-[72%] max-w-[300px] rounded-full bg-black/35 blur-2xl" />
                            <Link
                                to={`/magazines/flipbook/${magazine.slug}`}
                                className="relative block w-full max-w-[330px] transition duration-300 hover:-translate-y-2"
                            >
                                <div className="absolute -right-3 top-4 h-[92%] w-5 rounded-r-md bg-black/20 blur-[1px]" />
                                <div
                                    className="relative aspect-[3/4] w-full rounded-md bg-white shadow-[0_28px_45px_rgba(0,0,0,0.32)] ring-1 ring-white/25"
                                    style={{
                                        backgroundImage: `url(${config.baseUri}/storage/magazines/${magazine.cover})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>
                                </div>
                            </Link>
                        </div>

                        <div className="flex flex-col justify-center px-2 py-4 text-white md:px-6 lg:px-8">
                            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-black-2">
                                <BookOpen size={16} aria-hidden="true" />
                                Featured Magazine
                            </p>

                            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
                                {magazine.title}
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
                                {magazine.year && (
                                    <span className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2">
                                        <Calendar size={15} aria-hidden="true" />
                                        {magazine.year}
                                    </span>
                                )}
                                {magazine.quarter && (
                                    <span className="rounded-md border border-white/15 px-3 py-2">
                                        Quarter {magazine.quarter}
                                    </span>
                                )}
                            </div>

                            <div className="excerpt mt-6 max-w-2xl text-base leading-8 text-gray-200 md:text-lg" 
                                dangerouslySetInnerHTML={{ __html: truncate(magazine.excerpt || '', 95)}}>
                            </div>

                            <div className="mt-8">
                                <Link
                                    to={`/magazines/flipbook/${magazine.slug}`}
                                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-blue-primary transition hover:bg-secondary hover:text-black-2"
                                >
                                    Read Magazine
                                    <ChevronRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                    <div className="rounded-lg bg-gray px-6 py-12 text-center text-gray-700">
                        No featured magazine available at the moment.
                    </div>
                </div>
            )}
        </section>
    )
}
