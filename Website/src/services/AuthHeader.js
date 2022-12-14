
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
       // header = { Authorization: 'ikwebshopToken ' + user.accessToken };
      return { Authorization: 'ikwebshopToken ' + user.accessToken };
        
    } else {
      return {};
    }
  }