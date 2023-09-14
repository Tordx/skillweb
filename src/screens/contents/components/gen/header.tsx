import React,{useState, useEffect, useContext} from 'react'
import '../../styles/component.css'
import NavBarItems from './navigator/navbaritems';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from 'auth';
import { Icon } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase/index';
type Props = {
  menu: any,
}

export const Header: React.FC<Props> = ({menu}) => {
  const [active, setActive] = useState(1);
  const location = useLocation();
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  
      const __navigate = (id: number) => {
        setActive(id);
    }

   useEffect(() => {
        menu.forEach((element: any) => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])


    const signOutUser = async () => {
  try {
      await signOut(auth);
      navigate('/login')
      console.log("User signed out successfully.");
    } catch (error) {
      // Handle any errors here
      console.error("Error signing out:", error);
    }
  };



  return (
    <div className="header">
      <div className="left">
      <span className="app-name">Skills Mapping System</span>
      </div>
      <div className="right">
        {menu.map((item: any, index: number) =>(
          <div key={index}  onClick={() => __navigate(item.id)}>
                                    <NavBarItems
                                        active={item.id === active}
                                        item={item} />
                                </div>
        ))}
       <img 
        src={currentUser?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'} 
        alt="Profile" 
        className="profile-image"
        onClick={() => navigate('/admin/changephoto')}
       />
       <span onClick={signOutUser}>
        Logout
       </span>
      </div>
    </div>
  );
}