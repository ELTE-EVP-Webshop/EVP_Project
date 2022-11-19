import React from "react";
export default function Header() {
    return(
        <header>
          <div class="site-navbar" role="banner">

          <div class="container">
            <div class="row align-items-center">
              
              <div class="col-11 col-xl-2">
                <h1 class="mb-0 site-logo"><a href="/" class="text-white mb-0">IK webshop</a></h1>
              </div>
              <div class="col-12 col-md-10 d-none d-xl-block">
                <nav class="site-navigation position-relative text-right" role="navigation">

                  <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li><a href="/"><span>Főoldal</span></a></li>
                    <li class="has-children">
                      <a href="about.html"><span>Dropdown</span></a>
                      <ul class="dropdown arrow-top">
                        <li><a href="#">Menu One</a></li>
                        <li><a href="#">Menu Two</a></li>
                        <li><a href="#">Menu Three</a></li>
                        <li class="has-children">
                          <a href="#">Dropdown</a>
                          <ul class="dropdown">
                            <li><a href="#">Menu One</a></li>
                            <li><a href="#">Menu Two</a></li>
                            <li><a href="#">Menu Three</a></li>
                            <li><a href="#">Menu Four</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li><a href="/products"><span>Termékek</span></a></li>
                    <li><a href="about.html"><span>Bejelentkezés/Regisztráció</span></a></li>
                    <li><a href="blog.html"><span>Blog</span></a></li>
                    <li><a href="contact.html"><span>Kapcsolat</span></a></li>
                  </ul>
                </nav>
              </div>


              
              </div>

            </div>
          </div>
      </header>
    );
}

