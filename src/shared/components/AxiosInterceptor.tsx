import { useAxiosInterceptor } from "@shared/hooks/useAxiosInterceptor";

// componente hoja para aislar la suscripción a useAuth sin re-renderizar App ni el árbol de rutas
export const AxiosInterceptor = () => {
  useAxiosInterceptor();
  return null;
};
