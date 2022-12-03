import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ItemCard(props){
    console.log("cardddd",props);
    return(
        <div>
        <CardMedia
        component="img"
        height="120"
        image={props.imgURL}
        alt={props.title}
      />
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.desc}
        </Typography>
        <Typography variant="body2">
          {props.price} ETH
          <br />
        </Typography>
      </CardContent>

        </div>
    )
}

export default ItemCard;