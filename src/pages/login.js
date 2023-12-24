import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [userEmailMsg, setUserEmailMsg] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserEmailMsg("");
    e.preventDefault();
    console.log("eventtttt", e);

    const email = e.target.value;
    setEmail(email);
  };

  const handleSignInBtn = (e) => {
    console.log("Hi button");
    e.preventDefault(); // So that the page does not refreshes when the user clicks the button

    if (email ) {
      if(email === "soumojjalsen@gmail.com"){
        // route to dashboard
        router.push("/")
      }
      else {
        setUserEmailMsg("Something went wrong logging in")
      }
      
    } else {
      // show invaild message
      setUserEmailMsg("Enter a valid email address");
    }
  };

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
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userEmailMsg}</p>
          <input
            type="text"
            placeholder="Password"
            className={styles.emailInput}
          />
          <button onClick={handleSignInBtn} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
