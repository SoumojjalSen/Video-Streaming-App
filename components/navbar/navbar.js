import React from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";




const NavBar = (props) => {

  const { username } = props;
  const router = useRouter();
  const [showDropdown, setDropdown] = useState(false);

  console.log("console context : ", props.context);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/myList");
  };


  const handleShowDropdown = (e) => {
    e.preventDefault();
    setDropdown(!showDropdown);
  };

  const handleSignoutBtn = () => signOut({
    redirect: true,
    callbackUrl: "/loginForm",
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome} key="home">
            Home
          </li>
          {/* anything onclick provides gets automatically passed on to the function */}
          <li className={styles.navItem2} onClick={handleOnClickMyList} key="myList">
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand dropdown icon"
                height={24}
                width={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  {/* <Link className={styles.linkName} href="/login">
                    Sign out
                  </Link> */}
                  <button className={styles.linkName} onClick={handleSignoutBtn}>
                    Sign out
                  </button>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
