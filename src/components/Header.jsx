import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constant';
import { cacheResults } from '../utils/searchSlice';
import { useTheme } from '../utils/ThemeContext';

const Header = () => {

  const [searchQuery, setsearchQuery] = useState("");
  const [suggestions, setsuggestions] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { theme, toggleTheme } = useTheme();

  

  const searchCache = useSelector((store) => store.search)


  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setsuggestions(null);
        setShowSuggestions(false); // Hide suggestions when searchQuery is empty
        return;
      }
  
      if (searchCache[searchQuery]) {
        setsuggestions(searchCache[searchQuery]);
        setShowSuggestions(true); // Show suggestions when cache exists
      } else {
        getSearchSuggestions();
      }
    }, 200);
  
    return () => clearTimeout(timer);
  }, [searchQuery]);

  

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
  
      const newSuggestions = json.items?.map((a) => a.snippet.title);
      setsuggestions(newSuggestions);
      
      if (newSuggestions.length > 0) {
        setShowSuggestions(true); // Ensure suggestions are shown when available
      } else {
        setShowSuggestions(false); // Hide if no results
      }
  
      dispatch(
        cacheResults({
          [searchQuery]: newSuggestions,
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

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
    {showSuggestions && suggestions?.length > 0 && (
  <div className="absolute bg-white py-2 px-2 w-[33rem] top-12 shadow-lg rounded-lg border border-gray-100">
    <ul>
      {suggestions.slice(0, 14)?.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  </div>
)}


  </div>
</div>


      <button
        onClick={toggleTheme}
        className="px-6 py-2"
      >
        <img src={theme === 'dark'  
                ? 'https://img.icons8.com/?size=100&id=88015&format=png&color=000000' 
                : 'https://img.icons8.com/?size=100&id=97849&format=png&color=000000'}
          alt="Theme Icon" 
          className="w-8 h-8" />
      </button>
        <div>
            <img className='h-8' src="https://icons.veryicon.com/png/o/miscellaneous/indata/user-circle-1.png" alt="User-Logo" />
        </div>
      
    </div>
  )
}

export default Header
