import React, { useEffect, useState } from "react";
import EventBus from "../user/EventBus";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import ProductService from "../services/ProductService";
export const user = AuthService.getCurrentUser();





export default function Header() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [categories, setCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0)
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      async function getCategories() {
        var cat = await ProductService.getCategories();
        setCategories(cat)
        //console.log(categories)
    }
    getCategories();
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
  const filterProductsByCat = (id) => {
    setSelectedCategory(id)
    //console.log(id)
  }
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <>
    <header class="site-navbar" role="banner">
      {showModeratorBoard && (
        <li className="nav-item">
          <Link to={"/mod"} class="nav-item">
            <span>Moderator Board</span>
          </Link>
        </li>
      )}
      {showAdminBoard && (
        <li className="nav-item">
          <Link to={"/admin"} class="nav-item">
            <span className="text-white">Admin Panel</span>
          </Link>
        </li>
      )}

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

                  <li class="nav-item active">
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
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>Kategóriák</span>
                    </a>
                    {categories &&
                    <ul class="dropdown arrow-top">
                      <>
                   { categories.map(cat =>
                    
                      <li key={cat.id}>
                        <a onClick={() => filterProductsByCat(cat.id)} href="#">{cat.category}</a>
                      </li>
                      )}
                      </>
                      
                    
                    
                    </ul>
                }
                  </li>

                  
                  <li class="nav-item">
                    <a>
                      <span>
                        <Link to="/contact">Kapcsolat</Link>
                      </span>
                    </a>
                  </li>
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>{currentUser.username}</span>
                    </a>
                    <ul class="dropdown arrow-top">
                      <li>
                        <a href="/profile">Profil</a>
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
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>Kategóriák</span>
                    </a>
                    {categories &&
                    <ul class="dropdown arrow-top">
                      <>
                   { categories.map(cat =>
                    
                      <li key={cat.id}>
                        <a onClick={() => filterProductsByCat(cat.id)} href="#">{cat.category}</a>
                      </li>
                      )}
                      </>
                      
                    
                    
                    </ul>
                }
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
    </>
  );
}
 /* <ProductComponent categories={selectedCategory}/>*/