import './App.css';
import {Navbar} from "./view/common/Navbar/Navbar.tsx";
import {MainContent} from "./view/common/MainContent/MainContent.tsx";
import {Footer} from "./view/common/Footer/Footer.tsx";
function App() {
    return(
        <>
            <Navbar/>
            <MainContent/>
            <Footer/>
        </>);
}
export default App;