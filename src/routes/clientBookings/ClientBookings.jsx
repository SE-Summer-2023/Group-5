import { useDispatch, useSelector } from "react-redux";
import { Container, Text, createStyles, rem } from "@mantine/core";
import BookingItem from "../../components/bookingItem/BookingItem";
import { setBookingChartData } from "../../store/slices/packsSlice";

const useStyles = createStyles((theme) => ({
  pageTitle: {
    fontSize: rem(32),
    marginTop: rem(30),

    [theme.fn.smallerThan("md")]: {
      fontSize: rem(22),
    },
  },
}));
const ClientBookings = () => {
  const { bookings } = useSelector((state) => state.allpacks);
  const { classes } = useStyles();
  const dispatch = useDispatch();
  return (
    <Container>
      <Text className={classes.pageTitle} fw="bold">
        Client Bookings
      </Text>
      {bookings.map((booking, index) => {
        const allBookingItems = Object.values(booking);
        const bookingsObject = allBookingItems.map((item) => ({
          packageId: item.packageId,
          packageName: item.packageName,
        }));
        // dispatch(setBookingChartData(bookingsObject));
        return <BookingItem data={allBookingItems} key={index} />;
      })}
    </Container>
  );
};

export default ClientBookings;
