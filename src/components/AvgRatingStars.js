
export default function AvgRatingStars({avgRating}) {
  return (
    <>
        {Math.round(avgRating) == 1 && 
            <i class="fa-solid fa-star text-warning"></i>
        }

        {Math.round(avgRating) == 2 && 
        <>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
        </>
        }

        {Math.round(avgRating) == 3 && 
        <>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
        </>
         }

        {Math.round(avgRating) == 4 && 
        <>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
        </>
         }

        {Math.round(avgRating) == 5 && 
        <>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
        </>
         }
    </>
  )
}
