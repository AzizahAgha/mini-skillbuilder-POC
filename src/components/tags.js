import { useState } from "react";
import './tags.css';
import axios from "axios";
import React from "react";
import { useMutation, useQuery ,useQueryClient} from 'react-query'



export default function Tags() {
    const [tags, setTags] = useState(['post','happy']);

    const addPosts= async(question,quesId,id)=>{
        return await axios.put(`http://localhost:4000/questions/${id}`
        )
    }    

   
    const addTag = (e) => {
        if (e.key === "Enter") {
          if (e.target.value.length > 0) {
            setTags([...tags, e.target.value]);
            e.target.value = "";
          }
        }
      };


    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        // setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
    }


    
    const removeTag = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };

    

    return (
      <div>
      
        {/* <div className="tag-container"> */}
          {/* {data?.data.map((tag, index) => {
            return (
              <div key={index} className="tag">
                {tag.tags} <span onClick={() => removeTag(tag.tags)}>x</span>
              </div>
            );
          })} */}
          <div className="tag-container">
            {tags.map((tag, index) => {
            return (
              <div key={index} className="tag">
              {tag} <span onClick={() => removeTag(tag)}>x</span>
              </div>
            );
            })}
        
          <input onKeyDown={addTag} placeholder="+" 
          //value={tags} onChange={(event)=>{setTags(event.target.value)}}
          />
          </div>
        {/* </div> */}
      </div>
    );
  }
  