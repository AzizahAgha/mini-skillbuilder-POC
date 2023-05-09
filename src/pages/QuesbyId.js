import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";

// const fetchQuery=(quesId)=>{
//     return axios.get(`http://localhost:4000/answers/?quesId=1`)
   
// }

const fetchQuery=(id)=>{
    return axios.get(`http://localhost:4000/questions/${id}`)
   
}

export const addAns= (answers,id)=>{
    return axios.post('http://localhost:4000/questions/1',
    {id:'',question:'',answers:[answers]})

    
}

export const Questionbyid=()=>{
    const [visible,setVisible]=useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [answer,setTitle]=useState('');


    const UseAddAnswer= () =>{
        const queryClient=useQueryClient()
        return useMutation(addAns,{
            onSuccess:()=>{
                //refetch
                alert("data added successfully!")
               queryClient.invalidateQueries('answers')
            },
            onError:()=>{
                   alert("data not found")
                   setVisible(false)
            }
        })  
    }
    const {mutate}=UseAddAnswer()

    
    const addAnsOnClick=()=>{
        console.log({answer})
        const answers={answer}

        if(/^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(answer)){
           // alert("Error...pls enter the title")
            setSubmitted(true)
        }else{
            mutate(answers)
        onSuccess()
        
        setTimeout(() => {
            setVisible(false)
          }, 3000);
        }
       
    }
   


    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
        return <h1>error 404</h1>
    }

    

    // ========================================================================================
    const {id}=useParams();
    const {data} = useQuery(['answers',id],()=>fetchQuery(id))

    // const id=data?.data.quesIid

  
     console.log('dataaaaa',fetchQuery)

    
    //  const {quesId}=useParams();
    // const {data} = useQuery(['answers',quesId],()=>fetchQuery(quesId))

    // // const id=data?.data.quesIid

  
    //  console.log('dataaaaa',fetchQuery)


//    //==================================================================================================   
   return(
    <>
           
        <div className="left" key={id}>
          <h2>Question:</h2>
          <p className="question">{data?.data.question}</p> 
        </div>

        <br></br>

        <hr></hr>

        <div className='form-group'>
            <input className='int' type='text' placeholder='enter you answer' value={answer} onChange={(e)=>setTitle(e.target.value)} ></input>
            {submitted&& /^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(answer) ? <p className='error'>Pls enter your answer</p>:null }
            
            <button class="submit btn btn-success" onClick={addAnsOnClick}>Add</button>
        </div>

        <br></br>
{/* ----------------------------------------------------------------------------------------------------------------------- */}

         <table class="table table-bordered table-striped" >
                 <thead>
                     <tr>
                     <th>sn</th>
                     <th>Answers</th>
                     <th></th>
                   
                     
                     </tr>
                 </thead>
                  <tbody>
                  {/* <tr>
                    <td>{data?.data.id}</td>
                    <td>{data?.data.answer}</td>
                    <td>
                    <button className='delete btn  ml-3'  >Delete</button>
                    </td>
                 </tr> */}
                 

                           {/* {data?.data.map((ans,key)=>{
                     return(
                         <tr key={ans.id}>
                          
                           <td>{ans.answer}</td>
                         
                           <td>
     
                           <button className='delete btn  ml-3'  >Delete</button>
                          
                           
                           </td>
 
                         
                           </tr>
                     );
                  }
                        
                     
                     )}       */}

                     {data?.data.answers.map((ans,key)=>{
                     return(
                         <tr key={ans.id}>
                          
                           <td>{ans.answer}</td>
                         
                           <td>
     
                           <button className='delete btn  ml-3'  >Delete</button>
                          
                           
                           </td>
 
                         
                           </tr>
                     );
                  }
                        
                     
                     )}      
 
          
                  </tbody>
                       
                   
                                   
             </table>
    </>
   )
}