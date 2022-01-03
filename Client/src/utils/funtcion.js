export const shortenAddress = (address) => {
  const answer =
    address[0].slice(0, 5) + "..." + address[0].slice(address.length - 4);

  return answer;
};
