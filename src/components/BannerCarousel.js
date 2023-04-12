import { Carousel } from "react-bootstrap"

export default function BannerCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imgs/1.png"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imgs/2.png"
          alt="Second slide"
        />


      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imgs/3.png"
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  )
}
