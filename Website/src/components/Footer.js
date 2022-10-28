export default function Footer() {
    return(
        <div class="footer">
           <div class="container">
              <div class="row">
                 <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                    <img class="logo1" src="images/logo1.png" alt="#"/>
                    <ul class="social_icon">
                       <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                       <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                       <li><a href="#"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                       <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                 </div>
                 <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                    <h3>Rólunk</h3>
                    <ul class="about_us">
                       <li>Lorem ipszum vicsos panok árvíztükörfúrógép </li>
                    </ul>
                 </div>
                 <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                    <h3>Lépj velünk kapcsolatba!</h3>
                    <ul class="conta">
                       <li>Lorem ipszum vicsos panok árvíztükörfúrógép </li>
                    </ul>
                 </div>
                 <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                    <form class="bottom_form">
                       <h3>Hírlevél</h3>
                       <input class="enter" placeholder="Írd be az email címedet" type="text" name="Enter your email"/>
                       <button class="sub_btn">Feliratkozás</button>
                    </form>
                 </div>
              </div>
           </div>
           <div class="copyright">
              <div class="container">
                 <div class="row">
                    <div class="col-md-12">
                       <p>© 2022 Minden jog fenntartva. <a>n+1 csapat</a></p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        );
        }
