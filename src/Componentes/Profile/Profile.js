import React from 'react';
import {useState} from 'react';
import './Profile.css'
import { db, auth } from '../FireBase/Firebase'

const Profile = () => {

    return (
        <div className="formulario">
            <div className="log-form">
                <form >
                   <input type="text"></input>
                </form>
            </div>
        </div>
    )
}

export default Profile