import {Navbar} from "./components/Navbar";
import {Accounts} from "./components/Accounts/Accounts";

function App() {
    return (
        <>
            <Navbar/>
            <div className="ml-[250px]">
                <Accounts/>
            </div>
        </>
    )
}

export default App;
