
export default function AvgRatingStars({avgRating}) {
  return (
    <>
        {Math.round(avgRating) === 1 && 
        <>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
        </>
        }

        {Math.round(avgRating) === 2 && 
        <>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
        </>
        }

        {Math.round(avgRating) === 3 && 
        <>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
        </>
         }

        {Math.round(avgRating) === 4 && 
        <>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-regular fa-star text-warning"></i>
        </>
         }

        {Math.round(avgRating) === 5 && 
        <>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
        </>
         }
    </>
  )
}
