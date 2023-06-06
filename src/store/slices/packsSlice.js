import { createSlice, current } from "@reduxjs/toolkit";

const deleteBookingItem = (bookings, itemToDelete) => {
  const boookings = current(bookings);
  const newArr = boookings.map((booking) => {
    const newBook = Object.values(booking);
    const filterBook = newBook.filter((item) => {
      if (
        item.packageId === itemToDelete.packageId &&
        item.userId === itemToDelete.userId
      ) {
        return false;
      } else {
        return true;
      }
    });
    const newObj = Object.assign({}, filterBook);
    return newObj;
  });
  return newArr;
};

const modifyBookingItem = (bookings, itemToModify, date) => {
  const boookings = current(bookings);
  const newArr = boookings.map((booking) => {
    const newBook = Object.values(booking);
    const modifyBook = newBook.map((item) => {
      if (
        item.packageId === itemToModify.packageId &&
        item.userId === itemToModify.userId
      ) {
        return { ...item, bookDate: date };
      } else {
        return { ...item };
      }
    });
    const newObj = Object.assign({}, modifyBook);
    return newObj;
  });
  return newArr;
};

const addBookingsData = (bookingsChartData, bookingsArray) => {
  bookingsArray.map((bookingToAdd) => {});
  const isAvailable = bookingsChartData.find(
    (item) => item.packageId === bookingToAdd.packageId
  );
  if (isAvailable) {
    return bookingsChartData.map((item) =>
      item.packageId === bookingToAdd.packageId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...bookingsChartData, { ...bookingToAdd, quantity: 1 }];
};

const initialState = {
  allPacks: [],
  bookings: [],
  bookingsChartData: [],
};

const packsSlice = createSlice({
  name: "allpacks",
  initialState,
  reducers: {
    setAllPacks: (state, action) => {
      return { ...state, allPacks: action.payload };
    },
    setAllBookings: (state, action) => {
      return { ...state, bookings: action.payload };
    },
    deleteItemFromBookings: (state, action) => {
      const newBookings = deleteBookingItem(state.bookings, action.payload);
      return { ...state, bookings: newBookings };
    },
    modifyItemFromBookings: (state, action) => {
      const newBookings = modifyBookingItem(
        state.bookings,
        action.payload[0],
        action.payload[1]
      );
      console.log(newBookings);
      return { ...state, bookings: newBookings };
    },
    setBookingChartData: (state, action) => {
      const newBookingsData = addBookingsData(
        state.bookingsChartData,
        action.payload
      );
      console.log(newBookingsData);
      // return { ...state, bookingsChartData: action.payload };
    },
  },
});

export const {
  setAllPacks,
  setAllBookings,
  deleteItemFromBookings,
  modifyItemFromBookings,
  setBookingChartData,
} = packsSlice.actions;
export default packsSlice.reducer;
