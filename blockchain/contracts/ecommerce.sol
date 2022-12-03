// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

contract Ecommerce {
    struct Product{
        string title;
        uint id;
        uint price;
        string desc;
        string img;
        address payable seller;
        address payable buyer; 
        bool delivered;   
    }
    uint counter=0;
    // mapping(address => uint[]) userProducts; 

    Product[] public products;

    function registerProduct(string memory title1, uint price1, string memory desc1, string memory img1) public {
        require(price1>0, "Price should not be zero ");
        
        Product memory item;
        item.title=title1;
        item.price=price1 * 1 ether;
        item.desc=desc1;
        item.seller=payable(msg.sender);
        item.id=counter;
        item.img=img1;
        counter++;
        products.push(item);
    }

    function buy(uint id1) payable public{
        require(products[id1].id<counter,"The id is not registerd");
        require(products[id1].price==msg.value,"Pay the exact ammount of price");
        require(products[id1].seller!=msg.sender,"seller cannot be buyer");
        products[id1].buyer=payable(msg.sender);
    }

    function delivery(uint id1) payable public{
        require(products[id1].buyer==msg.sender,"Only buyer can confirm the product");
        products[id1].delivered=true;
         products[id1].seller.transfer(products[id1].price);
    }

    function getBalance(address acc) public view returns (uint) {
    return acc.balance;
  }

    function getProducts() public view returns(Product[] memory) {
  return products;
}

}