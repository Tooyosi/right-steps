import React, { Fragment, useEffect, useContext, useState, useRef } from 'react';
import { UserListContext,ErrorContext,  MemberIdContext } from '../Context/Context';
import ReactQuill from 'react-quill-2';
import styled from 'styled-components'
import WebService from '../globals/WebService'
import ErrorDisplay from '../globals/Error'
import { default as localforage } from 'localforage';
import { withRouter } from 'react-router-dom';
import parse from 'html-react-parser';
import Youtube from './Youtube';



const EditDiv = styled.div`
    background: white;
    border: 1px solid grey;
    height: 100%;
    width: 80%;
    margin: 20px 0;
    padding: 10px;
    &:clicked{
        border: 1px solid red;

    }
`


const Body = () => {
    const editorRef = useRef();
    const [editorContent, updateEditorContent] = useState('')
    const [editorTitle, updateEditorTitle] = useState('')
    const [loading, updateUpdateLoading] = useState(false)
    const [errors, updateErrors] = useState('')
    const [error, setError] = useContext(ErrorContext);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2,3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            // ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    const handleEditorChange = (e) => {
        updateEditorContent(e)
        // console.log('Content was updated:', e.target.getContent());
    }
    const handleTitleChange = (e) => {
        updateEditorTitle(e.target.value)
    }
    const handleSubmit = async (e) => {
        let dataToSend = {
            Title: editorTitle,
            Description: editorContent,
            DateCreated: new Date().toISOString()
        }
        if (editorContent !== "") {
            if (editorTitle.trim() !== "") {
                updateUpdateLoading(true)
                updateErrors('');
                let userDetails = await localforage.getItem('userdetails')
                const service = new WebService(userDetails.AccessToken);
                let result = await service.sendPost(NEWSLETTER_POST, dataToSend)
                if (result.status == 201) {
                    setError({
                        show: true,
                        message: 'Save Successful',
                        isError: false
                    })
                    updateEditorTitle('')
                    updateEditorContent('')
                    updateUpdateLoading(false)
                } else if(result.response){
                    setError({
                        show: true,
                        message: result.response.statusText,
                        isError: true
                    })
                    updateUpdateLoading(false)
                } else{
                    setError({
                        show: true,
                        message: "An error occured",
                        isError: true
                    })
                    updateUpdateLoading(false)

                }
            } else{
                updateErrors('Missing input fields')
            }
        } else {
            updateErrors('Missing input fields')
        }
    }
    return (
        <div className="row">
        {error.show == true ? (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ErrorDisplay message={error.message} error={error.isError} />
            </div>
        ) : ("")}
            <div className="body-contents">
                {loading == true?(<Loader/>):(
                <div className="col-lg-12">
                    {/* <div className="form-group">
                        <input type="text" value={editorTitle} onChange={handleTitleChange} id="" placeholder="Enter Newsletter Title" className="form-control" />
                    </div>
                    <ReactQuill theme="snow" value={editorContent} modules={modules}
                        formats={formats}
                        onChange={handleEditorChange} />
                    <button className="btn btn-danger Logout-button-style" onClick={handleSubmit}>Save Newsletter</button>
                    <div>
                        {parse(editorContent)}
                    </div> */}

                    <Youtube />
                </div>
                ) }
                <p>{errors}</p>
            </div>
        </div>
    )
}

export default withRouter(Body);