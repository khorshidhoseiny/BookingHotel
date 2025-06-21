import is from "date-fns/esm/locale/is/index.js";
import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("your browser not support geolocation");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLoading(true);
        setPosition({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      }
    );
  }
  return { isLoading, position, error, getPosition };
}

//   const [isLoading, setIsLoading] = useState(false);
//   const [position, setPosition] = useState({});
//   const [error, setError] = useState(null);

//   function getPosition() {
//     if (!navigator.geolocation) return setError;

//     setIsLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//         setIsLoading(false);
//       },
//       (error) => {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     );
//   }
//   return { isLoading, position, getPosition };
// }
