import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getUserDocumentFromAuth,
  getUserBookings,
  getAllPackages,
} from "./utils/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/slices/userSlice";
import {
  setAllPacks,
  setAllBookings,
  setCurrentUserBookings,
} from "./store/slices/packsSlice";

import NavigationBar from "./routes/navigation/NavigationBar";
import Home from "./routes/home/Home";
import Packages from "./routes/packages/Packages";
import Auth from "./routes/authentication/Auth";
import CreatePackage from "./routes/createPackage/CreatePackage";
import ModifyPackage from "./routes/modifyPackage/ModifyPackage";
import ClientBookings from "./routes/clientBookings/ClientBookings";
import RevenueReports from "./routes/revenueReports/RevenueReports";
import MyBookings from "./routes/myBookings/MyBookings";
import CustomPackage from "./routes/customPackage/CustomPackage";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import BookSuccess from "./routes/bookSuccess/BookSuccess";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
        const { name, email, userType, id } = await getUserDocumentFromAuth(
          user
        );
        if (userType === "Agent") {
          const bookings = await getUserBookings();
          dispatch(setAllBookings(bookings));
        } else if (userType === "User") {
          const bookings = await getUserBookings();
          const currUserBookings = [];
          bookings.forEach((booking) => {
            const allBookingItems = Object.values(booking);
            allBookingItems.map((bookItem) => {
              if (bookItem.userId === id) currUserBookings.push(bookItem);
            });
          });
          currUserBookings.length !== 0
            ? dispatch(setCurrentUserBookings(currUserBookings))
            : "";
        }
        dispatch(setCurrentUser({ name, email, userType, id }));
        const packs = await getAllPackages();
        dispatch(setAllPacks(packs));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-package" element={<CreatePackage />} />
          <Route path="/modify-package" element={<ModifyPackage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all-bookings" element={<ClientBookings />} />
          <Route path="/revenue-reports" element={<RevenueReports />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/custom-package" element={<CustomPackage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<BookSuccess />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default App;
