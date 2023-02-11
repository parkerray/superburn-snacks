import { useState } from 'react'
import './App.css'
import Hero from './Hero'
import Stat from './Stat'
import Mint from './Mint'
import Links from './Links'
import Connect from './Connect'

import { useContractRead } from 'wagmi';

function App() {
  const [supply, setSupply] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  const { totalSupply } = useContractRead({
    address: '0x6a613a674963D6039A6a6AEaD6D97F8B5f127B17',
    abi: [
      {
        "inputs":[],
        "name":"totalSupply",
        "outputs":[
          {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
          }
        ],
        "stateMutability":"view",
        "type":"function"
      }
    ],
    functionName: 'totalSupply',
		onSuccess(totalSupply) {
			setSupply(parseInt(totalSupply._hex, 16));
		}
  })

  const { minutesRemaining } = useContractRead({
    address: '0x6a613a674963D6039A6a6AEaD6D97F8B5f127B17',
    abi: [
      {
        "inputs":[
          {
            "internalType":"uint256",
            "name":"end",
            "type":"uint256"
          }
        ],
        "name":"minutesRemaining",
        "outputs":[
          {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
          }
        ],
        "stateMutability":"view",
        "type":"function"
      }
    ],
    functionName: 'minutesRemaining',
    args: [1676246400],
		onSuccess(minutesRemaining) {
			setMinutesLeft(parseInt(minutesRemaining._hex, 16));
		}
  })

  return (
    <div className="App">
        <Connect />
        <div className='container'>
          <div className='inner-container'>
            <Hero />
            <div className='section'>
              <Stat number={supply} label='Minted' />
              <Stat number={minutesLeft} label='Minutes until we close' />
            </div>
            <div className='section'>
              <Mint />
            </div>
            <div className='section'>
              <Links />
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
