import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPurchaseById } from "../../shared/utils/api";
import { formatDate } from "../../shared/utils/timeUtils";
import { PurchaseGotById } from "../../shared/Models";
import ErrorMessage from "../../shared/components/ErrorMessage";
import Loading from "../../shared/components/Loading";
import OrderInfoSection from "../components/OrderInfoSection";

function OrderConfirmPage() {
  const { orderid } = useParams<{ orderid: string }>(); // Assuming the order ID is passed as URL param
  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseGotById | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Format tickets into a string like "Adult × 2, Concession × 1"
  const formattedTickets = purchaseDetails?.tickets
    .filter((ticket) => ticket.number > 0)
    .map((ticket) =>
      ticket.type === "NORMAL"
        ? `Adult × ${ticket.number}`
        : `Concession × ${ticket.number}`
    )
    .join(", ");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPurchaseById(orderid!); // Use orderid from params
        setPurchaseDetails(data);
      } catch (error) {
        setErrorMessage("Failed to load purchase details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderid) {
      fetchOrder();
    } else {
      setErrorMessage("Invalid order ID.");
    }
  }, [orderid]);

  if (isLoading) return <Loading />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <div>
      {purchaseDetails && (
        <div>
          <h1 className="font-italiana text-4xl px-4 font-bold text-center mb-3">
            Order Confirmed
          </h1>
          <div>
            <img
              src={purchaseDetails.movieImg}
              alt={purchaseDetails.movieName + "-poster"}
            />
            <div>
              <div>
                <p className="text-zinc-400 text-xl">Your Ticket to</p>
                <p className="text-ritzBgBlue font-urbanist text-4xl text-bold">
                  {purchaseDetails.movieName}
                </p>
              </div>

              <OrderInfoSection
                label="CINEMA"
                value={purchaseDetails.cinemaName}
              />
              <OrderInfoSection
                label="SESSION DATE & TIME"
                value={`${formatDate(purchaseDetails.sessionDate)}, ${
                  purchaseDetails.sessionTime
                }`}
              />
              <OrderInfoSection label="TICKETS" value={formattedTickets} />
              <OrderInfoSection label="SEATS" value="Unallocated" />
            </div>
          </div>
          <div className="text-lg my-3">
            <p>Thank you for your purchase!</p>
            <p>
              Your tickets has been confirmed and sent to your email:{" "}
              <strong>{purchaseDetails.userEmail}</strong>.
            </p>
            <p>We hope you enjoy the show!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmPage;
