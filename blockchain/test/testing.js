const Ecommerce=artifacts.require('Ecommerce');
const assert=require('assert');

contract('Ecommerce',()=>{

    it("should should deploy contract",async ()=>{
        const instance = await Ecommerce.deployed();
        console.log("heyyy");
        assert(instance.address!=="");
    })
})