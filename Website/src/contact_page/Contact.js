import React from "react";

const handleClick = (e) => {
  e.preventDefault();
  alert("Köszönjük, hogy felvette velünk a kapcsolatot! Reméljük csúszás nélkül fel tudjuk dolgozni a numerikusan tárolt üzenetét!")
  window.location.assign("/")
}

class Contact extends React.Component {
  render() {
    return (
      <div>
        <p style={{ color: "transparent" }}>Tinder.com/Sanyika2000</p>
        <section class="ftco-section">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="wrapper">
                  <div class="row no-gutters">
                    <div class="col-md-6 d-flex align-items-stretch">
                      <div class="contact-wrap w-100 p-md-5 p-4 py-5">
                        <h3 class="mb-4">Írjon nekünk</h3>
                        <div id="form-message-warning" class="mb-4"></div>
                        <div id="form-message-success" class="mb-4">
                          Email elküldve
                        </div>
                        <form onSubmit={handleClick}
                          method="POST"
                          id="contactForm"
                          name="contactForm"
                          class="contactForm"
                        >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <input
                                  type="text"
                                  class="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="Név"
                                  required
                                ></input>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <input
                                  type="email"
                                  class="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Email"
                                  required
                                ></input>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <input
                                  type="text"
                                  class="form-control"
                                  name="subject"
                                  id="subject"
                                  placeholder="Tárgy"
                                  required
                                ></input>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <textarea
                                  name="message"
                                  class="form-control"
                                  id="message"
                                  cols="30"
                                  rows="6"
                                  placeholder="Üzenet"
                                  required
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <input
                                  type="submit"
                                  value="Küldés"
                                  class="btn btn-send"
                                ></input>
                                <div class="submitting"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-stretch">
                      <div class="info-wrap w-100 p-md-5 p-4 py-5 img">
                        <h3>Kapcsolat</h3>
                        <p class="mb-4">
                          Ha kérdése van, lépjen kapcsolatba velünk
                        </p>
                        <div class="dbox w-100 d-flex align-items-start">
                          <div class="icon d-flex align-items-center justify-content-center">
                            <span class="fa fa-map-marker"></span>
                          </div>
                          <div class="text pl-3">
                            <p>
                              <span>Cím:</span> Óperenciás tengeren túl
                            </p>
                          </div>
                        </div>
                        <div class="dbox w-100 d-flex align-items-center">
                          <div class="icon d-flex align-items-center justify-content-center">
                            <span class="fa fa-phone"></span>
                          </div>
                          <div class="text pl-3">
                            <p>
                              <span>Telefon:</span>{" "}
                              <a href="tel://1234567920">+3669 6969696</a>
                            </p>
                          </div>
                        </div>
                        <div class="dbox w-100 d-flex align-items-center">
                          <div class="icon d-flex align-items-center justify-content-center">
                            <span class="fa fa-paper-plane"></span>
                          </div>
                          <div class="text pl-3">
                            <p>
                              <span>Email:</span>{" "}
                              <a href="mailto:info@yoursite.com">
                                igen@nem.talán
                              </a>
                            </p>
                          </div>
                        </div>
                        <div class="dbox w-100 d-flex align-items-center">
                          <div class="icon d-flex align-items-center justify-content-center">
                            <span class="fa fa-globe"></span>
                          </div>
                          <div class="text pl-3">
                            <p>
                              <span>Weboldal</span> <a href="/">IKshop.hu</a>
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3>Készítők:</h3>
                          <p>Vass-Horváth Balázs</p>
                          <p>Harkai Martin</p>
                          <p>Rába Krisztián</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;
