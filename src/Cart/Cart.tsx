import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./cart.styles";
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

// This is a TypeScrip Generic. FC is Functional Component. Explicit return, so curly brackets.
const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  let total = 0;

  //    We could also use reduce, ack must be 0 initially, return ack after adding all elements.
  const calculateTotal = (items: CartItemType[]) => {
    items.map((item) => (total = item.amount * item.price + total));
    return total;
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {/* Remember, the map/reduce function uses parenthesis to return. mapping through items, set a key */}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          cartItem={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
