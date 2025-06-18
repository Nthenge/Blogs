import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc} from "firebase/firestore";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import "../style.css";

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState<{
        title?: string;
        body?: string;
    }>
    ({}); 
    const navigate = useNavigate();

    const validatedField = (name: string, value: string) => {
        let message = '';

        if(name === 'title'){
            if(!value.trim()){
                message = "Title is required";
            }
        }

        if (name === 'body') {
      if (value.trim().length < 20) {
        message = 'Body must be at least 20 characters.';
      }
    }
    setErrors((prev) => ({...prev, [name]: message}));
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const finalErrors: typeof errors = {};
        if (!title.trim()) finalErrors.title = "Title is required.";
        if (body.trim().length < 20) finalErrors.body = "Body must be at least 20 characters.";

        setErrors(finalErrors);
        if (Object.keys(finalErrors).length > 0) return;

        try {
            await addDoc(collection(db, 'posts'), {
                title: title.trim(),
                body: body.trim(),
                createdAt: new Date(),
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    }

    return(
        <>
            <Navbar />
            <div className="container">
                <h1>Create Post</h1>
                <form className="post-form" onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            validatedField('title', e.target.value)
                        }}
                    />
                    {errors.title && <p className="error">{errors.title}</p>}

                    <label>Body:</label>
                    <textarea
                        rows={6}
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value);
                            validatedField('body', e.target.value)
                        }}
                    />
                    {errors.body && <p className="error">{errors.body}</p>}

                    <button type="submit">Post</button>
                    <Link to="/" className="back-link">Go back</Link>
                </form>

            </div>
        </>
    )
}

export default CreatePost