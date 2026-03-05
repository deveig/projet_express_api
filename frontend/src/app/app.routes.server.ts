import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app-routes';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'recipe-security',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/signup',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/sauces',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/sauce/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/new-sauce',
    renderMode: RenderMode.Server,
  },
  {
    path: 'recipe-security/modify-sauce/:id',
    renderMode: RenderMode.Server,
  }
];
