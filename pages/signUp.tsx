import React, { useRef, useState } from 'react';
import { createNewAccount } from '../firebase/utils'

const signUp = () => {
  const newUserName = useRef<HTMLInputElement>(null);
  const newUserEmail = useRef<HTMLInputElement>(null);
  const newUserPassword = useRef<HTMLInputElement>(null);
  const newConfirmUserPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = newUserName.current?.value;
    const userEmail = newUserEmail.current?.value;
    const userPassword = newUserPassword.current?.value;
    const confirmUserPassword = newConfirmUserPassword.current?.value;

    if ( userPassword !== confirmUserPassword ) {
      return setError("パスワードが一致しません")
    }
    if ( username && userEmail && userPassword !== undefined ) {
      createNewAccount(username,userEmail,userPassword)
    }
  }
  

  return (
    <form onSubmit={handleChange}>
      signUp
      <input type="text" ref={newUserName} placeholder='name' required />
      <input type="email" ref={newUserEmail} placeholder='email' required />
      <input type="password" ref={newUserPassword} placeholder='password' required />
      <input type="password" ref={newConfirmUserPassword} placeholder='password' required />
      { error }
      <button>submit</button>
    </form>
  )
}

export default signUp