import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import Tilt from 'react-tilt'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Context } from "../Context";

const PostSaved = ( {noTilt,id} ) => {

    const { user, userFacebook } = useContext(Context)
    const [savedPosts, setSavedPosts] = useState([])

    useEffect(() => {

        onSnapshot(query(collection(db, 'posts', id, 'savedPosts'), where('userID', '==', user?.uid || userFacebook?.uid),orderBy('timestamp', 'desc')), (snapshot) => {
            setSavedPosts(snapshot.docs);
        })

    },[db,id])
    
    return (
        <div>
            {savedPosts.map((savedPost, index) => (
                <div key = {index}>
                    <div className = 'hidden md:flex'>
                        {
                            noTilt ? (                            
                                <div className = 'relative  md:w-72 md:h-80 cursor-pointer'>
                                    <LazyLoadImage effect = 'opacity'   src = {savedPost.data().postImage} atl = '' className = 'absolute top-0 left-0 w-full z-10 h-full object-cover rounded-sm shadow-xl' />
                                </div>
                            ) : (
                                <Tilt options = {{ max: 20, transition: true, speed: 500, easing:"cubic-bezier(.03,.98,.52,.99)"}}>
                                    <div className = 'relative  md:w-72 md:h-80 cursor-pointer'>
                                        <LazyLoadImage effect = 'opacity'   src = {savedPost.data().postImage} atl = '' className = 'absolute top-0 left-0 w-full z-10 h-full object-cover rounded-sm shadow-xl' />
                                    </div>
                                </Tilt>
                            )
                        }
                    </div>

                    <div className = 'flex md:hidden'>
                        <div className = 'relative w-36 h-36 cursor-pointer'>
                            <LazyLoadImage effect = 'opacity' src = {savedPost.data().postImage} atl = '' className = 'absolute top-0 left-0  z-10 w-full h-full  object-cover rounded-sm shadow-xl' />
                        </div>
                    </div>
                </div>      
            ))}
        </div>
    )
}

export default PostSaved
