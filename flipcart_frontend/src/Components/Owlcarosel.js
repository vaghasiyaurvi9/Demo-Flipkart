import React from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

const Owlcarosel = () => {
  return (
    <div>
         <div className='container-fluid' >            
        <OwlCarousel items={1}  
          className="owl-theme"  
          loop  
          nav  
        >  

           <div ><img  className="img" src={require('../images/15.webp')}/></div>  
           
      </OwlCarousel>  
      </div>  

    
      
    </div>
  )
}

export default Owlcarosel
