15. Now let's define some links in Navbar.
```typescript jsx
import './Navbar.css';

export function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    );
}
```
```css
.navbar {
    background-color: rgb(68 69 68);
    padding: 1px;
}

li {
    display: inline-block;
    padding-right: 20px;
}
```
16. Now we're going to create content pages of our application.
17. For that let's create a new folder called `pages` inside `view` folder.
18. Inside `pages` folder let's create a folder called `Home` and add `Home.tsx` inside that.
```typescript jsx
export function Home() {
    return (
        <>
            <h1>This is Home Page!</h1>
        </>
    );
}
```
19. Inside `pages` folder let's create another folder called `About` and add `About.tsx` inside that.
```typescript jsx
export function About() {
    return (
        <>
            <h1>This is About Page!</h1>
        </>
    );
}
```
19. Inside `pages` folder let's create another folder called `Contact` and add `Contact.tsx` inside that.
```typescript jsx
export function Contact() {
    return (
        <>
            <h1>This is Contact Page!</h1>
        </>
    );
}
```
20. Now let's talk about `React Routing` which helps us to enable page navigation.
21. For that you need to install `react-router-dom` using this command: `npm install react-router-dom`.
22. Then add the following code to add routing to content in `App.tsx`.
```typescript jsx
import './MainContent.css';
import * as React from "react";
import {Home} from "../../pages/Home/Home.tsx";
import {About} from "../../pages/About/About.tsx";
import {Contact} from "../../pages/Contact/Contact.tsx";
import {Route, Routes} from "react-router-dom";


export function MainContent() {
    return (
        <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}
```
23. You need to import `import * as React from "react";` to get support for react element.
24. Then if you see the browser, you'll see an error in the console.
    `Uncaught Error: useRoutes() may be used only in the context of a <Router> component.`
25. For that, you need to wrap `app.tsx` with `<BrowserRouter>`.
```typescript jsx
import './App.css'
import {Navbar} from "./view/common/Navbar/Navbar.tsx";
import {MainContent} from "./view/common/MainContent/MainContent.tsx";
import {Footer} from "./view/common/Footer/Footer.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {

 return (
         <BrowserRouter>
            <Navbar/>
            <MainContent/>
            <Footer/>
         </BrowserRouter>
 )
}

export default App
```
26. Now you can navigate within pages by changing url path using React Routing.
27. To add link to navigate through pages you need to add following code.
```typescript jsx
import './Navbar.css';
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}
```
```css
.navbar {
 background-color: rgb(68 69 68);
 padding: 1px;
}

li {
    display: inline-block;
    padding-right: 20px;
}

li a {
    text-decoration: none;
}
```
28. Previously we had below components in `App.tsx` wrapped by `BrowserRouter`.
```typescript jsx
<BrowserRouter> 
    <Navbar/> 
    <MainContent/> 
    <Footer/>
</BrowserRouter>
```
29. So, if we need to navigate to login page which don't have any of these common components, we need to do some small layout change of this current layout.
30. So, for that we need to extract these common set of components to a separate single component for easy to manage. Let's call it as `DefaultLayout.tsx`
```typescript jsx
export function DefaultLayout() {
     return ( 
          <> 
           <Navbar/> 
           <MainContent/> 
           <Footer/> 
          </>
     );
}
```
31. Let's create new component called `Login`
```typescript jsx
export function Login() { 
   return ( 
      <> 
        <h1>This is Login!</h1> 
      </>
   ); 
}
```
32. Then import and define this newly created `DefaultLayout` component and `Login` component inside `App.tsx`.
```typescript jsx
<BrowserRouter> 
 <Routes> 
  <Route path="/*" Component={DefaultLayout}></Route> 
  <Route path="/login" Component={Login}></Route> 
 </Routes> 
</BrowserRouter>
```
33. Then define a `Link` inside the `Sign-In` button like below to enable navigation to login page
 ```typescript jsx
<Link to="/login">Sign In</Link>
```
34. Now, let's try import some images and render them in the UI using React.
35. For that, let's create a package called `assets` inside `src` and place out image `icon.png` inside that.
36. Now let's try to import this image to our `Navbar.tsx`.
```typescript jsx
import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <div className="navbar">
            <img src={icon} className="icon" alt=""/>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}
```
```css
.navbar {
    background-color: rgb(68 69 68);
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

li {
    display: inline-block;
    padding-right: 20px;
}

li a {
    text-decoration: none;
    color: #f0ecec;
}

li a:hover {
    text-decoration: none;
    color: #42d974;
}

.icon {
    height: 2rem;
    width: 2rem;
}
```
37. Now let's define our application business name.
```typescript jsx
import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <div className="navbar">
            <img src={icon} className="icon" alt=""/>
            <p className="business-name">Organic Shop</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}
```
```css
.navbar {
    background-color: rgb(68 69 68);
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

li {
    display: inline-block;
    padding-right: 20px;
}

li a {
    text-decoration: none;
    color: #f0ecec;
}

li a:hover {
    text-decoration: none;
    color: #42d974;
}

.icon {
    height: 2rem;
    width: 2rem;
}

.business-name {
    padding-left: 5px;
    color: #f0ecec;
}
```
38. Now let's add a `Sign In` button in the Navbar.
```typescript jsx
import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <div className="navbar">
            <img src={icon} className="icon" alt=""/>
            <p className="business-name">Organic Shop</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <button className="btn-sign-in">Sign In</button>
        </div>
    );
}
```
```css
.navbar {
    background-color: rgb(68 69 68);
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

li {
    display: inline-block;
    padding-right: 20px;
}

li a {
    text-decoration: none;
    color: #f0ecec;
}

li a:hover {
    text-decoration: none;
    color: #42d974;
}

.icon {
    height: 2rem;
    width: 2rem;
}

.business-name {
    padding-left: 5px;
    color: #f0ecec;
}

.btn-sign-in {
    background-color: #1f9e4b;
    color: #f0ecec;
    height: 30px;
    width: 70px;
    border-radius: 10px;
    border-color: white;
}
```
39. Now let's deal with some event handling here with this Sign In button.
```typescript jsx
import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";

export function Navbar() {

    const onSignInClick = () => {
        alert("Sign In Clicked!");
    }

    return (
        <div className="navbar">
            <img src={icon} className="icon" alt=""/>
            <p className="business-name">Organic Shop</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <button className="btn-sign-in" onClick={onSignInClick}>Sign In</button>
        </div>
    );
}
```
40. Now, Let's finalize our `Footer.tsx` as well.
```typescript jsx
import './Footer.css';
import icon from '../../../assets/icon.png';

export function Footer() {
    return (
        <div className="footer">
            <p className="copyright">Copyright © 2025</p>
            <p className="business-name">Organic Shop</p>
            <img className="icon" src={icon} alt=""/>
        </div>
    );
}
```
```css
.footer {
    background-color: rgb(68 69 68);
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.business-name {
    padding-left: 5px;
    color: #f0ecec;
    padding-right: 5px;
}

.copyright {
    color: #f0ecec;
    font-size: 10px;
}

.icon {
    height: 2rem;
    width: 2rem;
}
```
41. Now let's try out some Form Handling exercise. For this you need to install this dependency.
    `npm install react-hook-form`
