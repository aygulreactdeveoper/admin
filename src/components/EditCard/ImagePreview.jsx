import React from 'react'
import {  X } from 'react-feather'

function ImagePreview({imagePreviewUrls, selectedFiles, handleUpload, uploadStatus, handleRemoveImage, uploaded}) {

    
  return (
    <div>
         {imagePreviewUrls.length > 0 && (
            <div className='mt-[20px] '>
                <div className='flex flex-wrap gap-[15px]'>
                    {imagePreviewUrls.map((url, index) => (
                    <div key={index} className='border-2 border-solid border-gray-100 p-[10px] rounded-sm relative'>
                        <img src={url} alt={`Предварительный просмотр ${index + 1}`} className='max-w-[150px] max-h-[150px] object-cover block'/>
                        { uploaded ? (<></> ): (<button onClick={() => handleRemoveImage(index)} className='absolute t-[5px] r-[5px] bg-red-500 text-white border-0 rounded-xl w-[25px] h-[25px] flex justify-center items-center aling-center cursor-pointer font-bold text-[14px]'><X size={15}/></button>)}
                    </div>
                    ))}
                </div>
            </div>
        )}
        {selectedFiles.length > 0 && (
            <button onClick={handleUpload} className= 'mt-5 py-2.5 px-5 cursor-pointer bg-green-500 rounded-md text-white shadow-lg inline-block px-6 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85 '>
                { uploadStatus === `Загрузка успешна! ` ?  `Загружено` : `Загрузить ${selectedFiles.length} фото`}
            </button>
        )}
    </div>
  )
}

export default ImagePreview