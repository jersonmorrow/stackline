import stackLineLogo from "./assets/stackline_logo.svg";
import "@mantine/core/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import "./App.css";
import Product from "./features/Product";
import SalesChart from "./features/SalesChart";
import SalesTable from "./features/SalesTable";

function App() {
  return (
    <MantineProvider>
      <header className="header">
        <Container size="md" className="inner">
          <img src={stackLineLogo} alt="stackline-logo" width={"100px"} />
        </Container>
      </header>
      <div className="main">
        <div className="column_left shadow">
          <Product />
        </div>
        <div className="column_right">
          <div className="column_right_top shadow">
            <SalesChart />
          </div>
          <div className="column_right_bottom shadow">
            <SalesTable />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
