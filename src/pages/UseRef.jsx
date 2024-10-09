import React, { useRef } from 'react';

const InputFocusExample = () => {
  /*Когда вы используете useRef, это позволяет вам напрямую взаимодействовать с DOM-элементом без перерисовки всего компонента 
  Это полезно для управления фокусом, выбора элементов, работы с медиа-контентом (видео, аудио) и других задач, связанных с доступом к реальным DOM-элементам.*/
    // Создаем ref для поля ввода
    const inputRef = useRef(null);
    console.log('component rendering');
    
    // Функция для установки фокуса на поле ввода
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Устанавливаем фокус на поле ввода
        }
    };

    return (
        <div>
            <h1>useRef Example: Focus on Input</h1>
            
            {/* Привязываем ref к полю ввода */}
            <input ref={inputRef} type="text" placeholder="Click button to focus" />

            {/* Кнопка для установки фокуса */}
            <button onClick={handleFocus}>Focus on Input</button>
        </div>
    );
};

export default InputFocusExample;
