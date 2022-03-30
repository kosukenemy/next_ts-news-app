import type { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import { useRouter } from "next/router";

import { logout } from "../firebase/utils";
import { firebaseAdmin } from "../firebase/firebaseAdmin";

// useHooks
import { useFetchFireStore } from "./hooks/useFetchFireStore";
import { useFetchAPI } from "./hooks/useFetchAPI";


const DashboardPage: NextPage<{ email: string, user:any }> = ({ email, user }) => {
  const router = useRouter();
  const onLogout = async () => {
    await logout(); // ログアウトさせる
    router.push("/login"); // ログインページへ遷移させる
  };

  const fetchBooksData = useFetchFireStore("books", "GET");

  // useFetchFireStore("books", "POST", { name: "こんにちは" })

  // useFetchFireStore("books", "DELETE", { name: "こんにちは!更新です" }, "Aq4GkvnEixL9aV8hvO3k");


  const { data } = useFetchAPI("https://www.googleapis.com/books/v1", "道は開ける");
  console.log(data?.items)

  return (
    <div>
      <h1>Dashboard Pages</h1>

      <h2>email: {email}</h2>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || "";

  // セッションIDを検証して、認証情報を取得する
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null);

  // 認証情報が無い場合は、ログイン画面へ遷移させる
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: user.email,
      user: user
    },
  };
};

export default DashboardPage;