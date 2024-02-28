import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Image, Modal } from 'antd';

const imageUrls = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
  "https://swiperjs.com/demos/images/nature-8.jpg",
  "https://swiperjs.com/demos/images/nature-9.jpg",
];

interface FullScreenImageProps {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({ imageUrl, visible, onClose }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={null}
        width="auto"
        closable={false}
      >
        <Image preview={false} src={imageUrl} alt="Full Screen Image" style={{ width: '100%', height: '100%' }} />
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState<number | null>(null);

  const openFullScreen = (index: number) => {
    setClickedImageIndex(index);
    setFullScreenVisible(true);
  };

  const closeFullScreen = () => {
    setClickedImageIndex(null);
    setFullScreenVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const swiperInstance = (document.querySelector('.mySwiper') as any)?.swiper;
      if (swiperInstance) {
        const centerIndex = swiperInstance.realIndex;
        openFullScreen(centerIndex);
        setTimeout(() => closeFullScreen(), 1000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        // loop
        coverflowEffect={{
          rotate: 60,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true
        }}
        className="mySwiper"
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div>
              <Image
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                onClick={() => openFullScreen(index)}
                style={{ cursor: 'pointer' }}
                preview={false}
              />

              <FullScreenImage
                imageUrl={imageUrl}
                visible={fullScreenVisible && clickedImageIndex === index}
                onClose={closeFullScreen}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default App;
