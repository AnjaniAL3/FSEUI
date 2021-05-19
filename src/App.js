import './App.css';
import Content from './components/Content';
import {useEffect,useState} from 'react'
import axios from 'axios'
import AuthContext from './components/tweet/auth-context'

function App() {
  const [tags,setTags]=useState([])
  useEffect(()=>{
    
    sessionStorage.setItem("loggedInUser", "")
    sessionStorage.setItem("loggedInUserId", "")
    getTags()
  },[])

  const getTags=()=>{

    axios.get("http://localhost:3000/login/")
    .then(response=>{
      let tagsarr=[]
      response.data.map(p=>tagsarr.push(p.displayName))
      console.log(tags);
      setTags(tagsarr)

    },error=>{
        console.log(error);
    })
    return tags
  }
  
  return (
    <AuthContext.Provider value={{  tags:tags}}>
    <div className="app">
      
      <Content></Content>

    </div>
    </AuthContext.Provider>
  );
}

export default App;
