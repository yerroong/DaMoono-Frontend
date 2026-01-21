import { createBrowserRouter } from 'react-router';
import { RouterProvider as Provider } from 'react-router/dom';
import Admin from '../pages/Admin/Admin';
import ChatManualPage from '../pages/Chat/ChatManualPage';
import ChatPage from '../pages/Chat/ChatPage';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Summary from '../pages/Summary/SummaryPage';
import { PAGE_PATHS } from '../shared/config/paths';

export default function RouterProvider() {
  const router = createBrowserRouter([
    {
      path: PAGE_PATHS.LOGIN,
      Component: Login,
    },
    {
      path: PAGE_PATHS.HOME,
      Component: Home,
    },
    {
      path: PAGE_PATHS.CHAT,
      Component: ChatPage,
    },
    {
      path: PAGE_PATHS.CHAT_MANUAL,
      Component: ChatManualPage,
    },
    {
      path: PAGE_PATHS.SUMMARY,
      Component: Summary,
    },
    {
      path: PAGE_PATHS.ADMIN,
      Component: Admin,
    },
  ]);
  return <Provider router={router} />;
}
