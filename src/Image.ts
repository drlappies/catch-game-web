import Assets from "./Asset";

const boatImage = new Image();
const e1Image = new Image();
const e2Image = new Image();
const p1Image = new Image();
const p2Image = new Image();
const p3Image = new Image();
const p4Image = new Image();

boatImage.src = Assets.boat;
e1Image.src = Assets.e1;
e2Image.src = Assets.e2;
p1Image.src = Assets.p1;
p2Image.src = Assets.p2;
p3Image.src = Assets.p3;
p4Image.src = Assets.p4;

const Images = {
  boat: boatImage,
  e1: e1Image,
  e2: e2Image,
  p1: p1Image,
  p2: p2Image,
  p3: p3Image,
  p4: p4Image,
};

export default Images;
