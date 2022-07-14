import { Button } from '@material-ui/core';
import React from 'react';

class Instructions extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {candidate} = this.props;
        return <div className='instructions_container'>
            <div className='instructions_content'>
                <hgroup>
                    <p style={{color: "#333"}}>Welcome,</p>
                    <h1>{candidate ? `${candidate.lastName} ${candidate.firstName}` : ''}</h1>
                    <h2>Instructions</h2>
                </hgroup>
                <p>Please read the following instructions carefully</p>
                <ol>
                    <li>This exam contains 6 subject</li>
                    <li>These subjects is a total of 100 marks</li>
                    <li>You have 30minutes to complete</li>
                </ol>
                <Button 
                color='secondary' 
                variant='contained' 
                onClick={() => this.props.onStageChange(2)}
                style={{marginTop: '1rem'}}>Start Test</Button>
            </div>
            <div className='instructions_banner'>
            </div>
        </div>
    }
}

export default Instructions;