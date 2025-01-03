import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const SendMoney = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg ring-4 ring-slate-200">
          <div className="flex justify-center pt-4">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="pb-6 pr-6 pl-6">
            <div className="flex justify-center items-center space-x-4 pb-10">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name && name.length > 0 && name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm flex justify-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async () => {
                  const res = await axios.post("http://172.28.224.30:4756/v1/account/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  // console.log(res.data.message);
                  navigate("/paymentstatus?message=" + res?.data.message);
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"> Send
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};