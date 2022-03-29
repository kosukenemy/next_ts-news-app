import { useState, useEffect } from 'react';
// type
import { CRUDTypes, CreateNewBookItem } from "../types";
// fireStore
import { db } from "../../firebase/utils";
import { collection, getDocs, addDoc, updateDoc ,deleteDoc, doc } from 'firebase/firestore';


export const useFetchFireStore = (collectionName: string, method: CRUDTypes, item?: CreateNewBookItem, id?: string) => {
  const [data, setData] = useState<object>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    switch (method) {
      case "GET" :
        try {
          const fetchData = collection(db, collectionName);
          setIsLoading(!isLoading);
          getDocs(fetchData).then((querySnapShot) => {
            return setData(querySnapShot.docs.map((doc) =>({ ...doc.data(), id: doc.id }) ))
          }).then(() => {
            setIsLoading(isLoading);
          });
        } catch(err) {
          console.error(err);
          setIsError(!isError);
        }
      break;

      case "POST":
        (async () => {
          try {
            await addDoc(collection(db, collectionName), item);
          } catch(err){
            console.error(err);
            setIsError(!isError);
          }
        })();
      break;

      case "PUT":
        (async () => {
          try { 
            const upDateRef = doc(collection(db, collectionName), id);
            await updateDoc(upDateRef, item);
          } catch(err) {
            console.error(err);
            setIsError(!isError);
          }
        })();
      break;
      
      case "DELETE":
        (async () => {
          try {
            const deleteRef = doc(collection(db, collectionName), id);
            await deleteDoc(deleteRef);
          } catch(err) {
            console.log(err);
            setIsError(!isError);
          }
        })();        
    }

  },[]);

  return {
    data,
    isLoading,
    isError 
  }
}