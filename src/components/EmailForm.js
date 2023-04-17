import { useState } from "react";
import msgContent from "./Content";
import EmailJs from "@emailjs/browser"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.scss"


const EmailForm = () => {
    
    let invoiceData = "";
    const [inputValue, setInputValue] = useState({
        uName: '',
        toEmail: '',
        subject: '',
        message: '',
    });

    const generateInvoice = async () => {
        const data = await msgContent();
        return data;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let invoiceAdded = document.getElementById("contentVal");
        if(inputValue.uName==='' || inputValue.toEmail==='' || inputValue.subject==='' || invoiceAdded.innerHTML === "") {
            alert("Please fill out all fields");
        } else {

            const result = EmailJs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, {
                uName: inputValue.uName,
                toEmail: inputValue.toEmail,
                subject: inputValue.subject,
                message: invoiceData,
            }, process.env.REACT_APP_PUBLIC_KEY).then((res) => {
                toast.success("Email Send Successfully...👍", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setInputValue({ uName: '', toEmail: '', subject: '', message: ''});
                invoiceAdded.innerHTML = "";
                document.getElementById("addInvoice").style.removeProperty("display");
            }).catch((err) => {
                toast.error("Error Occured while Sending the Email...🚫", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
            console.log(result);
        }
    }

    const handleInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const addInvoice = async () => {
        document.getElementById("addInvoice").style.display = "none";
        invoiceData = await generateInvoice();
        document.getElementById("contentVal").innerHTML = invoiceData;
    }

    return (
        <div className="email-form border-black h-fit">
            <section className="pt-10 pb-14 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-3/4 bg-white rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">  {/* sm:max-w-md */}
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Send an Invoice Email
                            </h1>
                            <form className="space-y-4 " onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="uName" className="label-style">Your name</label>
                                    <input type="text" name="uName" id="uName" value={inputValue.uName} onChange={handleInput} className="input-style" placeholder="Enter the name" />
                                </div>
                                <div>
                                    <label htmlFor="toEmail" className="label-style">To email</label>
                                    <input type="email" name="toEmail" id="toEmail" value={inputValue.toEmail} onChange={handleInput} className="input-style" placeholder="Enter to email address" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="label-style">Subject</label>
                                    <input type="text" name="subject" id="subject" value={inputValue.subject} onChange={handleInput} className="input-style" placeholder="Enter subject" />
                                </div>
                                <div>
                                    <button id="addInvoice" onClick={addInvoice} type="button" className="button-style1">Add Invoice</button>
                                </div>
                                <div className="block rounded-lg " id="contentDisplay">
                                    <label htmlFor="content" className="label-style">Content</label>
                                    <div id="contentVal" className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-900 flex justify-center">
                                        
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="button-style2">Send Invoice Email</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default EmailForm;