import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";


export default function Header() {
  const [categories, setCategories] = useState("")
  useEffect(() => {

      async function getCategories() {
        var cat = await ProductService.getCategories();
        setCategories(cat)
        //alert(AuthService.getCookie('ikwebshopToken'))
        //console.log(categories)
    }
    getCategories();
  
  }, []);

  const filterProductsByCat = (id) => {
    //setSelectedCategory(id)
    console.log(id)
  }

  return (
    <header class="site-navbar" role="banner">
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
                <li class="nav-item">
                  <a>
                    <span>
                      <Link to="/">Főoldal</Link>
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
                <li class="nav-item active">
                  <a>
                    <span class="login-button">
                      <Link to="/login">Bejelentkezés</Link>
                    </span>
                  </a>
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
    </header>
  );
}
