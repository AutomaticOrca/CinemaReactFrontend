import { Carousel } from "@material-tailwind/react";
import image1 from "../../assets/chihiro.jpg";
import image2 from "../../assets/lalandland.jpg";
import image3 from "../../assets/cinema-paradiso.jpg";

function HomePage() {
  return (
    <>
      <Carousel className="rounded-xl" autoplay={true} loop={true}>
        <img
          src={image1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={image2}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={image3}
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </>
  );
}
export default HomePage;
