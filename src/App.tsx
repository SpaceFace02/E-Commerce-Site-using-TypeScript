import { useState } from "react";
import { useQuery } from "react-query";

// Components
import Item from "./Item/item";
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "./App.styles";
import Cart from "./Cart/Cart";

// Types, i.e a structure. Static typed language, so declare all that you expect.
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  // This amount is our own created type.
  amount: number;
};

//  Generic type, hence we specify the type in Promise<>.
const fetchData = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products/")).json();

const App = () => {
  // Cart States
  const [isCartOpen, setCartOpen] = useState(false);
  //  Cart is a state, keeps changing. Static typed, hence we need to specify the type.
  const [cartItems, setCartItems] = useState<Array<CartItemType>>([]); // This works error-free
  //   const [cartItems, setCartItems] = useState([] as CartItemType[]); // This also works

  // This syntax is from docs of useQuery to fetch Data in react seamlessly.
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    fetchData
  );

  //   Implicit return, you colu have curly brackets and then return. However this is a arrow function, so one line arrow function is possible. The accumulator is initialized with 0. Reduce goes through each item and its amount.
  const getTotalItems = (cartItems: CartItemType[]) =>
    cartItems.reduce(
      (accumulator: number, item) => accumulator + item.amount,
      0
    );

  // clickedItem is of the type CartItemType. It will only accept this type.
  const handleAddToCart = (clickedItem: CartItemType) => {
    //   prev is the previous state.
    setCartItems((prev) => {
      //   1. Is the item already in the cart. If yes, increment amount by 1.
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      // map thru all and update the amount of that item, leaving all the same. Hence use the spread operator, also there's the pass by reference BS for an object of item.
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //   2. Otherwise add the item for the first time, and set amount to 1. All elements of the prev array. Also all fields of the clickedItem like name, title etc, just change the amount.
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems((prev) =>
      prev.reduce((accumulator, item) => {
        if (item.id === itemId) {
          //   Remove this item from the array, return the previous accumulated values, except that current value. Skip the current item.
          if (item.amount === 1) return [...accumulator];
          //   Else, return the previous accumulated values, along with the spread out items with the amount decreased by 1.
          return [...accumulator, { ...item, amount: item.amount - 1 }];
        } else {
          //   We spread out the accumulator and return the item as it is.
          return [...accumulator, item];
        }
      }, [] as CartItemType[])
    );
  };
  //   In the above function, we have to specify the starting value of the accumulator as an empty array.

  if (isLoading) return <LinearProgress />;

  if (error) return <div>Something went wrong</div>;

  console.log(data);
  return (
    <Wrapper>
      {/* When closed, cartState is changed, also all these props are from the docs. */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        {/* The red icon on top stating the number of items in the cart. */}
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart style={{ width: "22px" }} />
        </Badge>
      </StyledButton>

      {/* Spacing out all grid items, in a grid container. */}
      <Grid container spacing={3}>
        {/* We use question mark due to null safety. TS will nag us if data is undefined as its static typed like dart(null safety). We return JSX only, hence implicit return, round brackets. */}
        {data?.map((item) => (
          //   While mapping, you need a key. xs and sm are breaking points for responsivness.
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
