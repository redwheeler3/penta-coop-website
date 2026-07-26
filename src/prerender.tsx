import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Index from "./pages/Index";
import Members from "./pages/Members";

const pages = {
  "/": { title: "Home - Penta Housing Co-Op", component: Index },
  "/about.html": { title: "About - Penta Housing Co-Op", component: About },
  "/apply.html": { title: "Apply - Penta Housing Co-Op", component: Apply },
  "/members.html": { title: "Members - Penta Housing Co-Op", component: Members },
} as const;

export const renderPage = (path: keyof typeof pages) => {
  const { component: Page, title } = pages[path];
  return {
    title,
    html: renderToStaticMarkup(
      <StaticRouter location={path}>
        <Page />
      </StaticRouter>,
    ),
  };
};

export const paths = Object.keys(pages) as Array<keyof typeof pages>;
