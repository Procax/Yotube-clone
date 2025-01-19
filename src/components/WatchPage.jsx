import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {closeMenu} from '../utils/appSlice'
import { useSearchParams } from 'react-router-dom'
import { API_KEY, YOUTUBE_COMMENTS, YOUTUBE_SEARCH_API } from '../utils/constant'

const WatchPage = () => {

  let [searchParams] = useSearchParams();
  const [Comment, setComment] = useState([])
  const [Suggestion, setSuggestion] = useState('')

  console.log(searchParams.get('v'))


  const dispatch = useDispatch();

async function comments () {
  const api = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&videoId=${searchParams.get('v')}&key=${API_KEY}`)
  // const YOUTUBE_COMMENTS = ;
  const data = await api.json()
  // console.log('comments', data)
  setComment(data.items)
}

console.log('Comment', Comment.map(c => (c)))

async function Suggest() {
  const api = await fetch (`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=20&chart=mostPopular&videoId=${searchParams.get('v')}&regionCode=IN&key=${API_KEY}`)
  const data = await api.json()
  setSuggestion(data.items)

}


console.log('Suggest', Suggestion)


  useEffect(() => {
    dispatch(closeMenu())
    comments()
    Suggest()

  },[])

  return (
    // <Link to={`/watch`}>
    <>
    <div className="flex flex-col w-full justify-center">
      <div className="px-5 flex w-half">
        <div className="">
          <iframe
            width="1200"
            height="600"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          
        </div>
        <div className="w-full">
        </div>
      </div>
      <div>
        test
        {
          Comment?.map((c) => <div className='flex mb-4'>
            <div>
              <img className='rounded-full' height='40' width='40' src={c.snippet.topLevelComment.snippet.authorProfileImageUrl} />
            </div>
            <div className='flex-col'>
              <div className='flex flex-row justify-between'>
              <li className='list-none'>
              <h3 className='font-semibold'>
              {c.snippet.topLevelComment.snippet.authorDisplayName}
              </h3>
            </li>
            <p>{c.snippet.topLevelComment.snippet.publishedAt}</p>
              </div>

            <li className='list-none'>
              {c.snippet.topLevelComment.snippet.textDisplay}
            </li>
            </div>

            </div>)
        }
      </div>
    </div>



    <div className='justify-center'>
      testing
      {Suggestion &&
        Suggestion.map((s) => (
          <div className='p-2 m-2 w-72 shadow-lg'>
          <img className='rounded-lg' src={s.snippet.thumbnails.high.url}/>
          <ul>
            <li className='font-bold py-2'>{s.snippet.title}</li>
            <li>{s.snippet.channelTitle}</li>
            <li>{s.statistics.viewCount}</li>
          </ul>
        </div>
        ))
      }
    </div>

    </>
    // </Link>
  )
}

export default WatchPage
