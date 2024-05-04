export interface orderType {
  _id: string;
  userId: string;
  productId: string;
  status: "Pending" | "Done";
  paymentId: string;
}
