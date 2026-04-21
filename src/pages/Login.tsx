import { Card, CardContent } from '../components/ui/card'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { CheckCircle2Icon, Lock, Mail } from 'lucide-react'
import { Alert, AlertTitle } from '../components/ui/alert'
import { Spinner } from '../components/ui/spinner'
import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router'
import type LoginData from '../models/LoginData'
import useAuth from '../auth/store'
import OAuth2LoginButtons from '../components/OAuth2LoginButtons'

function Login() {
   const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    password: "",
  });

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   
   const navigate = useNavigate();
   const login = useAuth((state) => state.login);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

   const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // validation:
    if (loginData.userName.trim() === "") {
      toast.error("User Name is required !");
      return;
    } else if (loginData.password.trim() === "") {
      toast.error("Passwors is required !");
      return;
    }

    // server call for login
    // console.log(event.target);
    // console.log(loginData);

    try {
      setLoading(true);
      // const userInfo = await loginUser(loginData);

      //login function : useAuth
      await login(loginData);
      toast.success("Login success");
      // console.log(userInfo);
      navigate("/dashboard");

      //save the current user logged in informations
      //localstorage
    } catch (error: any) {
      console.log(error);
      if (error?.status == 400) {
        setError(error);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl rounded-2xl p-6">
          <CardContent>
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-center"
            >
              Welcome Back
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-muted-foreground mt-2"
            >
              Login to access your authentication app
            </motion.p>

            {/* error section */}
            {error && (
              <div className="mt-6">
                <Alert variant={"destructive"}>
                  <CheckCircle2Icon />
                  <AlertTitle>
                    {error?.response
                      ? error?.response?.data?.message
                      : error?.message}
                  </AlertTitle>
                </Alert>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
              {/* User Name */}
              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="userName"
                    type="text"
                    placeholder="you@example.com"
                    className="pl-10"
                    name="userName"
                    value={loginData.userName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button
                disabled={loading}
                className="w-full cursor-pointer rounded-2xl text-lg"
              >
                {loading ? (
                  <>
                    <Spinner />
                    Please wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>


              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-[1px] bg-border"></div>
                <span className="text-muted-foreground text-sm">OR</span>
                <div className="flex-1 h-[1px] bg-border"></div>
              </div>

              {/* OAuth Buttons */}
              <OAuth2LoginButtons />





              <NavLink
        to={"/ldap/login"}
        className={"block"}
      >
        <Button
          type="button"
          variant="outline"
          className="w-full flex cursor-pointer items-center gap-3 rounded-2xl"
        >
           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="6" rx="2" fill="#0078D4"/>
    <rect x="2" y="9" width="20" height="6" rx="2" fill="#0078D4" opacity="0.7"/>
    <rect x="2" y="16" width="20" height="6" rx="2" fill="#0078D4" opacity="0.4"/>
    <circle cx="18" cy="5" r="1" fill="white"/>
    <circle cx="18" cy="12" r="1" fill="white"/>
    <circle cx="18" cy="19" r="1" fill="white"/>
  </svg> Continue LDAP
        </Button>
      </NavLink>
      
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login
