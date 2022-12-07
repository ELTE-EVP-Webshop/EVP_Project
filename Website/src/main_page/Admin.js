import React from 'react'
import {user} from './Header'
class ShoppingCart extends React.Component {
        render() {
            if(user.roles.includes('ROLE_ADMIN1') ||user.roles.includes('ROLE_ADMIN2') ) {
                return (
                    
                        <div>
                               <h1 className='text-center'>Admin panel</h1>
                        </div>
                )
            } else {
                return (
                    <div>
                               <h1 className='text-center'>Nincs admin jogosítványod!</h1>
                        </div>
                )
            }
                
        }
}


export default ShoppingCart
