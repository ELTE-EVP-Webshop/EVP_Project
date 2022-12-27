import React, { useState } from "react";
import AuthService from "../services/AuthService";




const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [changePass, setChangePass] = useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("")

  async function handleChange (e, id) {
    switch(id) {
      case 'oldPass':
        await setOldPassword(e.target.value);
      break;
      case 'newPass':
       await setNewPassword(e.target.value);
        break;
        
    }
    }

    async function handleGenSubmit() {
      await AuthService.askNewPasswordMail(currentUser.email)
  }

  async function handleSubmit() {
    if(oldPassword != "" && newPassword != "") {
		let response;
       if((response = await AuthService.changePassword(oldPassword, newPassword)) == "Jelszó sikeresen megváltoztatva!") { //Sikeres a változtatás
		   setOldPassword("")
		   setNewPassword("")
		   setChangePass(false)
		   localStorage.removeItem("user");//Kijelentkeztetés
		   window.location.replace(window.location.protocol + "//" + window.location.host);//Vissza a főoldalra
	   }else{
		   alert("Jelszó megváltoztatása sikertelen: "+response)
	   }
    } else {
      alert("Kérlek töltsd ki a jelszó mezőket!")
    }
    }
	
  return (
    /*
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profil
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email cím:</strong> {currentUser.email}
      </p>
      <strong>Jogosultság:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>*/
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container-profilecard d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      ></img>
                    </div>
                    <h5 class="f-w-600">{currentUser.username}</h5>
                    <p>profil ID: {currentUser.id}</p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Információ
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">{currentUser.email}</h6>
                      </div>
                      
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Telefonszám</p>
                        <h6 class="text-muted f-w-400">{currentUser.phone ? currentUser.phone : "Nincs megadva!"}</h6>
                      </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      Fiókhoz tartozó műveletek
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Jelszó</p>
                        {!changePass &&
                        <a href="#" onClick={() => setChangePass(true)}><h6 class="text-muted f-w-400">Megváltoztatás</h6></a>
                        }
                         
                        <a href="#" onClick={() => handleGenSubmit(true)}><h6 class="text-muted f-w-400">Generálás</h6></a>
                        
                        {changePass &&
                        <>
                          <input onChange={(e)=> handleChange(e,"oldPass")} type="text" placeholder="régijelszó"></input>
                          <input onChange={(e)=> handleChange(e,"newPass")} type="text" placeholder="újjelszó"></input>
                          <button onClick = {()=> handleSubmit()} className="btn btn-success">Jelszó megváltoztatása</button>
                          </>
                        }
                        
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email megerősítve</p>
                        <h6 class="text-muted f-w-400">Igen</h6>
                        <a href="/mailConfirm"><h6 class="text-muted f-w-400">Nem</h6></a>
                      </div>
                  
                    </div>
                    {/*
                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="facebook"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-facebook feather icon-facebook facebook"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="twitter"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-twitter feather icon-twitter twitter"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="instagram"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-instagram feather icon-instagram instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                    */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
