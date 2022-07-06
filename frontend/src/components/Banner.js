import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { dataToQuery } from '../helpers/string_tools'
import banner from '../assets/images/banner-dark-screen.png'

function Banner() {

    const navigate = useNavigate();

    const [searchForm, setSearchForm] = useState("")

    // const [querySearch, setQuerySearch] = useState("")

    const searchHandling = () => {
        let querySearch = searchForm !== "" ? dataToQuery(searchForm) : "all"
        navigate("/products/" + querySearch);
    }

    return (
        <div className="relative h-full">
            <div className="relative z-[2] text-lightColor mx-auto h-screen flex justify-center items-center">
                <div className="w-9/12 pb-20">
                    <p className="text-center font-light text-5xl mb-5">Search</p>
                    <div className="flex justify-center items-center w-6/12 mx-auto rounded-md lg:h-[88px] px-1">
                        <div className="grid grid-cols-12 gap-[5px] rounded-md w-full h-14">
                            <input onChange={(e) => setSearchForm(e.target.value )} type="text" className="px-4 col-span-10 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Filter by title, benefits, expertise" />
                            <div className="grid grid-cols-1 col-span-2 gap-[5px] items-center lg:h-full h-[35px]">
                                <button onClick={() => searchHandling()} className="flex items-center justify-center h-full bg-midColor text-lightColor text-3xl rounded-md hover:text-4xl">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 h-full z-[1]">
                <img className="h-full w-full object-cover" src={banner} />
            </div>
        </div>
    )
}

export default Banner