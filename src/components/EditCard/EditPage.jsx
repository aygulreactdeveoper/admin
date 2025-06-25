import React, {useRef, useState, useEffect, useCallback} from 'react'
import { Image, X } from 'react-feather'
import { useLocation } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import DeleteWindow from './DeleteWindow'
import ImageView from './ImageView'
import ImagePreview from './ImagePreview'

function EditPage({active}) {
    const [imagePreviewUrls, setImagePreviewUrls] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('')
    const [uploadError, setUploadError] = useState(null);
    const [isUploading, setIsUploading] = useState(null)

    const [productImages, setProductImages] = useState([]);
    const [Images, setImages] = useState([]);
    const [uploaded, setUploaded] = useState(false)
    const [newData, setNewData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null)

    const fileInputRef = useRef(null)

    const location = useLocation()

    const [data, setData] = useState(
        () => {
        console.log('Инициализация данных из location.state:', location.state?.data);
        return location.state?.data || null;
    }
    );

    useEffect(() => {
        console.log('Компонент монтируется или обновляется. Текущее location.state:', location.state);
        console.log('Текущие данные (из useState):', data);
    
    }, [location.state, data]);


    
    
    const token = localStorage.getItem('authToken')

     useEffect(() => {
        if (data && data.Images) {
            setProductImages([...data.Images]);
            console.log(data.Images);
            newData.map((el, index) => setProductImages([...el.Images]) )
                
         }
        }, [data?.Images, newData]);


    const handleButtonClick = () => {
        fileInputRef.current.click()    
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files) {
            const newUrls = files.map(file => URL.createObjectURL(file));

            setImagePreviewUrls(prevUrls => [...prevUrls, ...newUrls]);
            setSelectedFiles(prevFiles => [...prevFiles, ...files]);

            e.target.value = null;
        }
    }

    const handleRemoveImage = (indexToRemove) => {
        URL.revokeObjectURL(imagePreviewUrls[indexToRemove]);

        setImagePreviewUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };



    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)

            reader.onload = () => {
                const fullBase64String = reader.result

                if (fullBase64String && fullBase64String.includes(',')) {
                    const cleanBase64String = fullBase64String.split(',')[1];
                    resolve(cleanBase64String);
                } else {
                    reject(new Error("Не удалось получить чистую строку Base64 из файла."));
                }
            };
            reader.onerror = (error) => reject(error) 
        })
    } 



    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setUploadError('Please choose files to upload');
            return;
        }

        try {
            setIsUploading(true);
            setUploadStatus("Preparing files...");
            setUploadError(null);

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                console.log(file);
                
                
                const fileBase64 = await fileToBase64(file)
                console.log(fileBase64);
                
                
                const createImages = [{
                    "ImgGuid": null, 
                    "EmpGuid": null,
                    "EventGuid": null,
                    "BrandGuid": null,
                    "CatGuid": null,
                    "TagGuid": null,
                    "CGuid": null,
                    "DivGuid": null,
                    "UGuid": null,
                    "RpAccGuid": null,
                    "ProdGuid": null,
                    "ResCollectionGuid": null,
                    "ColorGuid": null,
                    "SizeGuid": null,
                    "ResGuid": data.ResGuid,
                    "ImgName": file.name,
                    "ImgDesc": "",
                    "FilePath": "",
                    "FileName": "",
                    "MinDarkFileName": "",
                    "MinDarkFilePath": "",
                    "MaxDarkFileName": "",
                    "MaxDarkFilePath": "",
                    "MinLightFileName": null,
                    "MinLightFilePath": "",
                    "MaxLightFileName": null,
                    "MaxLightFilePath": null,
                    "FileHash": null,
                    "Image": fileBase64
                }]  ;
            

            setUploadStatus("Uploading...");

            console.log(token);
            console.log(createImages);
            setImages(createImages.find(el => el.ImgName === file.name))
            console.log(Image);
            
            

            const responseImage = await axios.post(
                "https://sapsargyt.saphasap.com/testmplace/api/image/sync",
                createImages,
                {
                    headers: {
                        "accesstoken": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Upload success:", responseImage.data);
            setUploadStatus("Upload completed successfully!");

            setUploaded(true)
            // setImagePreviewUrls([])
            setSelectedFiles([]);
            

                
            }

        } catch (error) {
            console.error("Upload failed:", error);
            setUploadError(error.response?.data?.message || "Upload failed");
            setUploadStatus("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };


    const handleInitialDeleteClick = useCallback((resGuid, imgGuid) => {
        setItemToDelete({ resGuid, imgGuid });
        setIsModalOpen(true);
        console.log('Открытие модального окна для удаления ImgGuid:', imgGuid);
    }, [setItemToDelete, setIsModalOpen]);



    const handleDelete = useCallback(async () => {
        console.log('handleDeleteConfirmed: itemToDelete при вызове:', itemToDelete);

        if (!itemToDelete) {
            console.error('handleDeleteConfirmed: itemToDelete пуст. Выходим.');
            setIsModalOpen(false);
            return;
        }

        const { resGuid, imgGuid } = itemToDelete;

        try {
            console.log(`Отправка DELETE запроса для ImgGuid: ${imgGuid}`);
            const response = await axios.delete(
                `https://sapsargyt.saphasap.com/testmplace/api/image?resGuid=${resGuid}&imgGuid=${imgGuid}`,
                {
                    headers: {
                        'accesstoken': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 204) {
                setProductImages(prevImages => prevImages.filter(img => img.ImgGuid !== imgGuid));
                console.log(`Изображение с ImgGuid: ${imgGuid} успешно удалено из отображения.`);
            } else {
                console.warn(`Запрос на удаление вернул неуспешный статус: ${response.status}`);
            }
        } catch (error) {
            console.error("Ошибка при удалении изображения:", error.response?.data || error.message);
        } finally {
            setIsModalOpen(false);
            setItemToDelete(null); 
            console.log('Модальное окно закрыто, данные для удаления сброшены.');
        }
    }, [itemToDelete, setProductImages, token, setIsModalOpen]);
        


    const handleCancelDelete = useCallback(() => {
        setIsModalOpen(false);
        setItemToDelete(null); 
        console.log('Удаление отменено.');
    }, [setIsModalOpen, setItemToDelete]);

    
    const handleUpdate = async () => {
        console.log(data.ResGuid);
        

        console.log('uploading');
        
        try {
            const response =  await axios.post(`https://sapsargyt.saphasap.com/testmplace/api/resource/withprice?resGuid=${data.ResGuid}&divGuid=${data.DivGuid}`, { headers : {
                'accesstoken': `Bearer ${token}`,
                'Content-Type': 'application/json'
        }})
        console.log(response.data.data);
        setNewData(response.data.data)
        setImagePreviewUrls([])

        console.log('succes uploading');
        
                
        } catch (error) {
            console.log(error)
            console.log('fail uploading');
            
        }
    }

    useEffect(() => {

        return () => {
            imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviewUrls]);


  return (
    <form onSubmit={(e) => { e.preventDefault();}} className={`w-full p-6 mx-auto ${active ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'}`} >
        <div className={`flex flex-wrap -mx-3 ${active ? 'w-[calc(100%-16rem)]' : 'ml-0 w-full'}`}>
            <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0">
                    <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                        <div className="flex items-center">
                            <p className="mb-0 dark:text-white/80">Edit Product</p>
                        </div>
                    </div>
                    <div className="flex-auto p-6">
                        <p className="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Product Information</p>
                        <div className="flex flex-wrap -mx-3">
                            <Input inputName={'ProductName'} data={data?.ResName} long={true}  />
                            <Input inputName={'ResGuid'} data={data?.ResGuid} disable={true}/>
                            <Input inputName={'ResRegNo'} data={data?.ResRegNo} />
                            <Input  inputName={'Price'} data={data?.ResourceResPrice[0].ResPriceValue}  /> 
                        </div>
                        <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

                        <div className="flex flex-wrap -mx-3">
                            <Input inputName={'Description'} data={data?.ResDesc} long={true}   />
                            <Input inputName={'Category'} data={data?.CatGuid} />
                            <Input  inputName={'Brand'} data={data?.BrandGuid}/> 
                            <Input  inputName={'Tag'} data={'Add Some Tag'}/> 
                        </div>
                        <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

                        <p className="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">About me</p>
                        <div className="flex flex-wrap -mx-3">
                            <Input inputName={'Add Info'} data={data?.ResDesc} long={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0">
                    <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                        <div className="flex items-center">
                            <button type="button" className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85" onClick={handleUpdate}>Save</button>
                            <button type="button" className="inline-block px-6 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85" onClick={handleButtonClick}><Image size={18} className='inline-block mr-2'/>Add Image</button>
                            <input type="file" className='hidden' ref={fileInputRef} accept='image/*' onChange={handleFileChange} multiple/>
                        </div>
                        <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0"></div>
                            <div className='mt-[20px] '>
                                <div className='flex flex-wrap gap-[15px]'>
                                     {productImages &&
                                        productImages.map((el, index) => (
                                            <ImageView key={el.ImgGuid + index} el={el} onDelete={handleInitialDeleteClick} index={index} />
                                        ))
                                    }
                                </div>
                            </div>
                            <ImagePreview uploaded={uploaded} imagePreviewUrls={imagePreviewUrls} selectedFiles={selectedFiles} handleUpload={handleUpload} uploadStatus={uploadStatus} handleRemoveImage={handleRemoveImage}/>
                        </div>
                    </div>
                </div>
            </div>
            {uploadStatus && <p className="text-sm mt-2">{uploadStatus}</p>}
            {uploadError && <p className="text-sm mt-2 text-red-500">{uploadError}</p>}   

            <DeleteWindow isOpen={isModalOpen} onClose={handleCancelDelete} onConfirm={handleDelete} title={'Подверждению удалению'} message={'вы действительно хотите удалить это изображение Это Действие не обратимо'} confirmText='Удалить' cancelText='Отмена' />
    </form>
  )
}



export default EditPage


















































































































































