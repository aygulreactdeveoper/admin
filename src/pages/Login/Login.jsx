import React, { useState } from 'react'
import { Loader, LogIn } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({login, setLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)

  // fuction for the navigate using router hook
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    setSucces(false)

    const loginData = {
      UName: username,
      UPass: password,
    };

    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json',
    };


    try {

      setLoading(true)

      const response =  await axios.post(
        'https://sapsargyt.saphasap.com/testmplace/api/auth/login/user', 
        loginData, 
        {headers}
      )

      console.log('succesfull login', response.data);

      const token = response.data.token
      console.log(token);
      
      if (token) {
        localStorage.setItem('authToken', token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSucces(true)
        navigate('/')  
      }  else {
        setError('Токен аутентификации не получен.'); // Если API не вернул токен
      }


    } catch (err) {
      if(err.response) {
          setError(err.response.data.message || "Ошибка входа проверьте имя пользователя и пароль")
          console.error('Ошибка ответа от сервера:', err.response.data)
      } else if (err.request){
        setError('Нет ответа сервера. Проверьте подключкение к интернету или статус сервера')
        console.error("Нет ответа от сервера" , err.request)
      } 
    } finally {
      setLoading(false)
    }
  }


  return (
  <div className='bg-blue-400'>
    <div className="auth-main relative">
      <div className="auth-wrapper v1 flex items-center w-full h-full min-h-screen">
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen relative p-6 " method='POST'>
          <div className="w-full max-w-[350px] relative bg-white shadow-xl">
            <div className=" w-full">
              <div className="!p-10">
                <div className="text-center mb-6">
                    <LogIn src="#" alt="img" className="mx-auto text-blue-500" size={30}/>
                </div>
                <h4 className="text-center text-2xl mb-3 text-blue-500">Login</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                  <input 
                  type="text" 
                  className="w-full border-2 border-blue-300 hover:border-blue-400 border-solid rounded-md p-2" 
                  id="username" 
                  name="UName" 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required />
                  </div>
                  <div className="mb-4">
                  <input 
                  type="password" 
                  className="w-full border-2 border-blue-300 hover:border-blue-400 border-solid rounded-md p-2" 
                  id="password" 
                  name="UPass" 
                  placeholder="Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required />
                  </div>
                
                  <div className="flex mt-1 justify-between items-center flex-wrap">
                    <div className="form-check">
                    <input 
                    type="checkbox" 
                    id="customCheckc1" 
                    defaultChecked="" />
                    <label 
                    htmlFor="customCheckc1">
                      Remember me?
                      </label>
                    </div>
                  
                    <h6 className="font-sm text-blue-500 mb-0">
                    <Link to={"#"}> Forgot Password? </Link>
                    </h6>
                  </div>
                  <div className="mt-4 text-center">
                    <button 
                    type="submit" 
                    className="btn py-2 px-5 bg-blue-500 rounded-md text-white mb-4 mt-1"
                    disabled={loading}>
                      {loading ? ( // Отображаем Loader, если идет загрузка
                        <Loader className="animate-spin" size={20} />
                        ) : (
                        'Login' // Иначе текст кнопки
                        )}
                    </button>
                  </div>
                </form>
                
                <div className="flex justify-between items-center flex-wrap mt-1 text-sm">
                  <h6 className=" mb-0">Don't have an Account?</h6>
                  <Link to="#" className="text-blue-500">Create Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login