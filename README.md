# Serpent Sprint

A playful and modern Snakes and Ladders web game for up to four players with a delightful, kid-friendly design.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alfianm/serpent-sprint)

Serpent Sprint is a modern, web-based adaptation of the classic Snakes and Ladders board game, designed with a playful and vibrant 'Kid Playful' aesthetic. The game supports 1 to 4 players and features a beautifully illustrated 10x10 game board. Players take turns rolling a digital die and moving their pawn across the board, aiming to be the first to reach square 100. Landing on a ladder allows a player to climb ahead, while landing on a snake's head sends them sliding back down. The user interface is designed to be intuitive and delightful, with smooth animations for pawn movement, an animated dice roll, and a celebratory confetti effect for the winner. The entire game is a single-page application, managed with a centralized state store for a seamless and responsive experience.

## Key Features

-   **Classic Gameplay, Modern Twist**: Enjoy the timeless fun of Snakes and Ladders with a fresh, digital interface.
-   **Multiplayer Support**: Play solo or with up to 4 players.
-   **Interactive Board**: A beautifully designed 10x10 grid with custom snake and ladder illustrations.
-   **Delightful Animations**: Smooth pawn movements, an animated 3D dice roll, and celebratory confetti for the winner, powered by Framer Motion.
-   **Responsive Design**: Flawless gameplay experience across desktops, tablets, and mobile devices.
-   **Centralized State Management**: A seamless and reactive experience powered by Zustand.

## Technology Stack

-   **Frontend**: React, Vite
-   **Styling**: Tailwind CSS, shadcn/ui
-   **State Management**: Zustand
-   **Animation**: Framer Motion
-   **Icons**: Lucide React
-   **Deployment**: Cloudflare Workers

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Git](https://git-scm.com/) for cloning the repository.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/serpent-sprint.git
    cd serpent-sprint
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To start the local development server, run the following command. This will open the application in your default browser.

```sh
bun run dev
```

The server will automatically reload when you make changes to the source files.

## Building for Production

To create a production-ready build of the application, run:

```sh
bun run build
```

This command bundles the application and outputs the static files to the `dist` directory, ready for deployment.

## Deployment

This project is configured for easy deployment to **Cloudflare Workers**.

### Deploy with a single click

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alfianm/serpent-sprint)

### Manual Deployment via Wrangler

1.  **Authenticate with Cloudflare:**
    If this is your first time using Wrangler, you'll need to log in to your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build and deploy your application to Cloudflare.
    ```sh
    bun run deploy
    ```

Wrangler will handle the process of uploading your assets and deploying the worker script. Once complete, it will provide you with the URL to your live application.

## Available Scripts

-   `bun run dev`: Starts the development server.
-   `bun run build`: Builds the application for production.
-   `bun run lint`: Lints the codebase using ESLint.
-   `bun run deploy`: Deploys the application to Cloudflare Workers.

## License

This project is licensed under the MIT License.