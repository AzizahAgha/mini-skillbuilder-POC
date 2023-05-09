import axios from "axios";
import { useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery ,useQueryClient} from 'react-query'
import { Post } from "../components/Post";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const addPosts= async()=>{
    return await axios.post(" http://localhost:4000/questions",{id:'',question:'',tags:[],answers:[]}
    )
}             

export const QuestionAdd=()=>{
    const [question,setQuestion]=useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [tags,setTags]=useState(''); 
    const Close = <CloseIcon />;
    

    const handleQuill = (value) => {
      setQuestion(value);
    };

    const UseAddPost= () =>{
        const queryClient=useQueryClient()
        return useMutation(addPosts,{
            onSuccess:()=>{
                //refetch
               queryClient.invalidateQueries('questions')
               
            },
            onError:()=>{
                   alert("data not found")
                //    setVisible(false)
            }
        })
        
    }

    const {mutate}=UseAddPost()


    const addPostOnClick=()=>{
        // console.log({question,tags})
        // const post={question,tags:[tags]}
        console.log({question})
        const post={question}
        if(/^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(question)){
             setSubmitted(true)
        }else{
            mutate(post)
            onSuccess()
            
           
            setTimeout(() => {
            // setVisible(false)
            }, 3000);
        } 
    }
   


    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        alert("Question added succesfully");
        setIsModalOpen(false);
        // setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
    }



    // const onSubmitHandler=(event)=>{
    //     event.preventDefault();
    //     console.log(question)
    //     if(/^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(question)){
    //         setSubmitted(true)
        
    //     }else{
    //         axios.post(" http://localhost:4000/questions",{
    //         question
    //     }).then(()=>{
    //         setQuestion("")
    //         console.log("post created")
    //         setSubmitted(false)
    //     }).catch(()=>{
    //         console.log("error")
    //     })
    //     }
        
    // }
    return(


        <div>
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Question
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Question :</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
             <div className='form-group'>
            <input className='form-control' type='text' placeholder='Enter a question' value={question} onChange={(event)=>{setQuestion(event.target.value)}} ></input>
            {submitted && /^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(question)? <p className='error'>Pls enter a question</p>:null }
            <br></br> */}
            {/* <div className="tag-container"> */}
          {/* {data?.data.map((tag, index) => {
            return (
              <div key={index} className="tag">
                {tag.tags} <span onClick={() => removeTag(tag.tags)}>x</span>
              </div>
            );
          })} */}
  
          {/* <input  placeholder="+" value={tags} onChange={(event)=>{setTags(event.target.value)}}/>
        </div>
            <button className="btn btn-success" onClick={addPostOnClick}>Add</button>
            <div className="modal-footer">
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             </div>
        </div>
            </div>
          </div>
          </div>
        </div> */}

        <button
              onClick={() => {
                 setIsModalOpen(true);
                // console.log(post?._id);
              }}
              className="post__btnAnswer btn btn-primary"
            >
              Add Question
            </button>
        <Modal
              open={isModalOpen}
              closeIcon={Close}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="modal__question">
                <h1>Question:</h1>
                {/* <p>
                  asked by <span className="name">{post?.user?.userName}</span> on{" "}
                  <span className="name">
                    {new Date(post?.createdAt).toLocaleString()}
                  </span>
                </p> */}
              </div>
              <div className="modal__answer">
                <input className='form-control' type='text' placeholder='Enter a question' value={question} onChange={(event)=>{setQuestion(event.target.value)}} ></input>
                {submitted && /^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(question)? <p className='error'>Pls enter a question</p>:null }
              <br></br>
              </div>
              <div className="modal__button">
                <button className="cancle" 
                onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                onClick={addPostOnClick} 
                type="submit" className="add">
                  Add Question
                </button>
              </div>
            </Modal>
        
        </div>
    )
}