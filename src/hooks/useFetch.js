import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        console.log(data.latitude, data.longitude);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoading, data };
}

export default useFetch;
