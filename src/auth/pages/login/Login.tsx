import { useAuthStore } from "@/auth/store/auth.store";
import type { LoginFormValues } from "@/auth/types/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TicketCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const success = await login(data);

      if (!success) {
        const error = useAuthStore.getState().error;
        toast.error(error ?? "No se pudo iniciar sesión.");
        return;
      }

      toast.success("Inicio de sesión exitoso");
      reset();
      const requestedPath = (
        location.state as { from?: { pathname?: string } } | null
      )?.from?.pathname;
      const destination =
        requestedPath?.startsWith("/ticketing-chat") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/ticketing-chat";
      navigate(destination, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate__animated animate__fadeIn mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="items-center justify-items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <TicketCheck className="size-6" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Accede a tu espacio de gestión de incidencias.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          {/* EMAIL */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Introduce un correo electrónico válido",
                },
              })}
              className="my-2"
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nombre@empresa.com"
              required
            />
            {errors.email?.message && (
              <p className="text-sm text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* PASSWORD */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              className="my-2"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Introduce tu contraseña"
              required
            />
            {errors.password?.message && (
              <p className="text-sm text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="my-3 w-full" disabled={isLoading}>
            Iniciar sesión
            {isLoading && (
              <Spinner
                className="ml-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </Button>
        </form>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Si necesitas acceso, solicita una cuenta a tu administrador.
        </p>
       
      </div>
        
      </CardContent>
    </Card>
  );
};
