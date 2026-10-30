/*
 * IDB Programming: A3 — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — uses the state to make sound and shapes every 100ms, if necessary
 *   controls — what happens when the player uses the pointer
 *   setup    — starts everything
 *
 * The pointer events change the state. update() and use() each run every
 * 100ms, in a loop:
 *   1. update: change the state, e.g. based on time or on the pointer's movement
 *   2. use:    make sound and move shapes, based on the state
 *
 * Shapes come from shape.js: createShape() makes one, and its methods
 * (setPosition, setSize, setColour ...) change it.
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

import { createShape } from "./shape.js";

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which notes you can play, how fast things move, the tempo.

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: where the pointer is, how fast it's moving, or whether a drone is on.
let shape;
let pointerPosition = {
  x: 0,
  y: 0,
};
// shapePosition represents the centre of the shape
let shapePosition = {
  x: 0,
  y: 0,
};
let pointerOffset = {
  x: 0,
  y: 0,
};
let isDragging = false;

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound and move shapes. This is called every 100ms.
function use() {
  // If something dragging is happening, update the position of the ball.
  if (isDragging) {
    shapePosition = {
      x: pointerPosition.x - pointerOffset.x,
      y: pointerPosition.y - pointerOffset.y,
    };
    shape.setPositionPixels(
      shapePosition.x - shape.width / 2,
      shapePosition.y - shape.height / 2,
    );
  }
  // console.log(`Pointer: (${pointerPosition.x}), Shape: (${shapePosition.x})`);

  window.requestAnimationFrame(use);
}

function pointerUp() {
  isDragging = false;
}

function pointerMove(event) {
  // Set the global variables x and y as the current position of the mouse.
  // Do this regardless of whether or not you are dragging.
  pointerPosition.x = event.clientX;
  pointerPosition.y = event.clientY;
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Example: a shape near the middle of the window. Replace it with your own.
  shape = createShape("shape");
  shape.setPositionPixels(
    shapePosition.x - shape.width / 2,
    shapePosition.y - shape.width / 2,
  );

  // Put your event listener code here
  shape.element.addEventListener("pointerdown", (event) => {
    isDragging = true;

    // Not quite right. Let's correct later
    pointerOffset = {
      x: pointerPosition.x - shapePosition.x,
      y: pointerPosition.y - shapePosition.y,
    };

    console.log(`PointerOffset: (${pointerOffset.x}, ${pointerOffset.y})`);
  });
  shape.element.addEventListener("pointerup", pointerUp);
  shape.element.addEventListener("pointerleave", pointerUp);
  shape.element.addEventListener("pointermove", pointerMove);
}

setup(); // Always remember to call setup()!
