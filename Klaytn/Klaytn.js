// 이 부분은 만약 Klaytn을 사용하였다면 어떤 방식으로 코드를 작성하였는지 예시를 다루고 있는 부분 입니다.

// web3에서는 infura를 사용하여 특정 노드에 접근을 하였지만
// caver-js에서는 바로 baobab주소를 입력해 줌으로써 노드에 접근 가능합니다.
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651");

// 마찬가지로 새로운 Contract를 배포할때에는 new 키워드와 함께 사용합니다.
const CA = "CA값을 입력";
const Contract = new caver.klay.Contract("abi", CA);

// 만약 truffle를 사용한다면
const CA = "CA값을 입력";
const Klaytn_ABI = require("./build/contracts/컨트랙트 이름.json");
const Contract = new caver.klay.Contract(Klaytn_ABI, CA);
// 이런식으로 배포후에 나오는 json파일을 통해서 abi를 불러올수 있습니다.

// 만약 시스템이 동작함과 동시에 해당 컨트랙트를 배포하고 CA값을 가져오고 싶다면
const deploy = await new caver.klay.Contract("abi값");
const cpp_Test = await deploy.deploy({
  data: "bytecode값",
  arguments: ["컨트랙트에서 constructor 인자값, 없으면 넣지 않으면됨"],
});
await caver.klay
  .sendTransaction({
    from: account.address,
    gas: 1000000,
    data: cpp_Test.encodeABI(),
  })
  .then((ContractInstance) => {
    console.log(ContractInstance.contractAddress);
  });
// 이처럼 직접 node.js에서 배포를 한뒤에 해당 CA값을 가져올 수도 있습니다.
// 이후 해당 CA값을 통해서 컨트랙트에 접근할수도 있는 것이고요

// 이제 컨트랙트를 배포 하였다면 해당 컨트랙트를 통해서 네트워크와 소통이 가능해 집니다.

// 일단 caver를 사용할때에는 caver.wallet에 값을 넣어주어야 합니다.
const account = caver.klay.accounts.wallet.add("비밀키");
// 이러한 과정을 통해서 caver-js지갑에 계정이 추가가 되고 이후 이러한 계정은 sendTransaction에 사용 가능합니다.

// 그후 만약 minting하는 컨트랙트를 작성하고자 한다면
await caver.klay.sendTransaction({
  from: account.address,
  to: "컨트랙트 CA주소",
  gas: 10000,
  data: "contract.methods.mint(주소, 갯수).encodeABI()",
});
// 이런식으로 트랜잭션을 보내게 되면 문제없이 트랜잭션 전송이 가능합니다.

// 그럼 저희 프로젝트에서 캐릭터 부분을 만드는 코드를 적어보자면
const user = caver.klay.accounts.create();

await caver.klay
  .sendTransaction({
    from: account.address,
    to: "캐릭터 CA 주소",
    gas: 100000,
    data: "contract.methods.makeCharacter(user.address).encodeABI()",
  })
  .then(console.log);
// 이런식으로 작성을 하면 됩니다.

// Klaytn의 경우에는 wallet.add를 통해서 들어간 지갑은 따로 비밀키를 통해서 서명을 해주지 않아도 되기 떄문에
// 바로 sendTransaction을 통해서 트랜잭션을 실행시킬수 있습니다.

// 만약 지갑에 들어가 있지 않은 상태라면
// signTransaction, sendSignedTransaction을 통해서 트랜잭션을 전송해야 합니다.
await caver.klay
  .signTransaction(
    {
      from: "개인 공개키",
      to: "캐릭터 CA",
      gas: 100000,
      data: "contract.methods.makeCharacter(user.address).encodeABI()",
    },
    "비밀키"
  )
  .then((Tx) => {
    caver.klay.sendSignedTransaction(Tx.rawTransaction).then(console.log);
  });
