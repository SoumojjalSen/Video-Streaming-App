import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Register.module.css";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import emailValidate from "../../utils/emailValidate";

const Login = () => {
  const [userRegisterMsg, setUserRegisterMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleRegisterBtn = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      setUserRegisterMsg("");
      router.push("/loginForm");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Hello new error", error.response.data.error);
      setUserRegisterMsg(error.response.data.error);
    }
  }, [email, name, password]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Register</title>
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
          <h1 className={styles.signinHeader}>Register</h1>
          {userRegisterMsg && (
            <div className={styles.userErrorMsg}>{userRegisterMsg}</div>
          )}
          <input
            id="name"
            type="text"
            placeholder="Username"
            value={name}
            onChange={handleName}
            className={styles.nameInput}
          />
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmail}
            className={styles.emailInput}
          />
          <p className={styles.userMsg}>{emailValidate(email)}</p>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <button onClick={handleRegisterBtn} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <div className={styles.signUpCheck}>
            <p className={styles.signUpText}>
              Already have an account?{" "}
              <Link href="/loginForm" className={styles.loginLink}>
                Sign in now.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
