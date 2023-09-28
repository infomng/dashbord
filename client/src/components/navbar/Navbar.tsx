import './navbar.scss'

const Navbar = () => {
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
        <img src="setting.svg" alt="" />
      </div>
    </div>
  );
}

export default Navbar