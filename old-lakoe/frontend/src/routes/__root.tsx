import App from "@/App";
import { useToast } from "@/components/use-toast";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import useStore from "@/z-context";
import {
  createRootRoute,
  ErrorComponent,
  Navigate,
} from "@tanstack/react-router";
import Axios from "axios";
import { ReactNode } from "react";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export const ProtectedSellerRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const user = useStore((state) => state.user);
  if (user.role_id !== 2) {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      title: `You're not Authorized!`,
    });
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export const ProtectedBuyerRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const user = useStore((state) => state.user);
  if (user.role_id !== 1) {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      title: `You're not Authorized!`,
    });
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const user = useStore((state) => state.user);
  if (user.role_id !== 3) {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      title: `You're not Authorized!`,
    });
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export function throwLoginToast() {
  console.log("throw login toast");
  const { toast } = useToast();
  toast({
    variant: "destructive",
    title: `Error!`,
    description: `Please Login First`,
  });
}

export async function authUser() {
  const token = localStorage.getItem("token");
  const setUser = useStore((state) => state.SET_USER);
  try {
    const auth = await Axios({
      method: "get",
      url: `${api}/login/auth`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (auth.status === 401) {
      localStorage.removeItem("token");
    }

    setUser(auth.data);
    console.log(auth.data);
  } catch (err) {
    const { toast } = useToast();
    toast({
      variant: "destructive",
      title: `Error!`,
    });
  }
}

export const Route = createRootRoute({
  component: () => {
    return <App />;
  },
  errorComponent: ErrorComponent,
});
