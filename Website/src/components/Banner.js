export default function Header() {
    return(
<section class="banner_main">
<div id="banner1" class="carousel slide" data-ride="carousel">
   <ol class="carousel-indicators">
      <li data-target="#banner1" data-slide-to="0" class="active"></li>
      <li data-target="#banner1" data-slide-to="1"></li>
      <li data-target="#banner1" data-slide-to="2"></li>
      <li data-target="#banner1" data-slide-to="3"></li>
      <li data-target="#banner1" data-slide-to="4"></li>
   </ol>
   <div class="carousel-inner">
      <div class="carousel-item active">
         <div class="container">
            <div class="carousel-caption">
               <div class="row">
                  <div class="col-md-6">
                     <div class="text-bg">
                        <span>Asztali PC és Laptop</span>
                        <h1>Kellékek</h1>
                        <p>Lorem ipszum vicsos panok árvíztükörfúrógép </p>
                        <a href="#">Vedd meg </a>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="text_img">
                        <figure><img src="images/pct.png" alt="#"/></figure>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>
   <a class="carousel-control-prev" href="#banner1" role="button" data-slide="prev">
   <i class="fa fa-chevron-left" aria-hidden="true"></i>
   </a>
   <a class="carousel-control-next" href="#banner1" role="button" data-slide="next">
   <i class="fa fa-chevron-right" aria-hidden="true"></i>
   </a>
</div>
</section>
    );
}