import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/config";
import type { Category } from "../../types/category";
import Copyright from "./Copyright";
import { ExternalLink, Facebook, Mail, MapPin, Phone } from "lucide-react";


const MainFooter: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const loadCategories = () =>  {
        setLoading(true)
        axios.get<Category[]>(`${config.baseUri}/api/load-categories`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setCategories(res.data)
            setLoading(false)
        }).catch(err =>{
            setLoading(false)
            throw err
        })
    }

    useEffect(()=>{
        loadCategories()
    }, []);

    return (
        <footer className="w-full bg-black-2 text-white">
            <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_1.1fr]">
                    <div>
                        <Link to="/" className="inline-flex items-center">
                            <img
                                className="h-30 w-auto"
                                src="/images/dost-logo.png"
                                alt="S&T Post footer logo"
                            />
                        </Link>
                        <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
                            S&T Post shares stories, updates, and breakthroughs from the Department of Science and Technology and the Philippine science community.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/about-us"
                                className="rounded-md border border-white/20 px-4 py-2 text-sm font-bold transition hover:border-secondary hover:text-secondary"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact-us"
                                className="rounded-md bg-secondary px-4 py-2 text-sm font-bold text-black-2 transition hover:bg-white"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-extrabold uppercase tracking-wide text-secondary">
                            Quick Links
                        </h2>
                        <div className="mt-5 flex flex-col gap-3">
                            <Link to="/" className="text-sm text-gray-300 transition hover:text-white">Home</Link>
                            <Link to="/about-us" className="text-sm text-gray-300 transition hover:text-white">About Us</Link>
                            <Link to="/contact-us" className="text-sm text-gray-300 transition hover:text-white">Contact Us</Link>
                            <Link to="/archives" className="text-sm text-gray-300 transition hover:text-white">Archives</Link>
                            <a
                                href="https://www.dost.gov.ph/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                            >
                                DOST Website
                                <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-extrabold uppercase tracking-wide text-secondary">
                            Categories
                        </h2>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                            { loading ? (
                                <div className="text-sm text-gray-300">
                                    Loading categories...
                                </div>
                            ) : (
                                categories?.slice(0, 12).map(item => (
                                    <Link
                                        to={`/category/${item.slug}`}
                                        className="text-sm text-gray-300 transition hover:text-white"
                                        key={item.id}>
                                        {item.title}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2 lg:grid-cols-4">
                    <a
                        href="https://www.facebook.com/profile.php?id=61567961533594"
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-3 rounded-lg bg-white/5 p-4 transition hover:bg-white/10"
                    >
                        <Facebook className="mt-0.5 shrink-0 text-secondary" size={20} aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">Facebook</span>
                            <span className="mt-1 block text-sm text-gray-300">S&T Post Facebook Page</span>
                        </span>
                    </a>
                    <a
                        href="mailto:dost.digest@gmail.com"
                        className="flex gap-3 rounded-lg bg-white/5 p-4 transition hover:bg-white/10"
                    >
                        <Mail className="mt-0.5 shrink-0 text-secondary" size={20} aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">Email</span>
                            <span className="mt-1 block text-sm text-gray-300">dost.digest@gmail.com</span>
                        </span>
                    </a>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-4">
                        <Phone className="mt-0.5 shrink-0 text-secondary" size={20} aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">DOST Trunkline</span>
                            <span className="mt-1 block text-sm text-gray-300">(+632) 8837 2071</span>
                        </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-4">
                        <MapPin className="mt-0.5 shrink-0 text-secondary" size={20} aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">Location</span>
                            <span className="mt-1 block text-sm text-gray-300">DOST Complex, Bicutan, Taguig</span>
                        </span>
                    </div>
                </div>

                <Copyright />
            </div>
        </footer>
    )
}

export default MainFooter;
