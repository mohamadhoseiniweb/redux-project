import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../services/productService";
import { remove } from "../../redux/slices/productModalSlice";
import { useDispatch } from "react-redux";
import { getStrapiImage } from "../../lib/media";
import numberWithCommas from "../../utils/numberWithCommas";
import { addItem } from "../../redux/slices/cartSlice";
import classNames from 'classnames'
import { successMessage } from "../../utils/notification";

const ProductViewModal = () => {
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.productModal.value);
  const [product, setProduct] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const getProductInfo = async () => {
      if (productId) {
        const { id, attributes } = await getProductById(productId);
        setProduct({ ...attributes, id });
        const { colors } = attributes;
        const product = {
          name: attributes.name,
          image: getStrapiImage(attributes.image.data, "small"),
          productId,
        };
        if (colors.length !== 0)
          setSelectedProduct({
            ...product,
            colorCode:colors[0].color.data.attributes.code,
            colorId: colors[0].color.data.id,
            price: colors[0].price,
          });
        else
          setSelectedProduct({
            ...product,
            colorId: null,colorCode:null,
            price: attributes.price,
          });

        setQuantity(1);
      } else setProduct(undefined);
    };

    getProductInfo();
  }, [productId]);

  const updateQuantity = (type) => {
    if (type === "plus") setQuantity(quantity + 1);
    else setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handleAddToCart=()=>{
    dispatch(addItem({ ...selectedProduct, quantity }))
    setIsAdded(true)
    successMessage('محصول به سبد خرید اضافه شد')
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  }

  return product ? (
    <div
      id="modal"
      tabindex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative mx-auto pt-20 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              اطلاعات محصول
            </h3>
            <button
              onClick={() => dispatch(remove())}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex">
              <div className="md:w-1/2 w-full">
                <h1 className="text-2xl mb-5 font-semibold">{product.name}</h1>

                <div className="text-xl mb-3">رنگ بندی</div>
                <div className="flex mb-5">
                  {product.colors.map(({ id, price, color }) => (
                    <div
                      key={id}
                      className={`ml-2 w-12 h-12 flex items-center justify-center rounded-full border cursor-pointer ${
                        selectedProduct.colorId === color.data.id
                          ? "border-sky-600"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedProduct({
                          ...selectedProduct,
                          colorId: color.data.id,
                          colorCode:color.data.attributes.code,
                          price,
                        })
                      }
                    >
                      <div
                        className="p-4 shadow-sm w-9 h-9 rounded-full"
                        style={{ backgroundColor: color.data.attributes.code }}
                      ></div>
                      {color.data.attributes.id}
                    </div>
                  ))}
                </div>

                <div className="text-xl mb-5">
                  قیمت : {numberWithCommas(selectedProduct.price)}
                </div>
                <div className="inline-block mb-5">
                  <span className="num-block input-spinner">
                    <span className="num-in">
                      <span
                        className="minus dis"
                        onClick={() => updateQuantity("minus")}
                      ></span>
                      <input type="text" className="in-num" value={quantity} />
                      <span
                        className="plus"
                        onClick={() => updateQuantity("plus")}
                      ></span>
                    </span>
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={classNames(
                      "bg-yellow-400 py-2 px-3 rounded hover:bg-gray-300",
                      !isAdded ? "" : "bg-green-500"
                    )}
                    type="button"
                  >
                      {!isAdded ? "افزودن به سبد خرید" : "✔ اضافه شد"}
                  </button>
                  <button
                    onClick={() => dispatch(remove())}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white mr-2 py-2 px-3 rounded bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    انصراف
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 w-full">
                <img src={getStrapiImage(product.image.data, "large")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ProductViewModal;
