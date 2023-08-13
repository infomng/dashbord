import "./navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>GD Media</span>
      </div>
      <div className="icons">
        <img src="search.svg" alt="" className="icon" />
        <img src="app.svg" alt="" className="icon" />
        <img src="expand.svg" alt="" className="icon" />
        <div className="notifications">
          <img src="notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="user.jpg" alt="" />
          <span>Username</span>
        </div>
        <img src="settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
