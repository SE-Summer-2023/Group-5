import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getUserDocumentFromAuth,
  getUserBookings,
} from "./utils/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/slices/userSlice";
import { setAllBookings, setBookingChartData } from "./store/slices/packsSlice";

import NavigationBar from "./routes/navigation/NavigationBar";
import Home from "./routes/home/Home";
import Packages from "./routes/packages/Packages";
import Auth from "./routes/authentication/Auth";
import CreatePackage from "./routes/createPackage/CreatePackage";
import ModifyPackage from "./routes/modifyPackage/ModifyPackage";
import ClientBookings from "./routes/clientBookings/ClientBookings";
import Cart from "./routes/cart/Cart";

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
          // bookings.map((booking) => {
          //   const allBookingItems = Object.values(booking);
          //   const bookingsObject = allBookingItems.map((item) => ({
          //     packageId: item.packageId,
          //     packageName: item.packageName,
          //   }));
            // dispatch(setBookingChartData(bookingsObject));
          // });
        }
        dispatch(setCurrentUser({ name, email, userType, id }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

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
