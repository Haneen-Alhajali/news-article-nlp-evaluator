# 📊 Evaluate a News Article with Natural Language Processing

This project is part of Udacity's Front-End Web Developer Nanodegree Program. The objective is to build a web application that allows users to enter a URL of a news article, which is then analyzed using MeaningCloud's Natural Language Processing (NLP) API.

## 📑 Table of Contents

- [📖 Project Overview](#-project-overview)
- [⚙️ Installation](#-installation)
- [🚀 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [🛠 Technologies Used](#-technologies-used)
- [🔑 API Information](#-api-information)
- [🧪 Testing](#-testing)
- [🛠 Development & Production Modes](#-development--production-modes)
- [📜 License](#-license)

## 📖 Project Overview

This web application allows users to submit a URL, which is then processed by MeaningCloud's NLP API. The API returns sentiment analysis data, which is displayed on the page.

## ⚙️ Installation

To set up and run this project locally, follow these steps:

1. 📥 Clone the repository:
   ```bash
   git clone https://github.com/Haneen-Alhajali/news-article-nlp-evaluator
   cd news-article-nlp-evaluator
   ```
2. 📦 Install dependencies:
   ```bash
   npm install
   ```
3. 🔑 Create a `.env` file in the root directory and add your MeaningCloud API key:
   ```
   MEANINGCLOUD_API_KEY=your_api_key_here
   ```
   > **Note:** Sign up at [MeaningCloud](https://www.meaningcloud.com/) to get your API key.
4. ▶️ Start the server:
   ```bash
   npm run start
   ```
5. 🔧 Build the project:
     - For production:
        ```bash
       npm run build-prod
        ```
     - For development:
        ```bash
        npm run build-dev 
        ```
6. 🌐 Open your browser and go to:
   ```
   http://localhost:8081
   ```

## 🚀 Usage

1. Enter a valid news article URL into the input field.
2. Click the "Submit" button.
3. The page will display the results of the analysis, including polarity, subjectivity, and confidence levels.

## 📂 Project Structure

```
.
├── src/
│   ├── client/
│   │   ├── js/
│   │   │   ├── formHandler.js
│   │   │   ├── formHandler.test.js
│   │   ├── styles/
│   │   │   ├── base.scss
│   │   │   ├── footer.scss
│   │   │   ├── form.scss
│   │   │   ├── header.scss
│   │   │   ├── resets.scss
│   │   ├── views/
│   │   │   ├── index.html
│   │   ├── index.js
│   ├── server/
│   │   ├── index.js
├── .babelrc
├── .gitignore
├── .env
├── jest.config.js
├── package-lock.json
├── package.json
├── service-worker.js
├── webpack.dev.js
├── webpack.prod.js
├── README.md
```

## 🛠 Technologies Used
- 🏗 HTML, SCSS, JavaScript
- ⚙️ Node.js with Express.js
- 📦 Webpack (for bundling and module handling)
- 🌍 MeaningCloud NLP API
- 🧪 Jest (for testing)
- 🔄 Workbox (for service workers)

## 🔑 API Information

The project utilizes the **MeaningCloud NLP API** for text analysis. Ensure you have a valid API key stored in the `.env` file.

## 🧪 Testing

To run tests:

```bash
npm run test
```

Jest is used to test functions such as form validation and API calls.

## 🛠 Development & Production Modes

- To run the project in **development mode**:

  ```bash
  npm run build-dev 
  ```

  This enables live reloading with Webpack Dev Server.

- To build for **production**:

  ```bash
  npm run build-prod
  ```

  This optimizes and bundles the files.

## 📜 License
📚 This project is for educational purposes as part of Udacity's Nanodegree Program.

---

🔗 **Author:** Haneen Alhajali  
📌 **Status:** 🎓 Educational Project  
📅 **Last Updated:** `2025` 
