import React from 'react';
import NavigationBar from '../base/NavigationBar'

const SuccessfullyUpdatedPage = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style= {{marginLeft:"180px"}}>
      <h1>Your profile is successfully updated.</h1>
      </div>
      
    </div>
  );
}

export default SuccessfullyUpdatedPage;