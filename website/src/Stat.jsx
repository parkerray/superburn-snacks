import { useContractRead } from 'wagmi';

export default function Stat({number, label}) {

  return (
    <div className='stat'>
      <span className='big-number'>{number}</span>
      <span className='label'>{label}</span>
    </div>
  )
}