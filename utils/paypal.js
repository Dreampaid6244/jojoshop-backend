import axios from 'axios';

export const verifyPaystackPayment = async (reference) => {
  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (data.status && data.data.status === 'success') {
      return { verified: true, amount: data.data.amount / 100 }; // return in Naira
    } else {
      return { verified: false };
    }
  } catch (err) {
    console.error('Paystack verification error:', err.message);
    return { verified: false };
  }
};
