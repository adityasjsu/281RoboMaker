import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4y0b4xw', 'template_lrh9czg', form.current, '76usO2VFYj5U7I4bB')
      .then((result) => { 
          console.log(result.text);
          alert("Reminder sent succesfully to mail address");
      }, (error) => {
          console.log(error.text);
          alert(error.text);
      });
  };

  return (
        
    <form class="form-box" ref={form} onSubmit={sendEmail}>
      
      <label>Name</label>
      <input type="text"  name="to_name" />
      <label>Email</label>
      <input type="email"  name="from_name" />
      <label>Add Atatchement</label>
      <input type="file" name="file"/>
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" className="btn btn-dark button" value="Send" />    
      </form>
  );
};

export default ContactUs;

