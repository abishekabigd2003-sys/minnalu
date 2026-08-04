# Minnalu ❤️ - A Luxury Romantic Surprise

Minnalu is a premium, cinematic romantic web application designed as an unforgettable digital surprise. It features beautiful glassmorphism design, interactive memory reveals, a secret passcode lock, and immersive audio-visual experiences.

## ✨ Features

- **Secret Passcode Lock**: The journey begins with a personalized passcode entry to unlock the memories.
- **Interactive Scratch Cards**: Memories are hidden behind digital scratch cards. Users must physically "scratch" the screen to unveil photos and videos.
- **Immersive Audio & Video**: Each memory card has a dedicated soundtrack that plays automatically upon reveal. The application includes global ambient music controls.
- **Cinematic Animations**: Powered by Framer Motion, every interaction, page transition, and element reveal is smooth and elegant.
- **Love Letter Finale**: The experience concludes with a beautifully animated, typewritten love letter.
- **Fully Responsive**: Scaled to look perfect on all devices, from small mobile phones to large desktop monitors.

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & Canvas Confetti
- **Icons**: React Icons
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd minnalu2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application in the browser.

### Building for Production
To create a production-ready build, run:
```bash
npm run build
```
This will compile the application into the `dist` folder.

## 📁 Project Structure

- `/src/components`: Contains reusable UI components (`ScratchCard`, `PasscodeKeypad`, `LoveLetterModal`, etc.)
- `/src/pages`: Contains the main route views (`WelcomePage`, `GalleryPage`, `MemoryDetailPage`, etc.)
- `/src/utils`: Contains data files (`memoriesData.js`) and audio management utilities.
- `/public`: Contains static assets like images, videos, and audio files.

## 🎨 Design System
The application utilizes a custom design system defined in `tailwind.config.js` and `index.css`, heavily featuring:
- **Glassmorphism**: Blurred backgrounds with semi-transparent overlays.
- **Glow Effects**: Rose and Gold themed drop shadows and borders.
- **Typography**: A mix of `Cinzel` (Serif), `Montserrat` (Sans), and `Great Vibes` (Cursive) for a luxurious feel.

---
*Created with infinite love.* ❤️
