
import { getAccessToken, startPayment } from "../actions";

export default async function Page() {
  await startPayment();

  return (
    <div>
      <div className="flex flex-col justify-center">
        <h1 className="text-center">Bkash Payment</h1>
      </div>
    </div>
  )
};