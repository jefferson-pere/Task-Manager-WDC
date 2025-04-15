import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Container } from "./style";
import { Footer } from "../../components/Footer";

export function App() {
  return (
    <Container>
      <Header />

      <article>
        <section className="sideBar">
          <SideBar />
        </section>
        <Outlet /> {/* main pages */}
      </article>

      <Footer />
    </Container>
  );
}
