export const photoGalleryCarouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 684,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const serviceCarouselSettings = (
  services: {}[],
  setCurrentSlide: (slide: any) => void
) => ({
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  // slidesToShow: Math.min(services?.length || 1, 3), // Dynamically set slidesToShow,
  slidesToScroll: 1,
  adaptiveHeight: false,
  beforeChange: (_: number, newIndex: number) => {
    // Calculate the middle slide for the new index
    // Calculate the index of the middle slide
    const middleIndex = Math.floor(3 / 2);
    let newMiddleIndex = newIndex + middleIndex;

    // Adjust the new middle index to stay within valid bounds
    if (newMiddleIndex >= services?.length) {
      newMiddleIndex = newMiddleIndex - services?.length;
    }

    setCurrentSlide(newMiddleIndex);
  },
  responsive: [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
