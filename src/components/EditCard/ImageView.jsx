import React from 'react'
import {X} from 'react-feather'

const ImageView = React.memo(({el, onDelete, index}) => {
    console.log(el);
    
 
   
  return (
    <div>
        <div className='flex flex-wrap gap-[15px]'>
                <div key={el.ImgGuid} className='border-2 border-solid border-gray-100 p-[10px] rounded-sm relative'>
                    <img src={`https://sapsargyt.saphasap.com/testmplace/${el.FilePath + 'R/' + el.FileName}`} alt={`Предварительный просмотр ${index + 1}`} className='max-w-[150px] max-h-[150px] object-cover block'/>
                    <button onClick={() => onDelete(el.ResGuid, el.ImgGuid)} className='absolute t-[5px] r-[5px] bg-red-500 text-white border-0 rounded-xl w-[25px] h-[25px] flex justify-center items-center aling-center cursor-pointer font-bold text-[14px]'><X size={15}/></button>
                </div>
        </div>
    </div>
  )
})

export default ImageView