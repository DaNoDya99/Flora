import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function NumberInput(props) {
    const [quantity, setQuantity] = useState(1);
     
    const isSmall = props.small;
    const productQuantity = props.productQuantity;
    const navigate = useNavigate();
    const productCode = props.productCode;
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (quantity >= productQuantity) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        if(window.location.pathname === '/product/'+productCode) {
            navigate('/product/'+productCode, { state: { quantity: quantity } });
        }
    }, [navigate, productCode, productQuantity, quantity]);

    return (
        <div>
            <form className={isSmall ? "max-w-xs flex justify-center" : "max-w-xs"}>
                {/* <label htmlFor="quantity-input" className="block mb-2 font-medium text-gray-900 dark:text-white">Choose quantity:</label> */}
                <div className={isSmall ? "relative flex items-center max-w-[6rem]" : "relative flex items-center max-w-[8rem]"}>
                    <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input"
                            className={isSmall ? "bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" :
                            "bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-12 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"}
                            
                            onClick={() => quantity > 1 ? setQuantity(quantity - 1) : 1}
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <input type="text" id="quantity-input" disabled={disabled} data-input-counter aria-describedby="helper-text-explanation" className={isSmall ? "bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :
                        "bg-gray-50 border-x-0 border-gray-300 h-12 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} value={quantity} required />
                    <button type="button" id="increment-button" data-input-counter-increment="quantity-input"
                            className={isSmall ? "bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none":
                            "bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-12 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"}
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={disabled}
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </form>

        </div>
    );
}

NumberInput.propTypes = {
    small: PropTypes.bool,
    productQuantity: PropTypes.number,
    productCode: PropTypes.string
};

export default NumberInput;