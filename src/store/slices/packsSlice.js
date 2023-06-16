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

const deleteUserBookingItem = (bookings, itemToDelete) => {
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

const initialState = {
  allPacks: [],
  bookings: [],
  bookingsChartData: [],
  bookingsRevenueData: [],
  currentUserBookings: [],
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
    deleteItemFromUserBookings: (state, action) => {
      const newUserBookings = deleteUserBookingItem(
        state.currentUserBookings,
        action.payload
      );
      return { ...state, currentUserBookings: newUserBookings };
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
      return { ...state, bookingsChartData: action.payload };
    },
    setBookingRevenueData: (state, action) => {
      return { ...state, bookingsRevenueData: action.payload };
    },
    setCurrentUserBookings: (state, action) => {
      return { ...state, currentUserBookings: action.payload };
    },
  },
});

export const {
  setAllPacks,
  setAllBookings,
  deleteItemFromBookings,
  deleteItemFromUserBookings,
  modifyItemFromBookings,
  setBookingChartData,
  setBookingRevenueData,
  setCurrentUserBookings,
} = packsSlice.actions;
export default packsSlice.reducer;
