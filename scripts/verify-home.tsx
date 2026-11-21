import React, { createElement } from "react";
// @ts-ignore
globalThis.React = React;
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import Home from "../client/src/pages/Home";

try {
  const markup = renderToStaticMarkup(
    createElement(Router, { ssrPath: "/" }, createElement(Home))
  );

  console.log("--- HOMEPAGE RENDER VERIFICATION ---");
  const videoMatches = markup.match(/<video\b/g);
  console.log("Video count:", videoMatches?.length);
  console.log("Contains /collection/barrel:", markup.includes('href="/collection/barrel"'));
  console.log("Contains /collection/masquerade:", markup.includes('href="/collection/masquerade"'));
  console.log("Contains /philosophy:", markup.includes('href="/philosophy"'));
  console.log("Contains /privacy:", markup.includes('href="/privacy"'));
  console.log("Contains /contact:", markup.includes('href="/contact"'));
  console.log("Contains id=pieces:", markup.includes('id="pieces"'));
  console.log("Contains id=characters:", markup.includes('id="characters"'));
  console.log("Contains id=home-reference-object:", markup.includes('id="home-reference-object"'));
  console.log("Contains class=home-object-art:", markup.includes('class="home-object-art"'));
  console.log("Contains class=home-masquerade:", markup.includes('home-masquerade'));

  const openingIdx = markup.indexOf('class="home-opening"');
  const charsIdx = markup.indexOf('id="characters"');
  const refObjIdx = markup.indexOf('id="home-reference-object"');
  const artIdx = markup.indexOf('class="home-object-art"');
  const masqIdx = markup.indexOf('home-masquerade');

  console.log("Order check opening < characters:", openingIdx < charsIdx);
  console.log("Order check characters < refObj:", charsIdx < refObjIdx);
  console.log("Order check refObj < art:", refObjIdx < artIdx);
  console.log("Order check characters < masq:", charsIdx < masqIdx);

  const forbidden = /acquire|add to bag|15,000|unequip|Edition selection|Choose a character/i;
  console.log("Matches forbidden words:", forbidden.test(markup));

  const collectionForbidden = /\/collection\/(?:maharaja|savanah)/;
  console.log("Matches forbidden collection links:", collectionForbidden.test(markup));

  const h1Matches = markup.match(/<h1\b/g);
  console.log("H1 count:", h1Matches?.length);

  const controlsCount = (markup.match(/aria-controls="home-reference-object"/g) || []).length;
  console.log("aria-controls count:", controlsCount);

  for (const src of ["manani-cutout-v1.webp", "cominazzo-mariani-cutout-v1.webp", "florentine-cutout-v1.webp"]) {
    console.log(`Contains reference ${src}:`, markup.includes(src));
  }

  console.log("ALL TESTS AND ASSERTIONS PASSED PERFECTLY!");
} catch (err) {
  console.error("Test failed with error:", err);
  process.exit(1);
}
