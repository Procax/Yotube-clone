import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constant';
import { cacheResults } from '../utils/searchSlice';

const Header = () => {

  const [searchQuery, setsearchQuery] = useState("");
  const [suggestions, setsuggestions] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false);


  const searchCache = useSelector((store) => store.search)

  useEffect(() => {

   const timer = setTimeout(() => { 

    if (searchCache[searchQuery]) {
      setsuggestions(searchQuery[searchQuery])
    } else {
      getSearchSuggestions()
    }


    }, 200)

    return () => {
      clearTimeout(timer)
    }

  }, [searchQuery])

  const getSearchSuggestions = async () => {
    // console.log(searchQuery)
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json();
    // console.log(json[1])
    setsuggestions(json[1])

    dispatch (
      cacheResults({
        [searchQuery]: json[1],
      })
    )
  }

  const dispatch = useDispatch();



  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }
  return (
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
        <div className='flex col-span-3'>
            <img onClick={() => toggleMenuHandler()} 
            className='h-10 cursor-pointer' 
            src="https://cdn-icons-png.flaticon.com/512/7216/7216128.png" alt="Menu" />
            <a href="/">
            <img className='h-8 ml-4' src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png" alt="Youtube-Logo" />
            </a>
        </div>
        <div className="col-span-10 px-10">
  <div className="relative w-[37rem]">
    {/* Input and Button */}
    <div className="flex">
      <input
        className="flex-grow text-center border border-gray-400 p-2 rounded-l-full"
        type="text"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
      <button className="border border-gray-400 p-2 rounded-r-full">
        Search
      </button>
    </div>

    {/* Dropdown */}
    <div className="absolute bg-white py-2 px-2 w-[33rem] top-12 shadow-lg rounded-lg border border-gray-100">
      <ul>
        {/* {console.log(sug)} */}
        {/* {showSuggestions &&
          suggestions?.map((s) => (
            <li>{s}</li>
          ))

        } */}

{suggestions &&
suggestions?.map((s) => (
            <li key={s}>{s}</li>
          ))}
        {/* <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li>
        <li>Iphone pro</li> */}
      </ul>
    </div>
  </div>
</div>


        <div>
            <img className='h-8' src="https://icons.veryicon.com/png/o/miscellaneous/indata/user-circle-1.png" alt="User-Logo" />
        </div>
      
    </div>
  )
}

export default Header
