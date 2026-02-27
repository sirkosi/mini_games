# Please refactor the index page to show a library of games. Ideally for kids with more icons or emojis, since they can't read yet.

# Some instructions for new games:

- **CRUCIAL** Please maintain the whole page (visible text and audio) in german language.

- Maintain the index page and all games in responsive css so that you can use it from a tablet or a smartphone.

## Audio implementation

Technical Core: Audio Instructions
To handle instructions without text, use the *Web Speech API*:

```
const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'de-DE'; // Or 'en-US'
  window.speechSynthesis.speak(msg);
};
```

Note: On iPads, speech usually requires a user gesture (like a "Start" button) to initialize.

## Pro-Tip for Tablets

Use the CSS property touch-action: none; on your game container to prevent the iPad from scrolling or zooming while the children are dragging elements.

## Game 1: Count the Apples (Math)

- Logic: Generate a random number (1–10). Display that many apple emojis in a `flex-wrap` container.

- Interaction: Create 3–5 large buttons with numbers.

- Audio: On load: "Count the apples. How many do you see?"

- Feedback: If correct, play a chime and show a star.

## Game 2: Size Sorter (Logic)

- Logic: Create an array of three different font sizes (e.g., 2rem, 4rem, 6rem) for a single emoji (e.g., 🐘).

- Interaction: Use Pointer Events (`pointerdown`, `pointermove`, `pointerup`) to allow dragging.

- Audio: "Put the animals in order, from smallest to biggest."

- Validation: Compare the `x-position` of the elements once all are dropped.

## Game 3: Balance Scale (Math)

- Logic: Use a simple CSS `transition: transform` to tilt a horizontal bar.

- Interaction: Drag weights (numbered boxes) onto two "plates" (divs). Sum the values on each side.

- Audio: "Make both sides equal to balance the scale."

## Game 4: Shape Lotto (Logic)

- Logic: Display three hollow outlines (SVG or CSS borders) and three filled shapes (Square, Circle, Triangle).

- Interaction: Use `elementFromPoint` during the `pointerup` event to check if a shape was dropped into the correct "hole."

- Audio: "Match the shapes to their homes."

## Game 5: Initial Letters (Language)

- Logic: Show one large emoji (e.g., 🍎 for Apple). Provide three large letter buttons (A, B, C).

- Interaction: Simple click/tap on the letter.

- Audio: "Apple. What letter does Apple start with?" (Use `speak()` for both the instruction and the letter sounds).

## Game 6: Word Builder (Language)

- Logic: Take a 3-letter word (e.g., "DOG"). Split into an array, shuffle it, and display as draggable tiles.

- Interaction: Arrange tiles horizontally.

- Audio: "Spell the word: DOG. D... O... G..."

- Validation: Check if the `innerText` of the tiles in the container matches the target string.

## Game 7: Digital Piano (Music/Motoric)

- Logic: Use the *Web Audio API* `OscillatorNode` to generate clean tones (C4 to C5).

- Interaction: Create 8 colorful full-height divs. Use `pointerdown` for immediate sound triggering (lower latency than `click`).

- Audio: Initial instruction: "Play a song on your colorful piano!"