import React from 'react'

function DeleteWindow({isOpen, onClose, onConfirm, title, message, confirmText = 'Да', cancelText = 'Нет'}) {
        if (!isOpen) return null;
  
            
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all duration-300 ease-out scale-100 opacity-100">
        {/* Заголовок */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>

        {/* Тело модального окна */}
        <div className="py-4">
          {message && <p className="text-gray-700 text-base mb-4">{message}</p>}

</div>
        {/* Кнопки действий */}
        <div className="flex justify-end pt-4 border-t border-gray-200 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};


export default DeleteWindow