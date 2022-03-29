import type { FormEvent } from "react";
import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../firebase/utils";

export const LoginPage:NextPage = () => {
  const router = useRouter();
  const [userEmail ,setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getInputEmail = (event: React.ChangeEvent<HTMLInputElement>):void => {
    return setUserEmail(event.currentTarget.value);
  };

  const getInputPassword = (event: React.ChangeEvent<HTMLInputElement>):void => {
    return setPassword(event.currentTarget.value);
  };

  const onSubmit = async(event:FormEvent) => {
    event.preventDefault();
    try {
      await login(userEmail, password);
      router.push("/dashboard");

    } catch(err) {
      console.error(err);
      alert("不正なログイン情報です。")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input onChange={getInputEmail} id="username" type="text" autoComplete="on" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input onChange={getInputPassword} id="password" type="password" autoComplete="off" />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}
export default LoginPage;