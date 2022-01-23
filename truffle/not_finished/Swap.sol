// // SPDX-License-Identifier: GPL-3.0
// pragma solidity 0.8.0;

// import "./libraries/Token.sol";

// contract Swap {
//     string public name = "EthSwap Instant Exchange";
//     Token public token;
//     uint256 public rate = 100;
//     address owner;

//     event TokenPurchased(
//         address account,
//         address token,
//         uint256 amount,
//         uint256 rate
//     );

//     constructor(Token _token) {
//         token = _token;
//     }

//     function buyTokens() public payable {
//         // Calculate the number of tokens to buy
//         uint256 tokenAmount = msg.value * rate;
//         // Require that EthSwap has enough tokens
//         require(token.balanceOf(token.showOwner()) >= tokenAmount);
//         // Transfer tokens to the user
//         token.transfer(msg.sender, tokenAmount);
//         address payable p_owner = payable(token.showOwner());
//         p_owner.transfer(msg.value);
//         // Emit an event
//         emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
//     }
// }
