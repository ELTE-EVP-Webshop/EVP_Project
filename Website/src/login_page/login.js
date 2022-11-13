

export default function Login() {
    return(
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form p-l-55 p-r-55 p-t-178">
					<span class="login100-form-title">
						Bejelentkezés
					</span>

					<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
						<input class="input100" type="text" name="username" placeholder="Felhasználónév"></input>
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Please enter password">
						<input class="input100" type="password" name="pass" placeholder="Jelszó"></input>
						<span class="focus-input100"></span>
					</div>

					<div class="text-right p-t-13 p-b-23">
						<span class="txt1">Elfelejtett     </span>

						<a href="#" class="txt2">   Felhasználónév / Jelszó?</a>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Belépés
						</button>
					</div>

					<div class="flex-col-c p-t-170 p-b-40">
						<span class="txt1 p-b-9">
							Nincs fiókja?
						</span>

						<a href="#" class="txt3">
							Regisztráljon egyet!
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	
)}
	