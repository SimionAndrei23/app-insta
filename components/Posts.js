import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import {useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"



function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => (

        onSnapshot(query(collection(db,'posts'),orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs);
        })
        
    ),[db])
    
    return (
        <div>
            {posts.map((post,index) => (
                <Post key = {index} id = {post.id} nameUser = {post.data().username} userImg = {post.data().profileUser} img = {post.data().image} caption = {post.data().caption} timestampPost = {new Date(post.data().timestamp?.toDate()).toUTCString()} />
            ))}
        </div>
    )
}

export default Posts
