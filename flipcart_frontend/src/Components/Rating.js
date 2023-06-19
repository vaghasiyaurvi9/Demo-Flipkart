import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai';

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)
    console.log("rating===",rating);
    return (
        <div>
            {
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label>
                            <input type="radio" name='rating' value={ratingValue} onClick={() => setRating(ratingValue)}/>
                                <AiFillStar className='fs-2 star' color={ratingValue <= (rating || hover ) ? "#ffc107" : "#e4e5e9"}
                                 onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} 
                                 />
                        </label>
                    )
                })
            }
           <p>rating: {rating}</p>

        </div>
    )
}

export default Rating
