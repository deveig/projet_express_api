import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'signup',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sauces',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sauce/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'new-sauce',
    renderMode: RenderMode.Server,
  },
  {
    path: 'modify-sauce/:id',
    renderMode: RenderMode.Server,
  }
];
