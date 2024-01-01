import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import { signIn } from "next-auth/react";
import Link from "next/link";
import emailValidate from "../../utils/emailValidate";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [correctCredentialMsg, setCorrectCredentialMsg] = useState(null);

  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    // console.log("eventtttt", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleOnChangePassword = (e) => {
    // e.preventDefault();
    setPassword(e.target.value);
  };

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleSignInBtn = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log("reeees : ", res);

      if (!res.ok) {
        setCorrectCredentialMsg(res.error);
        setIsLoading(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign in: ", error);
      setCorrectCredentialMsg("Error during sign in. Please try again.");
      setIsLoading(false);
    }
  }, [email, password, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix_logo.svg"
                alt="Netflix logo"
                height={34}
                width={128}
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          {correctCredentialMsg && (
            <div className={styles.userErrorMsg}>{correctCredentialMsg}</div>
          )}
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{emailValidate(email)}</p>
          <input
            type="password"
            placeholder="Password"
            className={styles.emailInput}
            onChange={handleOnChangePassword}
          />
          <button onClick={handleSignInBtn} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          <div className={styles.signUpCheck}>
            <p className={styles.signUpText}>
              New to Netflix?{" "}
              <Link href="/registerForm" className={styles.registerLink}>
                Register now.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
