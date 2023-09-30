import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);

      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
    } catch (error) {
      setError(true);
    }
  };

  
  return { data, error, loading, reFetch };
};

export default useFetch;
