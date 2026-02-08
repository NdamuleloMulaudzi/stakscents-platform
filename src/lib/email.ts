import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (
  email: string,
  customerName: string,
  orderId: string,
  total: number,
  items: any[]
) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not defined. Email not sent.");
    return { success: false, error: "Missing API Key" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Stakscents <onboarding@resend.dev>", 
      to: [email],
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Thank you for your order, ${customerName}!</h1>
          <p>We have received your order <strong>${orderId}</strong> and it is being processed.</p>
          
          <h2>Order Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: right;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product_name}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">R ${item.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">R ${total.toFixed(
                  2
                )}</td>
              </tr>
            </tfoot>
          </table>

          <p style="margin-top: 20px;">
            We will notify you once your order has been shipped.
          </p>
          
          <p>
            Best regards,<br>
            The Stakscents Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Sending Failed:", err);
    return { success: false, error: err };
  }
};
