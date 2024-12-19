import React from "react";
import "./Resume.css"
const Resume = () => {
  return (
    <div className="resume-container">
      <h2> <a href = "https://drive.google.com/file/d/1SdHaH21odmjg4lpLelK1WUoVKHxIgj-8/preview" >
        mohak akul prakash's resume</a></h2>
      <iframe 
        src="https://drive.google.com/file/d/1SdHaH21odmjg4lpLelK1WUoVKHxIgj-8/preview" 
        width="640" 
        height="480" 
        title="Google Drive Resume"
      ></iframe>
    </div>
  );
};

export default Resume;
