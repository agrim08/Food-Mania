import { useEffect } from "react";
import { MinusCircle } from "lucide-react";
import { ImageCdn } from "../data/ImageCdn";

const CartContent = ({ itemInfo }) => {
  useEffect(() => {
    if (!itemInfo) return;
  }, [itemInfo]);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        {itemInfo?.imageId && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${ImageCdn}${itemInfo?.imageId}`}
              alt={itemInfo?.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-red-50 transition-colors duration-200">
          <MinusCircle className="w-6 h-6 text-red-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[3.5rem]">
          {itemInfo?.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Price</span>
            <span className="text-lg font-bold text-green-600">
              ₹{itemInfo?.price ? (itemInfo?.price / 100).toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              In Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
