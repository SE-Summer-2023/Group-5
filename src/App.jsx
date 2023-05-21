import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getUserDocumentFromAuth,
} from "./utils/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/slices/userSlice";
import { setAllPacks } from "./store/slices/packsSlice";

import NavigationBar from "./routes/navigation/NavigationBar";
import Home from "./routes/home/Home";
import Packages from "./routes/packages/Packages";
import Auth from "./routes/authentication/Auth";
import CreatePackage from "./routes/createPackage/CreatePackage";
import ModifyPackage from "./routes/modifyPackage/ModifyPackage";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       await createUserDocumentFromAuth(user);
  //       const { name, email } = await getUserDocumentFromAuth(user);
  //       dispatch(setCurrentUser({ name, email }));
  //     } else {
  //       dispatch(setCurrentUser(null));
  //     }
  //   });
  //   return unsubscribe;
  // }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/modify-package" element={<ModifyPackage />} />
      </Route>
    </Routes>
  );
};
export default App;
