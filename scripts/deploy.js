const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const contract = await Upload.deploy(); //instance of contract

  await contract.deployed(); //now contract get deployed on hardhat blockchain
  console.log("Address of contract", contract.address); //displaying address of contract
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});