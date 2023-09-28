import TopDeals from "../../components/topDeals/TopDeals";
import Chartbox from "../../components/chartbox/Chartbox";

import "./home.scss";
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import Topsells from "../../components/topsells/Topsells";




const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopDeals />
      </div>
      <div className="box box2">
        <Chartbox {...chartBoxUser} />
      </div>  
      <div className="box box3">
        <Chartbox {...chartBoxConversion} />
      </div>
      <div className="box box4">
<Topsells/>
      </div>
      <div className="box box5">
    
        <Chartbox {...chartBoxProduct} />
      </div>
      <div className="box box6">
        <Chartbox {...chartBoxRevenue} />
      </div>
      <div className="box box7">Box 7</div>
      <div className="box box8">Box 8</div>
      <div className="box box9">Box 9</div>
    </div>
  );
};

export default Home;
