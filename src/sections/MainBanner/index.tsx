import React, { useEffect, useState } from "react";

import './index.css';
import axios from "axios";
import { config } from "../../config/config";
import Loader from "../../components/Loader";

const MainBanner: React.FC = () => {

  const [banner, setBanner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadMainBanner = () => {
    setLoading(true)
    axios.get(`${config.baseUri}/api/load-banner`, {
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${config.apiToken}`
      }
    }).then(res => {
      setBanner(res.data.img)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      throw err
    })
  }

  useEffect(() => {
    loadMainBanner()
  }, []);

  return (
    <section className="bg-white">
      {loading ? (
        <div className="flex min-h-[260px] w-full items-center justify-center bg-gray md:min-h-[360px]">
            <Loader height="h-[260px]" />
        </div>
      ) : (
        <div className="w-full bg-blue-primary">
            {banner ? (
              <img
                src={`${config.baseUri}/storage/banner_images/${banner}`}
                alt="S&T Post featured banner"
                className="w-full object-contain object-center"
              />
            ) : (
              <div className="flex min-h-[260px] w-full items-center justify-center px-6 text-center text-white md:min-h-[360px]">
                No banner available at the moment.
              </div>
            )}
        </div>
      )}
    </section>
  )
}

export default MainBanner;
