# Dockure

Simplifying the containerization process

## How to see the project?

1. clone the repo
2. `yarn` on terminal
3. To see Electron app, `yarn build`, and `yarn start`.
4. To see the app on browser, `yarn dev`.

### App Structure

```
|-- App
    |-- Titlebar
    |-- Login
    |-- SignUp
    |-- MainContainer
      |-- Nav
      |-- ContentContainer
          |—- DockerCommand
              |—- ContainerList
                  |—- ContainerItem
          |—- Stats
      |-- ImageContainer
          |—- ImageList
              |—- ImageItem
      |-- CreateContainer
          |—- Editor
      |-- EditContainer
```
