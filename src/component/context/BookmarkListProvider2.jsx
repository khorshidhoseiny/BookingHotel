// import axios from "axios";
// import { da } from "date-fns/locale";
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
// } from "react";

// const BookmarkContext = createContext();
// const initialState = {
//   bookmarks: [],
//   error: null,
//   isLoading: false,
//   currentBookmark: {},
// };

// function reducerFn() {}
// export default function BookmarkProvider({ children }) {
//   const [{ bookmarks, error, isLoading, currentBookmark }, dispatch] =
//     useReducer(reducerFn, initialState);
//   //   const [bookmarks, setBookmarks] = useState([]);
//   //   const [isLoading, setIsLoading] = useState(false);
//   //   const [currentBookmark, setCurrentBookmark] = useState(null);
//   //   const [error, setIsError] = useState(null);
//   const BASE_URL = "http://localhost:5000";

//   // fetch All Bookmarks
//   useEffect(() => {
//     async function fetchBookmark() {
//       try {
//         setIsLoading(true);
//         const { data } = await axios.get(`${BASE_URL}/bookmarks`);
//         setBookmarks(data);
//       } catch (error) {
//         setIsError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchBookmark();
//   }, []);
//   // get one bookmark and set current bookmark
//   const getBookmark = async (id) => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
//       setCurrentBookmark(data);
//     } catch (error) {
//       console.log(error.message);
//       setIsError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const addNewBookmark = async (newBookmark) => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
//       setCurrentBookmark(data);
//     } catch (error) {
//       console.log(error.message);
//       setIsError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <BookmarkContext.Provider
//       value={{ bookmarks, addNewBookmark, getBookmark, error }}
//     >
//       {children}
//     </BookmarkContext.Provider>
//   );
// }

// export const useBookmark = () => {
//   return useContext(BookmarkContext);
// };
