  import React,{useContext, useRef, useEffect, useState} from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { UserContext } from '../App';
  import M from 'materialize-css';
 import { baseUrl } from '../Urls';

  const NavBar = () =>{
    const searchModal = useRef(null)
    const [search, setSearch] = useState('');
    const [userDetails, setuserDetails] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
     useEffect(()=>{
        M.Modal.init(searchModal.current);
     },[])
    const renderList = () =>{
      if(state){
          return [
            <li key="searchicon"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}} >search</i></li>,
            <li key="profile"><Link to="/profile">Profile</Link></li>,
            <li key="create"><Link to="/create">Create Post</Link></li>,
            <li key="myfollowingpost"><Link to="/myfollowingpost">My following Posts </Link></li>,
            <li key="logout">
              <button className="btn #c62828 red darken-3"
                onClick={()=>{
                  localStorage.clear();
                  dispatch({type:"CLEAR"})
                  // history.push('/signin')
                  navigate('/signin')
                }}
                >
                Logout
              </button>
            </li>
          ]
      }else{
        return[
          <li key="signin"><Link to="/signin">Signin</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
        ]
      }
    }

      const fetchUsers = (query) =>{
          setSearch(query)
          fetch(`${baseUrl}/search-users`,{
            method:'post',
            headers:{
              "Content-type":"application/json"
            },
            body: JSON.stringify({
              query
            })
          }).then(res=>res.json())
          .then(results=>{
            setuserDetails(results.user)
          })
      }
      return(
          <nav>
          <div className="nav-wrapper white">
            <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right">
            {renderList()}
            </ul>
          </div>
          <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
          <div className="modal-content">
            <input 
            type='text' 
            placeholder='search users' 
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul className="collection">
            {userDetails.map(item=>{
              return <Link to={item._id !== state._id ?"/profile/" + item._id : '/profile'} onClick={()=>{
                M.Modal.getInstance(searchModal.current).close()
                setSearch('')
              }}><li key='tina' className="collection-item" style={{ color: "black" }}>{item.email}</li></Link>
            })}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
          </div>
        </div>
        </nav>
      );
  }
  export default NavBar;