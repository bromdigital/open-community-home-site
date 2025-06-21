# OPEN Community Hub

Welcome to the official community hub for the OPEN Ticketing Revolution! This is a central, open-source portal for our community to find resources, get involved, and stay up-to-date with the movement to bring the $85 billion ticketing industry onchain.

This portal was created by [Brom](https://twitter.com/your-twitter-handle) to empower the community.

**"The house always wins. It's time to bring it down."**

## ✨ Features

- **Creative & Dynamic UI:** A visually engaging interface with an animated cosmic theme that reflects our forward-thinking mission.
- **Community-Driven Content:** All content, from links to press articles, is managed through simple data files, making it easy for anyone to contribute via pull requests.
- **SEO Optimized:** Built-in SEO best practices, including a dynamic sitemap and rich meta tags, to ensure the revolution is discoverable.
- **Resource Hub:** A one-stop shop for useful links, developer tools, and community channels.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/bromdigital/open-community-home-site.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd community-website
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 How to Contribute

This is a community project, and we welcome contributions! The easiest way to contribute is by adding or updating the content.

### Adding Content

All the portal's content is stored in the `/data` directory. To add a new link, press article, or tool, simply find the relevant file and add a new entry.

- **`data/community-data.js`**: Manages the main links on the homepage (About, Community, Engage).
- **`data/press.js`**: Manages the "In The News" section.
- **`data/tools.js`**: Manages the "Tools for the Revolution" section.

**Contribution Steps:**

1.  **Fork the Project.**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingContent`).
3.  **Edit the data file** in the `/data` directory.
4.  **Commit your Changes** (`git commit -m 'Add some AmazingContent'`).
5.  **Push to the Branch** (`git push origin feature/AmazingContent`).
6.  **Open a Pull Request.**

## 📂 Project Structure

```
.
├── components/         # Reusable React components (Layout, Cards, Navigation)
├── data/               # All community-managed content
├── pages/              # Next.js pages and API routes
├── public/             # Static assets (images, fonts, robots.txt)
├── styles/             # Global styles
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the OPEN Community.
