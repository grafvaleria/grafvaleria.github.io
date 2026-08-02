

//const img = document.getElementById("headerImage");
//const header = document.getElementById("headerPic");

//function showHeader() {
//  header.classList.add("loaded");
//}

//if (img.complete) {
//  showHeader();
//} else {
//  img.onload = showHeader;
//}

// Side Stripe Animation
document.querySelectorAll(".side-stripe").forEach((stripe) => {
  const imgs = stripe.querySelectorAll("img");

  imgs.forEach((img, i) => {
    img.animate(
      [
        { transform: "translateX(-50%) translateY(-120%)" },
        { transform: "translateX(-50%) translateY(180%)" },
      ],
      {
        duration: 10000,
        iterations: Infinity,
        easing: "linear",
        iterationStart: i === 1 ? 0.5 : 0,
      },
    );
  });
});

//SVGS

const svgFiles = ["ch.svg", "cy.svg", "wf.svg", "cl.svg", "kn.svg"];
const container = document.getElementById("svgContainer");

svgFiles.forEach(file => {
  const name = file.split('.')[0];
  fetch(`pics/ch/${file}`)
    .then(response => response.text())
    .then(svgContent => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("svg-wrapper", `svg-${name}`);
      wrapper.innerHTML = svgContent;
      container.appendChild(wrapper);
    });
});