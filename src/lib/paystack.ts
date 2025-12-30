// Placeholder for Paystack client

export const paystack = {
  initializeTransaction: async (email: string, amount: number) => {
    return {
      status: true,
      message: "Authorization URL created",
      data: {
        authorization_url: "https://checkout.paystack.com/demo",
        access_code: "demo_code",
        reference: "demo_ref",
      },
    };
  },
};
