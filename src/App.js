import SetData from "./setdata/SetData.js"

const App = () => {
  const app = document.createElement("main");
  SetData(app);
  return app;
};

export default App;
