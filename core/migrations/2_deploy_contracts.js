const Factory = artifacts.require("UniswapV2Factory.sol");
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async function (deployer, network, addresses) {
    await deployer.deploy(Factory, addresses[0]); //Dağıtım için işlemi gönderdik.
    const factory = await Factory.deployed(); //işlemi bekledi ve artık referansımız var. 

    let token1Address, token2Address;
    if(network === 'mainnet'){
        token1Address = '';
        token2Address = '';
    } else { //ganache veya başka bir test ağındaysak
        await deployer.deploy(Token1);
        await deployer.deploy(Token2);
        const token1 = await Token1.deployed();
        const token2 = await Token2.deployed();
        token1Address = token1.address;
        token2Address = token2.address;
    }

    await factory.createPair(token1Address, token2Address);
};
