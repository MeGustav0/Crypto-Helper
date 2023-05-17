import { createRouter, createWebHistory } from 'vue-router'
import Authorization from "../views/Authorization";
import Registration from "@/views/Registration";
import MainView from "@/views/MainView";
import TestOk from "@/views/TestOk";

const routes = [
    {
      path: '/',
      name: 'Auth',
      component: Authorization
    },
    {
      path: '/Main',
      name: 'Main',
      component: MainView
    },
    {
        path: '/reg',
        name: 'reg',
        component: Registration
    },
    {
        path: '/Test',
        name: 'Test',
        component: TestOk
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
