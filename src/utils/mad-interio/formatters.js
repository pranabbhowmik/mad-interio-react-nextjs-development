const formatPrice = (num) => {
  if (num >= 10000000)
    return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr"; // Crores
  if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L"; // Lakhs
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands
  return num;
};

export default formatPrice;
