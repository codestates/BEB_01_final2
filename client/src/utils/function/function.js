export const makeShortAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(address.length - 4);
};