42. Let's crate the Contact Us page now.
```typescript jsx
import { useForm } from 'react-hook-form';
import './Contact.css';

type FormData = {
 email: string;
 subject: string;
 message: string;
};

export function Contact() {
 const { register, handleSubmit,
  formState: { errors } }
         = useForm<FormData>();

 const onSubmit = (data: FormData) => {
  console.log('Form Submitted:', data);
  alert(`Submitted case: ${data.subject}!`);
 };

 return (
         <div className="form-container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
           <div className="form-group">
            <label>Email:</label>
            <input
                    type="email"
                    {...register('email', {
                     required: 'Email is required',
                     pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format'
                     }
                    })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
           </div>

           <div className="form-group">
            <label>Subject:</label>
            <input
                    type="text"
                    {...register('subject', {
                     required: 'Subject is required',
                     pattern: {
                      value: /^.{10,30}$/,
                      message: 'Subject must include at least 10 characters and less than 30'
                     }
                    })}
            />
            {errors.subject && <span className="error">{errors.subject.message}</span>}
           </div>

           <div className="form-group">
            <label>Message:</label>
            <textarea rows={5} {...register('message', {
             required: true
            })}/>
            {errors.message && <span className="error">Message is required</span>}
           </div>

           <button type="submit" className="submit-btn">Submit</button>
          </form>
         </div>
 );
}
```
43. Now let's try to configure our project to use Tailwind.css to work with utility classes.
44. Add `tailwind css`, `Tailwind Formatter`, `Tailwind CSS Smart Completions` plugins in IntelliJ IDEA to get IDE support.
45. Clear the `App.css`, `index.css` and all the other css files to remove custom css classes we've written so far.
46. Goto `https://tailwindcss.com/docs/installation` to see instructions for tailwind css.
47. Then click `Using Vite` tab which redirects to `https://tailwindcss.com/docs/installation/using-vite` for instructions for React Project.
48. Install Tailwind css
 ```shell
npm install tailwindcss @tailwindcss/vite
```
49. Add following code inside `vite.config.ts`.
```js
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
})
```
50. Add this to top of the `index.css` file.
```css
    @import "tailwindcss";
```
51. Then terminate the app and re-run the project usually using script command defined in `package.json`.
    Command:
```bash
npm run dev
```