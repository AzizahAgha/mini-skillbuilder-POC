import React from "react";
import { useMutation, useQuery ,useQueryClient} from 'react-query'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionAdd } from "./QuestionAdd";
import Tags from "../components/tags";
import { TagAdd } from "../components/AddTags";

const fetchQuestions=()=>{
    return axios.get(' http://localhost:4000/questions')
}

const successMessage={
    color: "#270",
  backgroundColor:" #DFF2BF",
   margin: "10px 0",
   padding: "10px",
   borderRadius: "3px 3px 3px 3px",
  }


export const QuestionList=()=>{

    const [visible,setVisible]=useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [body,setBody]=useState('');
    const [tags, setTags] = useState('');


    const addTag=(e)=>{
        console.log({tags})
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                axios.post(' http://localhost:4000/questions', {
                  id:'', question:'',answer:[], tags:[tags]
               })
              setTags([...tags, e.target.value]);
              e.target.value = "";
              
            onSuccess()
        
            }
          }
        };

        const addPost = async (e) => {
          
            const post = { title: tags };
            const errors={};
           
    
            if (e.key === "Enter") {
                if (e.target.value.length > 0) {
                axios.post(' http://localhost:4000/questions', {
                    tags
               })
              
             
               setTags([post, ...tags]);
               
            }
           
          };  
        }  

    const removeTag = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
    }


    const {isLoading,isError,error,data,isFetching,refetch} = useQuery(
        'questions',
        fetchQuestions,
        { 
            onError,  
        }
        )

    
        if (isLoading) {
            return <h2>Loading...</h2>
          }
        
          if(isError){
              return <h2>{error.message}</h2>
          }

         
   
  
    return(
        <div class="wrap">

        <div class="d-flex justify-content-evenly wrap">
        <button class="btn btn-secondary filter">filter</button>
        <QuestionAdd></QuestionAdd>
        </div>
        <br></br>
        {/* <br></br>

        {visible ?<div style={successMessage}>Data has been added Successfully!</div>:null}
        <hr></hr>

        <div className='form-group'>
            <input className='int' type='text' placeholder='Enter the body' value={body} onChange={(e)=>setBody(e.target.value)} ></input>
            {submitted && /^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(body)? <p className='error'>Pls enter title</p>:null }
            <br></br>
            <button class="btn btn-success" onClick={addPostOnClick}>Add</button>
        </div>
        <br></br> */}
        <table class="table table-bordered  align-middle" >
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Question</th>
                    <th>Add Answer</th>
                  
                    
                    </tr>
                </thead>
                 <tbody>
                 {data?.data.map((ques,id)=>{
                    return(
                        <tr key={id}>
                          <td>{ques.id}</td>
                          <td>
                            {/* <div class="container">
                             <div class="row">
                                <div class="col">
                                {ques.question}
                                </div>
                             </div>
                             <div class="row">
                                <div class="col">
                                   <p>tag</p>
                                </div>
                             </div>
                            </div> */}
                            <div>
                            {ques.question}
                            </div>
                            <div className="m">
                            <div 
                            //className="wrapper"
                            >
                            {/* <p>Tags</p> */}
                            {/* <TagAdd></TagAdd> */}
                            <Tags></Tags>
                            {/* <div className="tag-container">
                            <div key={id} className="tag">
                               {ques.tags} <span onClick={() => removeTag(ques.tags)}>x</span>
                            </div>
                           <input onKeyDown={addTag} placeholder="+" value={tags} onChange={(event)=>{setTags(event.target.value)}}/>
                           </div> */}
                            
                            </div>
                              
                            </div>
                          </td>
                          <td>
                            <Link className="btn btn-primary mr-3" to={`/question/${ques.id}`}>Add Answer</Link>
                          </td>
                        
                          </tr>
                    );
                 }
                       
                    
                    )}      
                 </tbody>
                      
                  
                                  
            </table>
        </div>
    )
}


