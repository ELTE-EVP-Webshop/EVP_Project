import React, { useEffect, useState } from "react";
import EventBus from "../user/EventBus";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
export const user = AuthService.getCurrentUser();
export default function Header() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(
        user.roles.includes("ROLE_ADMIN1") || user.roles.includes("ROLE_ADMIN2")
      );
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <header class="site-navbar" role="banner">
     

      {currentUser ? (
        <div class="container">
          <div class="row align-items-center">
            <div class="col-11 col-xl-2">
              <h1 class="mb-0 site-logo">
                <a href="/" class="text-white mb-0">
                  IK webshop
                </a>
              </h1>
            </div>
            <div class="col-12 col-md-10 d-none d-xl-block">
              <nav
                class="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className="nav-item">
                    <Link to={"/user"} class="nav-item"></Link>
                  </li>

                  <li class="nav-item ">
                    <a href="/">
                      <span>Főoldal</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a>
                      <span>
                        <Link to="/cart">Kosár</Link>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item active">
                    <a>
                      <span>
                        <Link to="/payment">Fizetés</Link>
                      </span>
                    </a>
                  </li>
                

                  <li class="nav-item">
                    <a>
                      <span>
                        <Link to="/contact">Kapcsolat</Link>
                      </span>
                    </a>
                  </li>
                  <li class="has-children nav-item ">
                    <a href="#">
                      <span>{currentUser.username}</span>
                    </a>
                    <ul class="dropdown arrow-top">
                      <li>
                        <a href="/profile">Profil</a>
                      </li>
                      {showModeratorBoard && (
                        <li>
                          <Link to={"/mod"} class="nav-item">
                            Moderator Board
                          </Link>
                        </li>
                      )}
                      {showAdminBoard && (
                        <li>
                          <Link to={"/admin"} class="nav-item">
                            Admin Panel
                          </Link>
                        </li>
                      )}
                      <li>
                          <a href="#">Rendelések</a>
                        </li>
                      <li>
                        <a href="/login" onClick={logOut}>
                          Kijelentkezés
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              id="phonemenu"
            >
              <a href="#" class="site-menu-toggle js-menu-toggle text-white">
                <span class="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div class="container">
          <div class="row align-items-center">
            <div class="col-11 col-xl-2">
              <h1 class="mb-0 site-logo">
                <a href="/" class="text-white mb-0">
                  IK webshop
                </a>
              </h1>
            </div>
            <div class="col-12 col-md-10 d-none d-xl-block">
              <nav
                class="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li class="nav-item active">
                    <Link to="/">
                      <span>Főoldal</span>
                    </Link>
                  </li>
                

               
                  <li class="nav-item">
                    <Link to="/contact">
                      <span>Kapcsolat</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      <span class="login-button">Bejelentkezés</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              id="phonemenu"
            >
              <a href="#" class="site-menu-toggle js-menu-toggle text-white">
                <span class="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
