import React, {useState} from 'react';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result);
                    setcommentValue("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert('댓글을 작성하지 못했습니다.');
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment List */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            { /* Root Comment From */ }

            <form style={{display: 'flex'}} onSubmit={onSubmit} >
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해 주세요"
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment;
