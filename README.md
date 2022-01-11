수정된 코드는 `NFT.sol`, `Token.sol` 부분 입니다.

`Token`같은 경우에는 아까 통화하신것과 같이 수정을 해두었고

mintGold, transfer 이부분만 활용할꺼 같네요

`NFT`부분은 살짝 코드가 어떻게 이루어 지는지 보다보니 조금 늦었네요

실질적으로 사용하는 함수는 mintNFT, getNFT_address, nftTransferFrom 부분이 될꺼 같아요

mintNFT부분은 말 그대로 NFT를 만들어 내는 부분이고 

getNFT_address 함수는 해당 address에 어떤 NFT들이 있는지 확인하는 함수 입니다.
- MyPage부분에 NFT들을 나열할떄 필요할꺼 같다고 생각을 하여 추가 하였습니다.

nftTransferFrom부분은 원래는  `_isApprovedOrOwner(msg.sender, tokenId),` 이런식으로 구성이 되어 있었는데

저는 msg.sender대신 from으로 바꾸어 줌으로써 return 할떄에 `spender == owner` 조건에서 true가 나오게 설정해 주었습니다.

테스트 같은 경우에는 remix에서 원활하게 작동이 되고

배포 계정에는 NFT를 만들 이유가 없기 떄문에 테스트 할시에 배포 계정에는 NFT를 만들지 않고 테스트를 진행하시면 될꺼 같아요

이제 캐릭터 부분 솔리디티 코드를 작성해 볼까 하는데

형기님이 크립토 좀비 같은 캐릭터 부분을 생각하셨다고 하니 저희가 구현할수 있는 내용한에서 최대한 작성해 보고 결과 공유해 드리도록 할게요~~~
- 아마 keccak인가?? 이거 사용해서 캐릭터의 pow를 랜덤으로 증가시키는?? 방향으로 생각중입니다.
