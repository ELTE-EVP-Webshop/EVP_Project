import AuthService from "./AuthService";



export default async function authHeader() {
    const user = await JSON.parse(localStorage.getItem('user'));

 

    if (user && user.accessToken) {
       // header = { Authorization: 'ikwebshopToken ' + user.accessToken };
      return await { Authorization: 'ikwebshopToken ' + user.accessToken };
        
    } else {
      return AuthService.logout()
    }

  
  }