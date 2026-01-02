export const paystack = {
  initializeTransaction: async (
    email: string,
    amount: number,
    reference?: string
  ) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not defined");
      return { status: false, message: "Paystack key not configured" };
    }

    try {
      const payload: any = {
        email,
        amount, // Amount in kobo/cents
        callback_url: "http://localhost:3000/checkout/success", // Redirect here after payment
      };

      if (reference) {
        payload.reference = reference;
      }

      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Paystack API Error:", data);
        return { status: false, message: data.message || "Paystack error" };
      }

      return {
        status: true,
        data: data.data, // Contains authorization_url, access_code, reference
      };
    } catch (error) {
      console.error("Paystack Connection Error:", error);
      return { status: false, message: "Connection error" };
    }
  },

  verifyTransaction: async (reference: string) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return { status: false, message: "Paystack key not configured" };
    }

    try {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return { status: false, message: data.message };
      }

      return {
        status: true,
        data: data.data,
      };
    } catch (error) {
      return { status: false, message: "Connection error" };
    }
  },
};
