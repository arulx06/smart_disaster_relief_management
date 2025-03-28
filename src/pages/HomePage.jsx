import React, { useRef, useEffect } from "react";
import "./home.css"; // Import the CSS file
import Marquee from "../components/Marquee";

const HomePage = () => {
  const homeRef = useRef(null);
  const nextSectionsRef = useRef([]); // Store multiple refs in an array
  const marqueeWrapperRef = useRef(null); // For the marquee container
  const marqueeTriggerRef = useRef(null); // For the trigger

  const liveUpdates = [
    '🚨 Earthquake in Japan - 6.8 magnitude!',
    '🌊 Flood Alert: Indonesia experiencing heavy rains!',
    '🔥 Wildfire spreading in California!',
    '🌀 Cyclone alert for the Eastern coast!',
  ];

  useEffect(() => {
    // Observer for .page-container (fade out early)
    const homeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.90 }
    );

    // Observer for .next-section (fade in later)
    const nextSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (homeRef.current) homeObserver.observe(homeRef.current);

    nextSectionsRef.current.forEach((section) => {
      if (section) nextSectionObserver.observe(section);
    });

    // === NEW: IntersectionObserver for Marquee ===
    const marqueeWrapper = marqueeWrapperRef.current;
    const marqueeTrigger = marqueeTriggerRef.current;

    const marqueeObserverOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the trigger is in view
    };

    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          marqueeWrapper.classList.add("sticky-middle");
        } else {
          marqueeWrapper.classList.remove("sticky-middle");
        }
      });
    }, marqueeObserverOptions);

    if (marqueeTrigger) {
      marqueeObserver.observe(marqueeTrigger);
    }

    // Cleanup
    return () => {
      if (homeRef.current) homeObserver.unobserve(homeRef.current);

      nextSectionsRef.current.forEach((section) => {
        if (section) nextSectionObserver.unobserve(section);
      });

      if (marqueeTrigger) marqueeObserver.unobserve(marqueeTrigger);
    };
  }, []);

  return (
    <div>
      <div ref={homeRef} className="page-container">
        <br/>
        <h1>Welcome</h1>
        <p className="plain">
          A simple and effective software to manage disaster relief activities.
        </p>
        <div className="fade-bottom"></div> {/* fade element */}
      </div>

      <div className="breaker">
        <div className="marquee-wrapper">
          <Marquee items={liveUpdates} speed={20} />
        </div>
      </div>

      <div
        className="next-section"
        ref={(el) => (nextSectionsRef.current[0] = el)}
      >
      <h2>Our Mission</h2>
      <p>
          We strive to provide rapid response and efficient disaster relief efforts worldwide.
      </p>
      <div className="mission-cards">
        <div className="mission-card">
          <img src="/icons/speed.svg" alt="Speed" />
          <h3>Rapid Response</h3>
          <p>We act quickly to deliver aid where it's needed most.</p>
        </div>
        <div className="mission-card">
          <img src="/icons/efficiency.svg" alt="Efficiency" />
          <h3>Efficient Relief</h3>
          <p>Resources are optimized to have the greatest impact.</p>
        </div>
        <div className="mission-card">
          <img src="/icons/reach.svg" alt="Global" />
          <h3>Global Reach</h3>
          <p>Our network spans continents for faster aid delivery.</p>
        </div>
      </div>
       


      </div>

      <div
        className="next-section2"
        ref={(el) => (nextSectionsRef.current[1] = el)}
      >
        <h2>About Us</h2>
        <p className="about-description">
          We use our skills to solve real-world problems and seize the opportunities we encounter.
        </p>

        <div className="team-container">
          <div className="team-member">
            <img src="/images/naamathan2.jpg" alt="Anirudh Anand" />
            <h3>Anirudh Anand</h3>
            <p>CB.EN.U4CCE23002</p>
          </div>

          <div className="team-member">
            <img src="/images/naamathan2.jpg" alt="Arul Mozhi Varman Velusamy" />
            <h3>Arul Mozhi Varman Velusamy</h3>
            <p>CB.EN.U4CCE23005</p>
          </div>

          <div className="team-member">
            <img src="/images/naamathan2.jpg" alt="Duvvuru Akshaya Saketh Reddy" />
            <h3>Duvvuru Akshaya Saketh Reddy</h3>
            <p>CB.EN.U4CCE23011</p>
          </div>

          <div className="team-member">
            <img src="/images/naamathan2.jpg" alt="Eeshwar E" />
            <h3>Eeshwar E</h3>
            <p>CB.EN.U4CCE23012</p>
          </div>
        </div>

        <div className="contact-info">
          📧 Contact: cb.en.u4cce23005@cb.students.amrita.edu
        </div>
      </div>

    </div>
  );
};

export default HomePage;
