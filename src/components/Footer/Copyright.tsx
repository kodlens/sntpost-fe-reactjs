import React from "react";
import { Link } from "react-router-dom";

const Copyright: React.FC = () => {
    return (
        <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                Managed by: <Link to="/" className="text-sm font-bold text-white transition hover:text-secondary">
                    <img src="/images/DOST-STII horizontal-white.png" alt="S&T Post Logo" className="h-[50px] ml-2" />
                </Link>

                <div className="text-xs text-gray-400 ml-auto">
                    Copyright &copy; 2024 DOST. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Copyright;
