import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartContent from "./CartContent";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";

const CartSummary = ({ items }) => {
  const dispatch = useDispatch();

  const totalPrice =
    items.reduce((total, item) => {
      const price = item?.card?.card?.itemCards?.[0]?.card?.info?.price;
      return total + (price ? price : 0);
    }, 0) / 100;

  const handleCheckout = () => {
    toast.success("Checkout successful!");
    dispatch(clearCart());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <CreditCard className="w-6 h-6" />
          Order Summary
        </h3>

        <div className="space-y-4">
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => {
              const itemInfo = item?.card?.card?.itemCards?.[0]?.card?.info;
              return (
                <div
                  key={index}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium line-clamp-1">
                      {itemInfo?.name}
                    </p>
                    <p className="text-sm text-gray-500">Quantity: 1</p>
                  </div>
                  <span className="text-gray-900 font-semibold ml-4">
                    ₹
                    {itemInfo?.price
                      ? (itemInfo.price / 100).toFixed(2)
                      : "N/A"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
              <span>Total</span>
              <span>₹{(totalPrice + 40).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <CreditCard className="w-5 h-5" />
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const cartItems = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 ">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart{" "}
              <span className="text-orange-500">({cartItems.length})</span>
            </h2>
          </div>

          {cartItems.length > 0 && (
            <button
              className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
              onClick={handleClearCart}
            >
              <Trash2 className="w-5 h-5" />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item, index) => {
                  const itemInfo = item?.card?.card?.itemCards?.[0]?.card?.info;
                  return <CartContent key={index} itemInfo={itemInfo} />;
                })}
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
