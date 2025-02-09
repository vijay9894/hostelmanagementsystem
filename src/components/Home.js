import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Navbar from "./Navbar";

const Home = () => {
    const images = [
        "https://i.pinimg.com/originals/23/d6/bf/23d6bff319e5692d2936b3d39592766a.jpg",
        "https://krishnagirlshostelnadiad.com/wp-content/uploads/2016/09/DSC_1252.jpg",
        "https://rishigirlshostel.com/wp-content/uploads/2020/05/hostel-9-1024x682.jpg",
        "https://rvce.ac.in/wp-content/uploads/2019/12/canteen-768x510.jpg",
    ];
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
            <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                    Welcome to the Cdac Girls Hostel
                </h1>

                {/* Swiper Image Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    style={{ maxWidth: "950px", margin: "auto" }}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index}`}
                                style={{ width: "100%", borderRadius: "30px" }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Home;