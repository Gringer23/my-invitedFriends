import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей:

function App() {
const [users, setUsers]= React.useState([]);
const[invites, setInvites] = React.useState([]);
const [isLoading, setLoading]= React.useState(true);
const [searchValue, setSearchValue]= React.useState('');
const [success, setSuccess]= React.useState(false);
React.useEffect(()=>{
  fetch('https://reqres.in/api/users').then(res=>res.json()).then(json=>{
setUsers(json.data);
  })
  .catch(err=>{
    console.warn(err);
    alert("Ошибка в получении пользователя");
  })
  .finally(()=>setLoading(false));
},[]);
const onChangeSearhValue = (event)=>{
  setSearchValue(event.target.value);
}

const onClickInvite = (id)=>{
  if(invites.includes(id)){
    setInvites(prev=>prev.filter(_id=> _id!==id));
  } else{
    setInvites(prev=>[...prev, id]);
  }
}


const onClickSendInvite=()=>{
  setSuccess(true);

}

  return (
    <div className="App">
      {
        success ? (<Success count={invites.length}/>):
      
      (
      
      <Users 
      onChangeSearhValue={onChangeSearhValue} 
      searchValue={searchValue}
      items={users} 
      isLoading={isLoading}
      invites={invites}
      onClickInvite={onClickInvite}
      onClickSendInvite={onClickSendInvite}/>
    )}</div>
  );
}

export default App;
