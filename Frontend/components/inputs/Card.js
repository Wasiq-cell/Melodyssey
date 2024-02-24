import React from 'react'
import AudioPlayer from './AudioPlayer'

export default function Card({title, description, imgUrl, previewUrl}) {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
        <div className="pb-4 pt-2"><img className="w-full rounded-md" src={imgUrl} alt="label" /></div>
        <div className="text-white font-semibold py-3">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
        {previewUrl && <AudioPlayer previewUrl={previewUrl} />}
    </div>
  );
}
