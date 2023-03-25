import React from "react";

const SlideShow = () => {
  return (
    <>
      <div className="carousel-inner relative overflow-hidden w-full">
        <ol className="carousel-indicators">
          <li className="inline-block mr-3">
            <label className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">
              •
            </label>
          </li>
          <li className="inline-block mr-3">
            <label className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">
              •
            </label>
          </li>
          <li className="inline-block mr-3">
            <label className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">
              •
            </label>
          </li>
        </ol>
      </div>
      <section
        className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
        style={{
          maxWidth: "1600px",
          height: "32rem",
          backgroundImage: 'url("/images/open-chair-slide1.jpeg")',
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
            <h1 className="text-black text-2xl bg-white rounded font-bold py-2 px-4">
              همین الان خونه ات رو مبله کن
            </h1>
            <a
              className="text-xl bg-black text-white px-2 rounded mt-4 inline-block border-gray-600 leading-relaxed hover:bg-gray-200 hover:text-black"
              href="#"
            >
              مشاهده محصولات
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideShow;
