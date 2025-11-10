// Componente principal da aplicação

import React from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      {/* Define o sistema de rotas */}
      <AppRoutes />
    </div>
  );
}

export default App;
