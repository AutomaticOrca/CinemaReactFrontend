import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentPurchase } from "../Models";

// Define the overall state interface for the purchase slice
interface PurchaseState {
  currentPurchase: CurrentPurchase; // The current purchase being made
  loading: boolean; // Flag to indicate whether a request is in progress
  error: string | null; // Error message or null if there's no error
}

// intialState
const initialState: PurchaseState = {
  currentPurchase: {
    originUnitPrice: 20,
    tickets: {
      NORMAL: { quantity: 0, unitPrice: 20 },
      DISCOUNTED: { quantity: 0, unitPrice: 15 },
    },
    status: "PENDING",
  },
  loading: false,
  error: null,
};

//
const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    // set sessionID for current purchase
    setSession(state, action: PayloadAction<string>) {
      // payload = sessionId
      const sessionId = action.payload;
      state.currentPurchase.sessionId = sessionId;
    },
    // set userID for current purchase
    setUser(state, action: PayloadAction<string>) {
      // payload = userId
      const userId = action.payload;
      state.currentPurchase.userId = userId;
    },
    // set tickets prices based on originUnitPrice
    setTicketPrices(state) {
      state.currentPurchase.tickets.NORMAL.unitPrice =
        state.currentPurchase.originUnitPrice;
      state.currentPurchase.tickets.DISCOUNTED.unitPrice =
        state.currentPurchase.originUnitPrice - 5;
    },
    // Add an item (ticket) of the given type of purchase
    addItem(state, action: PayloadAction<"NORMAL" | "DISCOUNTED">) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity = 1;
      }
    },
    // Remove all items (tickets) of the given type from the purchase
    deleteItem(state, action: PayloadAction<"NORMAL" | "DISCOUNTED">) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity = 0;
      }
    },
    // Increate the quantity of tickets of the given type by 1
    increaseItemQuantity(
      state,
      action: PayloadAction<"NORMAL" | "DISCOUNTED">
    ) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity += 1;
      }
      console.log(
        `increase type: ${type} quantity: ${state.currentPurchase.tickets[type].quantity}`
      );
    },
    // Decrease the quantity of tickets of the given type by 1
    decreaseItemQuantity(
      state,
      action: PayloadAction<"NORMAL" | "DISCOUNTED">
    ) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        if (state.currentPurchase.tickets[type].quantity > 0) {
          state.currentPurchase.tickets[type].quantity -= 1;
        }
        // if the quantity is 0, remove the item
        if (state.currentPurchase.tickets[type].quantity === 0) {
          purchaseSlice.caseReducers.deleteItem(state, action);
        }
      }
      console.log(
        `decrease type: ${type} quantity: ${state.currentPurchase.tickets[type].quantity}`
      );
    },
    // set all ticket quantities to 0
    clearCart(state) {
      state.currentPurchase.tickets.NORMAL.quantity = 0;
      state.currentPurchase.tickets.DISCOUNTED.quantity = 0;
    },
    // set the loading state (for async operations)
    setLoading(state, action) {
      // payload = boolean
      state.loading = action.payload;
    },
    // set an error message
    setError(state, action) {
      // payload = error message or null
      state.error = action.payload;
    },
  },
});

// Export the reducers actions
export const {
  setSession,
  setUser,
  setTicketPrices,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setLoading,
  setError,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;

// Selector to get the current purchase details from the state
export const getCurrentPurchase = (state: { purchase: PurchaseState }) =>
  state.purchase.currentPurchase;
