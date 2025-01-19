import React, { useState } from 'react'
import { useEffect } from 'react'
import { API_KEY, YOUTUBE_VIDEO_API } from '../utils/constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {

  const [video, setvideo ] = useState('')

    useEffect(() => {
        async function fetchdata () {
            const api = await fetch(YOUTUBE_VIDEO_API + API_KEY);
            const data = await api.json()
            // console.log(data.items)
            setvideo(data.items)


        }
        fetchdata()

    }, [])

    console.log(video)


  return (


    <div className='flex flex-wrap justify-center'>
      {video &&
        video?.map((vid) => (
          <Link to={"watch?v=" + vid.id}>
            {console.log(vid.id)}
      <VideoCard info={vid}/>
      </Link>
        ))
      }
    </div>
  )
}

export default VideoContainer
