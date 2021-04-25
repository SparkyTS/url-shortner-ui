import React from 'react';
import {BallBeat} from "react-pure-loaders";

const MyBallBeatLoader = () => (
    <div className="loader-container">
        <div className="loader-container-inner">
            <div>
                <Loader/>
            </div>
        </div>
    </div>
)

export const Loader = () => (<BallBeat
    color={'#5995fd'}
    loading={true}
/>);
export default MyBallBeatLoader;