import { Button } from "@material-ui/core";
// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./item.styles";
import React from "react";

// Strongly Types, typed at compile time, not at runtime like Javascript

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

//  Item is a functional component. The Functional Component takes in item and a function, so declare it first as its a static typed language.
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>Price: ${item.price}</h3>
    </div>
    {/* Adds item to cart. We don't want to call the function everytime the button loads. Only when its clicked, so we pass a callback. */}
    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
  </Wrapper>
);

export default Item;
