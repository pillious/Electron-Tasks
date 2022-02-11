<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pillious/Electron-Tasks">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Electron Tasks</h3>

  <p align="center">
    A Desktop Client for <br> Google Tasks
    <br />
    <br />
    <small>* In Development*</small>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letrase.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React.js](https://reactjs.org/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [Next.js](https://nextjs.org/)
-   [Electron](https://www.electronjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Google OAuth2](https://developers.google.com/identity)
-   [Google Tasks API](https://developers.google.com/tasks)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

NPM is required to run this project.

```sh
npm install npm@latest -g
```

### Setup
1. Create a new project on the [Google Cloud Platform](https://console.developers.google.com/).
2. Navigate to the project's Library tab, and enable Tasks API (not Cloud Tasks API).
3. In the Credentials tab, create an API key AND a web application OAuth client ID.
4. Inside your client ID, add `http://locahost:8000` to the authorized JavaScript origins and Authorized redirect URIs.
4. Finally, Navigate to the OAuth consent screen. Besides filling out the required information, add the scope Tasks API (../auth/tasks).

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/pillious/Electron-Tasks.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create the `.env.local` file inside the `./renderer` folder.
4. Enter your Google Cloud project secrets in `env.local`
    ```
    NEXT_PUBLIC_CLIENT_ID=your_api_key
    NEXT_PUBLIC_API_KEY=your_api_key
    ```
5. Run the project
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Andrew Lee (pillious) - andrewzhlee@gmail.com
<br>
([My Website](https://andrewzh.com))

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

-   [Electron Template with Next.js & Typescript](https://github.com/vercel/next.js/tree/canary/examples/with-electron-typescript)

<p align="right">(<a href="#top">back to top</a>)</p>
