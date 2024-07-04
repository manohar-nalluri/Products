import { useEffect  } from 'react'
import useToast from './hooks/useToast'
import StateView from './components/StateView';

function App() {
  const stateList=[{id:1,productRules:"some thing 1st",variants:[
    {img:'1.png',name:"single image Buy 1 Get 1"},
    {img:'5.png',name:"3 images discount 50"},
    null
  ]},
  {id:2,productRules:"some thing 2nd",variants:[
    {img:'8.png',name:"Buy 1 Get 1"},
    {img:'11.png',name:"trendy fits"},
    {img:'4.png',name:"single image Clearnce sale"},
  ]},
  {id:3,productRules:"some thing 3nd",variants:[
    {img:'3.png',name:"multi img Baby Product sale"},
    {img:'6.png',name:"2 images fast selling segment"},
    null
  ]},
  {id:4,productRules:"some thing 4nd",variants:[
    {img:'2.png',name:"single image Buy 2 Get 1"},
    {img:'10.png',name:"fast growing segment"},
    {img:'3.png',name:"multi img Baby Product sale"},
  ]}]
  const [toastComp,triggerToast]=useToast('center')
  useEffect(()=>{
  },[])
 return <>
    <h2>Rules Creation </h2>
    <div className='w-screen mt-8 justify-center items-center'>
    <StateView state={stateList}/>
    </div>
  </> 
}

export default App
