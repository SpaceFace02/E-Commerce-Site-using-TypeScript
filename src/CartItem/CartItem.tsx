import { Button } from "@material-ui/core";
// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./CartItemStyle";

// Props, then a Functional Component, then export it. Simple.

type Props = {
  cartItem: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

//  The FC takes in props, specify it in the <>(angle brackets). Then destructure the props. addToCart and removeFromCart basically control the addition and subtraction of the amount of items.
const CartItem: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h4>{cartItem.title}</h4>
      <div className="information">
        <p>Price: ${cartItem.price}</p>
        {/* toFixed is a method on a Number instance. */}
        <p>Total: ${(cartItem.amount * cartItem.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        {/* contained variant has a background in the button */}
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(cartItem.id)}
        >
          -
        </Button>
        <p>{cartItem.amount} </p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(cartItem)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={cartItem.image} alt={cartItem.title}></img>
  </Wrapper>
);

export default CartItem;
