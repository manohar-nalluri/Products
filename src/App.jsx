import StateView from './components/StateView';
import { rules } from './utils/AddRules'; 
import { products } from './utils/updateImage';
function App() {
  const stateList=[{id:1,productRules:rules[0],variants:[
    products[0],
    products[1],
    null
  ]},
  {id:2,productRules:rules[1],variants:[
    products[8],
    products[11],
    products[4],
  ]},
  {id:3,productRules:rules[2],variants:[
    products[3],
    products[6],
    null
  ]},
  {id:4,productRules:rules[3],variants:[
    products[2],
    products[10],
    products[3],
  ]}]
 return <>
    <h2>Rules Creation </h2>
    <div className='w-screen mt-8 justify-center items-center'>
    <StateView state={stateList}/>
    </div>
  </> 
}

export default App
