import type { FirebaseApp } from "firebase/app";
import type { Auth as FirebaseAuth } from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


/**
 * @description Firebaseの管理画面から取得したAPIオブジェクト
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();

/**
 * @description FirebaseAppを返す
 */
export const getFirebaseApp = (): FirebaseApp | undefined => {
  if (typeof window === "undefined") return; // バックエンドで実行されないようにする

  return getApps()[0] || initializeApp(firebaseConfig);
};

/**
 * @description FirebaseAuthを返す
 */
export const getFirebaseAuth = (): FirebaseAuth => {
  return getAuth(getFirebaseApp());
};



/**
 * @description メールアドレスとパスワードでログイン
 */
export const login = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getFirebaseAuth();
  // メールアドレスとパスワードでログインする
  const result = await signInWithEmailAndPassword(auth, email, password);
  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();
  // Cookieにセッションを付与するようにAPIを投げる
  try {
    await fetch("/api/section", { method: "POST", body: JSON.stringify({ id }) });
  } catch(err) {
    console.log(err, "セッションのリクエストに失敗しました");
  }
};

/**
 * @description ログアウトさせる
 */
export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch("/api/sessionLogout", { method: "POST" });
};

/**
 * @description サインアップ（新規登録）
 */
export const createNewAccount = (username: string, email: string, password: string) => {
  const auth = getFirebaseAuth();
  createUserWithEmailAndPassword(auth,email,password)
  .then(( userCredential ) => {
    console.log("create user", userCredential);

    const { uid } = userCredential.user;
    const userInitialData = {
      uid: uid,
      email: email,
      username: username
    };
  })
  .catch((err) => {
    alert(err.message)
  })
}