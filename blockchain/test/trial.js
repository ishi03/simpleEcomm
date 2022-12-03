const Ecommerce=artifacts.require('Ecommerce');
const assert=require('assert');
// const { it } = require('node:test');

contract('Ecommerce',(accounts)=>{
    const SELLER=accounts[5];
    const BUYER=accounts[6];


    it("should allow user to register products to sell and buy them",async ()=>{
        const instance = await Ecommerce.deployed();
        
        const sellerAcc1 = await instance.getBalance(SELLER);
        const buyerAcc1 = await instance.getBalance(BUYER);

        await instance.registerProduct('Book',2,'Good book',"www",{
            from:SELLER
        });

        await instance.registerProduct('Mug',3,'Good mug',"www",{
            from:SELLER
        });

        const prod=await instance.getProducts();

        console.log(prod);
        console.log(sellerAcc1);
        console.log(buyerAcc1);


        await instance.buy(0,{
            from:BUYER,
            value:2e18,
        });

        await instance.delivery(0,{
            from:BUYER
        });
        const sellerAcc2 = await instance.getBalance(SELLER);
        const buyerAcc2 = await instance.getBalance(BUYER);
        console.log(sellerAcc2);
        console.log(buyerAcc2);

        assert(sellerAcc2>sellerAcc1 && buyerAcc2<buyerAcc1);
    })
})