import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Moon, Sun, Search, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import apiClient from '@/utils/api';


function getTokenFromCookie() {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Kiểm tra xem user có token trong cookie không
    const token = getTokenFromCookie();
    setIsLoggedIn(!!token); // Chuyển thành true nếu có token
  }, []);

  const handleLogout = async () => {
    try {
      const response = await apiClient.post('logout');

      if (response.status === 200) {
        document.cookie = 'token=; Max-Age=0; path=/;';
        setIsLoggedIn(false);
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
        router.push('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  };

  

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>

          <div className="flex-1 max-w-xl px-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search..." className="pl-8" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden sm:inline-flex"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
