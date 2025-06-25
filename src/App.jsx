import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout.jsx/Layout'
import TableCard2 from './components/TableCard/TableCard2'
import EditPage from './components/EditCard/EditPage'


function App() {
    const [activeSideBar, setActiveSideBar] = useState(false)
      function sideBarFnc(){
      setActiveSideBar(!activeSideBar)
    }


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/admin/' element={<Layout activeSideBar={activeSideBar} sideBarFnc={sideBarFnc}/>}>
          <Route path='/category' element={<TableCard2 active={activeSideBar} />}/>
          <Route path='/edit-card' element={<EditPage active ={activeSideBar}  />}/>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route path='/admin/login' element={<Login />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

// const  handleDelete = (ResGuid, ImgGuid) => {
//     setDeleteMessage('deleting start')
//     setDeleted(false)
 
//     body = {
//         "ImgGuid":  ImgGuid,
//         "ResGuid":  ResGuid
//     } 
//     try {

//         const deleteResponse = axios.delete(`https://sapsargyt.saphasap.com/testmplace/api/image?resGuid=${ResGuid}`, body, {headers: {
//         'accesstoken': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//                 }}
//             )
//         const answer = deleteResponse.data
//         console.log(answer);
//         setDeleteMessage('succes deleted')
//         setDeleted(true)
        
        

//     } catch (error) {
//          if (axios.isAxiosError(error)) {
//             if (error.response) {
//                 setUploadError(error.response.data.message || 'Ошибка сервера при загрузке.');
//                 console.error('Ошибка сервера (ответ):', error.response.data);
//             } else if (error.request) {
//                 setUploadError('Нет ответа от сервера. Проверьте подключение к сети.');
//                 console.error('Ошибка сети (запрос):', error.request);
//             } else {
//                 setUploadError('Ошибка при подготовке запроса.');
//                 console.error('Ошибка запроса (настройка):', error.message);
//             }
//         } else {
//             setUploadError(error.message || 'Произошла неизвестная ошибка.');
//             console.error('Неизвестная ошибка (общая):', error);
//         }
//     }
    

// }
