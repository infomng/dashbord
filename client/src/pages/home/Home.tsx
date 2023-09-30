import TopDeals from "../../components/topDeals/TopDeals";
import Chartbox from "../../components/chartbox/Chartbox";

import "./home.scss";
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
  barChartBoxVisit,
  barChartBoxprofit,
  revenue
} from "../../data";
import Topsells from "../../components/topsells/Topsells";
import Barchart from "../../components/barchart/Barchart";
import Revenue from "../../components/revenue/Revenue";




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
        <Topsells />
      </div>
      <div className="box box5">
        <Chartbox {...chartBoxProduct} />
      </div>
      <div className="box box6">
        <Chartbox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <Revenue {...revenue}/>
      </div>
      <div className="box box8">
        <Barchart {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <Barchart {...barChartBoxprofit} />
      </div>
    </div>
  );
};

export default Home;
