import React from "react";

const Location = () => {
  return (
    <section className="h-[190px] sm:h-[445px] pb-[40px] sm:w-[90%] sm:mx-auto sm:pb-[45px] md:pb-[50px] lg:pb-[60px] xl:pb-[70px] 2xl:pb-[80px]">
      <iframe
        title="location"
        width="100%"
        height="100%"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(FitCore)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.gps.ie/">gps trackers</a>
      </iframe>
    </section>
  );
};

export default Location;
