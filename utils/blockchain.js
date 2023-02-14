// create a function that will take in a wallet address and return a shortened version of it
const shortenAddress = (address, chars) => {
    if (address.length <= 10) return address;
	return `${address.slice(0, 2+chars)}...${address.slice(-chars)}`;
};

