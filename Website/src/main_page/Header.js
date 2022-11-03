export default function Header() {
    return(
        <header class="site-navbar" role="banner">

            <div class="container">
              <div class="row align-items-center">
                
                <div class="col-11 col-xl-2">
                  <h1 class="mb-0 site-logo"><a href="/" class="text-white mb-0">IK webshop</a></h1>
                </div>
                <div class="col-12 col-md-10 d-none d-xl-block">
                  <nav class="site-navigation position-relative text-right" role="navigation">
                    <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li class="nav-item"><a href="#"><span>Főoldal</span></a></li>
                      <li class="has-children nav-item">
                        <a href="#"><span>Kategóriák</span></a>
                        <ul class="dropdown arrow-top">
                          <li><a href="#">Laptop</a></li>
                          <li><a href="#">Vibrátor</a></li>
                          <li><a href="#">Karácsonyfadísz</a></li>
                          <li class="has-children">
                            <a href="#">PC Alkatrészek</a>
                            <ul class="dropdown">
                              <li><a href="#">Processzor</a></li>
                              <li><a href="#">Ram</a></li>
                              <li><a href="#">Tápegység</a></li>
                              <li><a href="#">Videókártya</a></li>
                              <li><a href="#">adatbázisból majd listázva</a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      
                      <li class="nav-item"><a href="#"><span>Rólunk</span></a></li>
                      <li class="nav-item"><a href="#"><span>Kapcsolat</span></a></li>
                      <li class="nav-item"><a href="#"><span class='login-button'>Bejelentkezés</span></a></li>
                    </ul>
                  </nav>
                </div>
                <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" id="phonemenu">
                  <a href="#" class="site-menu-toggle js-menu-toggle text-white">
                    <span class="icon-menu h3"></span>
                  </a>
                </div>

                
              </div>

            </div>
          
      </header>
    );
}

