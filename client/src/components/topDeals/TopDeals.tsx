import "./topDeals.scss";
import { topDealUsers } from "../../data";

const TopDeals = () => {
  return (
    <div className="topdeals">
      <h2 className="title">Top Deals</h2>
      <div className="wrapper">
{topDealUsers.map((user) =>(
        <div className="topdeal-items" key={user.id}>
          <div className="user-image">
            <img src="user.svg" alt="" />
          </div>
          <div className="user-details">
            <span>{user.username}</span>
            <span>{user.email}</span>
          </div>
          <div>{user.amount} $</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
