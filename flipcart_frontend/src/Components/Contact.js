import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Contact = () => {
    return (
        <div>
            <NavBar />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14875.160858672669!2d72.8536213303189!3d21.240165918623365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fdd0e5db497%3A0x79e25264cf5c5b39!2sScaleTeam%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1686908135404!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='mt-2'></iframe>
            <Footer/>

        </div>
    )
}

export default Contact
