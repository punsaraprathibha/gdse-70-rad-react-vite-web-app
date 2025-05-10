
1. To create a React project using vite, Go to File->New -> Project -> Vite -> Select template as React, and tick Typescript Project option.
   Through command line: `npm create vite@latest my-react-app -- --template react`
2. To run a React app created using latest vite version, you need to upgrade your node version to 20.
   `node -v` to check current version.
   `sudo npm install -g n
   sudo n 20
   `
3. Then run `npm install` to install the dependencies.
4. Then you can see there is a script defined in `package.json` called `dev` to start the application.
   `npm run dev`
5. Then you'll have your vite React project running on `http://localhost:5173/`.
6. Let's get familiar with the code structure a bit.
7. Let's clear out the `App.tsx` file, `index.css` file, `App.css` file.
8. Let's create a folder called `view` -> `common` and place the following common components under that.
9. Create folder called `Navbar` and inside that folder please create `Navbar.tsx` file.
```typescript jsx
import './Navbar.css';

export function Navbar() {
 return (
         <div className="navbar">
          This is Navbar!
         </div>
 );
```
Create `Navbar.css` file:
```css
.navbar {
   background-color: rgb(68 69 68);
   color: white;
   padding: 2rem;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 2rem;
   display: flex;
}
```

10. Then add following code in `App.tsx`.
```typescript jsx
function App() {
 return (
    <>
       <Navbar/>
    </>
 )
}
```
11. Create folder called `MainContent` and inside that folder please create `MainContent.tsx` file.
```typescript jsx
import './MainContent.css';

export function MainContent() {
 return (
         <div className="main-content">
          This is Main Content!
         </div>
 );
}
```
Create `MainContent.css` file:
```css
.main-content {
   background-color: rgb(218, 215, 203);
   padding: 2rem;
   align-items: center;
   justify-content: center;
   text-align: center;
   font-size: 2rem;
   min-height: 26rem;
   display: flex;
}
```
12. Then add following code in `App.tsx`.
```typescript jsx
import {MainContent} from "./MainContent";

function App() {

 return (
    <>
       <Navbar/>
       <MainContent/>
    </>
 )
}
```
13. Create folder called `Footer` and inside that folder please create `Footer.tsx` file.
```typescript jsx
import './Footer.css';

export function Footer() {
    return (
        <div className="footer">
            This is Footer!
        </div>
    );
}
```
Create `Footer.css` file:
```css
.footer {
   background-color: rgb(68 69 68);
   color: white;
   padding: 2rem;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 2rem;
   display: flex;
}
```

14. Then add following code in `App.tsx`.
```typescript jsx
function App() {

 return (
         <>
          <Navbar/>
          <MainContent/>
          <Footer/>
         </>
 )
}
```