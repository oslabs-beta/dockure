[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- [![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oslabs-beta/dockure">
    <img src="https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/dockureIconLogoV2.png" alt="Logo" width="80" height="80">
  </a>
  <p align="center">
    Simplifying the containerization process outside of the command line.
    <br />
    <a href="https://github.com/oslabs-beta/dockure"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/dockure">View Demo</a>
    ·
    <a href="https://github.com/oslabs-beta/dockure/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/dockure/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Built With
* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/)
* [Docker](https://docs.docker.com/)
* [Docker REST API](https://docs.docker.com/engine/api/v1.41/#)
* [Node child_process](https://nodejs.org/api/child_process.html)
* [Electron](https://www.electronjs.org/docs)
* [Prometheus](https://prometheus.io/docs/introduction/overview/)
* [CAdvisor](https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md)
* [Socat (in the localhost)]()

<!-- GETTING STARTED -->
## Getting Started

Starting our app is super easy! Just make sure you have Yarn and Docker if you don't already.

### Prerequisites
In order for the application to work:
1. Must have [Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Daemon running in the background.
2. Must install yarn:
  ```sh
  npm install yarn
  ```
* For security purposes, please make sure you use this app in your local network unless you provide your own TCP TLS/SSH security. Pre-packaged SSH capabilities are currently in beta!
### Installation
The pre-bundled app will be coming in Dockure 2.0, but for now:
1. Clone the repo
2. install dependencies
   ```sh
   yarn install
   ```
3. create an .env file in the root directory filling out the DB_host and JWT secret like below:
```
# Database
DB_HOST=your.db.here
# Bcrypt
BCRYPT_SALT_ROUNDS=10
# JWT
JWT_SECRET=your.secret.here
JWT_EXPIRES_SEC=86400
```
```
|-- .github (folder)
|-- client (folder)
|-- electron (folder)
|-- server (folder)

|-- .env (file) <----- right here!
|-- index.html
|-- etcetra...
```
4. build the app
   ```sh
   yarn build
   ```
5. start it
   ```sh
   yarn start
   ```
* After logging in for the first time, it may take some time for dependencies to load.

![signin](https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/signin.png)



Alternatively, you can skip steps 4-5 and run this application in dev mode outside of electron:
  ```sh
   yarn dev
   ```


<!-- USAGE EXAMPLES -->
## Usage
Once you are logged in there are loads you can do. Here are some examples:

* Our simple homepage displays containers and their data. You can view container data and/or select multiple containers you'd like to start and stop
![containers](https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/containers.png)

* In our images tab, you can run your images to build containers. You can also pull locally or on Docker Hub and build images.
![imagestab](https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/images.png)

![build](https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/build.png)


* In our YAML/Dockerfile editor tab, we provide a simple Dockerfile or YAML editor for you to create, edit and save your own files without opening up an IDE.
![yaml](https://raw.githubusercontent.com/oslabs-beta/dockure/dev/.github/yamlEditor.png)

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/oslabs-beta/dockure/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact


* Liam - [LinkedIn](https://www.linkedin.com/in/liamtalty/), [Github](github.com/lptalty)
* Van - [LinkedIn](https://Linkedin.com/in/biet-van-nguyen-6879434a/), [Github](github.com/vanbietnguyen)
* Alex - [LinkedIn](https://www.linkedin.com/in/alexander-zayas-jr/), [Github](github.com/AlexZayas)
* Hazel - [LinkedIn](https://www.linkedin.com/in/hyeseon-na/), [Github](github.com/hazel0109)
* Nate - [LinkedIn](https://Linkedin.com/in/nathanael-tracy/), [Github](github.com/n-tracy1)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Yarn](https://classic.yarnpkg.com/en/docs/)
* [Webpack](https://webpack.js.org/)
* [CodeMirror](https://codemirror.net/doc/manual.html)
* [BCrypt](https://www.npmjs.com/package/bcrypt)
* [PostGreSQL](https://www.postgresql.org/docs/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/dockure.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/dockure/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/dockure.svg?style=for-the-badge
[forks-url]: https://github.com/oslabs-beta/dockure/network/members
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/dockure.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/dockure/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/dockure.svg?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/dockure/issues

<!-- [license-shield]: https://img.shields.io/github/license/oslabs-beta/dockure.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/dockure/blob/master/LICENSE.txt -->
<!-- [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: 
[product-screenshot]: images/screenshot.png -->
