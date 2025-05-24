import './Contact.css';
import {useForm} from "react-hook-form";

type FormData = {
    email: string;
    subject: string;
    message: string;
}

export function Contact() {

    const {register,
        handleSubmit,
        formState: { errors
    }} = useForm<FormData>();

    return (
        <div className="form-container">
            <h2>Contact Us</h2>
            <form className="contact-form">
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format'
                            }
                        })
                        }/>
                </div>
                <div className="form-group">
                    <label>Subject: </label>
                    <input type="text"
                        {...register('subject', {
                            required: 'Subject is required',
                            pattern: {
                                value: /^.{10,30}$/,
                                message: 'Subject must be ' +
                                    'in between 10 to 30 characters'
                            }
                        })}/>
                </div>
                <div className="form-group">
                    <label>Message: </label>
                    <textarea rows="5"/>
                </div>
                <button type="submit"
                      className="submit-btn">Submit</button>
            </form>
        </div>
    );
}