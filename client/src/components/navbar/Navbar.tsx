import DropDownMenu from '../dropDownMenu/dropDownMenu';
import './navbar.scss'
import {useState} from 'react'

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
setOpen(!open);
  }


  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Logo</span>
      </div>
      <div className="icons">
        <img src="search.svg" alt="" />
        <img src="element.svg" alt="" />
        <div className="notifications">
          <img src="notifications.svg" alt="" />
          <span>1</span>
        </div>

        <div className="user-icon">
          <img src="user.jpg" alt="" />
          <span>Username</span>
        </div>
        <div className="settings" onClick={handleOpen} >
          <img src="setting.svg" alt="" />
         {open && <div className="settings-items"> <DropDownMenu /></div>}
        </div>
      </div>
    </div>
  );
}

export default Navbar