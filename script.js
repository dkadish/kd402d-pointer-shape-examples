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
let x = 0;
let y = 0;
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
    shape.setPositionPixels(x - shape.width / 2, y - shape.height / 2);
  }

  window.requestAnimationFrame(use);
}

// ---------- Controls (Event Handlers) ----------
// Turn dragging on
function pointerDown(event) {
  isDragging = true;
  console.log("Pointer down at", event.clientX, event.clientY);
}

// ---------- Controls (Event Handlers) ----------
// Turn dragging off
function pointerUp(event) {
  isDragging = false;
  console.log("Pointer up at", event.clientX, event.clientY);
}

function pointerMove(event) {
  // Set the global variables x and y as the current position of the mouse.
  // Do this regardless of whether or not you are dragging.
  x = event.clientX;
  y = event.clientY;
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Example: a shape near the middle of the window. Replace it with your own.
  shape = createShape("shape");
  shape.setPosition(0.5, 0.5);

  // Put your event listener code here
  shape.element.addEventListener("pointerdown", pointerDown);
  shape.element.addEventListener("pointerup", pointerUp);
  shape.element.addEventListener("pointerleave", pointerUp);
  shape.element.addEventListener("pointermove", pointerMove);
}

setup(); // Always remember to call setup()!
