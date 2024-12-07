import React, { useState } from "react"

interface CarouselProps {
    images: { src: string; title: string }[] // Lista de imagens com título/informação
}

export default function Carousel({ images }: CarouselProps): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + images.length) % images.length
        )
    }

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={images[currentIndex].src}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-[40rem] object-cover transition duration-500"
                />
                <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                    {images[currentIndex].title}
                </div>
            </div>

            {/* Botões de Navegação */}
            <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
                &#8592;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
                &#8594;
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`block w-2.5 h-2.5 rounded-full ${
                            index === currentIndex
                                ? "bg-white"
                                : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
