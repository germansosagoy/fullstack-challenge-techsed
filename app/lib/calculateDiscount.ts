//función para calcular el descuento
export const calculateDiscount = (price: number, listingPrice: number) => {
  return Math.round(((listingPrice - price) / listingPrice) * 100);
};
