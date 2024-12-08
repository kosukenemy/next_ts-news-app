import React, { useState } from "react";
import { useFetchHandler } from "../hooks/useFetchHandler";


const registerNewBooks = () => {
  const [value, setValue] = useState("");

  const data = useFetchHandler("https://www.googleapis.com/books/v1",value)
  console.log(data)
  
  return (
    <form>
      <div>
        <label htmlFor="searchBook">本を検索</label>
        <input onBlur={(event) => setValue(event.currentTarget.value)} type="text" id="searchBook" />
      </div>
    </form>
  )
}
export default registerNewBooks