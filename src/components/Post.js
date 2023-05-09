import { Avatar } from "@mui/material";
import './post.css';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ReactTimeAgo from "react-time-ago";
 import axios from "axios";
import Tags from "./tags";
// import ReactHtmlParser from "html-react-parser";

const fetchQuestions=()=>{
    return axios.get(' http://localhost:4000/questions')
}

export const Post=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const [tags,setTags]=useState([]);
    const [visible,setVisible]=useState(false);
    const Close = <CloseIcon />;
    const [submitted,setSubmitted]=useState(false);

    
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

       
 
    
    const addTag=(e)=>{
        console.log({tags})
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
              setTags([...tags, e.target.value]);
              e.target.value = "";
            }
          }
        };

    
    const removeTag = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };



    return(
        <div className="post">
        <div className="post__info">
          
          <h4>Question :</h4>
  
          {/* <small>
            <LastSeen date={post?.createdAt} />
          </small> */}
        </div>
        <div className="post__body">
          <div className="post__question">
            <p>ques title</p>
            <button
              onClick={() => {
                 setIsModalOpen(true);
                // console.log(post?._id);
              }}
              className="post__btnAnswer"
            >
              Answer
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
                <h1>Answer:</h1>
                {/* <p>
                  asked by <span className="name">{post?.user?.userName}</span> on{" "}
                  <span className="name">
                    {new Date(post?.createdAt).toLocaleString()}
                  </span>
                </p> */}
              </div>
              <div className="modal__answer">
                {/* <ReactQuill
                  //value={answer}
                  //onChange={handleQuill}
                  placeholder="Enter your answer"
                /> */}
                <input className='form-control' type='text' placeholder='Enter a question' value={answer} onChange={(event)=>{setAnswer(event.target.value)}} ></input>
                {submitted && /^\s*\s*$|^(?:(?![A-Za-z]).)*$/.test(answer)? <p className='error'>Pls enter your answer</p>:null }
              <br></br>
              </div>
              <div className="modal__button">
                <button className="cancle" 
                onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
               // onClick={handleSubmit} 
                type="submit" className="add">
                  Add Answer
                </button>
              </div>
            </Modal>
          </div>
          {/* {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />} */}
        </div>
        <div className="post__footer">
          <div className="post__footerAction">
            <ArrowUpwardOutlined />
            <ArrowDownwardOutlined />
          </div>
          {/* <div >
            <div className="tag-container">
              <div  className="tag">
                hello <span onClick={() => removeTag()}>x</span>
              </div>
              <input onKeyDown={addTag} placeholder="+"/>
            </div>                 
          </div> */}
          <Tags></Tags>
          <div className="post__footerLeft">
            <MoreHorizOutlined />
          </div>
        </div>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          {/* {post?.allAnswers.length}  */}
          13 Answer(s)
        </p>
  
        <div
          style={{
            margin: "5px 0px 0px 0px ",
            padding: "5px 0px 0px 20px",
            borderTop: "1px solid lightgray",
          }}
          className="post__answer"
        >
          {/* {post?.allAnswers?.map((_a) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: "10px 5px",
                  borderTop: "1px solid lightgray",
                }}
                className="post-answer-container"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#888",
                  }}
                  className="post-answered"
                >
                  <Avatar src={_a?.user?.photo} />
                  <div
                    style={{
                      margin: "0px 10px",
                    }}
                    className="post-info"
                  >
                    <p>{_a?.user?.userName}</p>
                    <span>
                      <LastSeen date={_a?.createdAt} />
                    </span>
                  </div>
                </div>
                <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
              </div>
            </>
          ))} */}
        </div>
      </div>
    );
    
}