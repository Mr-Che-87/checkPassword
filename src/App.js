import React from 'react';
import './App.css';

//УСТАНОВКА ПАРОЛЯ. Реализуйте компонент с двумя полями для ввода пароля. Если введенные пароли не совпадают или они слишком короткие (меньше 6 символов), то выдать соответсвующие сообщения. 

import { useState, useEffect } from 'react';
import classNames from 'classnames'; 

function Input({ placeholder, onChangeParent, className }) {
  const [value, setValue] = useState('');  

//обработчик события изменения инпута: 
  const handleChange = (event) => {
    setValue(event.target.value);  
    onChangeParent(event.target.value);  //передаёт новое состояние value во внешний код через свойство onChangeParent
//можно onChangeParent назвать тоже onChange - но так просто нагляднее). Фактически - это проброс логики из дочернего компонента в родительский (а не наоборот, как делается через пропсы)
  };

  

  return (
    <div>
      <input
       className = {className} //получает {className} из родительского
        type='password'
        placeholder={placeholder}  //получает {placeholder} из родительского
        value={value}  //{value} - из useState ("однофамилец event.target.value")
        onChange={handleChange}
      />
    </div>
  );
}

function CheckPasswords() {
  const [password1, setPassword1] = useState(''); //state для пароля-1
  const [password2, setPassword2] = useState(''); //state для пароля-2
  const [errormessage, setErrorMessage] = useState('');  //state для ошибки


  useEffect(() => {
//логика отображения ошибок (сначала проверяем длинну, потом совпадение паролей)    
    if (password1.length < 6) {
      setErrorMessage('Пароль должен быть не менее 6 символов');
    } else if (password1 !== password2) {
      setErrorMessage('Пароли не совпадают');
    } else {
      setErrorMessage('');
    }
  }, [password1, password2]);  
  //МАССИВ ЗАВИСИМОСТЕЙ - если оставить  его пустым - то useEffect применится только при первоначальном рендерниге, а каждое изменение пароля-1 и 2 оставит без изменения

  const cn1 = classNames('input', password1.length < 6 && 'input__error')

  const cn2 = classNames('input', (password2.length < 6 || password1 !== password2) && 'input__error')

  return (
    <div>
      <Input
        className={cn1} 
        placeholder={"Введите пароль"}
        onChangeParent={setPassword1}
      />
      <Input
        className={cn2}
        placeholder={"Введите пароль повторно"}
        onChangeParent={setPassword2}
      />
      <div className='error'>{errormessage}</div>
    </div>
  );
}

function App(){
    return (<CheckPasswords />)
}

export default App;
