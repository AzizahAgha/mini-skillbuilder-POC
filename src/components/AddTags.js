import axios from "axios";
import { useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery ,useQueryClient} from 'react-query'
import { useParams } from 'react-router-dom'


const addPosts= async(tags,id)=>{
    return await axios.patch("http://localhost:4000/questions/1",{tags:[tags]})
}             

export const TagAdd=()=>{
    const [question,setQuestion]=useState('');
    const [submitted,setSubmitted]=useState(false);
    const [tags,setTags]=useState([]);
   
    const {id}=useParams()


    const queryClient=useQueryClient()
    const updatePost=useMutation(addPosts,{
        onSuccess:()=>{
            
               
               // queryClient.invalidateQueries('posts')
                queryClient.setQueryData('questions')
                 alert("Data has been updated succesfully!")
                 console.log('success')
                 setSubmitted(false)
                
       },
       onError:(context)=>{
        alert("ERROR:Data could not get updated!")
       }
      })
    
    
      const useMutateTodo =useMutation(addPosts, {
         // Notice the second argument is the variables object that the `mutate` function receives
         onSuccess: (data, variables) => {
           queryClient.setQueryData(['questions', { id: variables.id }], data)
             alert("Data has been updated succesfully!")
                console.log('sucess')
         },
       })
     
    


//     const addPostOnClick=(e)=>{
//         console.log({tags})
    
//         if (e.key === "Enter") {
//             if (e.target.value.length > 0) {
//             addPosts()
//             setTags([...tags, e.target.value]);
//             e.target.value = "";
//         } 
//     }
// }
   


    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        // setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
    }



    return(

        <div>
        
             <div className='form-group'>
            <input placeholder='+' value={tags} onChange={(event)=>{setTags(event.target.value)}} ></input>
            <button onClick={()=>updatePost.mutate({tags,id})}>add</button>
            
            <br></br>
            
        </div>
        </div>
         
    )
}