import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartCount } from "../../store/slices/cartSlice";
import { Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

const CartIcon = () => {
  const { cartItems, cartCount } = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    const newCartCount = cartItems.length;
    dispatch(setCartCount(newCartCount));
  }, [cartItems, dispatch]);

  return (
    <Indicator inline label={cartCount} size={17}>
      <Link to={"/cart"}>
        <IconShoppingCart />
      </Link>
    </Indicator>
  );
};

export default CartIcon;
