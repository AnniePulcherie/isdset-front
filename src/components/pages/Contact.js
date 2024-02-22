import React, { useState } from 'react';

import Menu from './Menu';

import axios from 'axios';
import Footer from './footer';

const Contact = () => {
    const [nom, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const envoyerMessage = async () => {
        try {
          const response = await axios.post('http://localhost:3001/contact', {nom, email, subject, message});
          console.log('Message envoyé avec succès :', response.data);
        } catch (erreur) {
          console.error('Erreur lors de l\'envoi du message :', erreur);
        }
      };

    return (
        <div >
            <Menu />
            <main>

                <section className="section contact">

                    <div className="row gy-4">

                        <div className="col-xl-6">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="info-box card">
                                        <i className="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>Villa Les Fleuron</p>
                                        <p>Lot A0313A  Plle 11/47  Carreau N°03 B MangaranoTamatave (En face du Coiffeur Fivarotankazo REGION)</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="info-box card">
                                        <i className="bi bi-telephone"></i>
                                        <h3>Appeler nous</h3>
                                        <p>0346813448</p>
                                        <p>0340373907</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="info-box card">
                                        <i className="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <p>isdsetuniversity@gmail.com</p>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="info-box card">
                                        <i className="bi bi-clock"></i>
                                        <h3>Open Hours</h3>
                                        <p>Monday - Friday</p>
                                        <p>9:00AM - 05:00PM</p>
                                    </div>
                                </div>  
                            </div>

                        </div>

                        <div class="col-xl-6" >
                            <div class="card p-4">
                                <form  className="php-email-form">
                                    <div className="row gy-4">

                                        <div className="col-md-6">
                                            <input type="text" name="name" className="form-control" placeholder="Your Name" value={nom} onChange={(e)=>{setName(e.target.value)}} required/>
                                        </div>

                                        <div className="col-md-6 ">
                                        <input type="email" className="form-control" name="email" placeholder="Your Email"value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                                        </div>

                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject" required value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
                                        </div>

                                        <div className="col-md-12">
                                            <textarea className="form-control" name="message" rows="6" placeholder="Message" required value={message} onChange ={(e)=>{setMessage(e.target.value)}}></textarea>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <div className="loading">Loading</div>
                                            <div className="error-message"></div>
                                            <div className="sent-message">Your message has been sent. Thank you!</div>

                                            <button type="submit" onClick={envoyerMessage}>Send Message</button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </section>

            </main>
            <Footer />
        </div>
);
};

export default Contact;