import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  NewsLetter,
  SinglePageError,
} from "./Pages";
import { loader as LandingLoader } from "./Pages/Landing";
import { loader as SingleLandingLoader } from "./Pages/Cocktail";
import { action as newsletterAction } from "./Pages/NewsLetter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: LandingLoader(queryClient),
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: SingleLandingLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        action: newsletterAction,
        element: <NewsLetter />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
