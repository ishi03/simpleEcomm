import React,{useState,useEffect} from "react";
import { ethers } from 'ethers';
import Card from '@mui/material/Card';
import ItemCard from "./ItemCard";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

function Home(props){

    console.log("from home:",props);
    const [products, setProducts]=useState([]);

    useEffect(() => {
        const getItemList = async () => {
          const response = await props.getItems();
        //   const resopnseJson = await resopnse.json();
          console.log("not json", response);
          setProducts(response);
        };
        getItemList();
      }, []);

    function goodID(id){
        return ethers.utils.formatEther(id) * 10e17;
    }
    function goodPrice(price){
        return ethers.utils.formatEther(price);
    }
    function onBuy(id,price){
        console.log(id,price);
        props.buy(id,price);
    }

    return (
    <div>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom:30, marginLeft:10}}>
        {products.map(item => {
            return (
            <div style={{flex:1}} >
                <div style={{marginTop:2}}>
            <Card sx={{ width: 200 }}>
            <ItemCard
                  key={goodID(item.id)}
                  id={goodID(item.id)}
                  title={item.title}
                  desc={item.desc}
                  price={goodPrice(item.price)}
                  imgURL={item.img}
                />
            <CardActions>
                <Button size="small" onClick={()=>{
                    onBuy(goodID(item.id),goodPrice(item.price));
                }}>Buy</Button>
            </CardActions>
            </Card>
            </div>
                {/* <div>{ethers.utils.formatEther( item.id ) * 10e17} {item.title} {item.desc} {ethers.utils.formatEther( item.price )}</div> */}
              </div>
              );
        })}
    </div>
    </div>
    )
}

export default Home;
