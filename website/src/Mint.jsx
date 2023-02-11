import { useState } from "react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import { ethers, BigNumber } from 'ethers';
import { useWeb3Modal } from '@web3modal/react';

export default function Mint() {

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const { priceData } = useContractRead({
    address: '0x6a613a674963D6039A6a6AEaD6D97F8B5f127B17',
    abi: [{
      "inputs":[
        {
          "internalType":"uint256",
          "name":"quantity",
          "type":"uint256"
        }
      ],
      "name":"getPrice",
      "outputs":[
        {
          "internalType":"uint256",
          "name":"",
          "type":"uint256"
        }
      ],
      "stateMutability":"view",
      "type":"function"
    }],
    functionName: 'getPrice',
    args: [quantity],
		onSuccess(priceData) {
			setPrice(parseInt(priceData._hex, 16));
		}
  })

  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
	  address: '0x6a613a674963D6039A6a6AEaD6D97F8B5f127B17',
		abi: [
      {
        "inputs":[
          {
            "internalType":"uint256",
            "name":"quantity",
            "type":"uint256"
          }
        ],
        "name":"mint",
        "outputs":[],
        "stateMutability":"payable",
        "type":"function"
      },
    ],
		functionName: 'mint',
		args: [quantity],
    overrides: {
      from: address,
      value: BigNumber.from(price.toString()),
    },
	})

  const { data, error, isError, write } = useContractWrite({
    ...config,
    onSuccess() {
      setShowForm(false);
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleChange = (event) => {
    if (event.target.value > 0) {
      setQuantity(parseInt(event.target.value));
    } else {
      setQuantity(0);
    }
  }

  const increaseQuantity = () => {
    if (quantity >= 0 && quantity < 20) {
      setQuantity(quantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const mint = () => {
    if (isConnected) {
      write();
    } else {
      open();
    }
  }

  return (
    <div className='mint-form'>
      {showForm && (<>
        <h2>Stock up</h2>
        <div className='input-wrapper'>
          <span 
            className='qty-toggle'
            onClick={decreaseQuantity}
          >-</span>
          <input 
            placeholder='Qty'
            value={quantity}
            onChange={handleChange}
          ></input>
          <span 
            className='qty-toggle'
            onClick={increaseQuantity}
          >+</span>
        </div>
      </>)}
      <button
        className='mint-button'
        disabled={isLoading || isError || isSuccess}
        onClick={(quantity > 0 && quantity < 21) ? mint : null}
      >
        {isLoading ? 'Minting...' : isSuccess ? 'Success!' : (isConnected && quantity > 0 && quantity < 21) ?
        `Mint Ξ${ethers.utils.formatEther(price.toString())}` : `Enter a value of 1-20`}
        {/* {quantity > 0 && quantity < 21 ?
        `Mint Ξ${ethers.utils.formatEther(price.toString())}` : `Enter a value of 1-20`} */}
      </button>
    </div>
  )
}