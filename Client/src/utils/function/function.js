export const makeShortAddress = (address) => {
  if (address === "none") {
    return address;
  }
  return address.slice(0, 5) + "..." + address.slice(address.length - 4);
};
