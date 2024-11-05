function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

function initializeVideoInteraction() {
    const videoContainer = document.querySelector(".video-container");
    const play = document.querySelector("#play");

    if (!videoContainer || !play) return;

    videoContainer.addEventListener("mouseenter", () => {
        gsap.to(play, {
            opacity: 1,
            scale: 1,
            duration: 0.5
        });
    });
    
    videoContainer.addEventListener("mouseleave", () => {
        gsap.to(play, {
            opacity: 0,
            scale: 0,
            duration: 0.5
        });
    });

    document.addEventListener("mousemove", (dets) => {
        gsap.to(play, {
            left: dets.x - 50,
            top: dets.y - 50
        });
    });
}

function headingTextAnimation() {
    gsap.from("#page1 h1:first-child span", {
        y: 600,
        delay: 0.3,
        duration: 0.9
    });

    gsap.from("#page1 .last span", {
        y: 600,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.4
    });
    
    gsap.from(".video-container", {
        opacity: 0,
        scale: 0.8,
        delay: 1.4,
        duration: 0.6
    });
}

function initializeCursor() {
    const cursor = document.querySelector("#cursor");
    if (!cursor) return;
    
    document.addEventListener("mousemove", (dets) => {
        gsap.to(cursor, {
            left: dets.x - 80,
            top: dets.y - 80
        });
    });

    const images = document.querySelectorAll("img");
    if (!images.length) return;

    images.forEach(image => {
        image.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
                opacity: 1,
                scale: 1
            });
        });

        image.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                opacity: 0,
                scale: 0
            });
        });
    });
}

function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
            // markers: true,
        },
    });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        },
    });
}

const reviews = document.querySelectorAll("#page4 .review");

reviews.forEach((review, index) => {
    gsap.from(review, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        delay: index * 0.2, // stagger the animations
        ease: "power2.out",
    });

    review.addEventListener("mouseenter", () => {
        gsap.to(review, {
            scale: 1.05,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
        });
    });

    review.addEventListener("mouseleave", () => {
        gsap.to(review, {
            scale: 1,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
        });
    });
});




// Initialize everything
initializeVideoInteraction();
headingTextAnimation();
initializeCursor();
locomotiveAnimation();
navbarAnimation()