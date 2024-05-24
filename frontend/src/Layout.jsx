import Router from "./Routes/Routes";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default Layout;
