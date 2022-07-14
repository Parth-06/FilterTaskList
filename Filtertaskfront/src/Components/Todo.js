import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {useLatest, useUpdateEffect} from 'react-use'
import {UserContext } from "../App"
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';


const Todo = () => {
   
    const [userInput, setUserInput] = useState("");
 
    const [toggle, setToggle] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [dbdata, setDbdata] = useState([]);
    const {state, dispatch} = useContext(UserContext)
   
    const navigate = useNavigate();

    const checked = false;
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("/userdata", {
                    method: "GET",
                    headers: {
    
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
    
                });
                const fdata = await res.json();
    
                setDbdata(fdata) 
             
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    });

  
    const addItem = async () => {
        if (!userInput) {
    
            toast.warn("Please write someting in the textbox")

        } else if (userInput && !toggle) {
           
                dbdata.map(async(item) => {

                    if (item.id === isEditItem) {
                        toast.info("Item Edited")
                        return { ...item, name: userInput }
                    }
                    const res = await fetch('/edit',{
                        method: "POST",
                        headers:{
                          "Content-Type" : "application/json"
                        },
                        body:JSON.stringify({
                        userInput, isEditItem
                           })
                    
                      });
                    
                   
                })
             setToggle(true);
            setUserInput('')
            setIsEditItem(null)
        }

        else {
            const allUserInput = { id: new Date().getTime().toString(), name: userInput, check: checked }
 
            setUserInput("");
          
          
            const res = await fetch('/todo',{
                method: "POST",
                headers:{
                  "Content-Type" : "application/json"
                },

                body:JSON.stringify({
                 allUserInput
                })
              });

              const data = await res.json();
              if (res.status === 422 || !data){

                console.log("invalid")
              }else{
                toast.success("Added to the List")
               
              } 
              
        }
      
    }


    const deleteItem = (index) => {
       
        const newItem = dbdata.filter(async(item) => {
      
        if(index === item.id){
           
            const res = await fetch('/deleteone',{
                method: "POST",
                headers:{
                  "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                index
                   })
            
              });
        }
            

        })
        toast.error("Item Deleted")
       
    }


    const editItem = (id) => {
     
        let editedItem = dbdata.find((item) => {
            return (
                item.id === id
            )
        })
        setToggle(false);
        setUserInput(editedItem.name)
        setIsEditItem(id)
    }

    const removeList = async() => {
        toast.error("Deleted All")
        const res = await fetch('/deleteall',{
                method: "POST",
                headers:{
                  "Content-Type" : "application/json"
                },
              });
    }

    const checkbox = async(index, check) => {

        const newItem = dbdata.filter(async(item) => {
           
            if(index === item.id){
                
                const res = await fetch('/check',{
                    method: "POST",
                    headers:{
                      "Content-Type" : "application/json"
                    },
                    body:JSON.stringify({
                    index, check
                       })
                  });
            } })}
   

    useEffect(() => {
        const callmainpage = async () => {
            try {
                const res = await fetch("/todo", {
                    method: "GET",
                    headers: {
    
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    credentials: "include"
                });
                dispatch({type:"USER", payload:true})
                const data = await res.json();
                if (!res.status === 200) {

                    const error = new Error(res.error);
                    throw error;
                }
            } catch (err) {
               
                toast.success("Please Login For Better Experience")
                navigate("/login");
                dispatch({type:"USER", payload:false})
            }
        }
        callmainpage()
    });


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("/userdata", {
                    method: "GET",
                    headers: {
    
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
    
                });
                const fdata = await res.json();
    
                setDbdata(fdata) 
             
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    },[]);
  

 
    return (

        <div className='Main'>
            <div className="inside_main">
                <figure>

                    <figcaption>ADD IN THE LIST</figcaption>
                    
                </figure>

                <div className="listsec">
                    <input type="text" placeholder='Add your Items' id="inputtext" maxLength="25" value={userInput} onChange={(e) => { setUserInput(e.target.value) }} name="name" autoComplete="off"/>
                    {
                        toggle ? <i className="fas fa-plus" title="Add Items" onClick={addItem}></i> : <i className="fas fa-edit" title="Edit Items" onClick={addItem} autoComplete="off"></i>
                    }

                </div>

                {
                    dbdata.map((item) => {
                        
                        return (
                            <div className="show_list" key={item.id}>
                                <div className="para">
                                    <p name="itemname">{item.name }</p></div>
                                <div>
                                    <i className="far fa-trash-alt" title="Delete Items" onClick={() => deleteItem(item.id)}></i></div>
                                <div>
                                    <i className="fas fa-edit" title="Edit Items" onClick={() => editItem(item.id)}></i></div>
                                <input
                                    type="checkbox"
                                    title='Task Done'
                                    checked={item.check}
                                    key={item.id}
                                    onChange={() => checkbox(item.id, item.check,item.name )}
                                    id="in_checkbox"
                                />

                            </div>
                        );
                    })
                }

                <div className="remove">
                    <button onClick={removeList}>Remove All</button>
                </div>
            </div>
            <div className="instrut">

                <figure>
                    <figcaption>How to Use</figcaption></figure>
                <div className="how_to">
                    <p> 1. Enter the name of your task in the "Add your Items" text box and click on the <i className="fas fa-plus"></i> button to add the task in the list.</p>
                    <p>2. To edit the exsiting task click on the <i className="fas fa-edit"></i> button and edit the task and save it using update button.</p>
                    <p>3. To delete any task from the list click on the  <i className="far fa-trash-alt"></i> button.</p>
                    <p>4. To remove all task at once click on the  <button >Remove All</button> to remove all the task list.</p>

                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    )
}

export default Todo