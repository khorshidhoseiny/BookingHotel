import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./component/Header";
import LocationList from "./component/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./component/HotelLayout";
import Hotels from "./component/Hotels/Hotels";
import HotelsProvider from "./component/context/HotelsProvider";
import SingleHotel from "./component/SIngleHotel/SingleHotel";
import BookmarkLayout from "./component/Bookmark/BookmarkLayout";
import BookmarkProvider from "./component/context/BookmarkListContext";
import Bookmark from "./component/Bookmark/Bookmark";
import SingleBookmark from "./component/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./component/AddNewBookmark/AddNewBookmark";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Login from "./component/Login/Login";
import AuthProvider from "./component/context/AuthProvider";
import HotelLayout from "./component/HotelLayout";
function App() {
  return (
    <BookmarkProvider>
      <HotelsProvider>
        <AuthProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<HotelLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HotelsProvider>
    </BookmarkProvider>
  );
}

export default App;
