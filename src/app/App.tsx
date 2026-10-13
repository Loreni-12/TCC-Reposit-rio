import { RouterProvider } from "react-router";
import { ProvedorConta } from "../features/auth/ProvedorConta";
import { router } from "./router";

export function App() {
  return (
    <ProvedorConta>
      <RouterProvider router={router} />
    </ProvedorConta>
  );
}
